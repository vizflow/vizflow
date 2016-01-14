function trump_level_three () {

  var vizConfig = { // an object to configure the visualization
    backgroundImageUrl: 'trump_bg3.png',
    frameDurationFactor: 5,
  } ;

  viz           = setup_viz     (vizConfig)   ; // frameDuration is computed from frameDurationFactor using units of base vizflow framespeed (17 ms) 
  viz.ui        = setup_ui      (viz)         ;
  viz.ui.button = setup_buttons (viz, viz.ui) ;
  console.log(viz.ui.button) ;

  var playerConfig = { 
    sprite_loader: rastan_sprite, 
    orientation: 'l',
    frameDuration: viz.frameDuration,
    callback: update_player,
    restoreRest: false,
    transitionSet: {
      x: $Z.transition.rounded_linear_transition_func ( 'x', viz.frameDuration ), // function accepting an x end-value and returning a transition object
      attack: step_transition_func ( 'image', viz.dur * 1.15 ), // transition object creation function
    },
    xMove: 10,
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

  viz.player = setup_element (viz, playerConfig) ;
  var enemy  = setup_element (viz, enemyConfig) ;
  enemy.hit  = setup_hit     (viz, enemy) ;

  // console.log('enemyConfig', enemyConfig, 'enemy', enemy, 'enemy trans', enemy.transitionSet.image()) ;

  viz.player.enemy = enemy ; // decorate the player object for convenient access to the enemy object 

  var item = [ 
    enemy.item, 
    viz.player.item, 
    viz.ui.button.walkLeft, 
    viz.ui.button.walkRight, 
    viz.ui.button.attack, 
    viz.ui.button.jump, 
    enemy.hit.healthbar.item, 
  ] ;

  $Z.item(item)  ; // load the user data into the visualization engine to initialize the time equals zero (t = 0) state
	$Z.prep([viz]) ; // sets the preprocessing to perform on each frame of the animation (prior to updating and rendering the elements)
	$Z.run()       ; // run the interactive visualization (infinite loop by default)

  document.viz = viz ;   
  document.addEventListener( 'mousedown', inputEvent.down ) ;
  document.addEventListener( 'mouseup',   inputEvent.up   ) ;
  document.addEventListener( 'keydown',   inputEvent.down ) ;
  document.addEventListener( 'keyup',     inputEvent.up   ) ;

}