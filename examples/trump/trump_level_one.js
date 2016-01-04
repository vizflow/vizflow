function trump_level_one() {

  var spriteImageIndex = 0 ; 
  var dur              = 150 ;
  var vizWidth         = 240 ;
  var vizHeight        = 320 ;
  
  // console.log('tile', tile) ;

  var vizCanvas = create_canvas(vizWidth, vizHeight) ; 
  place_viz(vizCanvas) ;
  var vizContext = create_context(vizCanvas) ;
  
  var buttonSize      = 50 ;
  var buttonTileCount = 2 ;
  var buttonRowIndex  = 0 ;
  var buttonOffsetX   = 0 ;
  var buttonOffsetY   = 0 ;
  var buttonPadX      = 0 ;
  var buttonPad       = 10 ;
  var buttonImageUrl  = 'blue_button2.png' ;
  var buttonCanvas    = image2canvas(buttonImageUrl) ;
  var button          = get_sprite (buttonCanvas.getContext('2d'), buttonTileCount, buttonRowIndex, buttonSize, buttonSize, buttonOffsetX, buttonOffsetY, buttonPadX) ;
  var buttonData      = button[0].getContext('2d').getImageData(0, 0, buttonSize, buttonSize) ; // ImageData object
  var Nbutton         = 4 ;
  var buttonY         = buttonPad ;
  var buttonX         = [] ;

  for(var kButton = 0 ; kButton < Nbutton ; kButton++) {
    buttonX.push(kButton * (buttonPad + buttonSize) + buttonPad * 0.5) ;
  }  

  var uiWidth         = vizWidth ;
  var uiHeight        = buttonSize + buttonPad * 2 ;
  var uiY             = vizHeight - uiHeight ;
  var uiX             = 0 ;
  var uiCanvas        = create_canvas (uiWidth, uiHeight) ;
  var uiContext       = create_context (uiCanvas) ;
  var hiddenUICanvas  = create_canvas (uiWidth, uiHeight) ;
  var hiddenUIContext = create_context (hiddenUICanvas) ;

  var Nbutton = 4 ;
  for(var kButton = 0 ; kButton < Nbutton ; kButton++) {

    uiContext.drawImage(button[0], buttonX[kButton], buttonY) ; // draw visible button

    var imagek     = image2index(buttonData, kButton) ; // ImageData object

    // console.log('imagek', imagek) ;

    var tempCanvas = create_canvas(buttonSize, buttonSize) ;

    tempCanvas
      .getContext('2d')
      .clearRect(0, 0, tempCanvas.width, tempCanvas.height) ;

    tempCanvas
      .getContext('2d')
      .putImageData(imagek, 0, 0) ;

    hiddenUIContext.drawImage(tempCanvas, buttonX[kButton], buttonY) ; // draw color-indexed button for color picking

  }

  // console.log('hiddenUICanvas data', hiddenUIContext.getImageData(0, 0, hiddenUICanvas.width, hiddenUICanvas.height)) ;

  var hiddenCanvas  = create_canvas(vizWidth, vizHeight) ;
  var hiddenContext = hiddenCanvas.getContext('2d') ;
  hiddenContext.drawImage(hiddenUICanvas, uiX, uiY) ; // draw ui

  // var uiData = uiContext.getImageData (0, 0, uiWidth, uiHeight).data ;
  // console.log ('uiData', uiData) ;

  // vizCanvas.style.background = 'url("' + bgDataUri + '")' ;
  // vizCanvas.style.backgroundSize = '200px' ;
  
  var step_transition = step_transition_func('image', dur) ;
  // console.log(stepTransition) ;
  // console.log(tile) ;

  function viz_prep() {
    vizContext.clearRect(0, 0, vizCanvas.width, vizCanvas.height) ;

    var floor = { x: 0, y: 240, width: vizWidth, height: 20, color: '#000'} ;
    draw_rect(vizContext, floor) ;

   // console.log ('uiCanvas', uiCanvas, 'uiContext', uiContext, 'uiX', uiX, 'uiY', uiY) ;
    vizContext.drawImage(uiCanvas, uiX, uiY) ; // draw ui

    return true ;
  }

  function draw_image(frame) {
    if (frame === undefined) {
      frame = this ;
    } 
    vizContext.drawImage(frame.image, frame.x, frame.y) ;
  }  
  
  function draw_rect(context, rect) {
    if (rect === undefined) {
      rect = this ;
    }
    context.beginPath() ;
    context.rect(rect.x, rect.y, rect.width, rect.height) ;
    context.fillStyle = rect.color ;
    context.fill() ;
    context.closePath() ;
  }

  function draw_circle(ctx, circ) {
    if (circ === undefined) {
      circ = this ;  
    }
    ctx.beginPath() ;
    var x = circ.x ;
    var y = circ.y ;
    var r = circ.radius ;
    ctx.arc(x, y, r, 0, Math.PI * 2, true) ;
    ctx.fillStyle = circ.color ;
    ctx.fill() ;
    ctx.closePath() ;
  }

  var ddSprite = dd_sprite () ;
  // vizContext.drawImage(ddSprite.punch[1].image, 0, 0) ;
  // return ;

  var restFrame = ddSprite.walk[0] ;
  var billy = {image: restFrame, render: draw_image, x: 0, y: 241 - ddSprite.height} ;
  var item = [billy] ;
  $Z.item(item)   ; // load the user data into the visualization engine to initialize the time equals zero (t = 0) state
	$Z.prep([viz_prep]) ; // sets the preprocessing to perform on each frame of the animation (prior to updating and rendering the elements)
	$Z.run()        ; // run the interactive visualization (infinite loop by default)

  // var counter = 0 ;
  // function loop() {  	
  //   //console.log(ddSprite.punch[counter % ddSprite.punch.length].image)
	 //  var stepTransition = step_transition( ddSprite.jump[counter % ddSprite.jump.length].image ) ;
	 //  item[0].transition = [stepTransition] ;
	 //  counter++ ;
  // }

  // setInterval(loop, dur * 2) ;	

  function keydown(e) {
    document.onkeydown = null ;
    var transition = [] ;
    switch (e.keyCode) {
      case 37: // left
        transition = animate(ddSprite.jump, step_transition, end_transition, restFrame) ;
        break;
      case 38: // up
        set_keydown() ;
        break;
      case 39: // right
        transition = animate(ddSprite.punch, step_transition, end_transition, restFrame) ;
        break;
      case 40: // down
        transition = animate(ddSprite.walk, step_transition, end_transition, restFrame) ; ;
        break;
    }
    //console.log('keydown: e', e, 'keyCode', e.keyCode, 'transition', transition) ;
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

  function click(e) {

    var position = set_canvas_position(vizCanvas) ;

    var clickedX = Math.round( (e.clientX - position.left) / position.scale ) ;
    var clickedY = Math.round( (e.clientY - position.top)  / position.scale ) ;

    // console.log('mouseX', mouseX, 'mouseY', mouseY, 'position', position) ;

    var col         = hiddenContext.getImageData(clickedX, clickedY, 1, 1).data ;
    var buttonIndex = col[0] - 1 ; // color indexing is 1-based


    if(buttonIndex >= 0) { // user clicked on a button
      

      switch (buttonIndex) {
        case 0: // walk left
          transition = animate(ddSprite.walk, step_transition, end_transition, restFrame) ;
          break;
        case 1: // walk right
          transition = animate(ddSprite.walk, step_transition, end_transition, restFrame) ;
          break;
        case 2: // punch
          transition = animate(ddSprite.punch, step_transition, end_transition, restFrame) ;
          break;
        case 3: // jump
          transition = animate(ddSprite.jump, step_transition, end_transition, restFrame) ; ;
          break;
      }

      item[0].transition = transition ;

    }


    // console.log('click: col', col) ;
    // var code = "#" + rgb2hex(col[0]) + rgb2hex(col[1]) + rgb2hex(col[2]) ;
    // var node = code2node[code] ;

    // if(node === undefined)
    //   return ;

    // if(data[node].type === 2) data[node].type = 3 ;
    // else if(data[node].type === 3) data[node].type = 2 ;


  } 

  vizCanvas.addEventListener('click', click, false) ;  

}