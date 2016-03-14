var inputEvent = {
  
  down: function input_event_down (event) {

    // console.log ('event down', 'this', this, 'this.viz', this.viz, 'event', event) ;    

    var inputHandler ;
    var eventList ;

    switch (event.type) {

      case 'keydown': 
        inputHandler = 'keyboard_handler' ;
        eventList = event ;
        break;
      case 'mousedown': 
        inputHandler = 'screen_handler' ;
        eventList = event ;
        break;
      case 'touchstart':
        inputHandler = 'screen_handler' ;
        eventList = event.touches ;
        break;

    }     
  
    function run_click () {
      // console.log('input event run click:', 'inputHandler', inputHandler) ;
      if(event.type === 'touchstart') {
        for(var kEvent = 0 ; kEvent < eventList.length ; kEvent++) {
          this.viz.buttonpress[inputHandler].call (this.viz, eventList[kEvent]) ;        
        }        
      } else {
        this.viz.buttonpress[inputHandler].call (this.viz, eventList) ;        
      }
    }

    var runClick = { 
      prep: run_click, 
      viz: this.viz 
    } ;
   
    $Z.prep ([this.viz, runClick]) ;
    //console.log ('mousedown: holding', holding, 'event', event) ;
  },

  up: function input_event_up (event) {
    // console.log('input event up', 'this', this) ;
    this.viz.ui.button.walkLeft.image  = this.viz.ui.buttonSprite.left[0] ;
    this.viz.ui.button.walkRight.image = this.viz.ui.buttonSprite.right[0] ;
    this.viz.ui.button.attack.image    = this.viz.ui.buttonSprite.attack[0] ;
    this.viz.ui.button.jump.image      = this.viz.ui.buttonSprite.jump[0] ;

    // console.log ('event up start', 'event', event) ;

    var vol = this.viz.audio.menu.volume ;
    this.viz.audio.menu.volume = 0.01 ;
    this.viz.audio.menu.play() ; // in case audio hasn't been triggered yet (e.g. on iOS)
    this.viz.audio.menu.volume = vol ;

    $Z.prep ([this.viz]) ; // stop calling click every frame

    // console.log('this.viz.player.item.transition', this.viz.player.item.transition) ;

    var transition = this.viz.player.item.transition ;
    var yNew = this.viz.player.config.y ; // - this.viz.player.item.image.height ;
    // console.log('yDist', yDist) ;
    // } else {
    //   this.viz.player.item.remove_transition('image') ;
    //   this.viz.player.item.add_transition(step_transition_func('image', viz.dur)(this.viz.player.sprite.rest[0])) ;
    // }
    // var checkObject = transitionHelper.check_end_value.call(this.viz.player.item, 'y', yNew) ;
    var yIndex = transitionHelper.find('y', transition) ;
    var firstFrame = this.viz.player.sprite.jump[0] ;
    var abortJump = (yIndex > -1) && (this.viz.player.item.image === firstFrame || this.viz.player.sprite.jump.indexOf(this.viz.player.item.image) === -1) ;

    // var minJumpAttackHeight = this.viz.player.yMove * 0.75 ;
    // var yDist = Math.abs(yNew - this.viz.player.item.y) ;
    // console.log('input event', 'animationcheck', animationCheck, 'firstFrame', firstFrame, 'yIndex', yIndex) ;

    if (abortJump) { // abort the jump if a negative edge is detected during the first couple frames of the jump animation
      var replacementSwitch = true ;
    
      // this.viz.player.item.remove_transition('image') ;

      var abortDur   = 100 ;
      var transition = $Z.transition.rounded_linear_transition_func('y', abortDur)(yNew) ;

      // console.log('abortJump', 'transition', transition) ;

      var viewTrans = $Z.transition.rounded_linear_transition_func('viewportY', transitionHelper.duration(transition))(0) ;
      this.viz.add_transition(viewTrans, replacementSwitch) ;

      if (this.viz.player.restoreRest) {
        // console.log ('input event restore rest') ;
   
        transition = [transition, step_transition_func ('image', transition.duration) (this.viz.player.sprite.rest[0])] ;
          // transitionHelper.add_child.call(this.viz.player.item, 'image', this.viz.player.transitionSet.jump(this.viz.player.sprite.rest[0])) ;
          //.call(this.viz.player.item, this.viz.image_transition(this.viz.player.sprite.rest[0]), replacementSwitch) ;
      }
 
      this.viz.player.item.add_transition(transition, replacementSwitch) ;
   
    } else if( yIndex > -1 && this.viz.player.orientation === 'r') {
      if(this.viz.player.fire_bullet !== undefined) {
        this.viz.player.fire_bullet('jumpBullet') ;
      }      
    }
      
    if (this.viz.player.restoreRest) {
      if (this.viz.player.state === 'r' || this.viz.player.state === 'l') {

        var hitIndex = this.viz.player.sprite.hit.indexOf(this.viz.player.item.image) ;

        if(!this.viz.player.fullLoopSwitch) {
          if(hitIndex === -1) {
            // transitionHelper.add_child.call(this.viz.player.item, this.viz.player.transitionSet.image(this.viz.player.sprite.rest[0])) ;
            this.viz.player.item.remove_transition ('image') ;
            this.viz.player.item.image = this.viz.player.sprite.rest[0] ;              
          } //else {            
          //   var trans = this.viz.player.transitionSet.attack(this.viz.player.sprite.rest[0]) ;
          //   transitionHelper.add_child.call(this.viz.player, this.viz.player.item.transition[transitionHelper.find('image', this.viz.player.item.transition)], trans) ;          
          // }
        }

      }

      if (this.viz.player.state === 'a') {
        if(!this.viz.player.fullLoopSwitch) {
          var trans = this.viz.player.transitionSet.attack(this.viz.player.sprite.rest[0]) ;
          transitionHelper.add_child.call(this.viz.player, this.viz.player.item.transition[transitionHelper.find('image', this.viz.player.item.transition)], trans) ;          
          // this.viz.player.item.remove_transition ('image') ;
          // this.viz.player.item.image = this.viz.player.sprite.rest[0] ;  
        }
      }
        //.call(this.viz.player.item, this.viz.image_transition(this.viz.player.sprite.rest[0]), replacementSwitch) ;
    }
    
    // buttonpress.reset () ;
    // console.log ('event up end', 'event', event) ;

  },

  buttonpress: {
    
    busy: false,
    
    reset: function buttonpress_reset () {
      $Z.prep ([document.viz]) ;
      this.busy = false ;
    },

    keyboard_handler: function buttonpress_keyboard_handler (event) {

      if (inputEvent.buttonpress.busy) {
        return ;  
      }

      inputEvent.buttonpress.busy = true ;
      this.keyboard_callback(event) ;
      // this.player.callback(state) ;

    },

    screen_handler: function buttonpress_screen_handler (e, viz) {

      if(viz === undefined) {
        viz = this ;
      }

      // console.log('screen handler', 'this', this, 'this.buttonpress', this.buttonpress) ;
    
      if (inputEvent.buttonpress.busy) {
        return ;
      }

      inputEvent.buttonpress.busy = true ;

      //this.canvas.removeEventListener ('click', click, false) ;
      var position = set_canvas_position( viz.canvas ) ;

      var clickedX = Math.round( (e.clientX - position.left) / position.scale ) ;
      var clickedY = Math.round( (e.clientY - position.top)  / position.scale ) ;
      // console.log('screenhandler', 'clickedX', clickedX, 'clickedY', clickedY, 'this', this) ;
      viz.screen_callback(clickedX, clickedY) ;

    },

	},

} ;