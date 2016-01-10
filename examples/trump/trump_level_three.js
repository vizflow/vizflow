function trump_level_three () {

  viz     = viz_setup() ;
  viz.dur = 17 * 3 ;
  ui      = ui_setup(viz) ;
  
  var backgroundImageUrl = 'trump_bg1.png' ;
  var background         = image2canvas(backgroundImageUrl) ;

  var image_transition           = step_transition_func('image', viz.dur) ;
  var collision_image_transition = step_transition_func('collisionImage', viz.dur) ;
  
  function viz_prep () {

     viz.context.clearRect(0, 0, viz.canvas.width, viz.canvas.height) ;

    //viz.context.drawImage (background, 0, 0) ;

    return true ;

  }

  var playerSpriteL = rastan_sprite () ;
  var playerSpriteR = horizontal_flip(playerSpriteL) ;
  var playerSprite  = playerSpriteR ;

  var restFrame    = playerSprite.walk[0] ;
  var clearedFrame = create_canvas(restFrame.width, restFrame.height) ; 

  // viz.context.drawImage(playerSprite.walk[2], 0, 0) ;
  // return

  var playerLoopDur = viz.dur * (playerSprite.walk.length + 1)  ;
  var playerLoop = { 
    totalDur: playerLoopDur, 
    frameDur: viz.dur, 
    position: 0, // loop position runs from 0 to 1
  } ; 

  var player = { 
    viz: viz, 
    image: restFrame, 
    collisionImage: clearedFrame, 
    render: draw.image, 
    x: 20, 
    y: 225 - playerSprite.height,
  } ;

  var enemySprite = trump_sprite() ; 

  var enemy = { 
    viz: viz, 
    image: enemySprite.blink[0], 
    collisionImage: enemySprite.blink[0], 
    render: draw.image, 
    x: 80, 
    y: 54,
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

  var enemyHealthBar = { 
    viz: viz, 
    render: draw_bar, 
    width: health
  } ;

  var item = [ 
    enemy, 
    player, 
    walkLeftButton, 
    walkRightButton, 
    attackButton, 
    jumpButton, 
    //enemyHealthBar, 
  ] ;

  function detect_attack() {

    var collision = collision_detect( [ player, enemy ], viz.width, viz.height ) ;

    if (collision.list.length > 0) { // a collision between player and enemy occurred
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

    var transition   = animate (enemySprite.blink, image_transition, undefined, enemySprite.blink[0]) ;
    enemy.transition = transition ;

    health -= healthDrop ;
    
    if (health < 0) {
      alert ('game over') ;
      health = 0 ;
    }

    enemyHealthBar.transition = health_transition (health) ;

  }

  function attack_reset () {

   $Z.detect([]) ; // turn off collision detection until after the enemy character finishes animating
   $Z.action([]) ; // turn off other actions

  }

  $Z.item(item)   ;     // load the user data into the visualization engine to initialize the time equals zero (t = 0) state
	$Z.prep([viz_prep]) ; // sets the preprocessing to perform on each frame of the animation (prior to updating and rendering the elements)
	$Z.run()        ;     // run the interactive visualization (infinite loop by default)

  var x_transition = $Z.transition.rounded_linear_transition_func ( 'x', viz.dur * (playerSprite.walk.length + 1) ) ; // function accepting an x end-value and returning a transition object
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

    update_player(state) ;

  }

  function update_player(state) {

    var minNstep = 2 ; // minimum number of frames to animate per user input for walking animations
    var transition = [] ;

     switch(state) {

      case 'l' :
        playerSprite = playerSpriteL ;
        restFrame    = playerSprite.walk[0] ;

        playerLoop  = animate_loop (
          playerLoop, 
          playerSprite.walk, 
          image_transition, 
          undefined, 
          undefined
        ) ;

        add_transition_end(playerLoop.animation[0], minNstep - 1, click_reset) ;
        //console.log('playerLoop', playerLoop, 'playerSprite', playerSprite, 'restFrame', restFrame, 'image_transition', image_transition)
        transition = playerLoop.animation ;

        var xNew   = Math.max(0, player.x - xMove) ;
        var xTransition = x_transition(xNew) ;

        transition.push(xTransition) ;

        break ;

      case 'r' :

        playerSprite = playerSpriteR ;
        restFrame    = playerSprite.walk[0] ;

        playerLoop   = animate_loop (
          playerLoop, 
          playerSprite.walk, 
          image_transition, 
          undefined, 
          undefined
        ) ;

        add_transition_end(playerLoop.animation[0], minNstep - 1, click_reset) ;
        transition = playerLoop.animation ;

        var xNew   = Math.min(
          viz.width - restFrame.width, 
          player.x + xMove
        ) ;
        var xTransition = x_transition(xNew) ;

        transition.push(xTransition) ;

        break ;

      case 'j' :
        transition = animate(playerSprite.jump, image_transition, click_reset, restFrame) ;
        break ;

      case 'p' :
        transition              = animate(playerSprite.attack, image_transition, click_reset, restFrame) ;
        var collisionTransition = animate (playerSprite.attackCollision, collision_image_transition, attack_reset, clearedFrame) ; 
        transition              = transition.concat(collisionTransition) ;
       // console.log ('update_player: transition', transition) ;
        // set_attack_detect() ;
        break ;

    }

    if (transition.length > 0) {
      //console.log('update_player: transition', transition)
      player.transition = transition ;
    } else {
      click_reset() ;
    }

  }

  var clicking = false ;

  function click_reset () {
    clicking = false ;
  }

 function click (e) {

    if (clicking) {
      return ;
    }

    clicking = true ;    

    // viz.canvas.removeEventListener ('click', click, false) ;

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

      update_player(state) ;

    } else {

      clicking = false ;

    }

  } 

  function mousedown (event) {

    function run_click () {
      click (event) ;
    }

    $Z.prep ([viz_prep, run_click]) ;

  }

  function mouseup (event) {

    $Z.prep ([viz_prep]) ;
    player.transition = [] ;
    click_reset () ;

  }

  document.addEventListener('mouseup', mouseup) ;
  document.addEventListener('mousedown', mousedown) ;

}