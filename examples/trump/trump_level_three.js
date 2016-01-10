function trump_level_three () {

  viz = viz_setup() ;
  ui  = ui_setup(viz) ;
  
  var backgroundImageUrl = 'trump_bg1.png' ;
  var background         = image2canvas(backgroundImageUrl) ;

  var image_transition           = step_transition_func('image', viz.dur) ;
  var collision_image_transition = step_transition_func('collisionImage', viz.dur) ;
  
  function viz_prep () {

     viz.context.clearRect(0, 0, viz.canvas.width, viz.canvas.height) ;

    //viz.context.drawImage (background, 0, 0) ;

    return true ;

  }

  var rastanSpriteL = rastan_sprite () ;
  var rastanSpriteR = horizontal_flip(rastanSpriteL) ;
  var rastanSprite  = rastanSpriteR ;

  var restFrame    = rastanSprite.walk[0] ;
  var clearedFrame = create_canvas(restFrame.width, restFrame.height) ; 

  var rastanLoop = { 
    totalDur: 2 * viz.dur, 
    frameDur: viz.dur, 
    position: 0, // loop position runs from 0 to 1
  } ; 

  var rastan = { 
    viz: viz, 
    image: restFrame, 
    collisionImage: clearedFrame, 
    render: draw.image, 
    x: 20, 
    y: 225 - rastanSprite.height,
  } ;

  var trumpSprite = trump_sprite() ; 

  var trump = { 
    viz: viz, 
    image: trumpSprite.blink[0], 
    collisionImage: trumpSprite.blink[0], 
    render: draw.image, 
    x: 80, 
    y: 40,
  } ;

  var walkLeftButton = { 
    viz: viz, 
    image: ui.button[0], 
    render: draw.image, 
    x: ui.buttonX[0], 
    y: ui.buttonY + ui.y,
  } ;

  var walkRightButton = { 
    viz: viz, 
    image: ui.button[0], 
    render: draw.image, 
    x: ui.buttonX[1], 
    y: ui.buttonY + ui.y,
  } ;

  var attackButton = { 
    viz: viz, 
    image: ui.button[0], 
    render: draw.image, 
    x: ui.buttonX[2], 
    y: ui.buttonY + ui.y,
  } ;

  var jumpButton = { 
    viz: viz, 
    image: ui.button[0], 
    render: draw.image, 
    x: ui.buttonX[3], 
    y: ui.buttonY + ui.y,
  } ;

  var health          = 40 ;
  var healthBarHeight = 5 ;

  var healthBarRect = {
    x: 190, 
    y: 10, 
    width: health, 
    height: healthBarHeight, 
    color: '#600',
  } ; 

  function draw_bar() {
    healthBarRect.width = this.width ;
    draw.rect (viz.context, healthBarRect) ;
  }

  var trumpHealthBar = { 
    viz: viz, 
    render: draw_bar, 
    width: health
  } ;

  var item = [ 
    trump, 
    rastan, 
    walkLeftButton, 
    walkRightButton, 
    attackButton, 
    jumpButton, 
    //trumpHealthBar, 
  ] ;

  function detect_attack() {

    var collision = collision_detect( [ rastan, trump ], viz.width, viz.height ) ;

    if (collision.list.length > 0) { // a collision between rastan and trump occurred
      // console.log ('detect_attack: collision', collision) ;
      set_attack_action() ;
    }

  }

  function set_attack_detect() {
    $Z.detect([detect_attack]) ;    
  }

  function set_attack_action() {
    $Z.action([attack_action]) ;    
  }

  var health_transition = $Z.transition.linear_transition_func ( 'width', viz.dur * 4 ) ; 
  var healthDrop        = 4 ;

  function attack_action() {

    attack_reset () ;

    var transition   = animate (trumpSprite.blink, image_transition, undefined, trumpSprite.blink[0]) ;
    trump.transition = transition ;

    health -= healthDrop ;
    
    if (health < 0) {
      alert ('game over') ;
      health = 0 ;
    }

    trumpHealthBar.transition = health_transition (health) ;

  }

  function attack_reset () {

   $Z.detect([]) ; // turn off collision detection until after the trump character finishes animating
   $Z.action([]) ; // turn off other actions

  }

  $Z.item(item)   ;     // load the user data into the visualization engine to initialize the time equals zero (t = 0) state
	$Z.prep([viz_prep]) ; // sets the preprocessing to perform on each frame of the animation (prior to updating and rendering the elements)
	$Z.run()        ;     // run the interactive visualization (infinite loop by default)

  var x_transition = $Z.transition.rounded_linear_transition_func ( 'x', viz.dur * (rastanSprite.walk.length + 1) ) ; // function accepting an x end-value and returning a transition object
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

    console.log('update_rastan') ;

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

        rastanSprite = rastanSpriteR ;
        restFrame    = rastanSprite.walk[0] ;

        rastanLoop   = animate_loop (
          rastanLoop, 
          rastanSprite.walk, 
          image_transition, 
          undefined, 
          restFrame
        ) ;

        add_transition_end(rastanLoop.animation[0], minNstep - 1, set_keydown) ;
        transition = rastanLoop.animation ;

        var xNew   = Math.min(
          viz.width - restFrame.width, 
          rastan.x + xMove
        ) ;
        var xTransition = x_transition(xNew) ;

        transition.push(xTransition) ;

        break ;

      case 'j' :
        transition = animate(rastanSprite.jump, image_transition, set_keydown, restFrame) ;
        break ;

      case 'p' :
        transition              = animate(rastanSprite.attack, image_transition, set_keydown, restFrame) ;
        var collisionTransition = animate (rastanSprite.attackCollision, collision_image_transition, attack_reset, clearedFrame) ; 
        transition              = transition.concat(collisionTransition) ;
       // console.log ('update_rastan: transition', transition) ;
        // set_attack_detect() ;
        break ;

    }

    if (transition.length > 0) {
      // console.log('update_rastan: transition', transition)
      // rastan.transition = transition ;
    } else {
      set_keydown() ;
    }

    // console.log(transition) ;

  }

  function click (e) {

    viz.canvas.removeEventListener ('click', click, false) ;

    var position = set_canvas_position( viz.canvas ) ;

    var clickedX = Math.round( (e.clientX - position.left) / position.scale ) ;
    var clickedY = Math.round( (e.clientY - position.top)  / position.scale ) ;

    var color       = ui.hiddenContext.getImageData(clickedX, clickedY, 1, 1).data ;

    var buttonIndex = color[0] - 1 ; // color indexing used by image2index is 1-based

    if(buttonIndex >= 0) { // user clicked on a ui.button

      var state;

      switch (buttonIndex) {

        case 0: // walk left
          walkLeftButton.transition  = animate([ui.button[1]], image_transition, undefined, ui.button[0]) ;
          state = 'l' ;
          break;
        case 1: // walk right
          walkRightButton.transition = animate([ui.button[1]], image_transition, undefined, ui.button[0]) ;
          state = 'r' ;
          break;
        case 2: // attack
          attackButton.transition    = animate([ui.button[1]], image_transition, undefined, ui.button[0]) ;
          state = 'p' ;
          break;
        case 3: // jump
          jumpButton.transition      = animate([ui.button[1]], image_transition, undefined, ui.button[0]) ;
          state = 'j' ;
          break;

      }

      // update_rastan(state) ;

    } else {

      set_keydown() ;

    }

  } 


  // function set_keydown () {
  //   document.onkeydown = keydown ;
  //   viz.canvas.addEventListener('click', click, false) ;
  //   // console.log('set_keydown')
  // }

  // set_keydown() ;

}