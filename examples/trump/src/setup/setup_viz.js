function setup_viz (vizConfig) {

  if (vizConfig.frameDurationFactor === undefined) {
    vizConfig.frameDurationFactor = 1 ;
  }

  var spriteImageIndex = 0 ; 
  var dur              = 17 ; // the framespeed that vizflow uses (60 frames per second)
  var vizWidth         = 180 ;
  var vizHeight        = 240 ;

  var ratio         = (window.devicePixelRatio || 1) ;
  var displayWidth  = vizWidth * ratio ;
  var displayHeight = vizHeight * ratio ;

  var vizCanvas  = create_canvas(vizWidth, vizHeight) ; 
  var vizContext = vizCanvas.getContext('2d') ;
  
  var displayCanvas        = create_canvas(displayWidth, displayHeight) ; 
  var displayContext       = create_context(displayCanvas) ;
  var displayCopyCanvas    = create_canvas(displayWidth, displayHeight) ;
  var displayCopyContext   = displayCopyCanvas.getContext('2d') ;

  place_viz(displayCanvas) ;

  var backgroundImageUrl = vizConfig.backgroundImageUrl ;
  var background         = image2canvas(backgroundImageUrl) ;

  var frameDuration = vizConfig.frameDurationFactor * dur ;

  // var blockOffset = [null, null] ;  // initialize element array(use closure to reduce garbage collection)

  // function block_copy (destImageData, context, sx, sy, sw, sh, dx, dy, dw, dh) {
     
  //   var sourceImageData = context.getImageData (sx, sy, sw, sh) ;
  //   var data0 = sourceImageData.data ;
  //   var data1 = destImageData.data ;

  //   var Npel = 100 ;
  //   // console.log('block copy 41') ;
  
  //   for (var kPel = 0 ; kPel < Npel ; kPel++) {
  //     var kx = kPel % sourceImageData.width ;
  //     var ky = Math.floor(kPel / sourceImageData.width) ;
  //     var bx = ratio * kx ;
  //     var by = ratio * ky ;        
  //     var kOff = kPel * 4 ;
  //     // console.log('blockcopy 48') ;

  //     var r = data0[kOff + 0] ;
  //     var g = data0[kOff + 1] ;         
  //     var b = data0[kOff + 2] ;
  //     var a = data0[kOff + 3] ;
  //     // console.log('r', r, 'g', g, 'b', b) ;
  //     for (var bkx = 0 ; bkx < ratio ; bkx++) {
  //       for (var bky = 0 ; bky < ratio ; bky++) {
  //         var tempX = bx + bkx ;
  //         var tempY = by + bky ;
  //         var bk = tempY * destImageData.width + tempX ;
  //         var bkOff = bk * 4 ;
  //         data1[bkOff + 0] = r ;
  //         data1[bkOff + 1] = g ;
  //         data1[bkOff + 2] = b ;
  //         data1[bkOff + 3] = a ;  
  //       }
  //     }
  //   }
  //   return sourceImageData ;
  //   // destImageData.data = data1 ;
  //   // console.log ('sourceImageData', sourceImageData, 'destImageData', destImageData) ;
  // }

  var sx = 0 ;
  var sy = 0 ;
  var sw = vizWidth ;
  var sh = vizHeight ;
  var dx = 0 ;
  var dy = 0 ;
  var dw = displayWidth ;
  var dh = displayHeight ;

  function resize() {
    set_canvas_position( displayCanvas ) ;
  }

  resize() ;

  // console.log('displayCanvas', displayCanvas)

  var Nskip      = 5 ;

  var viz = {

    config: vizConfig,
    height: vizHeight, 
    width: vizWidth,
    dur: dur,
    frameDuration: frameDuration,
    canvas: vizCanvas,
    context: vizContext,
    background: background,
    displayCanvas: displayCanvas, 
    displayContext: displayContext,

    prep: function viz_prep () {

      if($Z.iter % Nskip === 0) {
        resize() ;
      }

      //console.log('setup_viz: viz_prep')

      // draw current frame to display canvas:
      // prepare viz canvas for next frame:

      // console.log('this.canvas', this.canvas) ;
      // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height) ;
      // this.context.globalAlpha = .8 ;
      this.context.drawImage (this.background, 0, 0) ;
      // this.context.globalAlpha = 1 ;
 
      return true ;
 
    },

    post: function viz_post () {

      this.displayContext.clearRect(0, 0, this.displayCanvas.width, this.displayCanvas.height) ;
      // this.displayContext.globalAlpha = 1 ;
      this.displayContext.drawImage (this.canvas, sx, sy, sw, sh, dx, dy, dw, dh) ;
    
    },

    image_transition: step_transition_func('image', frameDuration),
  
  } ;

  viz.ui        = setup_ui      (viz)         ;
  viz.ui.button = setup_buttons (viz, viz.ui) ;

  return viz ;
  
}