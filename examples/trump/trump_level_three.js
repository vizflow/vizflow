function trump_level_three () {

  viz     = setup_viz({ backgroundImageUrl: 'trump_bg3.png' }) ;
  viz.ui  = setup_ui(viz) ;
  
  var frameDuration              = viz.dur * 5 ;
  var image_transition           = step_transition_func('image', frameDuration) ;
  var attack_transition          = step_transition_func('image', viz.dur) ;
  var collision_image_transition = step_transition_func('collisionImage', viz.dur) ;
  
  var x_transition = $Z.transition.rounded_linear_transition_func ( 'x', 2 * frameDuration ) ; // function accepting an x end-value and returning a transition object
  var xMove        = 15 ; 

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

  viz.player         = setup_element   (viz, playerConfig) ;
  var enemy          = setup_element   (viz, enemyConfig) ;
  var button         = setup_buttons   (viz, viz.ui) ;
  var enemyHealthbar = setup_healthbar (viz, enemyHealth, healthBarHeight) ;

  var item = [ 
    enemy.item, 
    viz.player.item, 
    button.walkLeft, 
    button.walkRight, 
    button.attack, 
    button.jump, 
    enemyHealthbar.item, 
  ] ;

  var health_transition = $Z.transition.linear_transition_func ( 'width', viz.dur * 4 ) ; 
  var healthDrop        = 1 ;

  function blink_transition() {

    var blinkDur              = ( viz.player.sprite.attack.length + 2 ) * viz.dur ;
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
    detectList: [viz.player.item, enemy.item],
    healthbar: enemyHealthbar,
    healthDrop: healthDrop,
    create_transition: blink_transition, 
    health_transition: health_transition,
    element: enemy,
    viz: viz,
  } ;

  $Z.item(item)       ; // load the user data into the visualization engine to initialize the time equals zero (t = 0) state
	$Z.prep([viz]) ; // sets the preprocessing to perform on each frame of the animation (prior to updating and rendering the elements)
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

    if(viz.player.item.transition !== undefined && viz.player.item.transition.length > 0) {
      // console.log(viz.player.item.transition)
      return ;
    }

    var minNstep = 1 ; // minimum number of frames to animate per user input for walking animations
    var transition = [] ;

     switch(state) {

      case 'l' :

        viz.player.sprite = viz.player.spriteL ;

        viz.player.loop = animate_loop (
          viz.player.loop, 
          viz.player.sprite.walk, 
          image_transition, 
          undefined, 
          undefined,
        ) ;

        //console.log('viz.player loop animation', viz.player.loop, 'viz.player sprite walk', viz.player.sprite.walk)
        //console.log('viz.player.loop', viz.player.loop, 'viz.player.sprite', viz.player.sprite, 'restFrame', restFrame, 'image_transition', image_transition)
        transition      = viz.player.loop.animation ;
        var xNew        = Math.max(0, viz.player.item.x - xMove) ;
        var xTransition = x_transition(xNew) ;
        xTransition.end = click_reset ;
        // add_transition_end(viz.player.loop.animation[0], minNstep - 1, click_reset) ;

        transition.push(xTransition) ;

        break ;

      case 'r' :

        viz.player.sprite = viz.player.spriteR ;

        viz.player.loop   = animate_loop (
          viz.player.loop, 
          viz.player.sprite.walk, 
          image_transition, 
          undefined, 
          undefined
        ) ;

        // add_transition_end(viz.player.loop.animation[0], minNstep - 1, click_reset) ;
        transition = viz.player.loop.animation ;

        var xNew = Math.min(
          viz.width - viz.player.sprite.rest[0].width, 
          viz.player.item.x + xMove
        ) ;
        var xTransition = x_transition(xNew) ;
        xTransition.end = click_reset ;

        transition.push(xTransition) ;
        break ;

      case 'j' :

        transition = animate(viz.player.sprite.jump, image_transition, click_reset, viz.player.sprite.rest[0]) ;
        break ;

      case 'p' :
        transition              = animate(viz.player.sprite.attack, attack_transition, click_reset, viz.player.sprite.rest[0]) ;
        //console.log('p', 'viz.player', viz.player) ;
        var collisionTransition = animate(viz.player.sprite.attackCollision, collision_image_transition, click_reset, undefined) ; 
        transition              = transition.concat(collisionTransition) ;
        hitConfig.set() ;
        // console.log('transition', transition, 'collisionTransition', collisionTransition) ;
        //set_attack_detect() ;
        break ;

    }

    if (transition.length > 0) {
      //console.log('update_player: transition', transition)
      viz.player.item.transition = transition ;
    } else {
      click_reset() ;
    }

  }

 //  var clicking = false ;

 //  function click_reset () {
 //    clicking = false ;
 //  }

 // function click (e) {

 //    if (clicking) {
 //      return ;
 //    }

 //    clicking = true ;    

 //    // viz.canvas.removeEventListener ('click', click, false) ;

 //    var position = set_canvas_position( viz.canvas ) ;

 //    var clickedX = Math.round( (e.clientX - position.left) / position.scale ) ;
 //    var clickedY = Math.round( (e.clientY - position.top)  / position.scale ) ;

 //    var color       = viz.ui.hiddenContext.getImageData(clickedX, clickedY, 1, 1).data ;
 //    var buttonIndex = color[0] - 1 ; // color indexing used by image2index is 1-based

 //    if(buttonIndex >= 0) { // user clicked on a viz.ui.button

 //      var state;

 //      switch (buttonIndex) {

 //        case 0: // walk left
 //          button.walkLeft.transition  = animate([viz.ui.button[1]], image_transition, undefined, viz.ui.button[0]) ;
 //          state = 'l' ;
 //          break;

 //        case 1: // walk right
 //          button.walkRight.transition = animate([viz.ui.button[1]], image_transition, undefined, viz.ui.button[0]) ;
 //          state = 'r' ;
 //          break;

 //        case 2: // attack
 //          button.attack.transition    = animate([viz.ui.button[1]], image_transition, undefined, viz.ui.button[0]) ;
 //          state = 'p' ;
 //          break;

 //        case 3: // jump
 //          button.jump.transition      = animate([viz.ui.button[1]], image_transition, undefined, viz.ui.button[0]) ;
 //          state = 'j' ;
 //          break;

 //      }

 //      update_player(state) ;

 //    } else {

 //      clicking = false ;

 //    }

 //  } 

  document.viz = viz ;
   
  document.addEventListener('mousedown', mouse.down) ;
  document.addEventListener('mouseup', mouse.up) ;

}