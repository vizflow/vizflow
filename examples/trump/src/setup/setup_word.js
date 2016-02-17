function setup_word (viz, wordConfig) {
 
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
    'take his coat',
  ] ;

  var wordImage = new Array(wordList.length) ;

  for ( var kWord = 0 ; kWord < wordList.length ; kWord++ ) {

    wordImage[kWord] = imageHelper.word_block ({text: wordList[kWord]}) ;
    wordImage[kWord].sourceCollisionImage = wordImage[kWord] ;
    wordImage[kWord] = imageHelper.adjust_ratio(wordImage[kWord]) ;

  }


  // var wordImage = imageHelper.word (wordList[(document.skipIndex * (document.skipIndex - 1)) % wordList.length]) ;
  var maxNword  = 6 ;
  var wordPause = maxNword * 100 ;
  var skip      = 17 ;

  function word_transition(xNew) {

    // console.log('word transition start') ;
    // this.image = imageHelper.word(wordList[(document.skipIndex * (document.skipIndex + 3)) % wordList.length]) ;
    this.image = wordImage[$Z.iter % wordList.length] ;

    xNew = -this.image.width ;

    var yMove  = 10 ;
    this.y    -= yMove ;
    var yNew   = this.y + yMove ;

    var down   = $Z.transition.rounded_linear_transition_func('y', viz.dur * 15 )(yNew) ;

    down.pause = 300 ;
    
    var left   = $Z.transition.rounded_linear_transition_func ( 'x', viz.dur * 80 )(xNew) ; // sets speed of word block    

    left.end = bulletHelper.default_end(viz, this, viz.player) ;
    // console.log('word transition end') ;

    down.child = left ;

    return down ;

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

  }

  var word = {

    viz: viz, 
    config: wordConfig,
    image: wordImage[0],
    transition: word_transition,
    render: drawHelper.image,
    type: 'enemy',
    collision_image: actionHelper.collision_image,
    singleSwitch: true,
    opacity: 0,
    inert: false,
    actionSet: {},
    explode: imageEffectHelper.explode,
    fade: imageEffectHelper.fade,
    fadeDuration: 200,

  } ;

  return word ;
  
}

