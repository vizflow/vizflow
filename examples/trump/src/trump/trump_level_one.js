function trump_level_one () {

  // jesus level

  var vizConfig = {
    backgroundImageUrl: './images/trump_bg1.png',
    frameDurationFactor: 3,
  } ;

  viz           = setup_viz     (vizConfig)   ; // framdeDuration computed

  var playerConfig = {
    sprite_loader: dd_sprite,
    orientation: 'r',
    frameDuration: viz.frameDuration,
    floatDuration: viz.dur * 20,
    callback: update_player,
    restoreRest: true,
    transitionSet: {
      x: $Z.transition.rounded_linear_transition_func ( 'x', viz.frameDuration ), //function accepting an x end-value and returning a transition object
      attack: step_transition_func ( 'image', viz.dur * 10 ), // transition object creation      
      y: $Z.transition.rounded_linear_transition_func ( 'y', viz.frameDuration * 5 ), // function accepting a y end-value and returning a transition object
    },
    xMove: 5,
    yMove: 50,
    y: 207,
  } ;

  var enemyConfig = {
    sprite_loader:trump_sprite,
    frameDuration: viz.frameDuration * 10,
    attackDuration: 20 * viz.frameDuration,
    collisionImage: 'rest',
    orientation: 'r',
    x: 80,
    y: 209,
  } ;

  load_characters(viz, playerConfig, enemyConfig) ;

  load_audio(viz) ;

  var enemyHitConfig = {
    healthbarY: 10, 
    color: '#900',
    audio: viz.audio.hit2,
  } ;
  
  var playerHitConfig = {
    detectList: [viz.player.item], 
    healthbarY: 22,
    color: '#009', 
    audio: viz.audio.hit2,
  } ;
  
  load_hit(viz, playerHitConfig, enemyHitConfig) ;
  
  // load_player_bullet(viz) ;
  load_enemy_bullet(viz) ;
  
  load_game(viz) ;

} 