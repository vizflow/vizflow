var buttonpress = {

	busy: false,

	reset: function buttonpress_reset () {
    buttonpress.busy = false ;
  },

  screen_handler: function buttonpress_screen_handler (e) {
  
    if (buttonpress.busy) {
      return ;
    }

    buttonpress.busy = true ;

    //this.canvas.removeEventListener ('click', click, false) ;
    var position = set_canvas_position( this.canvas ) ;

    var clickedX = Math.round( (e.clientX - position.left) / position.scale ) ;
    var clickedY = Math.round( (e.clientY - position.top)  / position.scale ) ;

    var color       = this.ui.hiddenContext.getImageData(clickedX, clickedY, 1, 1).data ;
    var buttonIndex = color[0] - 1 ; // color indexing used by image2index is 1-based

    if(buttonIndex >= 0) { // user clicked on a this.ui.button

      var state;

      switch (buttonIndex) {

        case 0: // walk left
          //console.log('walk left', 'button', this.ui.button, 'this.ui.button.walkLeft.transition', this.ui.button.walkLeft.transition) ;
          //console.log('animate([this.ui.buttonSprite.left[1]], this.image_transition, undefined, this.ui.buttonSprite.left[0])', animate([this.ui.buttonSprite.left[1]], this.image_transition, undefined, this.ui.buttonSprite.left[0]));
          this.ui.button.walkLeft.transition = animate([this.ui.buttonSprite.left[1]], this.image_transition, undefined, this.ui.buttonSprite.left[0]) ;
          state = 'l' ;
          break;

        case 1: // walk right
          // this.ui.button.walkRight.transition = animate([this.ui.button[1]], this.image_transition, undefined, this.ui.buttonSprite[0]) ;
          this.ui.button.walkRight.transition = animate([this.ui.buttonSprite.right[1]], this.image_transition, undefined, this.ui.buttonSprite.right[0]) ;
          state = 'r' ;
          break;

        case 2: // attack
          // this.ui.button.attack.transition = animate([this.ui.button[1]], this.image_transition, undefined, this.ui.buttonSprite[0]) ;
          this.ui.button.attack.transition = animate([this.ui.buttonSprite.attack[1]], this.image_transition, undefined, this.ui.buttonSprite.attack[0]) ;
          state = 'a' ;
          break;

        case 3: // jump
          // this.ui.button.jump.transition = animate([this.ui.button[1]], this.image_transition, undefined, this.ui.buttonSprite[0]) ;
          this.ui.button.jump.transition = animate([this.ui.buttonSprite.jump[1]], this.image_transition, undefined, this.ui.buttonSprite.jump[0]) ;
          state = 'j' ;
          break;

      }
      // console.log ('click: state', state, 'this.player', this.player) ;
      this.player.callback (state) ;

    } else {  // user clicks background

      buttonpress.busy = false ;
      
    }

  }, 

  keyboard_handler: function buttonpress_keyboard_handler (event) {

    if (buttonpress.busy) {
      return ;  
    }

    buttonpress.busy = true ;

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
        state = 'a' ;
        break;

    } 
    //console.log ('state', state) ;
    if (state === undefined) {  // user clicks background
      buttonpress.busy = false ;
    } else {
     // console.log('buttonpress_keyboard_handler callback', this) ;
      this.player.callback(state) ;
    }

  },  

} ;