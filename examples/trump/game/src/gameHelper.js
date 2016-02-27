var gameHelper = {

	selectDur: 150,

	loadState: 'jesus', // starting character state

	loadList: ['jesus', 'rastan', 'megyn'],

	loadCallback: {
		jesus: city_level,
		rastan: fantasy_level,
		megyn: space_level,
	},

	fadeOut: function() {
		viz.audio.menu.play() ;
		viz.audio.music.volume = 0 ;
		viz.audio.music.fade() ;
		viz.fade({
		  opacity: 0,
		  duration: viz.fadeDuration,
		  end: function() { gameHelper.loadCallback[gameHelper.loadState]() },
	  }) ;		

	  viz[gameHelper.loadState].select.zoom() ;

	},

	load_audio: function viz_helper_load_audio(viz) {

		if(viz === undefined) {
			viz = this ;
		}

		viz.audio = {} ;

	  viz.audio.thud     = audioLoader.cache['./audio/thud.wav'] ;
	  // viz.audio.hit      = audioLoader.cache['./audio/hit2.wav'] ;
	  viz.audio.jump1    = audioLoader.cache['./audio/jump1.wav'] ;
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

	  // console.log('viz audio menu', 'viz.audio.menu', viz.audio.menu)

	  // viz.audio.trogdor  = audioLoader.cache['./audio/trogdor.wav'] ;

	  // viz.audio.powerup3.volume *= 0.5 ;
	  
	  viz.audio.menu.volume	 *= 0.5 ;
  	viz.audio.thud.volume	 *= 0.75 ;
  	viz.audio.grunt.volume *= 0.75 ;
  	viz.audio.laser.volume *= 0.5 ;		
  	viz.audio.bump.volume  *= 0.5 ;

	  viz.audio.music = audioLoader.cache[viz.config.music] ;

	  // console.log('fighter helper load audio end', 'viz.audio', viz.audio) ;
	
	},	

	title: function game_helper_title_animation(viz) {

 		if(viz === undefined) {
  		viz = this ;
  	}

  	viz.loading = true ; // to prevent UI from activating until menu page finishes loading

  	function title_sprite() {

      var i = imageHelper.image2canvas('./image/title_sprite.png') ;

      var rowName = [
        'stars', 
        'elect', 
        'fight', 
		  ] ;

      var width = [
        180, 
        180, 
        180, 
      ] ;

      var height = [
        240, 
        20, 
       	75, 
      ] ;

      var maxHeight  = Math.max.apply(null, height) ;
      var spriteset0 = spriteHelper.get(i, rowName, width, height) ;
      var spriteset  = spriteHelper.foreach(spriteset0, imageHelper.adjust_ratio) ;  

      // spriteset.original = spriteset0 ;

      // imageHelper.view() ;

      return spriteset ;

    }

		var sprite = title_sprite() ;

		var stars = itemHelper.setup({
			x: 0,
			y: 0,
			image: sprite.stars[0],
			opacity: 1,
			inert: true,
			viz: viz,
		}) ;

		// console.log('gameHelper title_animation:', 'stars', stars, 'stars.viz', stars.viz)

		stars.add() ;

		var vizflowImage = imageHelper.image2canvas('./image/vizflow.png') ;

    var vizflow = itemHelper.setup({ 
    	x: (viz.width - vizflowImage.width) * 0.5,
    	y: 226,
    	image: imageHelper.adjust_ratio(vizflowImage),
    	opacity: 0,
    	inert: true,
    	viz: viz,
    }) ;

    vizflow.add() ;

    viz.fade({
			duration: viz.fadeDuration,
		}) ;

		var electX =   -1 ;
		var electY = -150 ;
		var elect = itemHelper.setup({
			x: viz.width,
			y: electY,
			image: sprite.elect[0],
			opacity: 0,
			inert: true,
			viz: viz,
		}) ;

		var fight = itemHelper.setup({
			x: 0,
			y: electY + 84,
			image: sprite.fight[0],
			opacity: 0,
			inert: true,
			viz: viz,
		}) ;

		elect.add() ;
		fight.add() ;

		var electFactor = 25 ;
		var electDur    = viz.frameDuration * electFactor ;

		var xTrans = $Z.transition.rounded_linear_transition_func('x', viz.fadeDuration * 1.5)(electX) ;

		var fade = 4 ;
		viz.audio.elect.play() ;
	  viz.audio.elect.gain.gain.value = 0 ;
	  viz.audio.elect.volume = 0.75 ;
		viz.audio.elect.fade(fade) ;

		// xTrans.end = function() {
		//  viz.shake() ;
		// }

		var animation = animate(sprite.elect, step_transition_func('image', electDur))[0] ;

		animation.child.child.end = function() {

			var delay = .2 ;
			viz.audio.fight.play(delay) ;
			
			fight.fade({
				duration: viz.fadeDuration, 
				end: function() { 
					vizflow.fade({
		  			duration: viz.fadeDuration * 2,
		  			end: function() {
							viz.fade({
								opacity: 0,
								duration: viz.fadeDuration * 2,
								end: function() {
									viz.item = [] ;
									gameHelper.load(viz) ;
								}
							}) ;
		  			},
		  		}) ;
					viz.clearSwitch = true ;
					viz.shake() ;
					viz.audio.thud.play() ;
					// viz.zoom_inout({
					// 	duration: viz.fadeDuration * 2,
					// 	shakeSwitch: true,
					// 	width: 150,
					// 	height: 200,
					// 	x: (viz.width - 150) / (2 * document.ratio),
					// 	y: (viz.height - 200) / (2 * document.ratio),
					// }) ;
				}
			}) ;

		} ;

		elect.add_transition(xTrans) ;

		elect.fade({
			duration: viz.fadeDuration,
			child: animation,
			pause: electDur,
		}) ;

		// stars.fade() ;

		// var elect = itemHelper.setup({
		// 	image: sprite.elect,
		// }) ;

	},

	load: function fighter_helper_load(viz) {

 		if(viz === undefined) {
  		viz = this ;
  	}

  	viz.audio.music.loop = true ;
  	var delay = 3 ;
  	viz.audio.music.volume = 0.5 ;
  	viz.audio.music.play(delay) ;

    viz.image = imageHelper.adjust_ratio(imageHelper.image2canvas(viz.config.backgroundImageUrl)) ;  			

		viz.fade({
		  duration: viz.fadeDuration * 0.5,
      opacity: 1,

      end: function() {

    		gameHelper.load_select(viz) ;

	      itemHelper.add(viz, [ // this is the array of objects that are used by the vizflow visualization engine for the main animation loop
	      	
	         viz.choose,
	         viz.jesus,
	         viz.rastan,
	         viz.megyn,
	         viz.jesus.select,
	         viz.rastan.select,
	         viz.megyn.select,

	      ]) ;

	      viz.choose.fade({

	      	end: function () {

	      		var xDur = 500 ;
	      		var x_trans_creator = $Z.transition.rounded_linear_transition_func('x', xDur) ;
	      		var xTrans = x_trans_creator(viz.jesus.x - viz.sprite.jesus[0].width) ;

	      		xTrans.end = function() {

	      			viz.shake() ;
	      			viz.audio.thud.play() ;
	      			var xTrans = x_trans_creator(viz.rastan.x + viz.sprite.rastan[0].width) ;

	      			xTrans.end = function() {

	      				viz.shake() ;
	      				viz.audio.thud.play() ;
	      				var xTrans = x_trans_creator(viz.megyn.x - viz.sprite.megyn[0].width) ;

	      				xTrans.end = function() {

	      					viz.audio.thud.play() ;
	      					viz.shake() ;
	      					viz[gameHelper.loadState].select.fade({ 
	      						duration: gameHelper.selectDur,
	      						end: function() {

	      							viz.loading = false ;

	      						},
	      					}) ;
	      				}
	      				
	      				viz.megyn.add_transition(xTrans) ;

	      			}

	      			viz.rastan.add_transition(xTrans) ;

	      		}

	      		viz.jesus.add_transition (xTrans) ;

	      	},

	      }) ;
	    		    		
	      	// console.log('fighter helper load') ;

      }, // end end: function() ...

    }) ;	// end fade child 

	},	

	load_select: function fighter_helper_load_select (viz) {
		if(viz === undefined) {
		  viz = this ;
  	}

  	viz.sprite = viz.selectorConfig.sprite_loader() ;
  	viz.load_audio() ;

  	viz.choose = viz.setup_item ({
  		x: 4,
  		y: -20,
  		image: viz.sprite.choose[0],
  		opacity: 0, 
  	}) ; 		

  	viz.jesus = viz.setup_item ({
  		x: 13 + viz.sprite.jesus[0].width,
  		y: 40,
  		image: viz.sprite.jesus[0], 
  	}) ; 		

  	viz.rastan = viz.setup_item ({
  		x: - viz.sprite.rastan[0].width,
  		y: 100,
  		image: viz.sprite.rastan[0], 
  	}) ; 		

  	viz.megyn = viz.setup_item ({
  		x: 13 + viz.sprite.megyn[0].width,
  		y: 160,
  		image: viz.sprite.megyn[0], 	
  	}) ; 		

  	viz.jesus.select = viz.setup_item ({
  		x: 11,
  		y: 42,
  		image: viz.sprite.select[0], 
  		opacity: 0,
  	}) ; 		

  	viz.rastan.select = viz.setup_item ({
  		x: 0,
  		y: 102,
  		image: imageHelper.flip_image(viz.sprite.select[0]), 
  		opacity: 0,
  	}) ; 

  	viz.megyn.select = viz.setup_item ({
  		x: 11,
  		y: 162,
  		image: viz.sprite.select[0], 
  		opacity: 0,
  	}) ;   	  

	},	

	keyboard_callback: function(event, viz) {

			if(viz === undefined) {
				viz = this ;
			}

			if(viz.loading) {
				viz.buttonpress.reset() ;
				return ; // wait until viz finishes loading to activate ui controls
			}

      var transition = [] ;
      var state ;

      var newState ; 
      switch (event.keyCode) {

        case 37: // left
        case 38: // up
          state    = 'u' ;
          var newIndex ;
          var index = gameHelper.loadList.indexOf( gameHelper.loadState ) ;
        	// console.log('fighterHelper.keyboard_callback', 'u', 'index', index, 'gameHelper.loadState', gameHelper.loadState)
					if(index > 0) {
						newIndex = --index ;
					} else {
						newIndex = gameHelper.loadList.length - 1 ;
					}
          newState = gameHelper.loadList[newIndex] ;
          // console.log('fighterHelper keyboard_callback', 'index', index, 'newIndex', newIndex, 'newState', newState) ;
          break;
        case 39: // right
        case 40: // down
          state    = 'd' ;
          newState = gameHelper.loadList[(gameHelper.loadList.indexOf(gameHelper.loadState) + 1 ) % gameHelper.loadList.length] ;
          break;
        case 13: // enter
        case 32: // space
        	state = 'x' ; // run some effects and then execute the game code
   				gameHelper.fadeOut() ;
        	return ;
      } 

      //console.log ('state', state) ;
      
      if (state === undefined) {  // user does not hit arrow key or loading still in progress
      
        viz.buttonpress.reset() ;
      
      } else {
				
				viz.audio.menu.play() ;
	    	viz[gameHelper.loadState].select.fade({
	    	 duration: gameHelper.selectDur,
	    	 end: { 

	    	 	viz: viz,
	    	 	run: function() { this.viz.buttonpress.reset() },

	    	 },

	      }) ;

	      // console.log('fighterHelper keyboard callback', 'state', state, 'newState', newState)

	    	viz[newState].select.fade({
	    	 duration: gameHelper.selectDur,
	      }) ;

	      gameHelper.loadState = newState ;	      
      
      }

	},

	screen_callback: function(x, y, viz) {

	 	if(viz === undefined) {
			viz = this ;
		}

	  // console.log('fighterHelper.screen_callback', 'viz.loading', viz.loading) ;

		if(viz.loading) {
	    viz.buttonpress.reset() ;
			return ;
		}

    if (    ( y > viz.jesus.y && y <= viz.jesus.y + viz.sprite.original.jesus[0].height )
    	   && ( x > 0 && x < viz.width )  
   	) { // user selected the city level

			viz.audio.menu.play() ;

    	viz.jesus.select.fade({ duration: gameHelper.selectDur }) ;

    	gameHelper.loadState = 'jesus' ;
    	gameHelper.fadeOut() ;

    }

    if (		( y > viz.rastan.y && y <= viz.rastan.y + viz.sprite.original.rastan[0].height) 
    		 && ( x > 0 && x < viz.width)
		) { // user selected the fantasy level

  		viz.audio.menu.play() ;

	  	gameHelper.loadState = 'rastan' ;

    	viz.rastan.select.fade({
    		duration: gameHelper.selectDur,
    		end: gameHelper.fadeOut,
    	}) ;

    	viz.jesus.select.fade({ 
    		duration: gameHelper.selectDur,
    	}) ;

    }

    if (    ( y > viz.megyn.y && y <= viz.megyn.y + viz.sprite.original.megyn[0].height )  
    	   && ( x > 0 && x < viz.width ) 
    ) { // user selected the space level

			viz.audio.menu.play() ;

    	gameHelper.loadState = 'megyn' ;

   		viz.megyn.select.fade({

   			duration: gameHelper.selectDur,
   			end: gameHelper.fadeOut,

   		}) ;

    	viz.jesus.select.fade({
    	 duration: gameHelper.selectDur,
      }) ;

    }

    viz.buttonpress.reset() ;

  }, 	

	setup_word: function game_helper_setup_word (viz, wordConfig) {
	 
	  var wordList = [
	    // first half
	    'gonna win',
	    'best ever',
	    'the blacks',
	    'mexicans',
	    'muslims',
	    // second half
	    'the poll',
	    'got schlonged',
	    'build a wall',
	    'it\'s amazing',
	    'take his coat',
	    'love me',
	    'winning',
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

	    var yMove  = 10 ;
	    word.y    -= yMove ;
	    var yNew   = word.y + yMove ;

	    var downDuration = 500 ;

	    var down   = $Z.transition.rounded_linear_transition_func('y', downDuration )(yNew) ;
	    down.end   = function() {
	    	word.inert = false ;
	    } ;

	    var left   = $Z.transition.rounded_linear_transition_func ( 'x', viz.dur * 80 )(xNew) ; // sets speed of word block    

	    left.end   = bulletHelper.default_end(viz, word, viz.player) ;
	    // console.log('word transition end') ;

	    down.pause = 300 ;	    
	    down.child = left ;

	    this.transition = [down] ;

	    this.fade({
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
	    inert: true,
	    responseSet: {},
	    explode: imageEffectHelper.explode,
	    fade: imageEffectHelper.fade,
	    fadeDuration: 200,

	  } ;

	  return word ;
	  
	},

} ;