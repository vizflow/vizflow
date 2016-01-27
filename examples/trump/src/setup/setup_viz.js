function setup_viz (vizConfig) {

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

  var vizCanvas      = create_canvas(vizWidth, vizHeight) ;         // model canvas (indepdenent of device pixel ratio)
  var displayCanvas  = create_canvas(displayWidth, displayHeight) ; // hidden display canvas (resized by devicePixelRatio, but not actually drawn to the screen)
  var finalCanvas    = create_canvas(displayWidth, displayHeight) ; // actual display canvas (drawn to screen once per step/cycle/frame of the animation engine)

  var vizContext     = vizCanvas.getContext('2d') ;
  var displayContext = displayCanvas.getContext('2d') ;
  var finalContext   = create_context(finalCanvas) ;

  place_viz(finalCanvas) ;

  function resize() {
    set_canvas_position( finalCanvas ) ;
  }

  resize() ;

  var backgroundImageUrl = vizConfig.backgroundImageUrl ;
  var background         = image2canvas(backgroundImageUrl) ;
  background             = adjust_image_ratio(background) ;

  var frameDuration = vizConfig.frameDurationFactor * dur ;

  // console.log('displayCanvas', displayCanvas) ;

  var Nskip  = 50 ;
  var lastResize = 0 ;
  var Ncollision = 12 ; // period for collision detection
  var lastCollision = 0 ;

  var viz = {

    config:         vizConfig,
    width:          vizWidth,
    height:         vizHeight, 
    dur:            dur,
    frameDuration:  frameDuration,
    background:     background,
    canvas:         vizCanvas,
    context:        vizContext,
    displayCanvas:  displayCanvas, 
    displayContext: displayContext,
    finalCanvas:    finalCanvas, 
    finalContext:   finalContext,

    prep: function viz_prep () {

      if( ($Z.iter - lastResize) > Nskip) {
        resize() ;
        lastResize = $Z.iter ;
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

      if( ($Z.iter - lastCollision) > Ncollision ) { // throttle collision detection if needed
        this.collision = collision_detect(viz) ;
        // console.log('viz_post', '$Z.iter', $Z.iter) ;
        lastCollision = $Z.iter ;
      }
    
    },

    image_transition: step_transition_func('image', frameDuration),
  
  } ;

  // console.log('setup viz after obj') ;

  viz.ui        = setup_ui      (viz)         ;
  viz.ui.button = setup_buttons (viz, viz.ui) ;

  // console.log('setup viz end') ;

  return viz ;
  
}