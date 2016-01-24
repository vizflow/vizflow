function setup_viz (vizConfig) {

  if (vizConfig.frameDurationFactor === undefined) {
    vizConfig.frameDurationFactor = 1 ;
  }

  var spriteImageIndex = 0 ; 
  var dur              = 17 ; // the framespeed that vizflow uses (60 frames per second)
  var ratio            = document.ratio ; //(window.devicePixelRatio || 1) ; 
  var vizWidth         = 180 ;
  var vizHeight        = 240 ;

  var displayWidth     = Math.floor(vizWidth * ratio) ;
  var displayHeight    = Math.floor(vizHeight * ratio) ;

  var vizCanvas  = create_canvas(vizWidth, vizHeight) ; 
  var vizContext = vizCanvas.getContext('2d') ;
  
  var displayCanvas  = create_canvas(displayWidth, displayHeight) ; 
  var displayContext = displayCanvas.getContext('2d') ;

  var finalCanvas  = create_canvas(displayWidth, displayHeight) ; 
  var finalContext = create_context(finalCanvas) ;

  place_viz(finalCanvas) ;

  var backgroundImageUrl = vizConfig.backgroundImageUrl ;
  var background         = image2canvas(backgroundImageUrl) ;
  background             = adjust_image_ratio(background) ;

  var frameDuration = vizConfig.frameDurationFactor * dur ;

  function resize() {
    set_canvas_position( finalCanvas ) ;
  }

  resize() ;

  // console.log('displayCanvas', displayCanvas)

  var Nskip  = 50 ;

  var viz = {

    config: vizConfig,
    width: vizWidth,
    height: vizHeight, 
    dur: dur,
    frameDuration: frameDuration,
    background: background,
    canvas: vizCanvas,
    context: vizContext,
    displayCanvas: displayCanvas, 
    displayContext: displayContext,
    finalCanvas: finalCanvas, 
    finalContext: finalContext,


    prep: function viz_prep () {

      if($Z.iter % Nskip === 0) {
        resize() ;
      }

      //console.log('setup_viz: viz_prep')

      // draw current frame to display canvas:
      // prepare viz canvas for next frame:

      //console.log('this.canvas', this.canvas) ;
      // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height) ;
      this.displayContext.globalAlpha = .8 ;
      this.displayContext.drawImage (this.background, 0, 0) ;
      this.displayContext.globalAlpha = 1 ;
 
      return true ;
 
    },

    post: function viz_post () {

      // this.displayContext.clearRect(0, 0, this.displayCanvas.width, this.displayCanvas.height) ;
      // this.displayContext.globalAlpha = 1 ;
      this.finalContext.drawImage (this.displayCanvas, 0, 0) ; // use a single drawImage call for rendering the current frame to the visible Canvas (GPU-acceleated performance)
      // this.collision = collision_detect(this) ;
    
    },

    image_transition: step_transition_func('image', frameDuration),
  
  } ;

  viz.ui        = setup_ui      (viz)         ;
  viz.ui.button = setup_buttons (viz, viz.ui) ;

  return viz ;
  
}

  // var ratio         = (window.devicePixelRatio || 1) ;
  // var displayWidth  = Math.floor(vizWidth * ratio) ;
  // var displayHeight = Math.floor(vizHeight * ratio) ;

  // var displayCopyCanvas    = create_canvas(displayWidth, displayHeight) ;
  // var displayCopyContext   = displayCopyCanvas.getContext('2d') ;


  // var blockOffset = [null, null] ;  // initialize element array(use closure to reduce garbage collection)

  // var sx = 0 ;
  // var sy = 0 ;
  // var sw = vizWidth ;
  // var sh = vizHeight ;
  // var dx = 0 ;
  // var dy = 0 ;
  // var dw = displayWidth ;
  // var dh = displayHeight ;