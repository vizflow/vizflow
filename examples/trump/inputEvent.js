var inputEvent = {
  
  down: function input_event_down (event) {
     //console.log ('mousedown', 'this', this, 'this.viz', this.viz, 'event', event) ;

    var inputHandler ;

    switch (event.type) {

      case 'keydown': // left
        inputHandler = 'keyboard_handler' ;
        break;
      case 'mousedown': // up
        inputHandler = 'screen_handler' ;
        break;

    }     
  
    function run_click () {
      buttonpress[inputHandler].call (this.viz, event) ;
    }

    var runClick = { prep: run_click, viz: this.viz } ;
   
    $Z.prep ([this.viz, runClick]) ;
    //console.log ('mousedown: holding', holding, 'event', event) ;
  },

  up: function input_event_up (event) {
    // console.log ('mouseup  end', 'event', event) ;

    $Z.prep ([this.viz]) ;

    // console.log('this.viz.player.item.transition', this.viz.player.item.transition) ;

    var transition = this.viz.player.item.transition ;
    if (transition !== undefined) {
      var yIndex ;
      for(var ktrans = 0 ; ktrans < transition.length ; ktrans++) {
        if(transition[ktrans].varName === 'y') {
          yIndex = ktrans ;
        }
      }
      if ( yIndex !== undefined ) {
        var yNew = this.viz.player.config.y - this.viz.player.sprite.height ;
        var player = this.viz.player ;
        transition[yIndex] = this.viz.player.transitionSet.y(yNew) ;
        transition[yIndex].end = function() {
          console.log('end this', this, 'player', player, 'player.item.transition', player.item.transition) ;
          var collisionIndex ;
          var imageIndex ;
          for(var ktrans = 0 ; ktrans < transition.length ; ktrans++) {
            if(transition[ktrans].varName === 'collisionImage') {
              collisionIndex = ktrans ;
            }
            if(transition[ktrans].varName === 'image') {
              imageIndex = ktrans ;
            }
          }
          if(imageIndex !== undefined) {
            // player.item.transition[imageIndex].duration = 0 ;
            // console.log('player.item.transition[imageIndex].child', player.item.transition[imageIndex].child)
            player.item.transition[imageIndex] = player.transitionSet.image(player.sprite.walk[0]) ;
          }
          if(collisionIndex !== undefined) {
            // player.item.transition[collisionImage].duration = 0;
            console.log('player.item.transition[collisionIndex].child', player.item.transition[collisionIndex].child, 'player.sprite.clearedFrame', player.sprite.clearedFrame) ;
            // player.item.transition[collisionIndex].child = player.transitionSet.image(player.sprite.clearedFrame) ;
          }
        }
      }
    }

    if (this.viz.player.restoreRest) {
      if(this.viz.player.item.transition !== undefined) {
        // console.log ('this.viz.player transition', this.viz.player.item.transition) ;
        if(this.viz.player.item.transition.length === 0) {
          this.viz.player.item.transition = this.viz.image_transition(this.viz.player.sprite.rest[0]) ;
        } else if(this.viz.player.item.transition.length === 1) {
          // console.log ('mouseup bug 1', this.viz.player.item.transition[0]) ;
          this.viz.player.item.transition[0].child = this.viz.image_transition(this.viz.player.sprite.rest[0]) ;
          //this.viz.player.item.transition.end = function() { this.viz.player.item.image = this.viz.player.sprite.rest[0] ; } ;
        } else if(this.viz.player.item.transition.length === 2) {
          var transitionWithMaxDuration = this.viz.player.item.transition.slice(0).sort( function(x, y) { return y.duration - x.duration } )[0] ;
          transitionWithMaxDuration.child = this.viz.image_transition(this.viz.player.sprite.rest[0]) ;
          //transitionWithMaxDuration.end = function() { this.viz.player.item.image = this.viz.player.sprite.rest[0] ; } ;
          // console.log ('mouseup bug 2') ;
        } else {
          // console.log('mouseup bug 3') ;
        }
      }
     // xTransition.end = [xTransition.end, function () {
       // _this.item.image = _this.sprite.rest[0] ;
      //}]
    }

    buttonpress.reset () ;

    // console.log ('mouseup  end', 'event', event) ;

  },
	
} ;