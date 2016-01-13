var buttonpress = {

	busy: false,

	reset: function buttonpress_reset () {
    buttonpress.busy = false ;
  },

  handler: function buttonpress_handler (e) {
  
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
          // this.ui.button.walkLeft.transition = animate([this.ui.button[1]], this.image_transition, undefined, this.ui.buttonSprite[0]) ;
          state = 'l' ;
          break;
        case 1: // walk right
          // this.ui.button.walkRight.transition = animate([this.ui.button[1]], this.image_transition, undefined, this.ui.buttonSprite[0]) ;
          state = 'r' ;
          break;
        case 2: // attack
          // this.ui.button.attack.transition = animate([this.ui.button[1]], this.image_transition, undefined, this.ui.buttonSprite[0]) ;
          state = 'a' ;
          break;
        case 3: // jump
          // this.ui.button.jump.transition = animate([this.ui.button[1]], this.image_transition, undefined, this.ui.buttonSprite[0]) ;
          state = 'j' ;
          break;

      }
      // console.log ('click: state', state, 'this.player', this.player) ;
      this.player.callback (state) ;

    } else {  // user clicks background
      buttonpress.busy = false ;
    }

  }, 

} ;