function load_game (viz) {

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

  var tSkip = 0 ;
  var minSkip = 99 ;
  var skipVar = [17, 23, 11, 19, 8, 0, 44, 19, 23, 14, 17, 23] ;

  var trumpAttack = { 
    post: function() {
      console.log('trumpAttack post start', 'tskip', tSkip, 'minskip', minSkip, 'ziter', $Z.iter, 'skipIndex % skipVar.length', skipIndex % skipVar.length) ;
      if($Z.iter - tSkip >= (minSkip + skipVar[document.skipIndex % skipVar.length])) {
        tSkip = $Z.iter ;
        document.skipIndex++ ;
        update_enemy.call(viz.enemy) ;       
      }
      console.log('trump attack post end') ;
    },
  } ;

  $Z.item(viz.item)  ;     // load the user data into the visualization engine to initialize the time equals zero (t = 0) state
  $Z.prep([viz]) ; // sets the preprocessing to perform on each frame of the animation (prior to updating and rendering the elements)
  $Z.post([viz]) ;
  // $Z.post([viz, trumpAttack]) ;
  $Z.run()       ;     // run the interactive visualization (infinite loop by default)

}