var $Z.helper.viz = {

	setup: function viz_helper_setup_viz (vizConfig) {

	  // console.log('setup viz start') ;

		if ( vizConfig === undefined ) {
			vizConfig = {} ;
		}

	  if ( vizConfig.frameDurationFactor === undefined ) {
	    vizConfig.frameDurationFactor = 1 ;
	  }

	  if ( vizConfig.inputEvent === undefined ) {
	  	vizConfig.inputEvent = inputEvent ;
	  }

	  /* 
	   *   TEMPORARY VARIABLES USED FOR SETTING UP THE "viz" OBJECT:
	   */ 

	  var dur           = vizConfig.duration || 17 ; // the framespeed that vizflow uses (default is 60 frames per second)
	  var ratio         = document.ratio ; //(window.devicePixelRatio || 1) ; 
	  var vizWidth      = vizConfig.width  || 480 ;
	  var vizHeight     = vizConfig.height || 640 ;
	  var displayWidth  = Math.floor(vizWidth * ratio) ;
	  var displayHeight = Math.floor(vizHeight * ratio) ;
	  var paddingFactor = vizConfig.paddingFactor || 1 ; // ratio of full canvas to viewport
	  var fullWidth     = Math.floor(vizWidth * paddingFactor * ratio) ;  
	  var fullHeight    = Math.floor(vizHeight * paddingFactor * ratio) ; 

	  var vizCanvas     = imageHelper.create(vizWidth, vizHeight) ;         // model canvas (indepdenent of device pixel ratio)
	  var fullCanvas    = imageHelper.create(fullWidth, fullHeight) ;     // fully upsampled canvas (dependent on device pixel ratio)
	  var displayCanvas = imageHelper.create(displayWidth, displayHeight) ; // hidden display canvas (resized by devicePixelRatio, but not actually drawn to the screen)
	  var screenCanvas  = imageHelper.create(displayWidth, displayHeight) ; // actual display canvas (drawn to screen once per step/cycle/frame of the animation engine)

	  var fullContext    = fullCanvas.context() ; // model canvas (indepdenent of device pixel ratio)
	  var vizContext     = vizCanvas.context() ;
	  var displayContext = displayCanvas.context() ;
	  var screenContext  = screenCanvas.context() ;

	  place_viz(screenCanvas) ;

	  function resize() {
	    set_canvas_position( screenCanvas ) ;
	  }

	  resize() ;

	  var backgroundImageUrl = vizConfig.backgroundImageUrl ;

	  var image ;
	  if(vizConfig.loadingImageUrl !== undefined) {
		  image = imageHelper.adjust_ratio(imageHelper.to_canvas(vizConfig.loadingImageUrl));
		  // console.log('$Z.helper.viz, resize, to_canvas end') ;
	  } 

	  var frameDuration = vizConfig.frameDurationFactor * dur ;
	  var fadeDuration  = 750 ;

	  // console.log('displayCanvas', displayCanvas) ;

	  var resizeSkip  = 3 * vizConfig.frameDurationFactor ; // how often to check for window resize events

	  var vizOpacity ;

	  if ( vizConfig.opacity === undefined ) {
	  	vizOpacity = 1 ;
	  } else {
		  vizOpacity = vizConfig.opacity ;
	  }

	  /*
	   *   DEFINE THE VIZ OBJECT:
	   */

	  var viz = {

	    config:         vizConfig,
	    width:          vizWidth,
	    height:         vizHeight, 
	    dur:            dur,
	    frameDuration:  frameDuration,
	    fadeDuration:   fadeDuration,
	    image:          image || vizConfig.image,
	    canvas:         vizCanvas,
	    context:        vizContext,
	    fullCanvas:     fullCanvas, 
	    fullContext:    fullContext,
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
	    detect:         actionHelper.detect,
	    perform:        actionHelper.perform,
	    image_transition: transitionHelper.step_func('image', frameDuration),  
	    opacity: vizOpacity,
	    add_transition: transitionHelper.add, 
	    add_sequence: transitionHelper.add_sequence,
	    remove_transition: transitionHelper.remove,
	    fade:        imageEffectHelper.fade, 
	    shake:       effectHelper.shake,  
	    setup_item:  $Z.helper.item.setup, 
	    setup_ui:    uiHelper.setup,
	    setup_score: scoreHelper.setup, //  score setup function for games (optional, don't have to use it for non-games)
	    clearSwitch: true,
	    input:             vizConfig.inputEvent || inputEvent, 
	    run:               vizConfig.run || $Z.helper.viz.run,
	    stagingArray:      vizConfig.item || [],
	    screen_callback:   vizConfig.screen_callback,
	    keyboard_callback: vizConfig.keyboard_callback,

	    transitionSet:  {
	      x: $Z.helper.transition.rounded_linear_transition_func ( 'viewportX', 3 * dur ), //function accepting an x end-value and returning a transition object      
	      y: $Z.helper.transition.rounded_linear_transition_func ( 'viewportY', 3 * dur ), //function accepting an x end-value and returning a transition object      
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
	      
	      if ( this.ui !== undefined ) {
	        this.ui.item = this.ui.item.filter( function(d) { return d.removeSwitch !== true ; } ) ; // #todo: figure out a more performant way
	      }

	      for(var kitem = 0 ; kitem < this.stagingArray.length ; kitem++) {

	        if ( this.item.indexOf(this.stagingArray[kitem]) === -1 ) {
	          this.item.push( this.stagingArray[kitem] ) ;
	        }

	        if ( this.ui !== undefined ) { 
		        if ( this.stagingArray[kitem].uiSwitch === true ) {
		        	if ( this.ui.item.indexOf(this.stagingArray[kitem]) === -1) {
		            this.ui.item.push( this.stagingArray[kitem] ) ;	        		
		        	}
		        }
		      }

	      }

	      this.stagingArray = [] ; // #todo: make this more performant

	      $Z.item(this.item) ; // update the vizflow item list

	      // var clearSwitch = false ;
	      if (this.clearSwitch === true) {
	      	this.fullContext.clearRect(0, 0, this.fullCanvas.width, this.fullCanvas.height) ;		      	
	      }
	      
	      var alphaSwitch = false  ; // #todo: move to config object
	      if (alphaSwitch) {
	        this.fullContext.globalAlpha = 0.75 ; // simulates retro CRT display memory 
	      }

	      if (this.image !== undefined) {
	      
	      	this.fullContext.drawImage (this.image, 0, 0) ; // draw background image if there is one
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
	      this.displayContext.drawImage(this.fullCanvas, sx, sy, sw, sh, dx, dy, dw, dh) ;

	      this.screenCanvas.width        = this.screenCanvas.width ; // clearRect(0, 0, this.screenCanvas.width, this.displayCanvas.height) ;
	      this.screenContext.globalAlpha = this.opacity ;
	      this.screenContext.drawImage (this.displayCanvas, 0, 0) ; // use a single drawImage call for rendering the current frame to the visible Canvas (GPU-acceleated performance)

	    },

	    zoom: effectHelper.zoom,
	    zoom_inout: effectHelper.zoom_inout,

	    panX: function (dur, xNew) { 
	      var trans = transitionHelper.sequence( xNew.map(function(x) {
	        return $Z.helper.transition.rounded_linear_transition_func('viewportX', dur)(x) ;
	      }) ) ;
	      // console.log('panX trans', trans) ;
	      this.add_transition( trans[0] ) ; 
	    },

	    panY: function (dur, yNew) { 
	      var trans = transitionHelper.sequence( yNew.map(function(y) {
	        return $Z.helper.transition.rounded_linear_transition_func('viewportY', dur)(y) ;
	      }) ) ;
	      // console.log('panY trans', trans) ;
	      this.add_transition( trans[0] ) ; 
	    },

	  } ;

	  if(vizConfig.item !== undefined) {
	    for( var kItem = 0 ; kItem < vizConfig.item.length ; kItem++ ) { // add the viz object to any items it was initialized with:
	    	vizConfig.item[kItem].viz = viz ; // decorate the item with a viz property pointing to the viz object for convenience
			}
		}

	  // console.log('setup viz end') ;

	  return viz ;
	  
	},

	run: function(viz) {

		// console.log('$Z.helper.viz run start') ;

		if ( viz === undefined && this !== $Z.helper.viz ) {
			viz = this ;
		} 

	  document.viz = viz ; 
	  document.addEventListener('mousedown', viz.input.down, false) ;
	  document.addEventListener('mouseup', viz.input.up, false) ;

	  document.addEventListener
	  (
	    'touchstart', 

	    function(event) {

	      //console.log('touchstart start', 'this', this) ;

	      event.preventDefault() ;
	      viz.input.down.call(this, event) ;

	      //console.log('touchstart end') ;

	    }, 

	    false // function argument list cannot have trailing comma
	  ) ;

	  document.addEventListener('touchend', viz.input.up,   false) ;
	  document.addEventListener('keydown',  viz.input.down, false) ;
	  document.addEventListener('keyup',    viz.input.up,   false) ;

	  // console.log('viz helper load before $Z.viz', 'viz.run', viz) ;

	  $Z.viz(viz) ; // load the vizualization config object into vizflow

	  $Z.run() ;    // run the (possibly interactive) visualization (infinite loop by default)

	}

} ;