var enemyBattleHelper = {

  health_bar: function (enemy) {
    if (enemy === undefined) {
      enemy = this ;
    }

    var healthbarConfig = { 

      color:  '#0000FF',
      height: 3,
      width:  enemy.health,
      angle:  0,
      x:      0,
      y:      0,

    } ;

    var healthbarImage  = imageHelper.create(healthbarConfig.width, healthbarConfig.height) ;

    drawHelper.rect(healthbarConfig, healthbarImage.context() ) ; // draw the non-upsampled healthbar to a canvas

    healthbarImage  = imageHelper.adjust_ratio( healthbarImage ) ;

    return healthbarImage ;

  },

  setup: function enemy_battle_helper_setup(viz) {

    var enemy             = setup_element(viz, viz.enemyConfig) ;
    enemy.level           = 0 ;
    enemy.update          = enemyBattleHelper.update_enemy ;
    enemy.paused               = false ;
    enemy.state                = [] ;
    enemy.item.responseSet.hit = enemyHitHelper.setup(viz, enemy) ;
    enemy.health = 150 ;
    enemy.health_bar = enemyBattleHelper.health_bar ;

    enemy.healthbar = viz.setup_item ({
      image: enemy.health_bar(),
      x: 120,
      y: 50,
    }) ;

    enemy.healthbar.add() ;
        
    enemy.attack = function attack () {

     var transitionFunc ;

          if( enemy.transitionSet.attack === undefined ) {
            transitionFunc = enemy.transitionSet.image ;
          } else {
            transitionFunc = enemy.transitionSet.attack ;
          }
          var loop = animate_loop(
            enemy.loop.attack,
            enemy.sprite.attack,
            transitionFunc,
            function() {} // buttonpress.reset
          ) ;

          enemy.loop.attack.position  = loop.position ;
          transition                  = loop.animation ;

          var replacementSwitch = true ;
          enemy.item.add_transition(transition, replacementSwitch) ;
    } ;

    enemy.tail_attack = function tail_attack () {

     var transitionFunc ;

          if( enemy.transitionSet.tailattack === undefined ) {
            //  console.log ('player.transitionSet.image', player.transitionSet.image) ;
            transitionFunc = enemy.transitionSet.image ;
          } else {
            transitionFunc = enemy.transitionSet.tailattack ;
          }
          var loop = animate_loop(
            enemy.loop.tailattack,
            enemy.sprite.tailattack,
            transitionFunc,
            function() {} // buttonpress.reset
          ) ;

          enemy.loop.attack.position  = loop.position ;
          transition                  = loop.animation ;

          var replacementSwitch = true ;
          enemy.item.add_transition(transition, replacementSwitch) ;
    } ;


      var attackDuration = 2000 ;
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
          } ;

          var replacementSwitch = true ;
          enemy.item.add_transition (attackTrans, replacementSwitch) ;

      } ;

      var tailAttackDuration = 8000 ;
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
          } ;

          var replacementSwitch = true ;
          enemy.item.add_transition (tailAttackTrans, replacementSwitch) ;

      } ;

      var blockDuration = 10000


      enemy.block = function block () {
         
          if( transitionHelper.find('image', enemy.item.transition) > -1 ) {
            return ; // don't interrupt the current attack animation 
          }

          var transitionFunc ;

          if( enemy.transitionSet.block === undefined ) {
            transitionFunc = enemy.transitionSet.image ;
          } else {
            transitionFunc = enemy.transitionSet.block ;
          }

          var loop = animate_loop(
            enemy.loop.block,
            enemy.sprite.block,
            transitionFunc,
            function() {} // buttonpress.reset

          ) ;

          enemy.loop.block.position = loop.position ;
          transition                  = loop.animation ;

          var replacementSwitch = true ;
          enemy.item.add_transition(transition, replacementSwitch) ;

        }

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
