function load_game (viz) {
  var item = [ 
    viz.enemy.item,
    viz.player.item,
    viz.ui.button.walkLeft,
    viz.ui.button.walkRight,
    viz.ui.button.attack,
    viz.ui.button.jump,
    viz.enemy.hit.healthbar.item,
    viz.player.hit.healthbar.item,
  ] ;

  $Z.item(item)   ;     // load the user data into the visualization engine to initialize the time equals zero (t = 0) state
  $Z.prep([viz]) ; // sets the preprocessing to perform on each frame of the animation (prior to updating and rendering the elements)
  $Z.run()        ;     // run the interactive visualization (infinite loop by default)

  document.viz = viz ; 
  document.addEventListener('mousedown', inputEvent.down) ;
  document.addEventListener('mouseup', inputEvent.up) ;
  document.addEventListener('keydown', inputEvent.down) ;
  document.addEventListener('keyup', inputEvent.up) ;
}