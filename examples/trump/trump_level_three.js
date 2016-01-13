function trump_level_three () {

  viz = viz_setup() ;
  ui  = ui_setup(viz) ;
  
  var backgroundImageUrl = 'trump_bg3.png' ;
  var background         = image2canvas(backgroundImageUrl) ;

  var frameDuration              = viz.dur * 5 ;
  var image_transition           = step_transition_func('image', frameDuration) ;
  var attack_transition          = step_transition_func('image', viz.dur) ;
  var collision_image_transition = step_transition_func('collisionImage', viz.dur) ;
  
  var x_transition = $Z.transition.rounded_linear_transition_func ( 'x', 2 * frameDuration ) ; // function accepting an x end-value and returning a transition object
  var xMove        = 15 ; 

  function viz_prep () {

    // viz.context.clearRect(0, 0, viz.canvas.width, viz.canvas.height) ;

    viz.context.drawImage (background, 0, 0) ;

    return true ;

  }

  var playerConfig = { 
    sprite_loader: rastan_sprite, 
    orientation: 'l',
    frameDuration: frameDuration,
    y: 209,
  } ;

  var enemyConfig = {
    sprite_loader: trump_sprite,
    frameDuration: frameDuration,
    collisionImage: 'rest', 
    x: 80,    
    y: 209,
  } ;

  var enemyHealth     = 100 ;
  var healthBarHeight = 5 ;

  var player         = setup_element   (viz, playerConfig) ;
  var enemy          = setup_element   (viz, enemyConfig) ;
  var button         = setup_buttons   (viz, ui) ;
  var enemyHealthbar = setup_healthbar (viz, enemyHealth, healthBarHeight) ;

  var item = [ 
    enemy.item, 
    player.item, 
    button.walkLeft, 
    button.walkRight, 
    button.attack, 
    button.jump, 
    enemyHealthbar.item, 
  ] ;

  var health_transition = $Z.transition.linear_transition_func ( 'width', viz.dur * 4 ) ; 
  var healthDrop        = 1 ;

  function blink_transition() {

    var blinkDur              = ( player.sprite.attack.length + 2 ) * viz.dur ;
    var blink                 = step_transition_func('image', blinkDur) ;
    var blinkTransition       = attack_transition(enemy.sprite.blink[1]) ;
    blinkTransition.child     = blink(enemy.sprite.blink[0]) ;
    blinkTransition.child.end = detectAction.reset ;
    blinkTransition           = [blinkTransition] ;

    return blinkTransition ;

  }
  //blinkTransition.child.end = blink_reset ;
  //console.log('blinkTransition', blinkTransition) ;

  var hitConfig = {
    set: detectAction.set,
    detect: detectAction.hit,
    perform: performAction.hit,
    detectList: [player.item, enemy.item],
    healthbar: enemyHealthbar,
    healthDrop: healthDrop,
    create_transition: blink_transition, 
    health_transition: health_transition,
    element: enemy,
    viz: viz,
  } ;

  $Z.item(item)       ; // load the user data into the visualization engine to initialize the time equals zero (t = 0) state
	$Z.prep([viz_prep]) ; // sets the preprocessing to perform on each frame of the animation (prior to updating and rendering the elements)
	$Z.run()            ; // run the interactive visualization (infinite loop by default)

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

    if(player.item.transition !== undefined && player.item.transition.length > 0) {
      // console.log(player.item.transition)
      return ;
    }

    var minNstep = 1 ; // minimum number of frames to animate per user input for walking animations
    var transition = [] ;

     switch(state) {

      case 'l' :

        player.sprite = player.spriteL ;

        player.loop = animate_loop (
          player.loop, 
          player.sprite.walk, 
          image_transition, 
          undefined, 
          undefined
        ) ;

        //console.log('player loop animation', player.loop, 'player sprite walk', player.sprite.walk)
        //console.log('player.loop', player.loop, 'player.sprite', player.sprite, 'restFrame', restFrame, 'image_transition', image_transition)
        transition      = player.loop.animation ;
        var xNew        = Math.max(0, player.item.x - xMove) ;
        var xTransition = x_transition(xNew) ;
        xTransition.end = click_reset ;
        // add_transition_end(player.loop.animation[0], minNstep - 1, click_reset) ;

        transition.push(xTransition) ;

        break ;

      case 'r' :

        player.sprite = player.spriteR ;

        player.loop   = animate_loop (
          player.loop, 
          player.sprite.walk, 
          image_transition, 
          undefined, 
          undefined
        ) ;

        // add_transition_end(player.loop.animation[0], minNstep - 1, click_reset) ;
        transition = player.loop.animation ;

        var xNew = Math.min(
          viz.width - player.sprite.rest[0].width, 
          player.item.x + xMove
        ) ;
        var xTransition = x_transition(xNew) ;
        xTransition.end = click_reset ;

        transition.push(xTransition) ;
        break ;

      case 'j' :

        transition = animate(player.sprite.jump, image_transition, click_reset, player.sprite.rest[0]) ;
        break ;

      case 'p' :
        transition              = animate(player.sprite.attack, attack_transition, click_reset, player.sprite.rest[0]) ;
        //console.log('p', 'player', player) ;
        var collisionTransition = animate(player.sprite.attackCollision, collision_image_transition, click_reset, undefined) ; 
        transition              = transition.concat(collisionTransition) ;
        hitConfig.set() ;
        // console.log('transition', transition, 'collisionTransition', collisionTransition) ;
        //set_attack_detect() ;
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
    // if(player.item.transition !== undefined) {
    //   if(player.item.transition.length === 0) {
    //     player.item.transition = image_transition(player.sprite.rest[0]) ;
    //   } else if(player.item.transition.length === 1) {
    //     player.item.transition.end = function() { player.item.image = player.sprite.rest[0] ; } ;
    //   } else if(player.item.transition.length === 2) {
    //     var transitionWithMaxDuration = player.item.transition.slice(0).sort( function(x, y) { return y.duration - x.duration } )[0] ;
    //     transitionWithMaxDuration.end = function() { player.item.image = player.sprite.rest[0] ; } ;
    //   } else {
    //     console.log('huh')
    //   }
    // }
    // player.item.transition = [] ;
    click_reset () ;

  }

  document.addEventListener('mouseup', mouseup) ;
  document.addEventListener('mousedown', mousedown) ;

}