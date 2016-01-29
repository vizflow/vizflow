function fantasy_level () {

  // "ras-tan" level

  document.nextLevel = space_level ;

  var vizConfig = { // an object to configure the visualization
    backgroundImageUrl: './images/trump_bg3.png',
    frameDurationFactor: 5,
  } ;

  viz = setup_viz (vizConfig)   ; // frameDuration is computed from frameDurationFactor using units of base vizflow framespeed (17 ms) 

  viz.playerConfig = { 
    sprite_loader: rastan_sprite, 
    orientation: 'l',
    frameDuration: viz.frameDuration,
    floatDuration: viz.dur * 30,
    callback: update_player,
    restoreRest: false,
    transitionSet: {
      x: $Z.transition.rounded_linear_transition_func ( 'x', viz.frameDuration ), // function accepting an x end-value and returning a transition object
      attack: step_transition_func ( 'image', viz.dur ), // transition object creation function
      jump: step_transition_func ( 'image', viz.dur ),
      y: $Z.transition.rounded_linear_transition_func ( 'y', viz.dur * 14 ), // function accepting a y end-value and returning a transition object
    },
    fullLoopSwitch: true,
    xMove: 8,
    yMove: 55,
    y: 157,
  } ;

  viz.enemyConfig = {
    sprite_loader: trump_sprite,
    frameDuration: viz.frameDuration * 10,
    attackDuration: 20 * viz.frameDuration,
    collisionImage: 'rest', 
    orientation: 'l',
    x: 50, 
    y: 193,
  } ;

  load_characters   (viz) ;
  load_audio        (viz) ;  
  load_hit          (viz) ;
  
  // load_player_bullet(viz) ;
  load_enemy_bullet (viz) ;
  load_viz          (viz) ;

}