function load_enemy_bullet(viz) {

  var wordImage = word_image ('schlonged') ;
  var wordCount = 0 ;
  var maxNword  = 6 ;
  var wordPause = maxNword * 100 ;

  function word_transition(xNew) {
    var left   = $Z.transition.rounded_linear_transition_func ( 'x', viz.dur * 70 )(xNew) ; // sets speed of word block    
    var down   = $Z.transition.rounded_linear_transition_func( 'y', viz.dur * 30 )(viz.player.config.y - wordImage.height * wordCount) ;
    down.child = step_transition_func('dummy', viz.dur * wordPause)(0) ;
    var word = this ;
    down.child.end = function() {
      wordCount-- ;
      bulletHelper.default_end(viz, word) ;
    } ;
    left.child = down ;
    wordCount++ ;
    return left ;
  }
	
  var wordConfig = {
    move: 40,
    shiftXl: 0,
    shiftXr: 0, 
    shiftY: viz.enemy.config.y - 113,
    image: wordImage,
    transition: word_transition,
    element: viz.enemy,
  } ;

	viz.enemy.bullet = setup_word (viz, 'enemy', wordConfig) ; 
  viz.enemy.bullet.remove = false ;

}