var vizHelper = {

	load_audio: function viz_helper_load_audio(viz) {

		if(viz === undefined) {
			viz = this ;
		}

		viz.audio = {} ;

	  viz.audio.hit3    = audioLoader.cache['./audio/hit3.wav'] ;
	  viz.audio.jump1   = audioLoader.cache['./audio/jump1.wav']
	  viz.audio.bullet = audioLoader.cache['./audio/bullet2.wav'] ;
	  viz.audio.laugh1  = audioLoader.cache['./audio/laugh1.wav'] ;

	},

	setup: function viz_helper_setup_viz (vizConfig) {

		if(vizConfig === undefined) {
			vizConfig = {} ;
		}

	  // console.log('setup viz start') ;

	  if (vizConfig.frameDurationFactor === undefined) {
	    vizConfig.frameDurationFactor = 1 ;
	  }

	  var dur           = 17 ; // the framespeed that vizflow uses (60 frames per second)
	  var ratio         = document.ratio ; //(window.devicePixelRatio || 1) ; 
	  var vizWidth      = 180 ;
	  var vizHeight     = 240 ;
	  var displayWidth  = Math.floor(vizWidth * ratio) ;
	  var displayHeight = Math.floor(vizHeight * ratio) ;
	  var paddingFactor = 4 / 3 ;
	  var modelWidth    = Math.floor(vizWidth * paddingFactor * ratio) ;
	  var modelHeight   = Math.floor(vizHeight * paddingFactor * ratio) ;

	  var modelCanvas    = imageHelper.create(modelWidth, modelHeight) ;         // model canvas (indepdenent of device pixel ratio)
	  var vizCanvas      = imageHelper.create(vizWidth, vizHeight) ;         // model canvas (indepdenent of device pixel ratio)
	  var displayCanvas  = imageHelper.create(displayWidth, displayHeight) ; // hidden display canvas (resized by devicePixelRatio, but not actually drawn to the screen)
	  var screenCanvas   = imageHelper.create(displayWidth, displayHeight) ; // actual display canvas (drawn to screen once per step/cycle/frame of the animation engine)

	  var modelContext   = modelCanvas.context() ;         // model canvas (indepdenent of device pixel ratio)
	  var vizContext     = vizCanvas.context() ;
	  var displayContext = displayCanvas.context() ;
	  var screenContext  = screenCanvas.context() ;

	  place_viz(screenCanvas) ;

	  function resize() {
	    set_canvas_position( screenCanvas ) ;
	  }

	  resize() ;

	  var backgroundImageUrl = vizConfig.backgroundImageUrl ;
	  var image         = imageHelper.image2canvas(vizConfig.loadingImageUrl) ;
	  image             = imageHelper.adjust_ratio(image) ;

	  var frameDuration = vizConfig.frameDurationFactor * dur ;
	  var fadeDuration  = 1500 ;

	  // console.log('displayCanvas', displayCanvas) ;

	  var resizeSkip  = 3 * vizConfig.frameDurationFactor ; // how often to check for window resize events

	  var viz = {

	    config:         vizConfig,
	    width:          vizWidth,
	    height:         vizHeight, 
	    dur:            dur,
	    frameDuration:  frameDuration,
	    fadeDuration:   fadeDuration,
	    image:          image,
	    canvas:         vizCanvas,
	    context:        vizContext,
	    modelCanvas:    modelCanvas, 
	    modelContext:   modelContext,
	    displayCanvas:  displayCanvas, 
	    displayContext: displayContext,
	    screenCanvas:   screenCanvas, 
	    screenContext:  screenContext,
	    xShift:         Math.floor(0.5 * (paddingFactor - 1) * vizWidth),
	    yShift:         Math.floor(0.5 * (paddingFactor - 1) * vizHeight),
	    resizeSkip:     resizeSkip,
	    lastCollision:  0,
	    lastResize:     0,
	    viewportX:      0, 
	    viewportY:      0,
	    viewportWidth:  displayCanvas.width,
	    viewportHeight: displayCanvas.height,
	    detect: actionHelper.detect,
	    perform: actionHelper.perform,
	    image_transition: step_transition_func('image', frameDuration),  
	    opacity: 0,
	    add_transition: transitionHelper.add, 
	    fade: imageEffectHelper.fade, 
	    shake: effectHelper.shake,    
	    load_hit: hitHelper.load,
	    setup_score: scoreHelper.setup,
	    load_audio: vizHelper.load_audio,
	    load_char: gameHelper.load_char,
	    load: vizHelper.load,
	    stagingArray: [],

	    enemyAttack:    {
	                      tSkip: 0,
	                      minSkip: 357,
	                      skipVar: [0, 17, 23, 11, 19, 8, 0, 44, 19, 23, 14, 17, -111, 23],
	                      on: false,
	                    },

	    transitionSet:  {
	                      x: $Z.transition.rounded_linear_transition_func ( 'viewportX', 3 * dur ), //function accepting an x end-value and returning a transition object      
	                      y: $Z.transition.rounded_linear_transition_func ( 'viewportY', 3 * dur ), //function accepting an x end-value and returning a transition object      
	                    },

	    collision: null,

	    collision_detect: collisionDetection.pixelwise, // pixel-wise collision detection works for any shape and can be used on lower resolution masks compared to the display images

	    prep: function viz_prep () {

	      if( ($Z.iter - this.lastResize) > this.resizeSkip) {
	        resize() ;
	        this.lastResize = $Z.iter ;
	      }

	      if(this.item === undefined) {
	        this.item = [] ;
	      }

	      this.item = this.item.filter( function(d) { return d.removeSwitch !== true ; } ) ; // #todo: figure out a more performant way

	      for(var kitem = 0 ; kitem < this.stagingArray.length ; kitem++) {
	        if( this.item.indexOf(this.stagingArray[kitem]) === -1 ) {
	          this.item.push( this.stagingArray[kitem] ) ;
	        }        
	      }

	      this.stagingArray = [] ; // #todo: make this more performant

	      $Z.item(this.item) ; // update the vizflow item list

	      // var index = item.viz.item.indexOf (this) ;  
	      // item.viz.item.splice (index, 1) ; // remove item[itemName] from vizflow itemlist  

	      //console.log('setup_viz: viz_prep')

	      // draw current frame to display canvas:
	      // prepare viz canvas for next frame:

	      //console.log('this.canvas', this.canvas) ;
	      // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height) ;
	      this.modelContext.globalAlpha = 0.75 ; // simulates retro CRT display memory 
	      this.modelContext.drawImage (this.image, 0, 0) ;
	      // this.displayContext.globalAlpha = 1 ;
	 
	      return true ;
	 
	    },

	    post: function viz_post () {

	      var sx = Math.floor((this.viewportX + this.xShift) * ratio) ;
	      var sy = Math.floor((this.viewportY + this.yShift) * ratio)  ; 
	      var sw = this.viewportWidth ;
	      var sh = this.viewportHeight ;
	      var dx = 0 ;
	      var dy = 0 ;
	      var dw = displayCanvas.width ;
	      var dh = displayCanvas.height ;
	      this.displayCanvas.width = this.displayCanvas.width ;
	      // console.log('sx, sy, sw, sh, dx, dy, dw, dh', sx, sy, sw, sh, dx, dy, dw, dh) ;
	      this.displayContext.drawImage(this.modelCanvas, sx, sy, sw, sh, dx, dy, dw, dh) ;

	      this.screenCanvas.width        = this.screenCanvas.width ; // clearRect(0, 0, this.screenCanvas.width, this.displayCanvas.height) ;
	      this.screenContext.globalAlpha = this.opacity ;
	      this.screenContext.drawImage (this.displayCanvas, 0, 0) ; // use a single drawImage call for rendering the current frame to the visible Canvas (GPU-acceleated performance)

	      if ( this.enemyAttack.on && $Z.iter - this.enemyAttack.tSkip >= ( this.enemyAttack.minSkip + this.enemyAttack.skipVar[ document.skipIndex % this.enemyAttack.skipVar.length ] ) ) {

	        this.enemyAttack.tSkip = $Z.iter ;
	        document.skipIndex++ ;
	        update_enemy.call( this.enemy ) ; // switch to "viz.enemy.update()" #todo
	      
	      }

	    },

	    zoom: effectHelper.zoom,
	    zoom_inout: effectHelper.zoom_inout,

	    panX: function (dur, xNew) { 
	      var trans = transition_sequence( xNew.map(function(x) {
	        return $Z.transition.rounded_linear_transition_func('viewportX', dur)(x) ;
	      }) ) ;
	      // console.log('panX trans', trans) ;
	      this.add_transition( trans[0] ) ; 
	    },

	    panY: function (dur, yNew) { 
	      var trans = transition_sequence( yNew.map(function(y) {
	        return $Z.transition.rounded_linear_transition_func('viewportY', dur)(y) ;
	      }) ) ;
	      // console.log('panY trans', trans) ;
	      this.add_transition( trans[0] ) ; 
	    },

	    add_item: function(item, viz) {

	      if(viz === undefined) {
	        viz = this ;
	      }

	      if(viz.item === undefined) {
	        viz.item = [] ;
	      }

	      if(item.constructor !== Array) {

	        this.stagingArray.push(item) ;        
	      
	      } else {

	        for(var kitem = 0 ; kitem < item.length ; kitem++) {
	          this.stagingArray.push(item[kitem]) ;
	        }
	      
	      }

	    },

	  } ;

	  // console.log('setup viz after obj') ;

	  viz.ui        = setup_ui      (viz)         ;
	  viz.ui.button = setup_buttons (viz, viz.ui) ;

	  // console.log('setup viz end') ;

	  return viz ;
	  
	},

	load: function viz_helper_load_viz (viz) {

	  if(viz === undefined) {
	    viz = this ;
	  }

	  if (viz.load_audio !== undefined) {
	  	viz.load_audio() ;
	  } ;

	  if (viz.load_char !== undefined) {
	 		viz.load_char() ;
	  }
	  
	  if (viz.load_hit !== undefined) {
	  	viz.load_hit() ;
	  } ;

	  document.viz = viz ; 
	  document.addEventListener('mousedown', inputEvent.down, false) ;
	  document.addEventListener('mouseup', inputEvent.up, false) ;

	  document.addEventListener(
	    'touchstart', 
	    function(event) {
	      //console.log('touchstart start', 'this', this) ;
	      event.preventDefault() ;
	      inputEvent.down.call(this, event) ;
	      //console.log('touchstart end') ;
	    }, 
	    false
	  ) ;

	  document.addEventListener('touchend', inputEvent.up, false) ;
	  document.addEventListener('keydown', inputEvent.down, false) ;
	  document.addEventListener('keyup', inputEvent.up, false) ;

	  $Z.viz(viz) ; // load the vizualization config object into the vizflow   vizualization engine

	  $Z.run() ;    // run the interactive visualization (infinite loop by default)

	  viz.fade({
	    opacity: 1,
	    duration: viz.fadeDuration,
	    pause: viz.fadeDuration,
	    child: imageEffectHelper.fade_transition({

	      opacity: 0, 

	      end: function() {
	        // console.log(viz.config.backgroundImageUrl) ;
	        viz.image = imageHelper.adjust_ratio(imageHelper.image2canvas(viz.config.backgroundImageUrl)) ;

	        viz.add_item([ // this is the array of objects that are used by the vizflow visualization engine for the main animation loop
	            viz.enemy.item,
	            viz.player.item,
	            viz.ui.button.walkLeft,
	            viz.ui.button.walkRight,
	            viz.ui.button.attack,
	            viz.ui.button.jump,
	            viz.enemy.item.actionSet.hit.healthbar.item,
	            viz.player.item.actionSet.hit.healthbar.item,
	            viz.player.score,
	        ]) ;
	        
	      },

	      child: imageEffectHelper.fade_transition({
	        opacity: 1,
	        end: viz_run,
	      }),
	    }),
	  }) ;

	  function viz_run() {

	    var Nstep = 6 ; // 2 * Math.floor(0.5 * viz.fadeDuration / viz.frameDuration) ;

	    // console.log('viz_run', 'Nstep', Nstep, 'viz', viz) ;

	    viz.enemy.item.flash(viz.frameDuration, Nstep) ;
	    transitionHelper.add_end.call(viz.enemy.item, 'render', Nstep - 1, function() {
	      viz.enemyAttack.on = true ;
	    }) ;

	  }

	  function viz_switch() {

	    // console.log('viz_switch', 'viz', viz) ;
	    var image = imageHelper.adjust_ratio(imageHelper.image2canvas(viz.config.backgroundImageUrl)) ;
	    // console.log('viz', viz, 'image', image, 'viz_run', viz_run) ;
	    viz.fade({
	      opacity: 1,
	      duration: viz.fadeDuration,
	      end: viz_run,
	    }) ;
	    // viz.fade_switch({image: image, end: viz_run})     

	  }

	},

} ;