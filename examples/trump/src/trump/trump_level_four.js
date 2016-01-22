function trump_level_four () {

  // console.log('level 4') ;

  var vizConfig = { // an object to configure the visualization
    backgroundImageUrl: './images/trump_bg4.png',
    frameDurationFactor: 1,
  } ;

  viz = setup_viz(vizConfig)   ; // frameDuration is computed from frameDurationFactor using units of base vizflow framespeed (17 ms) 

  var playerConfig = { 
    sprite_loader: samus_sprite, 
    orientation: 'r',
    frameDuration: viz.frameDuration,
    floatDuration: 15 * viz.frameDuration,
    jumpDuration: 40 * viz.frameDuration,
    callback: update_player,
    restoreRest: true,
    transitionSet: {
      x: $Z.transition.rounded_linear_transition_func ( 'x', viz.frameDuration ), // function accepting an x end-value and returning a transition object
      y: $Z.transition.rounded_linear_transition_func ( 'y', viz.frameDuration * 20 ), // function accepting a y end-value and returning a transition object
    },
    xMove: 10,
    yMove: 100,
    y: 225,
  } ;

  var enemyConfig = {
    sprite_loader: trump_sprite,
    frameDuration: viz.frameDuration,
    attackDuration: 20 * viz.frameDuration,
    collisionImage: 'rest', 
    orientation: 'l',
    x: 80,    
    y: 240,
  } ;  

  load_characters(viz, playerConfig, enemyConfig) ;

  load_audio(viz) ;

  var enemyHitConfig = {
    detectList: [viz.enemy.item],
    healthbarY: 10, 
    color: '#900',
    audio: viz.audio.hit2,
  } ;
  
  var playerHitConfig = {
    detectList: [viz.player.item],
    healthbarY: 21,
    color: '#009', 
    audio: viz.audio.hit2,
  } ;
  
  load_hit(viz, playerHitConfig, enemyHitConfig) ;

  load_player_bullet(viz) ;
  load_enemy_bullet(viz) ;

  load_game(viz) ;


  setInterval(
    function () {
      update_enemy.call(viz.enemy) ;
    }, 
    2000
  ) ;

}

  // var trumpAttackConfig = {
  //   varName: 'image', 
  //   duration: 2000,
  //   startValue: 0,
  //   endValue: 0,
  //   interpFunc: function(t) {}, 
  //   end: function () {
  //     // fire_bullet.call(viz.enemy, 'word') ;
  //     update_enemy.call (viz.enemy) ;
  //     viz.enemy.item.transition = [copy_object (trumpAttackConfig)] ;
  //     console.log('trump attack config end', 'trumpAttackConfig', trumpAttackConfig) ;
  //   },
  // } ;

  // trumpAttackConfig.end =  ;

  // viz.enemy.item.transition = [copy_object (trumpAttackConfig)] ;