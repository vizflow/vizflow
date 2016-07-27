var enemyBattleHelper = {

  health_bar: function (enemy) {
    if (enemy === undefined) {
      enemy = this ;
    }

    var healthbarConfig = { 

      color:  '#FF0000',
      height: 5,
      width:  enemy.health,
      angle:  0,
      x:      0,
      y:      0,

    } ;

    var healthbarImage  = $Z.helper.image.create(healthbarConfig.width, healthbarConfig.height) ;

    $Z.helper.draw.rect(healthbarConfig, healthbarImage.context() ) ; // draw the non-upsampled healthbar to a canvas

    healthbarImage  = $Z.helper.image.adjust_ratio( healthbarImage ) ;

    return healthbarImage ;

  },

  setup: function enemy_battle_helper_setup(viz) {

    var enemy             = setup_element(viz, viz.enemyConfig) ;
    enemy.level           = 0 ;
    enemy.update          = enemyBattleHelper.update_enemy ;
    enemy.paused               = false ;
    enemy.state                = [] ;
    enemy.item.responseSet.hit = enemyHitHelper.setup(viz, enemy) ;
    enemy.health = 180 ;
    enemy.health_bar = enemyBattleHelper.health_bar ;

    enemy.healthbar = viz.setup_item ({

      image: enemy.health_bar(),
      x: 10,
      y: 16,

    }) ;

    enemy.item.default_child() ;

    enemy.healthbar.add() ;        

    enemy.attack = function attack () {

     var transitionFunc ;

          if( enemy.transitionSet.attack === undefined ) {
            transitionFunc = enemy.transitionSet.image ;
          } else {
            transitionFunc = enemy.transitionSet.attack ;
          }
          var loop = $Z.helper.sprite.animate(
            enemy.loop.attack,
            enemy.sprite.attack,
            transitionFunc,
            function() {} // buttonpress.reset
          ) ;
          var dur1 = 800 ;
          var dur2 = 50 ;
          var dur3 = 100 ;
          var trans1 = transitionHelper.new_step('image', enemy.sprite.attack[0], dur1) ;          
          var trans2 = transitionHelper.new_step('image', enemy.sprite.attack[1], dur2) ;
          var trans3 = transitionHelper.new_step('image', enemy.sprite.rest[0], dur3) ;

          trans1.child = trans2 ;
          trans1.child.child = trans3 ;

          enemy.loop.attack.position  = loop.position ;
          transition                  = loop.animation ;

          enemy.item.add_transition(trans1) ;
          if( transitionHelper.find('image', enemy.item.transition) > -1 ) {
            return ; // don't interrupt the current attack animation 
          }          


    } ;

    enemy.hit = function hit () {

     var transitionFunc ;

          if( enemy.transitionSet.hit === undefined ) {
            transitionFunc = enemy.transitionSet.image ;
          } else {
            transitionFunc = enemy.transitionSet.hit ;
          }
          // var loop = $Z.helper.sprite.animate(
          //   enemy.loop.hit,
          //   enemy.sprite.hit,
          //   transitionFunc,
          //   function() {} // buttonpress.reset
          // ) ;
          var dur1   = 50 ;
          var dur2   = 50 ;
          var dur3   = 50 ;
          var trans1 = transitionHelper.new_step('image', enemy.sprite.hit[0], dur1) ;          
          var trans2 = transitionHelper.new_step('image', enemy.sprite.hit[1], dur2) ;
          var trans3 = transitionHelper.new_step('image', enemy.sprite.rest[0], dur3) ;

          trans1.child = trans2 ;
          trans1.child.child = trans3 ;

          // enemy.loop.hit.position  = loop.position ;
          // transition                  = loop.animation ;

          enemy.item.add_transition(trans1) ;

          var trans4 = transitionHelper.new_step('image', enemy.item.white.image, dur1) ;          
          var trans5 = transitionHelper.new_step('image', enemy.sprite.hitOverlay, dur2) ;
          var trans6 = transitionHelper.new_step('image', enemy.item.white.image, dur3) ;

          trans4.child       = trans5 ;
          trans4.child.child = trans3 ;

          enemy.item.white.add_transition(trans4) ;

          if( transitionHelper.find('image', enemy.item.transition) > -1 ) {
            return ; // don't interrupt the current attack animation 
          }          
    } ;    

    enemy.tail_attack = function tail_attack () {

     var transitionFunc ;

          if( enemy.transitionSet.tailattack === undefined ) {
            //  console.log ('player.transitionSet.image', player.transitionSet.image) ;
            transitionFunc = enemy.transitionSet.image ;
          } else {
            transitionFunc = enemy.transitionSet.tailattack ;
          }

          var loop = $Z.helper.sprite.animate(
            enemy.loop.tailattack,
            enemy.sprite.tailattack,
            transitionFunc,
            function() {} // buttonpress.reset
          ) ;

          var dur1 = 800 ;
          var dur2 = 600 ;
          var dur3 = 50 ;
          var dur4 = 100 ;
          var trans1 = transitionHelper.new_step('image', enemy.sprite.tailattack[0], dur1) ;
          var trans2 = transitionHelper.new_step('image', enemy.sprite.tailattack[1], dur2) ;
          var trans3 = transitionHelper.new_step('image', enemy.sprite.tailattack[2], dur3) ;          
          var trans4 = transitionHelper.new_step('image', enemy.sprite.rest[0], dur4) ;
          trans1.child = trans2 ;
          trans1.child.child = trans3 ;
          trans1.child.child.child = trans4 ;

          enemy.loop.attack.position  = loop.position ;
          transition                  = loop.animation ;

          enemy.item.add_transition(trans1) ;
          if( transitionHelper.find('image', enemy.item.transition) > -1 ) {
            return ; // don't interrupt the current attack animation 
          }

    } ;

    var attackDuration = 4000 ;
    var attack_creator = transitionHelper.step_func('attack', attackDuration) ;

    enemy.canAttack = true ;



    enemy.start_attack = function start_attack () {
        
        if (enemy.canAttack === false) {

          return ;
        }

        var attackTrans    = attack_creator() ;
        attackTrans.end    = function () {
            enemy.attack() ;
            enemy.start_attack() ;
            viz.audio.growl1.play() ;
        } ;

        var replacementSwitch = true ;
        enemy.item.add_transition (attackTrans, replacementSwitch) ;

    } ;

    var tailAttackDuration = 5500 ;
    var tail_attack_creator = transitionHelper.step_func('tailattack', tailAttackDuration) ;

    enemy.canTailAttack = true ;

    enemy.start_tail_attack = function start_tail_attack () {

      if (enemy.canTailAttack === false) {
        return ;
      }

      var tailAttackTrans    = tail_attack_creator() ;
      tailAttackTrans.end    = function () {
          enemy.tail_attack() ;
          enemy.start_tail_attack() ;  
          viz.audio.growl1.play() ;
      } ;

      var replacementSwitch = true ;
      enemy.item.add_transition (tailAttackTrans, replacementSwitch) ;

    } ;

    enemy.rest = function rest () {
             
      var transitionFunc ;

      if( enemy.transitionSet.rest === undefined ) {
        transitionFunc = enemy.transitionSet.image ;
      } else {
        transitionFunc = enemy.transitionSet.rest ;
      }

      var loop = $Z.helper.sprite.animate(
        enemy.loop.rest,
        enemy.sprite.rest,
        transitionFunc,
        function() {} // buttonpress.reset

      ) ;

      var dur1 = 200 ;
      var dur2 = 175 ;
      var dur3 = 150 ;
      var dur4 = 100 ;
      var dur5 = 100 ;
      var trans1 = transitionHelper.new_step('image', enemy.sprite.rest[0], dur1) ;
      var trans2 = transitionHelper.new_step('image', enemy.sprite.rest[1], dur2) ;
      var trans3 = transitionHelper.new_step('image', enemy.sprite.rest[2], dur3) ;
      var trans4 = transitionHelper.new_step('image', enemy.sprite.rest[1], dur4) ;          
      var trans5 = transitionHelper.new_step('image', enemy.sprite.rest[0], dur5) ;
      trans1.child = trans2 ;
      trans1.child.child = trans3 ;
      trans1.child.child.child = trans4 ;
      trans1.child.child.child.child = trans5 ;
      enemy.loop.rest.position = loop.position ;
      transition                  = loop.animation ;

      enemy.item.add_transition(trans1) ;
      if( transitionHelper.find('image', enemy.item.transition) > -1 ) {
        return ; // don't interrupt the current attack animation           

      }
      } ;

      var restDuration = 20000 ;
      var rest_creator = transitionHelper.step_func('rest', restDuration) ;

      enemy.canrest = true ;

      enemy.start_rest = function start_rest () {
      // console.log('enemy battle helper start rest') ;
      if (enemy.canrest === false) {
        return ;
      }

      var restTrans    = rest_creator() ;
      restTrans.end    = function () {
          enemy.rest() ;
          enemy.start_rest() ;  
      } ;

      var replacementSwitch = true ;
      enemy.item.add_transition (restTrans, replacementSwitch) ;

    } ; 

    return enemy ;           

  },

  update: function enemy_helper_update(enemy) {

    if( enemy === undefined ) {
      enemy = this ;
    }
    if( enemy.paused === true ) {
      return ;
    }

  } 

};
