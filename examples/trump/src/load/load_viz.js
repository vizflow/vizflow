function load_viz (viz) {

  viz.item = [ 
    viz.enemy.item,
    viz.player.item,
    viz.ui.button.walkLeft,
    viz.ui.button.walkRight,
    viz.ui.button.attack,
    viz.ui.button.jump,
    viz.enemy.hit.healthbar.item,
    viz.player.hit.healthbar.item,
  ] ;

  document.viz = viz ; 
  document.addEventListener('mousedown', inputEvent.down, false) ;
  document.addEventListener('mouseup', inputEvent.up, false) ;
  document.addEventListener('touchstart', function(event) {
    //console.log('touchstart start', 'this', this) ;
    event.preventDefault() ;
    inputEvent.down.call(this, event) ;
    //console.log('touchstart end') ;
  }, false);
  document.addEventListener('touchend', inputEvent.up, false) ;
  document.addEventListener('keydown', inputEvent.down, false) ;
  document.addEventListener('keyup', inputEvent.up, false) ;

  $Z.item(viz.item)  ;     // load the user data into the visualization engine to initialize the time equals zero (t = 0) state
  $Z.prep([viz]) ; // sets the preprocessing to perform on each frame of the animation (prior to updating and rendering the elements)
  $Z.post([viz]) ;
  // $Z.detect([viz]) ;
  // $Z.perform([viz]) ;
  $Z.run()       ;     // run the interactive visualization (infinite loop by default)

}