function trump_level_four () {

  var viz = viz_setup() ;
  ui      = ui_setup(viz) ;
  var frameDuration = viz.dur ;
  
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

  var playerConfig = { 
    sprite_loader: samus_sprite, 
    orientation: 'r',
    frameDuration: frameDuration,
    callback: update_player,
    y: 225,
  } ;
  var player          = setup_element(viz, playerConfig) ;
  player.transitionSet.x = $Z.transition.rounded_linear_transition_func ( 'x', frameDuration ) ; // function accepting an x end-value and returning a transition object
  player.xMove        = 10 ;

  var bulletShiftX      = 20 ;
  var bulletShiftY      = 8 ;
  var bulletImageUrl    = 'bullet.png' ;
  var bulletImage       = image2canvas (bulletImageUrl) ;  
  var bulletDur         = 17 * 20 ;
  var bullet_transition = $Z.transition.rounded_linear_transition_func ( 'x', bulletDur ) ; // function accepting an x end-value and returning a transition object
  var bulletMove        = 150 ;

  var bulletConfig   = {
    move: bulletMove,
    shiftX: bulletShiftX, 
    shiftY: bulletShiftY,
    image: bulletImage,
    transition: bullet_transition,
  }
  player.bullet = setup_bullet (viz, player, bulletConfig) ;  
  player.bulletList = [] ;

  var enemyConfig = {
    sprite_loader: trump_sprite,
    frameDuration: frameDuration,
    collisionImage: 'rest', 
    x: 80,    
    y: 220,
  } ;
  var enemy = setup_element(viz, enemyConfig) ;
  //console.log ('enemy', enemy) ;

  var health_transition = $Z.transition.linear_transition_func ( 'width', viz.dur * 4 ) ; 
  var healthDrop = 1 ;
  var enemyHealthbar = setup_healthbar (viz, enemyHealth, healthBarHeight) ;

  function blink_reset () {
    //console.log ('blink_reset');
    enemy.reacting = false ;
  }

  enemy.hit = {
    action: action.perform,
    healthbar: enemyHealthbar,
    healthDrop: healthDrop,
    transition: animate ([enemy.sprite.blink[0]], blink_transition, blink_reset),
    health_transition: health_transition,
    element: enemy,
  } ;

  // element.react = action.set ('hit') ;

  var button = setup_buttons (viz, ui) ;

  var enemyHealth     = 100 ;
  var healthBarHeight = 5 ;

  //console.log ('enemyHealthbar.item', enemyHealthbar.item)

  //console.log ('player.bullet', player.bullet) ;
  var item = [ 
    enemy.item,
    player.item,
    button.walkLeft,
    button.walkRight,
    button.attack,
    button.jump,
    enemyHealthbar.item,
  ] ;

  function detect_attack() {
    //console.log ('player.bulletList.concat(enemy.item)', player.bulletList.concat(enemy.item))
    var collision = collision_detect(player.bulletList.concat(enemy.item), viz.width, viz.height) ;
   //console.log ('detect_attack: collision', collision, 'enemy', enemy, 'player.bulletList', player.bulletList) ;
    if (collision.list.length > 0) { // a collision between player.item and enemy.item occurred
     // console.log ('detect_attack: collision', collision) ;
     // set_attack_action() ;
     action.set (enemy.hit) ;
    }
  }

  function set_attack_detect() {
    // console.log ('set_attack_detect') ;
    $Z.detect([detect_attack]) ;    
  }
  player.detect = set_attack_detect ;

  // function set_attack_action() {
  //  // console.log ('set_attack_action', attackConfig) ;
  //   $Z.action([attackConfig]) ;    
  // }

  $Z.item(item)   ;     // load the user data into the visualization engine to initialize the time equals zero (t = 0) state
	$Z.prep([viz_prep]) ; // sets the preprocessing to perform on each frame of the animation (prior to updating and rendering the elements)
	$Z.run()        ;     // run the interactive visualization (infinite loop by default)

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

    player.callback(state) ;

  }

  var clicking = false ;

  function click_reset () {
    clicking = false ;
  }

  player.click_reset = click_reset ;

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
      //console.log ('click: state', state, 'player',player) ;
      player.callback (state) ;

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

    if (player.restoreRest) {
      if(player.item.transition !== undefined) {
        // console.log ('player transition', player.item.transition) ;
        if(player.item.transition.length === 0) {
          player.item.transition = image_transition(player.sprite.rest[0]) ;
        } else if(player.item.transition.length === 1) {
          // console.log ('mouseup bug 1', player.item.transition[0]) ;
          player.item.transition[0].child = image_transition(player.sprite.rest[0]) ;
          //player.item.transition.end = function() { player.item.image = player.sprite.rest[0] ; } ;
        } else if(player.item.transition.length === 2) {
          var transitionWithMaxDuration = player.item.transition.slice(0).sort( function(x, y) { return y.duration - x.duration } )[0] ;
          transitionWithMaxDuration.child = image_transition(player.sprite.rest[0]) ;
          //transitionWithMaxDuration.end = function() { player.item.image = player.sprite.rest[0] ; } ;
          // console.log ('mouseup bug 2') ;
        } else {
          // console.log('mouseup bug 3') ;
        }
      }
     // xTransition.end = [xTransition.end, function () {
       // _this.item.image = _this.sprite.rest[0] ;
      //}]
    }

    click_reset () ;

    console.log ('mouseup', 'event', event) ;

  }

  document.addEventListener('mouseup', mouseup) ;

  // function set_keydown () {
  //   document.onkeydown = keydown ;
  //   viz.canvas.addEventListener('click', click, false) ;
  //   // console.log('set_keydown')
  // }

  // set_keydown() ;

}