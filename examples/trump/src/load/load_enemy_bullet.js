function load_enemy_bullet(viz) {

  var wordList = [
    'schlonged',
    'love me',
    'the blacks',
    'mexicans',
    'muslims',
    'build a wall',
    'it\'s amazing',
    'best ever',
    'the poll',
    'gonna win',
  ]

  var wordImage = new Array(wordList.length) ;
  for ( var kWord = 0 ; kWord < wordList.length ; kWord++ ) {
    wordImage[kWord] = word_image (wordList[kWord]) ;
    wordImage[kWord].sourceCollisionImage = wordImage[kWord] ;
    wordImage[kWord] = adjust_image_ratio(wordImage[kWord]) ;
  }
  // var wordImage = word_image (wordList[(document.skipIndex * (document.skipIndex - 1)) % wordList.length]) ;
  var maxNword  = 6 ;
  var wordPause = maxNword * 100 ;
  var skip      = 17 ;

  function word_transition(xNew) {
    // console.log('word transition start') ;
    // this.image = word_image(wordList[(document.skipIndex * (document.skipIndex + 3)) % wordList.length]) ;
    this.image = wordImage[$Z.iter % wordList.length] ;
    
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
    left.end = bulletHelper.default_end(viz, this, viz.player) ;
    // console.log('word transition end') ;

    return left ;
  }
	
  var wordConfig = {
    move: viz.width,
    shiftXl: 0,
    shiftXr: 0, 
    shiftY: 110,
    image: wordImage[0],
    transition: word_transition,
    element: viz.enemy,
  } ;

	viz.enemy.bullet        = setup_word (viz, wordConfig) ; 
  viz.enemy.bullet.remove = false ;
  viz.enemy.bullet.audio  = viz.audio.bullet1 ;

}