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
    Nskip: Nskip,
    lastCollision: 0,
    lastResize: 0,
    trumpAttack: {
      tSkip: 0,
      minSkip: 99,
      skipVar: [17, 23, 11, 19, 8, 0, 44, 19, 23, 14, 17, 23],
    },

    prep: function viz_prep () {

      if( ($Z.iter - this.lastResize) > Nskip) {
        resize() ;
        this.lastResize = $Z.iter ;
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

    collision: null,

    collision_detect: collisionDetection.pixelwise, // pixel-wise collision detection works for any shape and can be used on lower resolution masks compared to the display images

    post: function viz_post () {

      // this.displayContext.clearRect(0, 0, this.displayCanvas.width, this.displayCanvas.height) ;
      // this.displayContext.globalAlpha = 1 ;
      this.finalContext.drawImage (this.displayCanvas, 0, 0) ; // use a single drawImage call for rendering the current frame to the visible Canvas (GPU-acceleated performance)

      if ( ($Z.iter - this.lastCollision) > this.config.frameDurationFactor ) { // throttle collision detection if needed
        // this.collision_detect() ;
        // console.log('viz_post', '$Z.iter', $Z.iter) ;
        this.lastCollision = $Z.iter ;
      }
    
      if ( $Z.iter - this.trumpAttack.tSkip >= ( this.trumpAttack.minSkip + this.trumpAttack.skipVar[ document.skipIndex % this.trumpAttack.skipVar.length ] ) ) {
        this.trumpAttack.tSkip = $Z.iter ;
        document.skipIndex++ ;
        update_enemy.call( viz.enemy ) ; // switch to "viz.enemy.update()" #todo
      }

    },

    detect: actionHelper.detect,

    perform: actionHelper.perform,

    image_transition: step_transition_func('image', frameDuration),
  
  } ;

  // console.log('setup viz after obj') ;

  viz.ui        = setup_ui      (viz)         ;
  viz.ui.button = setup_buttons (viz, viz.ui) ;

  // console.log('setup viz end') ;

  return viz ;
  
}