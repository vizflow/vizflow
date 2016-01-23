var inputEvent = {
  
  down: function input_event_down (event) {

    // console.log ('event down', 'this', this, 'this.viz', this.viz, 'event', event) ;    

    var inputHandler ;

    switch (event.type) {

      case 'keydown': 
        inputHandler = 'keyboard_handler' ;
        break;
      case 'mousedown': 
        inputHandler = 'screen_handler' ;
        break;
      case 'touchstart':
        inputHandler = 'screen_handler' ;
        event.clientX = event.touches[0].clientX ;
        event.clientY = event.touches[0].clientY ;
        break;

    }     
  
    function run_click () {
      buttonpress[inputHandler].call (this.viz, event) ;
    }

    var runClick = { 
      prep: run_click, 
      viz: this.viz 
    } ;
   
    $Z.prep ([this.viz, runClick]) ;
    //console.log ('mousedown: holding', holding, 'event', event) ;
  },

  up: function input_event_up (event) {

    this.viz.ui.button.walkLeft.image  = this.viz.ui.buttonSprite.left[0] ;
    this.viz.ui.button.walkRight.image = this.viz.ui.buttonSprite.right[0] ;
    this.viz.ui.button.attack.image    = this.viz.ui.buttonSprite.attack[0] ;
    this.viz.ui.button.jump.image      = this.viz.ui.buttonSprite.jump[0] ;

    // console.log ('event up start', 'event', event) ;

    $Z.prep ([this.viz]) ; // stop calling click every frame

    // console.log('this.viz.player.item.transition', this.viz.player.item.transition) ;

    var transition = this.viz.player.item.transition ;
    var yNew = this.viz.player.config.y - this.viz.player.sprite.height ;
    var minJumpBulletHeight = this.viz.player.config.yMove * .4 ;
    var yDist = Math.abs(yNew - this.viz.player.item.y) ;
    // console.log('yDist', yDist) ;
    if (yDist > minJumpBulletHeight) {
      // console.log('input event64') ;
      fire_bullet.call(this.viz.player, 'jumpBullet') ;
    }        
    var checkObject = transitionHelper.check_end_value.call(this.viz.player.item, 'y', yNew) ;
    var yIndex = checkObject.index ;
    // console.log('input event', 'checkObject', checkObject) ;
    if (checkObject.check !== undefined && !checkObject.check) { // never cancel downward transition

      transition[yIndex] = this.viz.player.transitionSet.y(yNew) ;
      transition[yIndex].end = { 
        
        viz: this.viz,

        run: function() {

          // console.log('end this', this, 'player', player, 'player.item.transition', player.item.transition) ;
          for(var ktrans = 0 ; ktrans < transition.length ; ktrans++) {
            if(transition[ktrans].varName === 'collisionImage') {
              // console.log ('this.config.collisionImage', this.config.collisionImage//'this.viz.player.sprite[this.config.collisionImage]') ; //, this.viz.player.sprite[this.config.collisionImage], 'this.config.collisionImage', this.config.collisionImage) ;
              var newTransition = step_transition_func('collisionImage', this.viz.dur)(this.viz.player.sprite[this.viz.player.config.collisionImage][0]) ;
              // console.log('if collisionImage', 'transition[ktrans]', transition[ktrans], 'newTransition', newTransition) ;
              this.viz.player.item.transition[ktrans] = newTransition ;
            }
            if(transition[ktrans].varName === 'image') {
              this.viz.player.item.transition[ktrans] = this.viz.player.transitionSet.image(this.viz.player.sprite.rest[0]) ;
            }
            if(this.viz.player.config.restoreRest) {            
              this.viz.player.restoreRest = true ;
            }  

          }
        
        },

      } ;
    }
      
    if (this.viz.player.restoreRest) {
      if (this.viz.player.state === 'r' || this.viz.player.state === 'l') {
        transitionHelper.add_child.call(this.viz.player.item, 'image', this.viz.player.transitionSet.image(this.viz.player.sprite.rest[0])) ;
      }
      if (this.viz.player.state === 'a') {
        transitionHelper.add_child.call(this.viz.player.item, 'image', this.viz.player.transitionSet.attack(this.viz.player.sprite.rest[0])) ;
      }
      if (this.viz.player.state === 'j') {
        transitionHelper.add_child.call(this.viz.player.item, 'image', this.viz.player.transitionSet.jump(this.viz.player.sprite.rest[0])) ;
      }
        //.call(this.viz.player.item, this.viz.image_transition(this.viz.player.sprite.rest[0]), replacementSwitch) ;
    }
    
    buttonpress.reset () ;
    // console.log ('event up end', 'event', event) ;


  },
	
} ;