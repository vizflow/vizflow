function city_level () {

  // "jesus" character level

  document.nextLevel = fantasy_level ;

  var vizConfig = {
    backgroundImageUrl: './images/trump_bg1.png',
    frameDurationFactor: 5,
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
      y: $Z.transition.rounded_linear_transition_func ( 'y', viz.frameDuration * 3 ), // function accepting a y end-value and returning a transition object
    },
    xMove: 7,
    yMove: 50,
    y: 155,
  } ;

  var enemyConfig = {
    sprite_loader:trump_sprite,
    frameDuration: viz.frameDuration * 1,
    attackDuration: 5 * viz.frameDuration,
    collisionImage: 'rest',
    orientation: 'l',
    x: 50,
    y: 193,
  } ;

  load_characters(viz, playerConfig, enemyConfig) ;

  load_audio(viz) ;

  load_hit(viz) ;
  
  // load_player_bullet(viz) ;
  load_enemy_bullet(viz) ;
  
  load_game(viz) ;

} 