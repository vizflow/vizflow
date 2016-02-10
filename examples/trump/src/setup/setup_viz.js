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
  var paddingFactor = 4/3 ;
  var modelWidth    = Math.floor(vizWidth * paddingFactor * ratio) ;
  var modelHeight   = Math.floor(vizHeight * paddingFactor * ratio) ;

  var modelCanvas    = create_canvas(modelWidth, modelHeight) ;         // model canvas (indepdenent of device pixel ratio)
  var vizCanvas      = create_canvas(vizWidth, vizHeight) ;         // model canvas (indepdenent of device pixel ratio)
  var displayCanvas  = create_canvas(displayWidth, displayHeight) ; // hidden display canvas (resized by devicePixelRatio, but not actually drawn to the screen)
  var screenCanvas   = create_canvas(displayWidth, displayHeight) ; // actual display canvas (drawn to screen once per step/cycle/frame of the animation engine)

  var modelContext   = modelCanvas.getContext('2d') ;         // model canvas (indepdenent of device pixel ratio)
  var vizContext     = vizCanvas.getContext('2d') ;
  var displayContext = displayCanvas.getContext('2d') ;
  var screenContext  = create_context(screenCanvas) ;

  place_viz(screenCanvas) ;

  function resize() {
    set_canvas_position( screenCanvas ) ;
  }

  resize() ;

  var backgroundImageUrl = vizConfig.backgroundImageUrl ;
  var image         = image2canvas(vizConfig.loadingImageUrl) ;
  image             = adjust_image_ratio(image) ;

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

    trumpAttack:    {
                      tSkip: 0,
                      minSkip: 157,
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

      if ( this.trumpAttack.on && $Z.iter - this.trumpAttack.tSkip >= ( this.trumpAttack.minSkip + this.trumpAttack.skipVar[ document.skipIndex % this.trumpAttack.skipVar.length ] ) ) {
        this.trumpAttack.tSkip = $Z.iter ;
        document.skipIndex++ ;
        update_enemy.call( this.enemy ) ; // switch to "viz.enemy.update()" #todo
      }

    },

    detect: actionHelper.detect,
    perform: actionHelper.perform,
    image_transition: step_transition_func('image', frameDuration),  
    opacity: 0,
    add_transition: transitionHelper.add, 
    fade: effectHelper.image.fade, 
    shake: effectHelper.shake,

  } ;

  // console.log('setup viz after obj') ;

  viz.ui        = setup_ui      (viz)         ;
  viz.ui.button = setup_buttons (viz, viz.ui) ;

  // console.log('setup viz end') ;

  return viz ;
  
}