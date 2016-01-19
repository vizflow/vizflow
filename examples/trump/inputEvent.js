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
        var minJumpBulletHeight = this.viz.player.config.yMove * .4 ;
        var yDist = Math.abs(yNew - this.viz.player.item.y) ;
        // console.log('yDist', yDist) ;
        if (yDist > minJumpBulletHeight) {
          // console.log('input event64') ;
          fire_bullet.call(this.viz.player, 'jumpBullet') ;
        }        
        var _this = this ; // to be removed later when vizflow transition .end functions are promoted to objects
        if (transition[yIndex].endValue !== yNew) { // never cancel downward transition

          transition[yIndex] = this.viz.player.transitionSet.y(yNew) ;
          transition[yIndex].end = function() {
            // console.log('end this', this, 'player', player, 'player.item.transition', player.item.transition) ;
            for(var ktrans = 0 ; ktrans < transition.length ; ktrans++) {
              if(transition[ktrans].varName === 'collisionImage') {
                var newTransition = step_transition_func('collisionImage', _this.viz.dur)(_this.viz.player.sprite.clearedFrame) ;
                // console.log('if collisionImage', 'transition[ktrans]', transition[ktrans], 'newTransition', newTransition) ;
                _this.viz.player.item.transition[ktrans] = newTransition ;
              }
              if(transition[ktrans].varName === 'image') {
                _this.viz.player.item.transition[ktrans] = _this.viz.player.transitionSet.image(_this.viz.player.sprite.rest[0]) ;
              }
              if(_this.viz.player.config.restoreRest) {            
                _this.viz.player.restoreRest = true ;
              }  

            }
            
        }
        //   if(imageIndex !== undefined) {
        //     // player.item.transition[imageIndex].duration = 0 ;
        //     // console.log('player.item.transition[imageIndex].child', player.item.transition[imageIndex].child)
        //   }
        //   if(collisionIndex !== undefined) {
        //     // player.item.transition[collisionImage].duration = 0;
        //     console.log('player.item.transition[collisionIndex].child', player.item.transition[collisionIndex].child, 'player.sprite.clearedFrame', player.sprite.clearedFrame) ;
        //   }
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