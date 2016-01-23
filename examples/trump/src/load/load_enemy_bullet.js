function load_enemy_bullet(viz) {

  var wordList = [
    'schlonged',
    'the blacks',
    'mexicans',
    'muslims',
    'love me',
  ]

  viz.wordCount = 0 ;
  var wordSkip = 17 ; 
  var wordImage = word_image (wordList[viz.wordCount]) ;
  var maxNword  = 6 ;
  var wordPause = maxNword * 100 ;

  function word_transition(xNew) {
    this.image = word_image(wordList[(viz.wordCount * wordSkip) % wordList.length]) ;
    viz.wordCount++ ;
    console.log('word transition', 'wordList index', (viz.wordCount * wordSkip) % wordList.length) ;
    var left   = $Z.transition.rounded_linear_transition_func ( 'x', viz.dur * 80 )(xNew) ; // sets speed of word block    
    //var down   = $Z.transition.rounded_linear_transition_func( 'y', viz.dur * 30 )(viz.player.config.y - wordImage.height * wordCount) ;
    //down.child = step_transition_func('dummy', viz.dur * wordPause)(0) ;
    //left.child = step_transition_func('dummy', viz.dur * wordPause)(0) ;
    //var word = this ;
    //left.child.end = function() {
      // console.log('word down end: start', 'wordCount', wordCount)
    //  bulletHelper.default_end(viz, word, viz.player).run() ;
      // console.log('word down end: end')
    ///} ;
    // console.log('word transition', 'left', left) ;
    //left.child = down ;
    return left ;
  }
	
  var wordConfig = {
    move: viz.width,
    shiftXl: 0,
    shiftXr: 0, 
    shiftY: 110,
    image: wordImage,
    transition: word_transition,
    element: viz.enemy,
  } ;

	viz.enemy.bullet = setup_word (viz, 'enemy', wordConfig) ; 
  viz.enemy.bullet.remove = false ;
  viz.enemy.bullet.audio = viz.audio.bullet1 ;

}