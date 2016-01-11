function trump_level_three () {

  viz     = viz_setup() ;
  viz.dur = 17 * 3 ;
  ui      = ui_setup(viz) ;
  
  var backgroundImageUrl = 'trump_bg3.png' ;
  var background         = image2canvas(backgroundImageUrl) ;

  var image_transition           = step_transition_func('image', viz.dur) ;
  var collision_image_transition = step_transition_func('collisionImage', viz.dur) ;
  
  function viz_prep () {

    // viz.context.clearRect(0, 0, viz.canvas.width, viz.canvas.height) ;

    viz.context.drawImage (background, 0, 0) ;

    return true ;

  }

  var playerConfig = { 
    sprite_loader: rastan_sprite, 
    orientation: 'l',
    y: 209,
  } ;
  var player = setup_element(viz, playerConfig) ;

  var enemyConfig = {
    sprite_loader: trump_sprite,
    x: 80,    
    y: 209,
  } ;
  var enemy = setup_element(viz, enemyConfig) ;

  var button = setup_buttons(viz, ui) ;

  var enemyHealth     = 100 ;
  var healthBarHeight = 5 ;
  var enemyHealthBar  = setup_healthbar (viz, enemyHealth, healthBarHeight) ;

  var item = [ 
    enemy.item, 
    player.item, 
    button.walkLeft, 
    button.walkRight, 
    button.attack, 
    button.jump, 
    enemyHealthBar.item, 
  ] ;

  function detect_attack() {

    var collision = collision_detect( [ player.item, enemy.item ], viz.width, viz.height ) ;

    if (collision.list.length > 0) { // a collision between player.item and enemy.item occurred
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

    var transition   = animate (enemy.item.sprite.blink, image_transition, undefined, enemy.item.sprite.blink[0]) ;
    enemy.item.transition = transition ;

    health -= healthDrop ;
    
    if (health < 0) {
      alert ('game over') ;
      health = 0 ;
    }

    enemyHealthBar.item.transition = health_transition (health) ;

  }

  function attack_reset () {

   $Z.detect([]) ; // turn off collision detection until after the enemy.item character finishes animating
   $Z.action([]) ; // turn off other actions

  }

  $Z.item(item)   ;     // load the user data into the visualization engine to initialize the time equals zero (t = 0) state
	$Z.prep([viz_prep]) ; // sets the preprocessing to perform on each frame of the animation (prior to updating and rendering the elements)
	$Z.run()        ;     // run the interactive visualization (infinite loop by default)

  var x_transition = $Z.transition.rounded_linear_transition_func ( 'x', viz.dur * (player.sprite.walk.length + 1) ) ; // function accepting an x end-value and returning a transition object
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
        player.sprite = player.spriteL ;
        restFrame    = player.sprite.walk[0] ;

        player.loop  = animate_loop (
          player.loop, 
          player.sprite.walk, 
          image_transition, 
          undefined, 
          undefined
        ) ;

        add_transition_end(player.loop.animation[0], minNstep - 1, click_reset) ;
        //console.log('player.loop', player.loop, 'player.sprite', player.sprite, 'restFrame', restFrame, 'image_transition', image_transition)
        transition = player.loop.animation ;

        var xNew   = Math.max(0, player.item.x - xMove) ;
        var xTransition = x_transition(xNew) ;

        transition.push(xTransition) ;

        break ;

      case 'r' :

        player.sprite = player.spriteR ;
        restFrame    = player.sprite.walk[0] ;

        player.loop   = animate_loop (
          player.loop, 
          player.sprite.walk, 
          image_transition, 
          undefined, 
          undefined
        ) ;

        add_transition_end(player.loop.animation[0], minNstep - 1, click_reset) ;
        transition = player.loop.animation ;

        var xNew   = Math.min(
          viz.width - restFrame.width, 
          player.item.x + xMove
        ) ;
        var xTransition = x_transition(xNew) ;

        transition.push(xTransition) ;

        break ;

      case 'j' :
        transition = animate(player.sprite.jump, image_transition, click_reset, restFrame) ;
        break ;

      case 'p' :
        transition              = animate(player.sprite.attack, image_transition, click_reset, restFrame) ;
        var collisionTransition = animate (player.sprite.attackCollision, collision_image_transition, attack_reset, clearedFrame) ; 
        transition              = transition.concat(collisionTransition) ;
       // console.log ('update_player: transition', transition) ;
        // set_attack_detect() ;
        break ;

    }

    if (transition.length > 0) {
      //console.log('update_player: transition', transition)
      player.item.transition = transition ;
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
          button.walkLeft.transition  = animate([ui.button[1]], image_transition, undefined, ui.button[0]) ;
          state = 'l' ;
          break;

        case 1: // walk right
          button.walkRight.transition = animate([ui.button[1]], image_transition, undefined, ui.button[0]) ;
          state = 'r' ;
          break;

        case 2: // attack
          button.attack.transition    = animate([ui.button[1]], image_transition, undefined, ui.button[0]) ;
          state = 'p' ;
          break;

        case 3: // jump
          button.jump.transition      = animate([ui.button[1]], image_transition, undefined, ui.button[0]) ;
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
    player.item.transition = [] ;
    click_reset () ;

  }

  document.addEventListener('mouseup', mouseup) ;
  document.addEventListener('mousedown', mousedown) ;

}