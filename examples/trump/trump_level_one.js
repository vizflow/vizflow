function trump_level_one() {
  var spriteImageIndex = 0 ; 
  var dur        = 100 ;
  var vizWidth   = 200 ;
  var vizHeight  = 320 ;
  
  // console.log('tile', tile) ;

  var vizCanvas = create_canvas(vizWidth, vizHeight) ; 
  place_viz(vizCanvas) ;
  var vizContext = create_context(vizCanvas) ;

  // vizCanvas.style.background = 'url("' + bgDataUri + '")' ;
  // vizCanvas.style.backgroundSize = '200px' ;
  // draw_rect.call({ x: 0, y: 0, width: 200, height: 320, color: '#000'}) ;

  var step_transition = step_transition_func('image', dur) ;
  //console.log(stepTransition)
  //console.log(tile)

  function viz_prep() {
    vizContext.clearRect(0, 0, vizCanvas.width, vizCanvas.height) ;
    return true ;
  }

  function draw_image() {
    var tile = this ;
    vizContext.drawImage(tile.image, 0 , 0) ;
  }  

  var ddTile = dd_tile (draw_image) ;
  //vizContext.drawImage(ddTile.punch[1].image, 0, 0) ;
  //return ;

  var item = [{image: ddTile.punch[0].image, render: draw_image}] ;
  $Z.item(item)   ; // load the user data into the visualization engine to initialize the time equals zero (t = 0) state
	$Z.prep([viz_prep]) ; // sets the preprocessing to perform on each frame of the animation (prior to updating and rendering the elements)
	$Z.run()        ; // run the interactive visualization (infinite loop by default)

  var counter = 0 ;
  function loop() {  	
    //console.log(ddTile.punch[counter % ddTile.punch.length].image)
	  var stepTransition = step_transition( ddTile.punch[counter % ddTile.punch.length].image ) ;
	  item[0].transition = [stepTransition] ;
	  counter++ ;
  }

  setInterval(loop, dur * 2) ;	
}