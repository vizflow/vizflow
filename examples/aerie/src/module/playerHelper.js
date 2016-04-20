var playerHelper = {

	setup: function player_helper_setup(viz) {

	  viz.player              = setup_element(viz, viz.playerConfig) ;
	  viz.player.orientation  = 'r' ; // all players start facing right
	  viz.player.level        = 0 ;
	  viz.player.update       = playerHelper.update_player ;
	  viz.player.levelup      = playerHelper.levelup ;
	  // viz.player.load_bullet  = playerHelper.load_bullet ;
    // viz.player.fire_powerup = powerupHelper.fire ;
    viz.player.paused       = false ;
    viz.player.state        = [] ;

	},
	
  update: function player_helper_update(player) {
    // console.log('update player 17') ;
    if( player === undefined ) {
    	player = this ;
    }
    // console.log('player helper 21') ;
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

        // if(player.orientation === 'l') { // player only attacks towards enemy in this game
        //   return ;
        // }

       
        if( transitionHelper.find('image', player.item.transition) > -1 ) {
          return ; // don't interrupt the current attack animation 
        }

        if(player.fire_bullet !== undefined) {
          player.fire_bullet('bullet') ; 
        }

        var transitionFunc ;

        if( player.transitionSet.attack === undefined ) {
          //  console.log ('player.transitionSet.image', player.transitionSet.image) ;
          transitionFunc = player.transitionSet.image ;
        } else {
          transitionFunc = player.transitionSet.attack ;
        }

        // console.log ('updateplayer 101', player.sprite.attack, transitionFunc, buttonpress.reset, player.sprite.rest[0]) ;

        // var finalFrame ; 

        // if(player.restoreRest) {
        //   finalFrame = player.sprite.rest[0] ;
        // }

        var loop = animate_loop(
          player.loop.attack,
          player.sprite.attack,
          transitionFunc,
          function() {} // buttonpress.reset
          // finalFrame
        ) ;

        player.loop.attack.position = loop.position ;
        transition                  = loop.animation ;

        var replacementSwitch = true ;
        player.item.add_transition(transition, replacementSwitch) ;

        // console.log ('update player 105: ', 'player.loop', player.loop, 'player.sprite.attack', player.sprite.attack, 'transition', transition) ; //player.sprite.attack, transitionFunc, buttonpress.reset, player.sprite.rest[0]) ;
        // console.log ('update player 109' ) ;

        // console.log ('player.callback: transition', transition, 'player.sprite.attack', player.sprite.attack) ;
        break ;
               
   
      }

    }
        
  },

	levelup: function player_helper_levelup( player ) {
		
		if( player === undefined ) {
			player = this ;
		}

		// console.log('levelup start')

		player.level++ ; // increment the level value (level-up)

		// console.log('playerHelper levelup:', 'player.level', player.level, 'player.sprite[attack + player.level]', player.sprite['attack' + player.level]) ;

		if( player.sprite['attack' + player.level] !== undefined ) {
    	player.sprite.attack = player.sprite['attack' + player.level] ;
    	player.spriteL.attack = player.spriteL['attack' + player.level] ;
    	player.spriteR.attack = player.spriteR['attack' + player.level] ;
		}

		if( player.sprite['hit' + player.level] !== undefined ) {
    	player.sprite.hit = player.sprite['hit' + player.level] ;			
    	player.spriteL.hit = player.spriteL['hit' + player.level] ;			
    	player.spriteR.hit = player.spriteR['hit' + player.level] ;			
		}

		if( player.sprite['jump' + player.level] !== undefined ) {
    	player.sprite.jump = player.sprite['jump' + player.level] ;			
    	player.spriteL.jump = player.spriteL['jump' + player.level] ;			
    	player.spriteR.jump = player.spriteR['jump' + player.level] ;			
		}

		if( player.sprite['rest' + player.level] !== undefined ) {
    	player.sprite.rest = player.sprite['rest' + player.level] ;			
    	player.spriteL.rest = player.spriteL['rest' + player.level] ;			
    	player.spriteR.rest = player.spriteR['rest' + player.level] ;			
		}

		if( player.sprite['walk' + player.level] !== undefined ) {
    	player.sprite.walk = player.sprite['walk' + player.level] ;			
    	player.spriteL.walk = player.spriteL['walk' + player.level] ;			
    	player.spriteR.walk = player.spriteR['walk' + player.level] ;			
		}

		player.item.image = player.sprite.rest[0] ;

	},

  setup_bullet: function player_helper_setup_bullet( viz, player, bulletConfig ) {

    var bullet = {} ;

    return bullet ;

  },  

  load_bullet: function player_helper_load_bullet( viz ) {

    viz.player.bullet      = playerHelper.setup_bullet ( viz, viz.player, bulletConfig ) ;  
    viz.player.jumpBullet  = playerHelper.setup_bullet ( viz, viz.player, jumpBulletConfig ) ;      
    
    viz.player.fire_bullet = bulletHelper.fire ;
    
  },

} ;