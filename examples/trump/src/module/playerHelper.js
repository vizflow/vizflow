var playerHelper = {

	setup: function player_helper_setup(viz) {

		viz.player              = setup_element(viz, viz.playerConfig) ;
	  viz.player.orientation  = 'r' ; // all players start facing right
	  viz.player.level        = 0 ;
	  viz.player.update       = playerHelper.update_player ;
	  viz.player.levelup      = playerHelper.levelup ;
	  viz.player.load_bullet  = playerHelper.load_bullet ;
    viz.player.fire_powerup = powerupHelper.fire ;

	},
	
  update: function player_helper_update(state, player) { 
    // console.log ('playerHelper.update: this.callback: state', state, 'this', this) ;

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
        // console.log ('playerHelper.update 27') ;
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
        // console.log ('update player case j:', 'player.sprite.level[player.level]', player.sprite.level[player.level], 'player.sprite[player.sprite.level[player.level]]', player.sprite[player.sprite.level[player.level]]) ;

        if(transitionHelper.find('y', player.item.transition) !== -1) {
          return ; // currently in the process of jumping so do nothing
        }
        
        player.restoreRest = false ;

        var finalFrame = player.sprite.rest[0] ;

        if(player.config['jump' + player.level] !== undefined) {
        	transition = player.config['jump' + player.level]() ;
        } else if (player.transitionSet.jump !== undefined) {
	        transition = animate(player.sprite.jump, player.transitionSet.jump, undefined, finalFrame) ;
        } else {
          transition = animate(player.sprite.jump, player.transitionSet.image, undefined, finalFrame) ;
        }
        // console.log('update player 56') ;
        
        var yNew        = player.item.y - player.yMove ;
        var yTransition = player.transitionSet.y(yNew) ;

        // console.log('update player', 'yTransition', yTransition) ;
        yTransition.child                 = player.transitionSet.float(yNew) ; // just to take up time
        yTransition.child.child           = player.transitionSet.y(player.config.y) ; // - player.sprite[player.sprite.level[player.level]][0].height) ;
        // yTransition.child.child.child     = player.transitionSet.image (finalFrame) ;
        yTransition.child.child.element = player ;
        yTransition.child.child.end = function () {
          // console.log('player', 'player.element', player.element) ;
          if(this.element.config.restoreRest) {            
            this.element.restoreRest = true ;
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
          if(Math.abs (enemyL - playerR) < tol) {
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
          }// else {
	       		// var panDur = yTransition.duration ; 
	       		// player.item.viz.panY(panDur, [-12, -12, 0]) ;
	        // }

        } 
        var xTransition = player.transitionSet.xJump(xNew) ;

        transition.push(xTransition) ;  
        transition.push(yTransition) ;


        viz.audio.jump1.play() ;

        break ;

      case 'a' :
        //$Z.item (item.push(newBullet)) ;
        // console.log('update player 116') ;
        // if (transitionHelper.find('y', player.item.transition) > -1) {
        //   break ;  // don't allow punch attacks while moving up or down
        // }  
        if(player.fire_bullet !== undefined) {
        	player.fire_bullet('bullet') ; 
        }

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


	levelup: function player_helper_levelup(player) {
		
		if(player === undefined) {
			player = this ;
		}

		// console.log('levelup start')

		player.level++ ; // increment the level value (level-up)

		// console.log('playerHelper levelup:', 'player.level', player.level, 'player.sprite[attack + player.level]', player.sprite['attack' + player.level]) ;

		if(player.sprite['attack' + player.level] !== undefined) {
    	player.sprite.attack = player.sprite['attack' + player.level] ;
    	player.spriteL.attack = player.spriteL['attack' + player.level] ;
    	player.spriteR.attack = player.spriteR['attack' + player.level] ;
		}

		if(player.sprite['hit' + player.level] !== undefined) {
    	player.sprite.hit = player.sprite['hit' + player.level] ;			
    	player.spriteL.hit = player.spriteL['hit' + player.level] ;			
    	player.spriteR.hit = player.spriteR['hit' + player.level] ;			
		}

		if(player.sprite['jump' + player.level] !== undefined) {
    	player.sprite.jump = player.sprite['jump' + player.level] ;			
    	player.spriteL.jump = player.spriteL['jump' + player.level] ;			
    	player.spriteR.jump = player.spriteR['jump' + player.level] ;			
		}

		if(player.sprite['rest' + player.level] !== undefined) {
    	player.sprite.rest = player.sprite['rest' + player.level] ;			
    	player.spriteL.rest = player.spriteL['rest' + player.level] ;			
    	player.spriteR.rest = player.spriteR['rest' + player.level] ;			
		}

		if(player.sprite['walk' + player.level] !== undefined) {
    	player.sprite.walk = player.sprite['walk' + player.level] ;			
    	player.spriteL.walk = player.spriteL['walk' + player.level] ;			
    	player.spriteR.walk = player.spriteR['walk' + player.level] ;			
		}

		player.item.image = player.sprite.rest[0] ;

    if (player.bulletSprite !== undefined) {
      player.bulletSprite.bullet = player.bulletSprite['bullet' + player.level] ;
      player.bulletSpriteL.bullet = player.bulletSpriteL['bullet' + player.level] ;
      player.bulletSpriteR.bullet = player.bulletSpriteR['bullet' + player.level] ; 
      player.bullet.image = player.bulletSprite.bullet[0] ;
      player.bullet.config.shiftY = player.bullet.config.shiftYlist[player.level - 1] ; 
      player.bullet.config.shiftXr = player.bullet.config.shiftXlist[player.level - 1] ; 
    }

	},

  load_bullet: function player_helper_load_bullet(viz) {
    //var bulletSpriteSet0     = bullet_sprite () ;
    var i         = imageHelper.image2canvas('./image/beam_spritesheet.png') ;
    var rowName   = ['jump', 'bullet', 'bullet3', 'bullet2', 'bullet1'] ;
    var width     = [186, 5, 235, 191, 191] ;
    var height    = [38, 5, 249, 84, 84] ;
    var maxHeight = Math.max.apply(null, height) ;
    var spriteset = spriteHelper.get(i, rowName, width, height) ;

    function set_collision (canvas) {
      canvas.sourceCollisionImage = canvas ;
    }
    spriteHelper.foreach(spriteset, set_collision) ;

    // spriteset.bullet[0].sourceCollisionImage = spriteset.bullet[0] ;

    // console.log('spriteset', spriteset) ;
    // imageHelper.view(i) ;
    
    bulletSpriteSet          = spriteHelper.foreach(spriteset, imageHelper.adjust_ratio) ;
    bulletSpriteSet.original = spriteset ;
   
    if (bulletSpriteSet.orientation === 'l') {

      viz.player.bulletSpriteL = bulletSpriteSet ;
      viz.player.bulletSpriteR = spriteHelper.horizontal_flip(player.bulletSpriteL) ;

    } else {

      viz.player.bulletSpriteR = bulletSpriteSet ;
      viz.player.bulletSpriteL = spriteHelper.horizontal_flip(viz.player.bulletSpriteR) ;

    }  

    viz.player.bulletSprite = viz.player.bulletSpriteR ;

    var bulletShiftXl     = -viz.player.bulletSprite.original.bullet[0].width ;
    var bulletShiftXr     = viz.player.sprite.original.rest[0].width + viz.player.bulletSprite.original.bullet[0].width - 16 ;
    var bulletShiftY      = 17 - maxHeight ; 
    var bulletMove        = 150 ;

    function bullet_animation(xNew) {
      return animate (viz.player.bulletSprite.jump, step_transition_func('image', viz.frameDuration))[0] ;
    }    

    var bulletConfig = {
      move: bulletMove,
      shiftXl: bulletShiftXl,
      shiftXr: bulletShiftXr, 
      shiftY: bulletShiftY,
      shiftXlist: [20, 20, 20],
      shiftYlist: [55 - maxHeight, 55 - maxHeight, 135 - maxHeight],
      image: bulletSpriteSet.bullet[0],
      // animation: undefined,
    } ;

    var jumpBulletConfig        = copy_object(bulletConfig) ;
    var jumpBulletDur           = viz.dur * 10 ;

    function jump_bullet_transition(xNew) {
      var transition = step_transition_func ( 'dummy', jumpBulletDur )(xNew) ; // function accepting an x end-value and returning a transition object
      // console.log('jump_bullet_transition', transition) ;
      transition.end = bulletHelper.default_end(viz, this, viz.enemy) ;
      return transition ;
    }

    jumpBulletConfig.image      = bulletSpriteSet.jump[0] ;
    jumpBulletConfig.shiftY     = 39 - maxHeight ;
    jumpBulletConfig.transition = jump_bullet_transition ;
    jumpBulletConfig.move       = 0 ;
    jumpBulletConfig.shiftXl    = -bulletSpriteSet.jump[0].width + 20 ;
    jumpBulletConfig.shiftXr    = viz.player.sprite.original.rest[0].width + viz.player.bulletSprite.original.bullet[0].width - 20 ;

    viz.player.bullet     = bulletHelper.setup (viz, viz.player, bulletConfig) ;  
    viz.player.jumpBullet = bulletHelper.setup (viz, viz.player, jumpBulletConfig) ;  
   
    viz.player.bullet.audio = viz.audio.bullet ;
    viz.player.jumpBullet.audio = viz.audio.bullet ;

    viz.player.fire_bullet  = bulletHelper.fire ;
    
  },

} ;