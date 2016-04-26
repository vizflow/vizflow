var enemyBattleHelper = {

  health_bar: function (enemy) {
    if (enemy === undefined) {
      enemy = this ;
    }

    var healthbarConfig = { 

      color:  '#FF00',
      height: 10,
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
    // enemy.orientation     = 'r' ; // all players start facing right
    enemy.level           = 0 ;
    enemy.update          = enemyBattleHelper.update_enemy ;
    // enemy.levelup         = playerHelper.levelup ;
    // viz.enemy.load_bullet  = playerHelper.load_bullet ;
    // viz.enemy.fire_powerup = powerupHelper.fire ;
    enemy.paused               = false ;
    enemy.state                = [] ;
    enemy.item.responseSet.hit = enemyHitHelper.setup(viz, enemy) ;
    enemy.health = 100 ;
    enemy.health_bar = enemyBattleHelper.health_bar ;

    enemy.healthbar = viz.setup_item ({
      image: enemy.health_bar(),
      x: 90,
      y: 20,
    }) ;

    enemy.healthbar.add() ;
        
    enemy.attack = function attack () {

     var transitionFunc ;

          if( enemy.transitionSet.attack === undefined ) {
            //  console.log ('player.transitionSet.image', player.transitionSet.image) ;
            transitionFunc = enemy.transitionSet.image ;
          } else {
            transitionFunc = enemy.transitionSet.attack ;
          }
          // console.log ('updateplayer 101', player.sprite.attack, transitionFunc, buttonpress.reset, player.sprite.rest[0]) ;
          var loop = animate_loop(
            enemy.loop.attack,
            enemy.sprite.attack,
            transitionFunc,
            function() {} // buttonpress.reset
            // finalFrame
          ) ;

          enemy.loop.attack.position = loop.position ;
          transition                  = loop.animation ;

          var replacementSwitch = true ;
          enemy.item.add_transition(transition, replacementSwitch) ;
        // console.log('attack function') ;
    } ;

    var duration = 5000 ;
    var attack_creator = transitionHelper.step_func('attack', duration) ;

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

    return enemy ;
  },
  
  update: function enemy_helper_update(enemy) {
    // console.log('update enemy 17') ;
    if( enemy === undefined ) {
      enemy = this ;
    }
    // console.log('enemy helper 21') ;
    if( enemy.paused === true ) {
      return ;
    }
  } 
};
