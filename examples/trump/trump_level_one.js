function trump_level_one() {
  var spriteImageIndex = 0 ; 
  var dur        = 100 ;

  var tileWidth  = 16 ;
  var tileHeight = 32 ;
  var vizWidth   = 200 ;
  var vizHeight  = 320 ;
  var rowIndex   = 0 ;
  var offsetX    = 9 ;
  var offsetY    = 8 ;
  var tileCount  = 6 ;
  var tile       = [] ;
  var padX       = 2 ;

  for(var t = 0 ; t < tileCount ; t++) {
  	var image       = spriteContext.getImageData(t * tileWidth + offsetX + padX * t, rowIndex * tileHeight + offsetY, tileWidth, tileHeight)	 ;
    var tileCanvas  = create_canvas(tileWidth, tileHeight) ;
    var tileContext = create_context(tileCanvas) ;
    tileContext.putImageData(image, 0, 0);
    tile[t] = { image: tileCanvas, render: draw_image } ;
  }

  var vizCanvas = create_canvas(vizWidth, vizHeight) ; 
  place_viz(vizCanvas) ;
  vizContext = create_context(vizCanvas) ;

  // vizContext.drawImage(spriteCanvas, 0, 0) ;
  // vizCanvas.style.background = 'url("' + bgDataUri + '")' ;
  // vizCanvas.style.backgroundSize = '200px' ;
  // draw_rect.call({ x: 0, y: 0, width: 200, height: 320, color: '#000'}) ;

  var step_transition = step_transition_func('image', dur) ;
  //console.log(stepTransition)
  //console.log(tile)

  var item = [{image: tile[0].image, render: draw_image}] ;
  $Z.item(item)   ; // load the user data into the visualization engine to initialize the time equals zero (t = 0) state
	$Z.prep([prep]) ; // sets the preprocessing to perform on each frame of the animation (prior to updating and rendering the elements)
	$Z.run()        ; // run the interactive visualization (infinite loop by default)

  var counter = 0 ;
  function loop() {  	
	  var stepTransition = step_transition( tile[counter % tile.length].image ) ;
	  item[0].transition = [stepTransition] ;
	  counter++ ;
  }

  setInterval(loop, dur * 2) ;	
}