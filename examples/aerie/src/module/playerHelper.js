var playerHelper = {

	setup: function player_helper_setup(viz) {

	  viz.player              = setup_element(viz, viz.playerConfig) ;
	  viz.player.orientation  = 'r' ; // all players start facing right
	  viz.player.level        = 0 ;
	  viz.player.update       = playerHelper.update_player ;
	  viz.player.levelup      = playerHelper.levelup ;
    viz.player.paused       = false ;
    viz.player.state        = [] ;

	},
	
  update: function player_helper_update(player) {
    if( player === undefined ) {
    	player = this ;
    }
    if( player.paused === true ) {
      return ;
    }

    var transition ;

    for (var kState = 0 ; kState < player.state.length ; kState++) {
      var keyCode = player.state[kState] ;
      var state ;

        switch (keyCode) {

          case 37: // left
            state = 'l' ;
            break;
          case 38: // up
            state = 'u' ;
            break;
          case 39: // right
            state = 'r' ;
            break;
          case 40: // down
          // case 13: // enter
          // case 32: // space
            state = 'd' ;
            break;
          case 32: // space
            state = 'a' ;
            break ;

        } 

      switch(state) {

 case 'l' :

          var xMin        = -Math.floor(player.sprite.rest[0].originalCanvas.width * 2.3) ;
          var x           = player.item.x - player.xMove ;
          var xNew        = Math.max(xMin, x) ;
          var xTransition = player.transitionSet.x(xNew) ;      
          player.item.add_transition(xTransition) ;

          var viewXmin = -100 ;
          var viz = player.item.viz ;

          var viewTol = 120 ;
          var center = player.item.image.originalCanvas.width * 0.5 + player.item.x ;
          var dist = center - viz.viewportX - viewTol ;

          if(dist < 0 && viz.viewportX > viewXmin) {
            var viewXnew = Math.max(viewXmin, viz.viewportX + dist) ;
            var replacementSwitch = true ;
            viz.add_transition(viz.transitionSet.x(viewXnew), replacementSwitch) ;
          } 

          break ;

        case 'r' :

          var xMax        = Math.floor(player.sprite.rest[0].originalCanvas.width * 6) ;
          var x           = player.item.x + player.xMove ;
          var xNew        = Math.min(xMax, x) ;
          var xTransition = player.transitionSet.x(xNew) ;      
          player.item.add_transition(xTransition) ;      

          var viewXmax = 100 ;
          var viz = player.item.viz ;
          var viewTol = 120 ;
          var center = player.item.image.originalCanvas.width * 0.5 + player.item.x ;
          var dist = (viz.viewportX + viz.width) - center ;
  
          if( dist < viewTol && viz.viewportX < viewXmax ) {
            var viewXnew = Math.min(viewXmax, viz.viewportX + (viewTol - dist)) ;
            var replacementSwitch = true ;
            viz.add_transition(viz.transitionSet.x(viewXnew), replacementSwitch) ;
          }

          break ;
       
        case 'd' :

          var yMax        = Math.floor(player.sprite.rest[0].originalCanvas.height * 5) ;
          var y           = player.item.y + player.yMove ;
          var yNew        = Math.min(yMax, y) ;
          var yTransition = player.transitionSet.y(yNew) ;      
          player.item.add_transition(yTransition) ;    

          var viewYmax = 100 ;
          var viz = player.item.viz ;
          var viewTol = 100 ;
          var center = player.item.image.originalCanvas.height * 0.5 + player.item.y ;
          var dist = (viz.viewportY + viz.height) - center ;
  
          if( dist < viewTol && viz.viewportY < viewYmax ) {
            var viewYnew = Math.min(viewYmax, viz.viewportY + (viewTol - dist)) ;
            var replacementSwitch = true ;
            viz.add_transition(viz.transitionSet.y(viewYnew), replacementSwitch) ;
          }

          
          break ;

        case 'u' :

          var yMin        = -Math.floor(player.sprite.rest[0].originalCanvas.height * 2.5) ;
          var y           = player.item.y - player.yMove ;
          var yNew        = Math.max(yMin, y) ;
          var yTransition = player.transitionSet.y(yNew) ;      
          player.item.add_transition(yTransition) ;           

          var viewYmin = -200 ;
          var viz = player.item.viz ;
          var viewTol = 150 ;
          var center = player.item.image.originalCanvas.height * 0.5 + player.item.y ;
          var dist = center - viz.viewportY ; 
          // console.log('dist', dist, 'viewTol', viewTol, 'viz.viewportY', viz.viewportY, 'viewYmax', viewYmax) ;
  
          if( dist < viewTol && viz.viewportY > viewYmin ) {
            var viewYnew = Math.max(viewYmin, viz.viewportY - (viewTol - dist)) ;
            var replacementSwitch = true ;
            viz.add_transition(viz.transitionSet.y(viewYnew), replacementSwitch) ;
          }

          break ;  

      case 'a' :
       
        if( transitionHelper.find('image', player.item.transition) > -1 ) {
          return ; // don't interrupt the current attack animation 
        }

        if(player.fire_bullet !== undefined) {
          player.fire_bullet('bullet') ; 
        }

        var transitionFunc ;

        if( player.transitionSet.attack === undefined ) {
          transitionFunc = player.transitionSet.image ;
        } else {
          transitionFunc = player.transitionSet.attack ;
        }

        var loop = animate_loop(
          player.loop.attack,
          player.sprite.attack,
          transitionFunc,
          function() {} // buttonpress.reset
        ) ;

        player.loop.attack.position = loop.position ;
        transition                  = loop.animation ;

        var replacementSwitch = true ;
        player.item.add_transition(transition, replacementSwitch) ;

        break ;
               
   
      }

    }
        
  },

} ;