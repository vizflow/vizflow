function setup_viz (vizConfig) {

  if (vizConfig.frameDurationFactor === undefined) {
    vizConfig.frameDurationFactor = 1 ;
  }

  var spriteImageIndex = 0 ; 
  var dur              = 17 ; // the framespeed that vizflow uses (60 frames per second)
  var vizWidth         = 240 ;
  var vizHeight        = 320 ;

  var vizCanvas  = create_canvas(vizWidth, vizHeight) ; 
  var vizContext = create_context(vizCanvas) ;
  
  place_viz(vizCanvas) ;

  var backgroundImageUrl = vizConfig.backgroundImageUrl ;
  var background         = image2canvas(backgroundImageUrl) ;

  var frameDuration = vizConfig.frameDurationFactor * dur ;

  var viz = {

    config: vizConfig,
    height: vizHeight, 
    width: vizWidth,
    dur: dur,
    frameDuration: frameDuration,
    canvas: vizCanvas, 
    context: vizCanvas.getContext ('2d'),
    prep: function viz_prep () {
      //console.log('setup_viz: viz_prep')
      // viz.context.clearRect(0, 0, viz.canvas.width, viz.canvas.height) ;
      this.context.drawImage (background, 0, 0) ;
      return true ;
    },

    image_transition: step_transition_func('image', frameDuration),
  
  } ;

  return viz ;
  
}