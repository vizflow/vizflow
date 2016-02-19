var gameHelper = {

  load_char: function game_helper_load_characters(viz) {

  	if(viz === undefined) {
  		viz = this ;
  	}

	  viz.player             = setup_element(viz, viz.playerConfig) ;
	  viz.player.orientation = 'r' ; // all players start facing right
	  viz.player.update      = gameHelper.update_player ;

	  viz.enemy        = setup_element(viz, viz.enemyConfig) ;
	  viz.enemy.update = gameHelper.update_enemy ;
		
	  viz.player.adversary = viz.enemy ; // decorate the player object for convenient access to the viz.enemy object 
	  viz.enemy.adversary  = viz.player ;

	  viz.setup_score() ;

	},

	update_enemy: function game_helper_update_enemy (enemy) {

		if(enemy === undefined) {
			enemy = this ;
		}

		// console.log('update_enemy start') ;

	  var transition = animate(enemy.sprite.attack, step_transition_func('image', enemy.config.attackDuration), undefined, enemy.sprite.rest[0])[0] ;

		var replacementSwitch = true ;	
		
		enemy.item.add_transition(transition, replacementSwitch) ;

		enemy.item.add_end('image', 1, {
			element: enemy,
			run: function() {
				// console.log('enemy bullet run')
				fire_bullet.call(enemy.element, 'bullet') ;
			}
		}) ;		

		// console.log('update enemy end') ;

	},	

  update_player: function game_helper_update_player(state, player) { 
    // console.log ('gameHelper.update_player: this.callback: state', state, 'this', this) ;

    // if(this.item.transition !== undefined && this.item.transition.length > 0) {
    //   // console.log(viz.player.item.transition)
    //   return ;
    // }

    if(player === undefined) {
    	player = this ;
    }

    player.state = state ;
    var minNstep = 1 ; // minimum number of frames to animate per user input for walking animations
    var transition ;

     switch(state) {

      case 'l' :

        player.orientation = 'l' ;
        player.sprite = player.spriteL ;
        if (player.bulletSprite !== undefined) {
          player.bulletSprite = player.bulletSpriteL ;
          if (player.bullet !== undefined) {
            player.bullet.image = player.bulletSprite.bullet[0] ;
            // viz.player.bullet     = setup_bullet (viz, viz.player, bulletConfig) ;  
          }
          if (player.jumpBullet !== undefined) {         
            // player.jumpBullet = setup_bullet (player.item.viz, player, player.jumpBullet.config) ;  
            player.jumpBullet.image = player.bulletSprite.jump[0] ;

          }
        }

        //player.sprite.rest[0]   = player.sprite.walk[0] ;
        var loop   = animate_loop (player.loop.walk, player.sprite.walk, player.transitionSet.image) ;
        player.loop.walk.position = loop.position ;
        //console.log ('update player l0', 'player', player, 'buttonpress.reset', buttonpress.reset, 'player.loop.animation[0]', player.loop.animation[0]) ;
        //console.log('player.loop.animation', player.loop.animation)
        transition = loop.animation ;

        var xNew        = Math.max(-Math.floor(player.sprite.original.walk[0].width * 0.5), player.item.x - player.xMove) ;
        var xTransition = player.transitionSet.x(xNew) ;
        xTransition.end = buttonpress.reset ;

        transition.push(xTransition) ;

        break ;

      case 'r' :

        player.orientation   = 'r' ;
        player.sprite   = player.spriteR ;
        if (player.bulletSprite !== undefined) {
          player.bulletSprite = player.bulletSpriteR ;
          if (player.bullet !== undefined) {
            player.bullet.image = player.bulletSprite.bullet[0] ;
          }
          if (player.jumpBullet !== undefined) {
            //console.log ('player.jumpBullet.config.shiftX', player.jumpBullet.config.shiftX, 'player.jumpBullet.image.width', player.jumpBullet.image.width) ;
            // player.jumpBullet = setup_bullet (player.item.viz, player, player.jumpBullet.config) ;              
            player.jumpBullet.image = player.bulletSprite.jump[0] ;
          }
        }        
        // console.log ('gameHelper.update_player 27') ;
        var loop     = animate_loop (player.loop.walk, player.sprite.walk, player.transitionSet.image) ;
        // console.log('update player 57') ;
        player.loop.walk.position = loop.position ;
        transition = loop.animation ;

        var xNew        = Math.min(Math.floor(player.item.viz.width - 0.5 * player.sprite.original.rest[0].width), player.item.x + player.xMove) ;
        var xTransition = player.transitionSet.x(xNew) ;
        xTransition.end = buttonpress.reset ;

        transition.push(xTransition) ;

        break ;

      case 'j' :
        // console.log ('update player case j:', player.sprite.jump, player.transitionSet.image, buttonpress.reset, player.sprite.rest[0])

        if(transitionHelper.find('y', player.item.transition) !== -1) {
          return ; // currently in the process of jumping so do nothing
        }
        player.restoreRest = false ;

        var finalFrame = player.sprite.rest[0] ;

        if(player.transitionSet.jump !== undefined) {
          var jumpTransition       = step_transition_func('image', player.item.viz.dur)(player.sprite.jump[0]) ;
          jumpTransition.child     = animate(player.sprite.jump, player.transitionSet.jump, undefined, player.sprite.rest[0])[0] ;
          transition               = [jumpTransition] ;          
          // transition = animate(player.sprite.jump, player.transitionSet.jump, undefined, finalFrame) ;
        } else {
          transition = animate(player.sprite.jump, player.transitionSet.image, undefined, finalFrame) ;
        }
        // console.log('update player 56') ;
        
        var yNew        = player.item.y - player.yMove ;
        var yTransition = player.transitionSet.y(yNew) ;

        // console.log('update player', 'yTransition', yTransition) ;
        yTransition.child                 = player.transitionSet.float(yNew) ; // just to take up time
        yTransition.child.child           = player.transitionSet.y(player.config.y) ; // - player.sprite.jump[0].height) ;
        // yTransition.child.child.child     = player.transitionSet.image (finalFrame) ;
        yTransition.child.child.element = player ;
        yTransition.child.child.end = function () {
          // console.log('player', 'player.element', player.element) ;
          if(player.element.config.restoreRest) {            
            player.element.restoreRest = true ;
          } 
        }

        if(player.orientation === 'l') {
          var xNew = Math.max(-Math.floor(player.sprite.original.walk[0].width * 0.5), player.item.x - player.xJumpMove) ; 
        } else {
          var xNew = Math.min(Math.floor(player.item.viz.width - 0.5 * player.sprite.original.rest[0].width), player.item.x + player.xJumpMove) ;     

          // check for potential collisions and if so, trigger a zoom effect 

          var playerR = player.item.image.xNew + player.sprite.original.jump[0].width ;
          var enemyL  = player.item.viz.enemy.item.x ;

          var tol = Infinity ;
          if(enemyL - playerR < tol) {
            // console.log('update player zoom') ;
            var scale = 0.6 ;
            var duration = 6 * player.config.jumpDuration + player.config.floatDuration ;

            // console.log('update player jump zoom duration', 'duration', duration)

            var newWidth  = player.item.viz.width * scale ;
            var newHeight = player.item.viz.height * scale ;

            player.item.viz.zoom_inout({
              duration: duration, 
              x: player.item.viz.enemy.item.x - 40, 
              y: -10, 
              width:  newWidth, 
              height: newHeight,
            }) ;
          }

        }
        var xTransition = player.transitionSet.xJump(xNew) ;

        transition.push(xTransition) ;  
        transition.push(yTransition) ;

        // var panDur = yTransition.duration ; 
        // player.item.viz.panY(panDur, [-12, -12, 0]) ;

        viz.audio.jump1.play() ;

        break ;

      case 'a' :
        //$Z.item (item.push(newBullet)) ;
        // console.log('update player 116') ;
        // if (transitionHelper.find('y', player.item.transition) > -1) {
        //   break ;  // don't allow punch attacks while moving up or down
        // }  
        fire_bullet.call(player, 'bullet') ;
        var transitionFunc;
        if( player.transitionSet.attack === undefined ) {
          //  console.log ('player.transitionSet.image', player.transitionSet.image) ;
          transitionFunc = player.transitionSet.image ;
        } else {
          transitionFunc = player.transitionSet.attack ;
        }
        // console.log ('updateplayer 101', player.sprite.attack, transitionFunc, buttonpress.reset, player.sprite.rest[0]) ;
        var finalFrame = player.sprite.rest[0] ;

        var loop = animate_loop(
          player.loop.attack,
          player.sprite.attack,
          transitionFunc,
          buttonpress.reset
        ) ;

        player.loop.attack.position = loop.position ;
        transition                = loop.animation ;
        // console.log ('update player 105: ', 'player.loop', player.loop, 'player.sprite.attack', player.sprite.attack, 'transition', transition) ; //player.sprite.attack, transitionFunc, buttonpress.reset, player.sprite.rest[0]) ;
        // console.log ('update player 109' ) ;

        // console.log ('player.callback: transition', transition) ;
        break ;

    }

    if (transition.length > 0) {
      // console.log('player.callback: transition', transition)
      //player.item.transition = transition ;
      var replacementSwitch = true ;
      transitionHelper.add.call(player.item, transition, replacementSwitch) ;
      // console.log('update player after transitionhelper', 'player.item', player.item) ;
    } else {
      buttonpress.reset () ;
    }

  },

} ;