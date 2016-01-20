function trump_level_one () {

  var vizConfig = {
    backgroundImageUrl: 'trump_bg1.png',
    frameDurationFactor: 1,
  } ;

  viz           = setup_viz     (vizConfig)   ; // framdeDuration computed
  viz.ui        = setup_ui      (viz)         ;
  viz.ui.button = setup_buttons (viz, viz.ui) ;

  var playerConfig = {
    sprite_loader: dd_sprite,
    orientation: 'r',
    frameDuration: viz.frameDuration,
    callback: update_player,
    restoreRest: true,
    transitionSet: {
      x: $Z.transition.rounded_linear_transition_func ( 'x', viz.frameDuration ), //function accepting an x end-value and returning a transition object
      attack: step_transition_func ( 'image', viz.dur * 1.15 ), // transition object creation      
      y: $Z.transition.rounded_linear_transition_func ( 'y', viz.frameDuration * 10 ), // function accepting a y end-value and returning a transition object
    },
    xMove: 5,
    yMove: 50,
    y: 225,
  } ;

  var enemyConfig = {
    sprite_loader:trump_sprite,
    frameDuration: viz.frameDuration * 10,
    collisionImage: 'rest',
    x: 80,
    y: 209,
  } ;

  viz.player = setup_element (viz, playerConfig) ;
  viz.enemy  = setup_element (viz, enemyConfig) ;
  viz.enemy.hit  = setup_hit     (viz, viz.enemy) ;

  viz.player.enemy = viz.enemy ; // decorate the player object for convenient access to the enemy object

  load_game(viz) ;

} 