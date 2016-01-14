var inputEvent = {
  
  down: function mousedown (event) {
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

  up: function mouseup (event) {
    // console.log ('mouseup  end', 'event', event) ;

    $Z.prep ([this.viz]) ;

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