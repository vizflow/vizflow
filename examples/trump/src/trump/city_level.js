function city_level () {

  document.nextLevel = fantasy_level ;

  var vizConfig = {
    backgroundImageUrl: './images/trump_bg1.png',
    frameDurationFactor: 5,
  } ;

  viz = setup_viz(vizConfig) ; // framdeDuration computed

  viz.playerConfig = {
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
    type: 'player',
    bulletSwitch: false,
  } ;

  viz.enemyConfig = {
    sprite_loader: trump_sprite,
    frameDuration: viz.frameDuration * 1,
    attackDuration: 5 * viz.frameDuration,
    orientation: 'l',
    x: 50,
    y: 193,
    type: 'enemy',
  } ;

  load_viz(viz) ;

} 