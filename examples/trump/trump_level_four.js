function trump_level_four () {

  var viz = basic_setup () ;
  viz.dur = 0.5 * viz.dur ;

  var backgroundImageUrl = 'trump_bg4.png' ;
  var background         = image2canvas(backgroundImageUrl) ;

  var bulletImageUrl = 'bullet.png' ;
  var bulletImage    = image2canvas (bulletImageUrl) ;


  var image_transition           = step_transition_func('image', viz.dur) ;
  var collision_image_transition = step_transition_func('collisionImage', viz.dur) ;
  
  function viz_prep () {

    // viz.context.clearRect(0, 0, viz.canvas.width, viz.canvas.height) ;

    viz.context.drawImage (background, 0, 0) ;

    return true ;

  }

  function draw_image (frame) {

    if (frame === undefined) {
      frame = this ;
    } 
    viz.context.drawImage(frame.image, frame.x, frame.y) ;
    //$Z.item ([]) ;

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

  var samusSpriteR  = samus_sprite () ;
  // console.log ('samusSpriteR', samusSpriteR) ;
  var samusSpriteL  = horizontal_flip(samusSpriteR) ;
  var samusSprite   = samusSpriteR ;

  var clearedFrame = create_canvas(samusSprite.rest[0].width, samusSprite.rest[0].height) ; 
  // var positionObject = {x: 0, y: 241 - samusSprite.height} ;

  var samusLoop = {totalDur : 2 * viz.dur, frameDur : viz.dur, position : 0} ; // position is from 0 to 1
  var samus     = {image: samusSprite.rest[0], collisionImage: clearedFrame, render: draw_image, x: 20, y: 225 - samusSprite.height } ;
  var orientation = 'r' ; // r for facing right

  var trumpSprite = trump_sprite() ; 
  var trump       = {image: trumpSprite.blink[0], collisionImage: trumpSprite.blink[0], render: draw_image, x: 80, y: 140} ;
  //console.log ('trump', trump) ;

  var walkLeftButton  = {image: viz.button[0], render: draw_image, x: viz.buttonX[0], y: viz.buttonY + viz.uiY} ;
  var walkRightButton = {image: viz.button[0], render: draw_image, x: viz.buttonX[1], y: viz.buttonY + viz.uiY} ;
  var attackButton     = {image: viz.button[0], render: draw_image, x: viz.buttonX[2], y: viz.buttonY + viz.uiY} ;
  var jumpButton      = {image: viz.button[0], render: draw_image, x: viz.buttonX[3], y: viz.buttonY + viz.uiY} ;

  var health          = 100 ;
  var healthBarHeight = 5 ;
  var healthBarRect   = {x: 120, y: 10, width: health, height: healthBarHeight, color: '#600'} ; 

  var bulletShiftX = 20 ;
  var bulletShiftY = 8 ;
  var bullet = {
    x: samus.x + bulletShiftX,
    y: samus.y + bulletShiftY,
    image: bulletImage,
    collisionImage: bulletImage,
    render: draw_image,
  } ;

  //console.log ('bullet', bullet) ;

  var draw_bar        = function () {
    healthBarRect.width = this.width ;
   // console.log ('draw_bar:this', this) ;
    draw_rect (viz.context, healthBarRect) ;
  }

  var trumpHealthBar   = {render: draw_bar, width: health} ;

  var item = [ trump, samus, walkLeftButton, walkRightButton, attackButton, jumpButton, trumpHealthBar ] ;

  var bulletList = [] ; 

  function detect_attack() {
    //console.log ('bulletList.concat(trump)', bulletList.concat(trump))
    var collision = collision_detect(bulletList.concat(trump), viz.width, viz.height) ;
    //console.log ('detect_attack') ;
    if (collision.list.length > 0) { // a collision between samus and trump occurred
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

  var x_transition = $Z.transition.rounded_linear_transition_func ( 'x', viz.dur * (samusSprite.walk.length + 1) ) ; // function accepting an x end-value and returning a transition object
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

    update_samus(state) ;

  }


  var bulletDur         = 17 * 20 ;
  var bullet_transition = $Z.transition.rounded_linear_transition_func ( 'x', bulletDur ) ; // function accepting an x end-value and returning a transition object
  var bulletMove = 150 ;

  function update_samus(state) { 
    //console.log ('update_samus: state', state) ;
    
    var minNstep = 2 ; // minimum number of frames to animate per user input for walking animations
    var transition = [] ;
     switch(state) {
      case 'l' :
        orientation = 'l' ;
        samusSprite = samusSpriteL ;
        //samusSprite.rest[0]   = samusSprite.walk[0] ;
        samusLoop   = animate_loop (samusLoop, samusSprite.walk, image_transition, undefined) ;
        add_transition_end(samusLoop.animation[0], minNstep - 1, click_reset) ;
        //console.log('samusLoop.animation', samusLoop.animation)
        transition = samusLoop.animation ;

        var xNew   = Math.max(0, samus.x - xMove) ;
        var xTransition = x_transition(xNew) ;

        transition.push(xTransition) ;

        break ;
      case 'r' :
        orientation   = 'r' ;
        samusSprite   = samusSpriteR ;
        //samusSprite.rest[0]     = samusSprite.walk[0] ;
        samusLoop     = animate_loop (samusLoop, samusSprite.walk, image_transition, undefined) ;
        add_transition_end(samusLoop.animation[0], minNstep - 1, click_reset) ;
        transition = samusLoop.animation ;

        var xNew        = Math.min(viz.width - samusSprite.rest[0].width, samus.x + xMove) ;
        var xTransition = x_transition(xNew) ;

        transition.push(xTransition) ;

        break ;
      case 'j' :
        transition = animate(samusSprite.jump, image_transition, click_reset, samusSprite.rest[0]) ;
        break ;
      case 'a' :
        transition = animate(samusSprite.attack, image_transition, click_reset, samusSprite.rest[0]) ;

        var newBullet = copy_object (bullet) ;

        function create_bullet_transition () {
        
          if (orientation === 'r') {
            newBullet.x          = samus.x + bulletShiftX ;
            var xNew             = newBullet.x + bulletMove ;
               //console.log ('newBullet', newBullet) ;
            newBullet.transition = bullet_transition(xNew) ;

          } else {
            newBullet.x          = samus.x - bulletShiftX ;
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

        // var collisionTransition = animate (samusSprite.attackCollision, collision_image_transition, attack_reset, clearedFrame) ; 
        // transition = transition.concat(collisionTransition) ;
       // console.log ('update_samus: transition', transition) ;
        set_attack_detect() ;
        break ;
    }
    if (transition.length > 0) {
      // console.log('update_samus: transition', transition)
      samus.transition = transition ;
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

    var color       = viz.hiddenContext.getImageData(clickedX, clickedY, 1, 1).data ;
    var buttonIndex = color[0] - 1 ; // color indexing used by image2index is 1-based

    if(buttonIndex >= 0) { // user clicked on a viz.button

      var state;

      switch (buttonIndex) {

        case 0: // walk left
          walkLeftButton.transition = animate([viz.button[1]], image_transition, undefined, viz.button[0]) ;
          state = 'l' ;
          break;
        case 1: // walk right
          walkRightButton.transition = animate([viz.button[1]], image_transition, undefined, viz.button[0]) ;
          state = 'r' ;
          break;
        case 2: // attack
          attackButton.transition = animate([viz.button[1]], image_transition, undefined, viz.button[0]) ;
          state = 'a' ;
          break;
        case 3: // jump
          jumpButton.transition = animate([viz.button[1]], image_transition, undefined, viz.button[0]) ;
          state = 'j' ;
          break;

      }

      update_samus(state) ;

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
    samus.transition = [] ;
    samus.image = samusSprite.rest[0] ;
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