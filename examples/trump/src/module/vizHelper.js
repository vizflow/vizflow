var vizHelper = {

	setup: function viz_helper_setup_viz (vizConfig) {

		if(vizConfig === undefined) {
			vizConfig = {} ;
		}

	  // console.log('setup viz start') ;

	  if (vizConfig.frameDurationFactor === undefined) {
	    vizConfig.frameDurationFactor = 1 ;
	  }

	  if (vizConfig.inputEvent === undefined) {
	  	vizConfig.inputEvent = inputEvent ;
	  }

		if (vizConfig.buttonpress === undefined) {
	  	vizConfig.buttonpress = inputEvent.buttonpress ;
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
	  // console.log('vizHelper, resize, image2canvas start') ;

	  var image ;
	  if(vizConfig.loadingImageUrl !== undefined) {
		  image = imageHelper.image2canvas(vizConfig.loadingImageUrl) ;
		  // console.log('vizHelper, resize, image2canvas end') ;
		  image = imageHelper.adjust_ratio(image) ;
	  } 

	  var frameDuration = vizConfig.frameDurationFactor * dur ;
	  var fadeDuration  = 750 ;

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
	    input: vizConfig.inputEvent, 
	    buttonpress: vizConfig.buttonpress,
	    screen_callback: vizConfig.screen_callback,
	    keyboard_callback: vizConfig.keyboard_callback,
	    setup_item: itemHelper.setup, 
	    setup_score: scoreHelper.setup,
	    load_response: vizConfig.load_response, // hitHelper.load,
	    load_ui: vizConfig.load_ui,
	    load_audio: vizConfig.load_audio,
	    load_char: vizConfig.load_char,
	    load: vizHelper.load,
	    run: vizConfig.run,
	    stagingArray: [],

	    transitionSet:  {
	      x: $Z.transition.rounded_linear_transition_func ( 'viewportX', 3 * dur ), //function accepting an x end-value and returning a transition object      
	      y: $Z.transition.rounded_linear_transition_func ( 'viewportY', 3 * dur ), //function accepting an x end-value and returning a transition object      
	    },

	    collision: null,

	    collision_detect: collisionDetect.pixelwise, // pixel-wise collision detection works for any shape and can be used on lower resolution masks compared to the display images

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

	      // var clearSwitch = false ;
	      // if (clearSwitch) {
	      // 	this.modelContext.clearRect(0, 0, this.canvas.width, this.canvas.height) ;		      	
	      // }
	      
	      var alphaSwitch = true  ; // #todo: move to config object
	      if (alphaSwitch) {
	        this.modelContext.globalAlpha = 0.75 ; // simulates retro CRT display memory 
	      }

	      if(this.image !== undefined) {
	      	this.modelContext.drawImage (this.image, 0, 0) ; // draw background image if there is one
	      }
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

	      // if ( this.enemyAttack.on && $Z.iter - this.enemyAttack.tSkip >= ( this.enemyAttack.minSkip + this.enemyAttack.skipVar[ document.skipIndex % this.enemyAttack.skipVar.length ] ) ) {

	      //   this.enemyAttack.tSkip = $Z.iter ;
	      //   document.skipIndex++ ;
	      //   this.enemy.update() ; // switch to "viz.enemy.update()" #todo
	      
	      // }

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

	  } ;

	  // console.log('setup viz end') ;

	  return viz ;
	  
	},

	load: function viz_helper_load_viz (viz) {
		// console.log('viz helper load start') ;
	  if(viz === undefined) {
	    viz = this ;
	  }

	  if (viz.load_audio !== undefined) {
	  	viz.load_audio() ;
	  } ;
	  // console.log('viz helper load  255') ;

	  if (viz.load_char !== undefined) {
	 		viz.load_char() ;
	  }
	  // console.log('viz helper load  260') ;
	  
	  if (viz.load_response !== undefined) {
	  	viz.load_response() ;
	  } ;
	  // console.log('viz helper load  263') ;

	  if (viz.load_ui !== undefined) {
	  	viz.load_ui() ;
	  } ;	  
	  // console.log('viz helper load  267') ;
	  document.viz = viz ; 
	  document.addEventListener('mousedown', viz.input.down, false) ;
	  document.addEventListener('mouseup', viz.input.up, false) ;

	  document.addEventListener(
	    'touchstart', 
	    function(event) {
	      //console.log('touchstart start', 'this', this) ;
	      event.preventDefault() ;
	      viz.input.down.call(this, event) ;
	      //console.log('touchstart end') ;
	    }, 
	    false
	  ) ;

	  document.addEventListener('touchend', viz.input.up, false) ;
	  document.addEventListener('keydown', viz.input.down, false) ;
	  document.addEventListener('keyup', viz.input.up, false) ;

	  // console.log('viz helper load before $Z.viz', 'viz.run', viz.run) ;
	  $Z.viz(viz) ; // load the vizualization config object into the vizflow   vizualization engine

	  $Z.run() ;    // run the interactive visualization (infinite loop by default)

	  if (viz.run !== undefined) {
	  	viz.run() ; 
	  } 

	},

} ;