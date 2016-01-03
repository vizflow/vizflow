function trump_level_one() {
  var spriteImageIndex = 0 ; 
  var dur        = 200 ;
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
    vizContext.drawImage(tile.image, 0, 0) ;
  }  

  var ddSprite = dd_sprite (draw_image) ;
  // vizContext.drawImage(ddSprite.punch[1].image, 0, 0) ;
  // return ;

  var restFrame = ddSprite.walk[0] ;
  var item = [{image: restFrame, render: draw_image}] ;
  $Z.item(item)   ; // load the user data into the visualization engine to initialize the time equals zero (t = 0) state
	$Z.prep([viz_prep]) ; // sets the preprocessing to perform on each frame of the animation (prior to updating and rendering the elements)
	$Z.run()        ; // run the interactive visualization (infinite loop by default)

  // var counter = 0 ;
  // function loop() {  	
  //   //console.log(ddSprite.punch[counter % ddSprite.punch.length].image)
	 //  var stepTransition = step_transition( ddSprite.kick[counter % ddSprite.kick.length].image ) ;
	 //  item[0].transition = [stepTransition] ;
	 //  counter++ ;
  // }

  // setInterval(loop, dur * 2) ;	

  function keydown(e) {
    document.onkeydown = null ;
    var transition = [] ;
    switch (e.keyCode) {
      case 37: // left
        transition = animate(ddSprite.kick, step_transition, end_transition, restFrame) ;
        break;
      case 38: // up
        break;
      case 39: // right
        transition = animate(ddSprite.punch, step_transition, end_transition, restFrame) ;
        break;
      case 40: // down
        transition = animate(ddSprite.walk, step_transition, end_transition, restFrame) ; ;
        break;
    }
    console.log('keydown: e', e, 'keyCode', e.keyCode, 'transition', transition) ;
    if(transition.length > 0) {
      item[0].transition = transition ;
    }
  }

  function end_transition() {
    // console.log('end_transition')
    //item[0].image = ddSprite.walk[0] ;
    set_keydown() ;
  }

  function set_keydown() {
    document.onkeydown = keydown ;
  }

  set_keydown() ;

}