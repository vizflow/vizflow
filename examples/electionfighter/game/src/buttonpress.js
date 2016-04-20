var buttonpress = {

  screen_handler: function buttonpress_screen_handler (e) {
  
    // if (buttonpress.busy) {
    //   return ;
    // }

    // buttonpress.busy = true ;

    //this.canvas.removeEventListener ('click', click, false) ;
    var position = set_canvas_position( this.canvas ) ;

    var clickedX = Math.round( (e.clientX - position.left) / position.scale ) ;
    var clickedY = Math.round( (e.clientY - position.top)  / position.scale ) ;

    var color       = this.ui.hiddenContext.getImageData(clickedX, clickedY, 1, 1).data ;
    var buttonIndex = color[0] - 1 ; // color indexing used by imageHelper.to_index is 1-based

    if(buttonIndex >= 0) { // user clicked on a this.ui.button

      var state;
      var replacementSwitch = true ;

      switch (buttonIndex) {

        case 0: // walk left
          //console.log('walk left', 'button', this.ui.button, 'this.ui.button.walkLeft.transition', this.ui.button.walkLeft.transition) ;
          //console.log('animate([this.ui.buttonSprite.left[1]], this.image_transition, undefined, this.ui.buttonSprite.left[0])', animate([this.ui.buttonSprite.left[1]], this.image_transition, undefined, this.ui.buttonSprite.left[0]));
          // transitionHelper.add.call(
          //   this.ui.button.walkLeft, 
          //   // animate([this.ui.buttonSprite.left[1]], this.ui.button.transition, undefined, this.ui.buttonSprite.left[0]),
          //   replacementSwitch
          // ) ;
          this.ui.button.walkLeft.image = this.ui.buttonSprite.left[1] ;
          state = 'l' ;
          break;

        case 1: // walk right
          // this.ui.button.walkRight.transition = animate([this.ui.button[1]], this.image_transition, undefined, this.ui.buttonSprite[0]) ;
          // this.ui.button.walkRight.transition = animate([this.ui.buttonSprite.right[1]], this.image_transition, undefined, this.ui.buttonSprite.right[0]) ;
          // transitionHelper.add.call(
          //   this.ui.button.walkRight, 
          //   animate([this.ui.buttonSprite.right[1]], this.image_transition, undefined, this.ui.buttonSprite.right[0]),
          //   replacementSwitch
          // ) ;          
          this.ui.button.walkRight.image = this.ui.buttonSprite.right[1] ;
          state = 'r' ;
          break;

        case 2: // attack
          // this.ui.button.attack.transition = animate([this.ui.button[1]], this.image_transition, undefined, this.ui.buttonSprite[0]) ;
          // this.ui.button.attack.transition = animate([this.ui.buttonSprite.attack[1]], this.image_transition, undefined, this.ui.buttonSprite.attack[0]) ;
          // transitionHelper.add.call(
          //   this.ui.button.attack, 
          //   animate([this.ui.buttonSprite.attack[1]], this.image_transition, undefined, this.ui.buttonSprite.attack[0]),
          //   replacementSwitch
          // ) ;                    
          this.ui.button.attack.image = this.ui.buttonSprite.attack[1] ;
          state = 'a' ;
          break;

        case 3: // jump
          // this.ui.button.jump.transition = animate([this.ui.button[1]], this.image_transition, undefined, this.ui.buttonSprite[0]) ;
          // this.ui.button.jump.transition = animate([this.ui.buttonSprite.jump[1]], this.image_transition, undefined, this.ui.buttonSprite.jump[0]) ;
          // transitionHelper.add.call(
          //   this.ui.button.jump, 
          //   animate([this.ui.buttonSprite.jump[1]], this.image_transition, undefined, this.ui.buttonSprite.jump[0]),
          //   replacementSwitch
          // ) ;                              
          this.ui.button.jump.image = this.ui.buttonSprite.jump[1] ;
          state = 'j' ;
          break;

      }
      // console.log ('click: state', state, 'this.player', this.player) ;
      this.player.callback (state) ;

    } else {  // user clicks background

      // buttonpress.busy = false ;
      
    }

  }, 

  keyboard_handler: function buttonpress_keyboard_handler (event) {

    // if (buttonpress.busy) {
    //   return ;  
    // }

    // buttonpress.busy = true ;

    var transition     = [] ;
    var state ;

    switch (event.keyCode) {

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
      case 13: // enter
      case 32: // space
        state = 'a' ;
        break;

    } 
    // console.log ('buttonpress keyboard_handler', 'state', state) ;
    if (state === undefined) {  // user clicks background
      // buttonpress.busy = false ;
    } else {
     // console.log('buttonpress_keyboard_handler callback', this) ;
      this.player.callback(state) ;
    }

  },  

  up: function buttonpress_up (event, doc) {

    if( doc === undefined ) {
      doc = document ;
    }
    // console.log('input event up', 'this', this) ;
    doc.viz.ui.button.walkLeft.image  = doc.viz.ui.buttonSprite.left[0] ;
    doc.viz.ui.button.walkRight.image = doc.viz.ui.buttonSprite.right[0] ;
    doc.viz.ui.button.attack.image    = doc.viz.ui.buttonSprite.attack[0] ;
    doc.viz.ui.button.jump.image      = doc.viz.ui.buttonSprite.jump[0] ;

    // console.log ('event up start', 'event', event) ;

    var vol = doc.viz.audio.menu.volume ;
    doc.viz.audio.menu.volume = 0.01 ;
    doc.viz.audio.menu.play() ; // in case audio hasn't been triggered yet (e.g. on iOS)
    doc.viz.audio.menu.volume = vol ;

    $Z.prep ([doc.viz]) ; // stop calling click every frame

    // console.log('doc.viz.player.item.transition', doc.viz.player.item.transition) ;

    var transition = doc.viz.player.item.transition ;
    var yNew = doc.viz.player.config.y ; // - doc.viz.player.item.image.height ;
    // console.log('yDist', yDist) ;
    // } else {
    //   doc.viz.player.item.remove_transition('image') ;
    //   doc.viz.player.item.add_transition(step_transition_func('image', viz.dur)(doc.viz.player.sprite.rest[0])) ;
    // }
    // var checkObject = transitionHelper.check_end_value.call(doc.viz.player.item, 'y', yNew) ;
    var yIndex = transitionHelper.find('y', transition) ;
    var firstFrame = doc.viz.player.sprite.jump[0] ;
    var abortJump = (yIndex > -1) && (doc.viz.player.item.image === firstFrame || doc.viz.player.sprite.jump.indexOf(doc.viz.player.item.image) === -1) ;

    // var minJumpAttackHeight = doc.viz.player.yMove * 0.75 ;
    // var yDist = Math.abs(yNew - doc.viz.player.item.y) ;
    // console.log('input event', 'animationcheck', animationCheck, 'firstFrame', firstFrame, 'yIndex', yIndex) ;

    if (abortJump) { // abort the jump if a negative edge is detected during the first couple frames of the jump animation
      var replacementSwitch = true ;
    
      // doc.viz.player.item.remove_transition('image') ;

      var abortDur   = 100 ;
      var transition = $Z.transition.rounded_linear_transition_func('y', abortDur)(yNew) ;

      // console.log('abortJump', 'transition', transition) ;

      var viewTrans = $Z.transition.rounded_linear_transition_func('viewportY', transitionHelper.duration(transition))(0) ;
      doc.viz.add_transition(viewTrans, replacementSwitch) ;

      if (doc.viz.player.restoreRest) {
        // console.log ('input event restore rest') ;
   
        transition = [transition, step_transition_func ('image', transition.duration) (doc.viz.player.sprite.rest[0])] ;
          // transitionHelper.add_child.call(doc.viz.player.item, 'image', doc.viz.player.transitionSet.jump(doc.viz.player.sprite.rest[0])) ;
          //.call(doc.viz.player.item, doc.viz.image_transition(doc.viz.player.sprite.rest[0]), replacementSwitch) ;
      }
 
      doc.viz.player.item.add_transition(transition, replacementSwitch) ;
   
    } else if( yIndex > -1 && doc.viz.player.orientation === 'r') {
      if(doc.viz.player.fire_bullet !== undefined) {
        doc.viz.player.fire_bullet('jumpBullet') ;
      }      
    }
      
    if (doc.viz.player.restoreRest) {
      if (doc.viz.player.state === 'r' || doc.viz.player.state === 'l') {

        var hitIndex = doc.viz.player.sprite.hit.indexOf(doc.viz.player.item.image) ;

        if(!doc.viz.player.fullLoopSwitch) {
          if(hitIndex === -1) {
            // transitionHelper.add_child.call(doc.viz.player.item, doc.viz.player.transitionSet.image(doc.viz.player.sprite.rest[0])) ;
            doc.viz.player.item.remove_transition ('image') ;
            doc.viz.player.item.image = doc.viz.player.sprite.rest[0] ;              
          } //else {            
          //   var trans = doc.viz.player.transitionSet.attack(doc.viz.player.sprite.rest[0]) ;
          //   transitionHelper.add_child.call(doc.viz.player, doc.viz.player.item.transition[transitionHelper.find('image', doc.viz.player.item.transition)], trans) ;          
          // }
        }

      }

      if (doc.viz.player.state === 'a') {
        if(!doc.viz.player.fullLoopSwitch) {
          var trans = doc.viz.player.transitionSet.attack(doc.viz.player.sprite.rest[0]) ;
          transitionHelper.add_child.call(doc.viz.player, doc.viz.player.item.transition[transitionHelper.find('image', doc.viz.player.item.transition)], trans) ;          
          // doc.viz.player.item.remove_transition ('image') ;
          // doc.viz.player.item.image = doc.viz.player.sprite.rest[0] ;  
        }
      }
        //.call(doc.viz.player.item, doc.viz.image_transition(doc.viz.player.sprite.rest[0]), replacementSwitch) ;
    }
    
    // buttonpress.reset () ;
    // console.log ('event up end', 'event', event) ;

  },
 // busy: { 

 //    'u': false, 
 //    'l': false, 
 //    'd': false, 
 //    'r': false,

 //  },

  // reset: function buttonpress_reset (state) {
 //    console.log('buttonpress reset:', 'state', state) ;
 //    buttonpress.busy[state] = false ;
 //  },

} ;