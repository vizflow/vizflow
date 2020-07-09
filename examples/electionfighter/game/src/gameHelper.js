var gameHelper = {

	load_audio: function viz_helper_load_audio(viz) {

		if(viz === undefined) {
			viz = this ;
		}

		viz.audio = {} ;

	  viz.audio.thud     = audioLoader.cache['./audio/thud.wav'] ;
	  // viz.audio.hit      = audioLoader.cache['./audio/hit2.wav'] ;
	  viz.audio.jump1    = audioLoader.cache['./audio/pump.wav'] ;
	  viz.audio.bullet   = audioLoader.cache['./audio/bullet2.wav'] ;
	  viz.audio.laugh1   = audioLoader.cache['./audio/laugh1.wav'] ;
	  viz.audio.bump     = audioLoader.cache['./audio/bump2.wav'] ;
	  viz.audio.powerup0 = audioLoader.cache['./audio/powerup0.wav'] ;
	  viz.audio.powerup3 = audioLoader.cache['./audio/powerup3.wav'] ;
	  viz.audio.menu     = audioLoader.cache['./audio/pump.wav'] ;
	  viz.audio.elect    = audioLoader.cache['./audio/ineh-choh.wav'] ;
	  viz.audio.fight    = audioLoader.cache['./audio/fight.wav'] ;
	  viz.audio.explode  = audioLoader.cache['./audio/explode1.wav'] ;
	  viz.audio.bullet   = audioLoader.cache['./audio/bullet.wav'] ;
	  viz.audio.missile  = audioLoader.cache['./audio/missile1.wav'] ;
	  viz.audio.laser    = audioLoader.cache['./audio/laser2.wav'] ;
	  viz.audio.grunt    = audioLoader.cache['./audio/grunt.wav'] ;
	  // viz.audio.word     = audioLoader.cache['./audio/grunt2.wav'] ;
	  viz.audio.ah       = audioLoader.cache['./audio/ah.wav'] ;
	  viz.audio.sho      = audioLoader.cache['./audio/shoryuken.wav'] ;
	  viz.audio.powerup  = audioLoader.cache['./audio/powerup.wav'] ;
	  viz.audio.wolf     = audioLoader.cache['./audio/wolf.wav'] ;

	  // console.log('viz audio menu', 'viz.audio.menu', viz.audio.menu)

	  // viz.audio.trogdor  = audioLoader.cache['./audio/trogdor.wav'] ;

	  // viz.audio.powerup3.volume *= 0.5 ;
	  
	  viz.audio.menu.volume	   *= 0.5 ;
  	viz.audio.thud.volume	   *= 0.75 ;
  	viz.audio.grunt.volume   *= 0.6 ;
  	viz.audio.laser.volume   *= 0.5 ;		
  	viz.audio.jump1.volume    *= 0.5 ;
  	viz.audio.bump.volume    *= 0.5 ;
  	viz.audio.bullet.volume  *= 0.7 ;
  	viz.audio.missile.volume *= 0.6 ;
  	viz.audio.explode.volume *= 0.6 ;
  	viz.audio.laugh1.volume  *= 0.6 ;
  	viz.audio.sho.volume     *= 0.6 ;
		viz.audio.wolf.volume    *= 0.6 ;
  	viz.audio.powerup.volume *= 0.8 ;
  
	  viz.audio.music = audioLoader.cache[viz.config.music] ;

	  // console.log('fighter helper load audio end', 'viz.audio', viz.audio) ;
	
	},	

	setup_word: function game_helper_setup_word (viz, wordConfig) {
	 
	  var wordList = [
	    // first half
	    'gonna win',
	    'best ever',
	    // 'the blacks',
	    // 'mexicans',
	    // 'muslims',
	    // second half
	    'the poll',
	    'got schlonged',
	    'build a wall',
	    'it\'s amazing',
	    'take his coat',
	    'love me',
	    'winning',
	    'my hands',
	    'no collusion',
	    'witch hunt',
	  ] ;

	  var wordImage = new Array(wordList.length) ;

	  for ( var kWord = 0 ; kWord < wordList.length ; kWord++ ) {

	    wordImage[kWord] = imageHelper.word_block ({text: wordList[kWord]}) ;
	    wordImage[kWord].sourceCollisionImage = wordImage[kWord].originalCanvas ;
	    // imageHelper.view(wordImage[kWord]) ;
	    
	  }

	  // var wordImage = imageHelper.word (wordList[(document.skipIndex * (document.skipIndex - 1)) % wordList.length]) ;
	  var maxNword  = 6 ;
	  var wordPause = maxNword * 100 ;
	  var skip      = 17 ;

	  function word_transition(xNew, word) {

	    if(word === undefined) {
	      word = this ;
	    }

	    //console.log('word transition start') ;

	    // this.image = imageHelper.word(wordList[(document.skipIndex * (document.skipIndex + 3)) % wordList.length]) ;
	    word.image = wordImage[$Z.iter % wordList.length] ;

	    // imageHelper.view(word.image)

	    // console.log('word_transition', 'word', word) ;

	    xNew       = -word.image.width ;

	    var yShift  = 10 ;
	    word.y    -= yShift ;
	    var yMove  = 13 ;
	    var yNew   = word.y + yMove ;

	    word.x = viz.enemy.item.x + viz.enemy.item.image.originalCanvas.width * 0.5 - word.image.originalCanvas.width ;

	    var downDuration = viz.enemy.config.frameDuration * viz.enemy.sprite.attack.length ;

	    var down   = $Z.transition.rounded_linear_transition_func('y', downDuration )(yNew) ;

	    down.end   = function() {
	    	word.inert = false ;
	    } ;

	    var left   = $Z.transition.rounded_linear_transition_func ( 'x', viz.dur * 50 )(xNew) ; // sets speed of word block    

	    left.end   = bulletHelper.default_end(viz, word, viz.player) ;
	    // console.log('word transition end') ;

	    down.pause = 300 ;	    
	    down.child = left ;

	    word.transition = [down] ;

	    word.fade({
	    	duration: downDuration + down.pause,
	    }) ;

	    // word.viz.audio.word.play() ;

	    //var down   = $Z.transition.rounded_linear_transition_func( 'y', viz.dur * 30 )(viz.player.config.y - wordImage.height * wordCount) ;
	    //down.child = step_transition_func('dummy', viz.dur * wordPause)(0) ;
	    //left.child = step_transition_func('dummy', viz.dur * wordPause)(0) ;
	    //var word = word ;
	    //left.child.end = function() {
	    // console.log('word down end: start', 'wordCount', wordCount)
	    //  bulletHelper.default_end(viz, word, viz.player).run() ;
	    // console.log('word down end: end')
	    ///} ;
	    // console.log('word transition', 'left', left) ;
	    //left.child = down ;

	  }

	  var word = Object.assign(itemHelper.setup(), {

	    viz: viz, 
	    config: wordConfig,
	    image: wordImage[0],
	    transition: word_transition,
	    render: drawHelper.image,
	    type: 'enemy',
	    collision_image: actionHelper.collision_image,
	    singleSwitch: true,
	    opacity: 0,
	    inert: true,
	    responseSet: {},
	    explode: imageEffectHelper.explode,
	    fade: imageEffectHelper.fade,
	    fadeDuration: 200,

	  }) ;

	  return word ;
	  
	},

} ;