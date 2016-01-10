function viz_setup () {

  var spriteImageIndex = 0 ; 
  var dur              = 17 * 4 ;
  var vizWidth         = 240 ;
  var vizHeight        = 320 ;

  var vizCanvas  = create_canvas(vizWidth, vizHeight) ; 
  var vizContext = create_context(vizCanvas) ;
  
  place_viz(vizCanvas) ;
  
  var viz = {

    height: vizHeight, 
    width: vizWidth,
    dur: dur,
    canvas: vizCanvas, 
    context: vizCanvas.getContext ('2d'),
  
  } ;

  return viz ;
  
}