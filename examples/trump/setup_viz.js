function setup_viz (vizConfig) {

  var spriteImageIndex = 0 ; 
  var dur              = 17 ;
  var vizWidth         = 240 ;
  var vizHeight        = 320 ;

  var vizCanvas  = create_canvas(vizWidth, vizHeight) ; 
  var vizContext = create_context(vizCanvas) ;
  
  place_viz(vizCanvas) ;

  var backgroundImageUrl = vizConfig.backgroundImageUrl ;
  var background         = image2canvas(backgroundImageUrl) ;

  var viz = {

    height: vizHeight, 
    width: vizWidth,
    dur: dur,
    canvas: vizCanvas, 
    context: vizCanvas.getContext ('2d'),
    prep: function viz_prep () {
      // viz.context.clearRect(0, 0, viz.canvas.width, viz.canvas.height) ;
      this.context.drawImage (background, 0, 0) ;
      return true ;
    },
  
  } ;

  return viz ;
  
}