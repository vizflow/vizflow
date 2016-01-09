function trump_level_three () {

  var spriteImageIndex = 0 ; 
  var dur              = 17 * 4 ;
  var vizWidth         = 240 ;
  var vizHeight        = 320 ;

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
  var button          = get_sprite ( buttonCanvas.getContext('2d'), buttonTileCount, buttonRowIndex, buttonSize, buttonSize, buttonOffsetX, buttonOffsetY, buttonPadX ) ;
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

  for (var kButton = 0 ; kButton < Nbutton ; kButton++) {

    uiContext.drawImage(button[0], buttonX[kButton], buttonY) ; // draw visible button

    var imagek     = image2index(buttonData, kButton) ; // ImageData object

    var tempCanvas = create_canvas(buttonSize, buttonSize) ;

    tempCanvas
      .getContext('2d')
      .clearRect(0, 0, tempCanvas.width, tempCanvas.height) ;
    tempCanvas
      .getContext('2d')
      .putImageData(imagek, 0, 0) ;

    hiddenUIContext.drawImage(tempCanvas, buttonX[kButton], buttonY) ; // draw color-indexed button for color picking

  }

  var hiddenCanvas  = create_canvas (vizWidth, vizHeight) ;
  var hiddenContext = hiddenCanvas.getContext('2d') ;
  hiddenContext.drawImage(hiddenUICanvas, uiX, uiY) ; // draw ui
  
  var backgroundimageUrl = 'trump_bg1.png' ;
  var background         = image2canvas(backgroundImageUrl) ;

  var image_transition           = step_transition_func('image', dur) ;
  var collision_image_transition = step_transition_func('collisionImage', dur) ;
  
  function viz_prep () {

     vizContext.clearRect(0, 0, vizCanvas.width, vizCanvas.height) ;

    //vizContext.drawImage (background, 0, 0) ;

    return true ;

  }

  function draw_image (frame) {

    if (frame === undefined) {
      frame = this ;
    } 
    vizContext.drawImage(frame.image, frame.x, frame.y) ;

  }  
  
  function draw_rect (context, rect) {

    if (rect === undefined) {
      rect = this ;
    }
    context.beginPath() ;
    context.rect(rect.x, rect.y, rect.width, rect.height) ;
    context.fillStyle = rect.color ;
    context.fill() ;
    context.closePath() ;

  }

  function draw_circle (ctx, circ) {

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

  var rastanSpriteL  = rastan_sprite () ;
  var rastanSpriteR  = horizontal_flip(rastanSpriteL) ;
  var rastanSprite   = rastanSpriteR ;

  var restFrame    = rastanSprite.walk[0] ;
  var clearedFrame = create_canvas(restFrame.width, restFrame.height) ; 

  var rastanLoop = {totalDur : 2 * dur, frameDur : dur, position : 0} ; // position is from 0 to 1
  var rastan     = {image: restFrame, collisionImage: clearedFrame, render: draw_image, x: 20, y: 225 - rastanSprite.height } ;

  var trumpSprite = trump_sprite() ; 
  var trump       = {image: trumpSprite.blink[0], collisionImage: trumpSprite.blink[0], render: draw_image, x: 80, y: 140} ;

  var walkLeftButton  = {image: button[0], render: draw_image, x: buttonX[0], y: buttonY + uiY} ;
  var walkRightButton = {image: button[0], render: draw_image, x: buttonX[1], y: buttonY + uiY} ;
  var attackButton     = {image: button[0], render: draw_image, x: buttonX[2], y: buttonY + uiY} ;
  var jumpButton      = {image: button[0], render: draw_image, x: buttonX[3], y: buttonY + uiY} ;

  var health          = 40 ;
  var healthBarHeight = 5 ;
  var healthBarRect   = {x: 190, y: 10, width: health, height: healthBarHeight, color: '#600'} ; 

  var draw_bar        = function () {
    healthBarRect.width = this.width ;
   // console.log ('draw_bar:this', this) ;
    draw_rect (vizContext, healthBarRect) ;
  }

  var trumpHealthBar   = {render: draw_bar, width: health} ;

  var item = [trump, rastan, walkLeftButton, walkRightButton, attackButton, jumpButton, trumpHealthBar] ;

  function detect_attack() {
    var collision = collision_detect([rastan, trump], vizWidth, vizHeight) ;
    if (collision.list.length > 0) { // a collision between rastan and trump occurred
      console.log ('detect_attack: collision', collision) ;
      set_attack_action() ;
    }
  }

  function set_attack_detect() {
    $Z.detect([detect_attack]) ;    
  }

  function set_attack_action() {
    $Z.action([attack_action]) ;    
  }

  var health_transition = $Z.transition.linear_transition_func ( 'width', dur * 4 ) ; 
  var healthDrop = 4 ;

  function attack_action() {

    attack_reset () ;

    var transition   = animate (trumpSprite.blink, image_transition, undefined, trumpSprite.blink[0]) ;
    trump.transition = transition ;

    health -= healthDrop ;
    
    if (health < 0) {
      alert ('game over') ;
      health = 0 ;
    }

    //trumpHealthBar.width = health ;
    trumpHealthBar.transition = health_transition (health) ;
    // console.log ('trumpHealthBar', trumpHealthBar) ;

  }

  function attack_reset () {
   $Z.detect([]) ; // turn off collision detection until after the trump character finishes animating
   $Z.action([]) ; // turn off other actions
  }

  $Z.item(item)   ;     // load the user data into the visualization engine to initialize the time equals zero (t = 0) state
	$Z.prep([viz_prep]) ; // sets the preprocessing to perform on each frame of the animation (prior to updating and rendering the elements)
	$Z.run()        ;     // run the interactive visualization (infinite loop by default)

  var x_transition = $Z.transition.rounded_linear_transition_func ( 'x', dur * (rastanSprite.walk.length + 1) ) ; // function accepting an x end-value and returning a transition object
  var xMove        = 15 ; 

  function keydown (e) {

    document.onkeydown = null ;
    var transition     = [] ;
    var state ;

    switch (e.keyCode) {

      case 37: // left
        state = 'l' ;
        break;
      case 38: // up
        state = 'j' ;
        break;
      case 39: // right
        state = 'r' ;
        break;
      case 40: // down
        state = 'p' ;
        break;

    }

    update_rastan(state) ;

  }

  function update_rastan(state) {
    var minNstep = 2 ; // minimum number of frames to animate per user input for walking animations
    var transition = [] ;
     switch(state) {
      case 'l' :
        rastanSprite   = rastanSpriteL ;
        restFrame  = rastanSprite.walk[0] ;
        rastanLoop  = animate_loop (rastanLoop, rastanSprite.walk, image_transition, undefined, restFrame) ;
        add_transition_end(rastanLoop.animation[0], minNstep - 1, set_keydown) ;
        //console.log('rastanLoop.animation', rastanLoop.animation)
        transition = rastanLoop.animation ;

        var xNew   = Math.max(0, rastan.x - xMove) ;
        var xTransition = x_transition(xNew) ;

        transition.push(xTransition) ;

        break ;
      case 'r' :
        rastanSprite   = rastanSpriteR ;
        restFrame  = rastanSprite.walk[0] ;
        rastanLoop = animate_loop (rastanLoop, rastanSprite.walk, image_transition, undefined, restFrame) ;
        add_transition_end(rastanLoop.animation[0], minNstep - 1, set_keydown) ;
        transition = rastanLoop.animation ;

        var xNew   = Math.min(vizWidth - restFrame.width, rastan.x + xMove) ;
        var xTransition = x_transition(xNew) ;

        transition.push(xTransition) ;

        break ;
      case 'j' :
        transition = animate(rastanSprite.jump, image_transition, set_keydown, restFrame) ;
        break ;
      case 'p' :
        transition = animate(rastanSprite.attack, image_transition, set_keydown, restFrame) ;
        var collisionTransition = animate (rastanSprite.attackCollision, collision_image_transition, attack_reset, clearedFrame) ; 
        transition = transition.concat(collisionTransition) ;
       // console.log ('update_rastan: transition', transition) ;
        set_attack_detect() ;
        break ;
    }
    if (transition.length > 0) {
      // console.log('update_rastan: transition', transition)
      rastan.transition = transition ;
    } else {
      set_keydown() ;
    }
  }

  function click (e) {

    vizCanvas.removeEventListener ('click', click, false) ;

    var position = set_canvas_position( vizCanvas ) ;

    var clickedX = Math.round( (e.clientX - position.left) / position.scale ) ;
    var clickedY = Math.round( (e.clientY - position.top)  / position.scale ) ;

    var color       = hiddenContext.getImageData(clickedX, clickedY, 1, 1).data ;
    var buttonIndex = color[0] - 1 ; // color indexing used by image2index is 1-based

    if(buttonIndex >= 0) { // user clicked on a button

      var state;

      switch (buttonIndex) {

        case 0: // walk left
          walkLeftButton.transition = animate([button[1]], image_transition, undefined, button[0]) ;
          state = 'l' ;
          break;
        case 1: // walk right
          walkRightButton.transition = animate([button[1]], image_transition, undefined, button[0]) ;
          state = 'r' ;
          break;
        case 2: // attack
          attackButton.transition = animate([button[1]], image_transition, undefined, button[0]) ;
          state = 'p' ;
          break;
        case 3: // jump
          jumpButton.transition = animate([button[1]], image_transition, undefined, button[0]) ;
          state = 'j' ;
          break;

      }

      update_rastan(state) ;

    } else {

      set_keydown() ;

    }

  } 

  function set_keydown () {
    document.onkeydown = keydown ;
    vizCanvas.addEventListener('click', click, false) ;
    // console.log('set_keydown')
  }

  set_keydown() ;

}