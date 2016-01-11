function trump_level_four () {

  viz     = viz_setup() ;
  viz.dur = 0.5 * viz.dur ;
  ui      = ui_setup(viz) ;
  
  var backgroundImageUrl = 'trump_bg4.png' ;
  var background         = image2canvas(backgroundImageUrl) ;

  var bulletImageUrl = 'bullet.png' ;
  var bulletImage    = image2canvas (bulletImageUrl) ;


  var image_transition           = step_transition_func('image', viz.dur) ;
  var blinkDur = 3 * viz.dur ;
  var blink_transition           = step_transition_func('image', blinkDur) ;
  var collision_image_transition = step_transition_func('collisionImage', viz.dur) ;
  
  function viz_prep () {

    // viz.context.clearRect(0, 0, viz.canvas.width, viz.canvas.height) ;

    viz.context.drawImage (background, 0, 0) ;

    return true ;

  }

  var playerSpriteR  = samus_sprite () ;
  // console.log ('playerSpriteR', playerSpriteR) ;
  var playerSpriteL  = horizontal_flip(playerSpriteR) ;
  var playerSprite   = playerSpriteR ;

  var clearedFrame = create_canvas(playerSprite.rest[0].width, playerSprite.rest[0].height) ; 
  // var positionObject = {x: 0, y: 241 - playerSprite.height} ;

  var playerLoop = {
    totalDur : 2 * viz.dur,
    frameDur : viz.dur,
    position : 0
  } ; // position is from 0 to 1
  
  var player = {
    viz: viz, 
    image: playerSprite.rest[0],
    collisionImage: clearedFrame,
    render: draw.image,
    x: 20,
    y: 225 - playerSprite.height 
  } ;
  
  var orientation = 'r' ; // r for facing right

  var enemySprite = trump_sprite() ; 
  
  var enemy = {
    viz: viz, 
    image: enemySprite.blink[0],
    collisionImage: enemySprite.blink[0],
    render: draw.image,       
    x: 80,
    y: 50,
  } ;
  //console.log ('enemy', enemy) ;

  var walkLeftButton  = {
    viz: viz, 
    image: ui.button[0],
    render: draw.image,    
    x: ui.buttonX[0],
    y: ui.buttonY + ui.y
  } ;
  
  var walkRightButton = {
    viz: viz, 
    image: ui.button[0],
    render: draw.image,      
    x: ui.buttonX[1],
    y: ui.buttonY + ui.y
  } ;
  
  var attackButton = {
    viz: viz, 
    image: ui.button[0],
    render: draw.image,
    x: ui.buttonX[2],
    y: ui.buttonY + ui.y
  } ;
  
  var jumpButton = {
    viz: viz, 
    image: ui.button[0],
    render: draw.image,
    x: ui.buttonX[3],
    y: ui.buttonY + ui.y
  } ;

  var health          = 100 ;
  var healthBarHeight = 5 ;
  
  var healthBarRect = {
    viz: viz, 
    x: 120,
    y: 10,
    width: health,
    height: healthBarHeight,
    color: '#600'
  } ; 

  var bulletShiftX = 20 ;
  var bulletShiftY = 8 ;
  var bullet = {
    viz: viz, 
    x: player.x + bulletShiftX,
    y: player.y + bulletShiftY,
    image: bulletImage,
    collisionImage: bulletImage,
    render: draw.image,
  } ;

  //console.log ('bullet', bullet) ;

  function draw_bar() {
    healthBarRect.width = this.width ;
   // console.log ('draw_bar:this', this) ;
    draw.rect (healthBarRect, viz.context) ;
  }

  var enemyHealthBar = {
    viz: viz, 
    render: draw_bar,
    width: health
 } ;

  var item = [ enemy, player, walkLeftButton, walkRightButton, attackButton, jumpButton, enemyHealthBar ] ;

  var bulletList = [] ; 

  function detect_attack() {
    //console.log ('bulletList.concat(enemy)', bulletList.concat(enemy))
    var collision = collision_detect(bulletList.concat(enemy), viz.width, viz.height) ;
    //console.log ('detect_attack') ;
    if (collision.list.length > 0) { // a collision between player and enemy occurred
      //console.log ('detect_attack: collision', collision) ;
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
  var healthDrop = 1 ;
  var blinking = false ;

  function blink_reset () {
    blinking = false ;
  }

  function attack_action() {
    health -= healthDrop ;
    
    if (health < 0) {
      alert ('game over') ;
      health = 0 ;
    }

    //enemyHealthBar.width = health ;
    enemyHealthBar.transition = health_transition (health) ;
    // console.log ('enemyHealthBar', enemyHealthBar) ;

    if (blinking) {
      return ;
    }

    blinking = true ;

    attack_reset () ;

    enemy.image = enemySprite.blink [1] ;

    var transition = animate ([enemySprite.blink[0]], blink_transition, blink_reset) ; 

    //var transition   = animate (enemySprite.blink, blink_transition, undefined, enemySprite.blink[0]) ;
    enemy.transition = transition ;

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
        orientation = 'l' ;
        playerSprite = playerSpriteL ;
        //playerSprite.rest[0]   = playerSprite.walk[0] ;
        playerLoop   = animate_loop (playerLoop, playerSprite.walk, image_transition, undefined) ;
        add_transition_end(playerLoop.animation[0], minNstep - 1, click_reset) ;
        console.log('playerLoop.animation', playerLoop.animation)
        transition = playerLoop.animation ;

        var xNew   = Math.max(0, player.x - xMove) ;
        var xTransition = x_transition(xNew) ;

        transition.push(xTransition) ;

        break ;
      case 'r' :
        orientation   = 'r' ;
        playerSprite   = playerSpriteR ;
        //playerSprite.rest[0]     = playerSprite.walk[0] ;
        playerLoop     = animate_loop (playerLoop, playerSprite.walk, image_transition, undefined) ;
        add_transition_end(playerLoop.animation[0], minNstep - 1, click_reset) ;
        transition = playerLoop.animation ;

        var xNew        = Math.min(viz.width - playerSprite.rest[0].width, player.x + xMove) ;
        var xTransition = x_transition(xNew) ;

        transition.push(xTransition) ;

        break ;
      case 'j' :
        transition = animate(playerSprite.jump, image_transition, click_reset, playerSprite.rest[0]) ;
        break ;
      case 'a' :
        transition = animate(playerSprite.attack, image_transition, click_reset, playerSprite.rest[0]) ;

        var newBullet = copy_object (bullet) ;

        function create_bullet_transition () {
        
          if (orientation === 'r') {
            newBullet.x          = player.x + bulletShiftX ;
            var xNew             = newBullet.x + bulletMove ;
               //console.log ('newBullet', newBullet) ;
            newBullet.transition = bullet_transition(xNew) ;

          } else {
            newBullet.x          = player.x - bulletShiftX ;
            var xNew             = newBullet.x - bulletMove ;
            newBullet.transition = bullet_transition(xNew) ;
          }

        }

        create_bullet_transition () ;

        bulletList.push (newBullet) ;

        newBullet.transition.end = function () {

            var index = bulletList.indexOf (newBullet) ;
            bulletList.splice (index, 1) ; // remove bullet from vizflow itemlist  

            if (bulletList.length === 0) {
              attack_reset () ;
            }

        //  if (newBullet.x < 0 || newBullet > viz.width - 1) {  // bullet offscreen
            index = item.indexOf (newBullet) ;
            item.splice (index, 1) ; // remove bullet from vizflow itemlist  
         // } else {  // add more transitions to bullet
           // create_bullet_transition () ;
         // }
        }

        item.push (newBullet) ;

        //$Z.item (item.push(newBullet)) ;

        // var collisionTransition = animate (playerSprite.attackCollision, collision_image_transition, attack_reset, clearedFrame) ; 
        // transition = transition.concat(collisionTransition) ;
       // console.log ('update_player: transition', transition) ;
        set_attack_detect() ;
        break ;
    }
    if (transition.length > 0) {
      // console.log('update_player: transition', transition)
      player.transition = transition ;
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
          walkLeftButton.transition = animate([ui.button[1]], image_transition, undefined, ui.button[0]) ;
          state = 'l' ;
          break;
        case 1: // walk right
          walkRightButton.transition = animate([ui.button[1]], image_transition, undefined, ui.button[0]) ;
          state = 'r' ;
          break;
        case 2: // attack
          attackButton.transition = animate([ui.button[1]], image_transition, undefined, ui.button[0]) ;
          state = 'a' ;
          break;
        case 3: // jump
          jumpButton.transition = animate([ui.button[1]], image_transition, undefined, ui.button[0]) ;
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
    player.transition = [] ;
    player.image = playerSprite.rest[0] ;
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