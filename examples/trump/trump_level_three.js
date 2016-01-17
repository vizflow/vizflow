function trump_level_three () {

  var vizConfig = { // an object to configure the visualization
      backgroundImageUrl: 'trump_bg3.png', // Ras-Tan background image
      frameDurationFactor: 5,
  } ;

  var viz = load_viz(vizConfig) ;

  // console.log(viz.ui.button) ;
  viz.attackDuration = viz.dur * 1.15 ;
  var Nattack = 15 ;
// var attackLength = 
  var playerConfig = { 
    sprite_loader: rastan_sprite, 
    orientation: 'l',
    frameDuration: viz.frameDuration,
    floatDuration: viz.attackDuration * Nattack * 1.85,
    callback: update_player,
    restoreRest: false,
    transitionSet: {
      x: $Z.transition.rounded_linear_transition_func ( 'x', viz.frameDuration ), // function accepting an x end-value and returning a transition object
      attack: step_transition_func ( 'image', viz.attackDuration ), // transition object creation function
      jump: step_transition_func ( 'image', viz.attackDuration * 0.75 ), // transition object creation function
      y: $Z.transition.rounded_linear_transition_func ( 'y', viz.attackDuration * 12 ), // function accepting a y end-value and returning a transition object
    },
    xMove: 8,
    yMove: 55,
    y: 209,
  } ;
  // console.log('playerConfig', playerConfig)
  var enemyConfig = {
    sprite_loader: trump_sprite,
    frameDuration: viz.frameDuration * 10,
    collisionImage: 'rest', 
    x: 80, 
    y: 209,
  } ;

  viz.player    = setup_element (viz, playerConfig) ;
  viz.enemy     = setup_element (viz, enemyConfig) ;
  viz.enemy.hit = setup_hit     (viz, viz.enemy) ;

  // console.log('enemyConfig', enemyConfig, 'viz.enemy', viz.enemy, 'viz.enemy trans', viz.enemy.transitionSet.image()) ;
  viz.player.enemy = viz.enemy ; // decorate the player object for convenient access to the viz.enemy object 

  load_game(viz) ;

}