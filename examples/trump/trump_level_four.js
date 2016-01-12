function trump_level_four () {

  var viz = viz_setup() ;
  viz.dur = 0.5 * viz.dur ;
  ui      = ui_setup(viz) ;
  
  var backgroundImageUrl = 'trump_bg4.png' ;
  var background         = image2canvas(backgroundImageUrl) ;

  var image_transition           = step_transition_func('image', viz.dur) ;
  var blinkDur                   = 3 * viz.dur ;
  var blink_transition           = step_transition_func('image', blinkDur) ;
  var collision_image_transition = step_transition_func('collisionImage', viz.dur) ;
  
  function viz_prep () {

    // viz.context.clearRect(0, 0, viz.canvas.width, viz.canvas.height) ;

    viz.context.drawImage (background, 0, 0) ;

    return true ;

  }

  var player = setup_player (viz) ;
  //console.log ('player', player) ;

  var enemy = setup_enemy (viz) ;

  var button = setup_buttons (viz, ui) ;

  var enemyHealth     = 100 ;
  var healthBarHeight = 5 ;

  var enemyHealthbar = setup_healthbar (viz, enemyHealth, healthBarHeight) ;
  //console.log ('enemyHealthbar.item', enemyHealthbar.item)

  var bulletShiftX   = 20 ;
  var bulletShiftY   = 8 ;
  var bulletImageUrl = 'bullet.png' ;
  var bulletImage    = image2canvas (bulletImageUrl) ;  
  var bulletConfig   = {
    shiftX: bulletShiftX, 
    shiftY: bulletShiftY,
    image: bulletImage,
  }
  var bullet = setup_bullet (viz, player, bulletConfig) ;

  //console.log ('bullet', bullet) ;

  var item = [ 
    enemy.item,
    player.item,
    button.walkLeft,
    button.walkRight,
    button.attack,
    button.jump,
    enemyHealthbar.item,
  ] ;

  var bulletList = [] ; 

  function detect_attack() {
    //console.log ('bulletList.concat(enemy.item)', bulletList.concat(enemy.item))
    var collision = collision_detect(bulletList.concat(enemy.item), viz.width, viz.height) ;
   //console.log ('detect_attack', collision) ;
    if (collision.list.length > 0) { // a collision between player.item and enemy.item occurred
    //  console.log ('detect_attack: collision', collision) ;
      set_attack_action() ;
    }
  }

  var health_transition = $Z.transition.linear_transition_func ( 'width', viz.dur * 4 ) ; 
  var healthDrop = 1 ;

  var enemyAttack = {
    action: attack.action,
    healthbar: enemyHealthbar,
    healthDrop: healthDrop,
    transition: animate ([enemy.sprite.blink[0]], blink_transition, blink_reset),
    health_transition: health_transition,
    element: enemy,
  }

  function set_attack_detect() {
    //console.log ('set_attack_detect') ;
    $Z.detect([detect_attack]) ;    
  }

  function set_attack_action() {
   // console.log ('set_attack_action', enemyAttack) ;
    $Z.action([enemyAttack]) ;    
  }

  function blink_reset () {
    //console.log ('blink_reset');
    enemy.reacting = false ;
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
        state = 'a' ;
        break;

    }

    update_player(state) ;

  }


  var bulletDur         = 17 * 20 ;
  var bullet_transition = $Z.transition.rounded_linear_transition_func ( 'x', bulletDur ) ; // function accepting an x end-value and returning a transition object
  var bulletMove = 150 ;

  function update_player(state) { 
   // console.log ('update_player: state', state) ;
    
    var minNstep = 2 ; // minimum number of frames to animate per user input for walking animations
    var transition = [] ;
     switch(state) {
      case 'l' :
        player.orientation = 'l' ;
        player.sprite = player.spriteL ;
        //player.sprite.rest[0]   = player.sprite.walk[0] ;
        player.loop   = animate_loop (player.loop, player.sprite.walk, image_transition, undefined) ;
        add_transition_end(player.loop.animation[0], minNstep - 1, click_reset) ;
       // console.log('player.loop.animation', player.loop.animation)
        transition = player.loop.animation ;

        var xNew   = Math.max(0, player.item.x - xMove) ;
        var xTransition = x_transition(xNew) ;

        transition.push(xTransition) ;

        break ;
      case 'r' :
        player.orientation   = 'r' ;
        player.sprite   = player.spriteR ;
        //player.sprite.rest[0]     = player.sprite.walk[0] ;
        player.loop     = animate_loop (player.loop, player.sprite.walk, image_transition, undefined) ;
        add_transition_end(player.loop.animation[0], minNstep - 1, click_reset) ;
        transition = player.loop.animation ;

        var xNew        = Math.min(viz.width - player.sprite.rest[0].width, player.item.x + xMove) ;
        var xTransition = x_transition(xNew) ;

        transition.push(xTransition) ;

        break ;
      case 'j' :
        transition = animate(player.sprite.jump, image_transition, click_reset, player.sprite.rest[0]) ;
        break ;
      case 'a' :
        transition = animate(player.sprite.attack, image_transition, click_reset, player.sprite.rest[0]) ;

        var newBullet = copy_object (bullet) ;
       // console.log ('update_player', 'bullet', bullet, 'newBullet', newBullet) ; 

        function create_bullet_transition () {
        
          if (player.orientation === 'r') {
            newBullet.x          = player.item.x + bulletShiftX ;
            var xNew             = newBullet.x + bulletMove ;
               //console.log ('newBullet', newBullet) ;
            newBullet.transition = bullet_transition(xNew) ;

          } else {
            newBullet.x          = player.item.x - bulletShiftX ;
            var xNew             = newBullet.x - bulletMove ;
            newBullet.transition = bullet_transition(xNew) ;
          }

        }

        create_bullet_transition () ;

        bulletList.push (newBullet) ;

        newBullet.transition.end = function () {
         // console.log ('bulletend') ;

            var index = bulletList.indexOf (newBullet) ;
            bulletList.splice (index, 1) ; // remove bullet from vizflow itemlist  

            if (bulletList.length === 0) {
              attack.reset () ;
            }

        //  if (newBullet.x < 0 || newBullet > viz.width - 1) {  // bullet offscreen
            index = item.indexOf (newBullet) ;
            item.splice (index, 1) ; // remove bullet from vizflow itemlist  
         // } else {  // add more transitions to bullet
           // create_bullet_transition () ;
         // }
         // console.log ('bulletend', 'end')
        }

        item.push (newBullet) ;

        //$Z.item (item.push(newBullet)) ;

        // var collisionTransition = animate (player.sprite.attackCollision, collision_image_transition, attack_reset, clearedFrame) ; 
        // transition = transition.concat(collisionTransition) ;
       // console.log ('update_player: transition', transition) ;
        set_attack_detect() ;
        break ;
    }
    if (transition.length > 0) {
      // console.log('update_player: transition', transition)
      player.item.transition = transition ;
    } else {
      click_reset
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

    //viz.canvas.removeEventListener ('click', click, false) ;

    var position = set_canvas_position( viz.canvas ) ;

    var clickedX = Math.round( (e.clientX - position.left) / position.scale ) ;
    var clickedY = Math.round( (e.clientY - position.top)  / position.scale ) ;

    var color       = ui.hiddenContext.getImageData(clickedX, clickedY, 1, 1).data ;
    var buttonIndex = color[0] - 1 ; // color indexing used by image2index is 1-based

    if(buttonIndex >= 0) { // user clicked on a ui.button

      var state;

      switch (buttonIndex) {

        case 0: // walk left
          button.walkLeft.transition = animate([ui.button[1]], image_transition, undefined, ui.button[0]) ;
          state = 'l' ;
          break;
        case 1: // walk right
          button.walkRight.transition = animate([ui.button[1]], image_transition, undefined, ui.button[0]) ;
          state = 'r' ;
          break;
        case 2: // attack
          button.attack.transition = animate([ui.button[1]], image_transition, undefined, ui.button[0]) ;
          state = 'a' ;
          break;
        case 3: // jump
          button.jump.transition = animate([ui.button[1]], image_transition, undefined, ui.button[0]) ;
          state = 'j' ;
          break;

      }
      update_player(state) ;

    } else {  // user clicks background
      clicking = false ;
    }

  } 

  function mousedown (event) {

    function run_click () {
      click (event) ;
    }

    $Z.prep ([viz_prep, run_click]) ;

    //console.log ('mousedown: holding', holding, 'event', event) ;

  }

  document.addEventListener('mousedown', mousedown) ;

  function mouseup (event) {

    $Z.prep ([viz_prep]) ;
    player.item.transition = [] ;
    player.item.image = player.sprite.rest[0] ;
    click_reset () ;

    //console.log ('mouseup: holding', holding, 'event', event) ;

  }

  document.addEventListener('mouseup', mouseup) ;

  // function set_keydown () {
  //   document.onkeydown = keydown ;
  //   viz.canvas.addEventListener('click', click, false) ;
  //   // console.log('set_keydown')
  // }

  // set_keydown() ;

}