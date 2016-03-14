var playerHelper = {

	setup: function player_helper_setup(viz) {

		viz.player              = setup_element(viz, viz.playerConfig) ;
    // console.log('playerHelper setup', 'viz.player.item.y', viz.player.item.y, 'viz.playerConfig', viz.playerConfig) ;
	  viz.player.orientation  = 'r' ; // all players start facing right
	  viz.player.level        = 0 ;
	  viz.player.update       = playerHelper.update_player ;
	  viz.player.levelup      = playerHelper.levelup ;
	  viz.player.load_bullet  = playerHelper.load_bullet ;
    viz.player.fire_powerup = powerupHelper.fire ;
    viz.player.paused = true ;

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

    if(player.paused === true) {

      return ;
    }

    if(state !== undefined) {      
      player.state = state ;
    }

    var transition ;

     switch(player.state) {

      case 'l' :

        // console.log('playerHelper update: l', 'player.item.transition', player.item.transition) ;

        if( transitionHelper.find('image', player.item.transition) > -1 ) {
          return ; // currently in the process of animating so do nothing
        }

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

        if( transitionHelper.find('y', player.item.transition) > -1 ) { // means the player is jumping
          return ; // don't run walk animation during jump to avoid interrupting the jump animation
        }
        
        //player.sprite.rest[0]   = player.sprite.walk[0] ;
        var loop   = animate_loop (player.loop.walk, player.sprite.walk, player.transitionSet.image) ;
        player.loop.walk.position = loop.position ;
        //console.log ('update player l0', 'player', player, 'buttonpress.reset', buttonpress.reset, 'player.loop.animation[0]', player.loop.animation[0]) ;
        //console.log('player.loop.animation', player.loop.animation)

        transition = loop.animation[0] ;

        var replacementSwitch = true ;
        transitionHelper.add.call(player.item, transition, replacementSwitch) ;

        var xMin        = -Math.floor(player.sprite.walk[0].originalCanvas.width * 0.5) ;
        var x           = player.item.x - player.xMove ;
        var xNew        = Math.max(xMin, x) ;
        var xTransition = player.transitionSet.x(xNew) ;

        var viewXmin = -20 ;
        var viz = player.item.viz ;
        var viewTol = 20 ;
        var center = player.item.image.originalCanvas.width * 0.5 + player.item.x ;
        var dist = center - viz.viewportX - viewTol ;

        if(dist < 0 && viz.viewportX > viewXmin) {
          var viewXnew = Math.max(viewXmin, viz.viewportX + dist) ;
          var replacementSwitch = true ;
          viz.add_transition(viz.transitionSet.x(viewXnew), replacementSwitch) ;
        } 

        var replacementSwitch = true ;
        player.item.add_transition(xTransition, replacementSwitch) ;

        // xTransition.end = buttonpress.reset ;

        // transition.push(xTransition) ;

        break ;

      case 'r' :

        if( transitionHelper.find('image', player.item.transition) > -1 ) {
          return ; // currently in the process of animating so do nothing
        }

        // console.log('playerHelper update: r', 'player.item.transition', player.item.transition) ;

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

        // console.log('playerHelper update: before loop', 'player.item.transition', player.item.transition, 'transitionHelper.find(player.item.transition, y)', transitionHelper.find('y', player.item.transition)) ;

        if( transitionHelper.find('y', player.item.transition) > -1 ) { // means the player is jumping
          return ; // don't run walk animation during jump to avoid interrupting the jump animation
        }

        var loop     = animate_loop (player.loop.walk, player.sprite.walk, player.transitionSet.image) ;
        // console.log('update player 57') ;
        player.loop.walk.position = loop.position ;

        transition = loop.animation[0] ;

        var replacementSwitch = true ;
        player.item.add_transition(transition, replacementSwitch) ;

        // console.log('playerHelper 143', 'player.sprite', player.sprite) ;

        var xMax        = Math.floor(player.item.viz.width - 0.5 * player.sprite.rest[0].originalCanvas.width) ;
        var xNew        = Math.min(xMax, player.item.x + player.xMove) ;
        var xTransition = player.transitionSet.x(xNew) ;

        var viewXmax = 20 ;
        var viz = player.item.viz ;
        var viewTol = 140 ;
        var center = player.item.image.originalCanvas.width * 0.5 + player.item.x ;
        var dist = (viz.viewportX + viz.width) - center ;
        if( dist < viewTol && viz.viewportX < viewXmax ) {
          var viewXnew = Math.min(viewXmax, viz.viewportX + (viewTol - dist)) ;
          var replacementSwitch = true ;
          viz.add_transition(viz.transitionSet.x(viewXnew), replacementSwitch) ;
        }

        var replacementSwitch = true ;
        player.item.add_transition(xTransition, replacementSwitch) ;

        // xTransition.end = buttonpress.reset ;

        // transition.push(xTransition) ;

        break ;

      case 'j' :
        // console.log ('update player case j:', 'player.sprite.level[player.level]', player.sprite.level[player.level], 'player.sprite[player.sprite.level[player.level]]', player.sprite[player.sprite.level[player.level]]) ;

        if(transitionHelper.find('y', player.item.transition) > -1) {
          return ; // currently in the process of jumping so do nothing
        }
        
        // console.log('update player 56') ;
        
        var yNew        = player.item.y - player.yMove ;
        var yTransition = player.transitionSet.y(yNew) ;

        // console.log('update player', 'yTransition', yTransition) ;
        yTransition.child                 = player.transitionSet.float(yNew) ; // just to take up time
        yTransition.child.child           = player.transitionSet.y(player.config.y) ; // - player.sprite[player.sprite.level[player.level]][0].height) ;
        // yTransition.child.child.child     = player.transitionSet.image (finalFrame) ;
        yTransition.child.child.element = player ;
        // yTransition.child.child.end = function () {
        //   // console.log('player', 'player.element', player.element) ;
        //   if(this.element.config.restoreRest) {            
        //     this.element.restoreRest = true ;
        //   } 
        // }

        if(player.orientation === 'l') {
          var xNew = Math.max(-Math.floor(player.sprite.walk[0].originalCanvas.width * 0.5), player.item.x - player.xJumpMove) ; 
        } else {
          var xNew = Math.min(Math.floor(player.item.viz.width - 0.5 * player.sprite.rest[0].originalCanvas.width), player.item.x + player.xJumpMove) ;     
        } 

        var xTransition = player.transitionSet.xJump(xNew) ;

        var replacementSwitch = true ;

        // player.restoreRest = false ;
        var finalFrame ; // = player.sprite.rest[0] ;

        if (player.restoreRest === true) {
          finalFrame = player.sprite.rest[0] ;  
        }

        var yDur = transitionHelper.duration (yTransition) ;

        if(player.config['jump' + player.level] !== undefined) {
          // console.log('player helper jump0') ;
          transition = player.config['jump' + player.level]() ;
          player.item.add_transition(transition, replacementSwitch) ;

        } else if (player.transitionSet.jump !== undefined) {

          transition = animate(player.sprite.jump, player.transitionSet.jump)[0] ;
          var dur = transitionHelper.duration (transition) ;
          var trim = 150 ;
          var diff = Math.max (0, yDur - dur - trim) ;
          var trans = step_transition_func ('image', 1) (player.sprite.rest[0]) ;

          transitionHelper.add_child (transition, trans, diff) ;
          // console.log('player helper jump1', 'player.sprite.jump', player.sprite.jump, 'transition', transition, 'dur', dur, 'diff', diff) ;

          player.item.add_transition(transition, replacementSwitch) ;


        } else {
          // console.log('player helper jump2') ;          
          transition = animate(player.sprite.jump, player.transitionSet.image, undefined, finalFrame) ;
          player.item.add_transition(transition, replacementSwitch) ;

        }

        player.item.add_transition(xTransition, replacementSwitch) ;
        player.item.add_transition(yTransition, replacementSwitch) ;
        
        var dur =  transitionHelper.duration (yTransition) ;
        var pause = 0.66 * dur;
        var panDur = (dur - pause) * 0.5 ;
        var panFunc  = $Z.transition.rounded_linear_transition_func('viewportY', panDur) ;

        var viewYmax = 30 ;
        var viewY    = Math.max(-0.25 * player.yMove, -viewYmax) ;

        var panTrans   = panFunc(viewY) ;
        panTrans.pause = pause ;
        panTrans.child = panFunc(0) ; ;

        player.item.viz.add_transition(panTrans) ;

        player.item.viz.audio.jump1.play() ;

        break ;

      case 'a' :

        if(player.orientation === 'l') { // player only attacks towards enemy in this game
          return ;
        }

        if(transitionHelper.find('y', player.item.transition) > -1) {
          return ; // currently in the process of jumping so do nothing
        }
        
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
      player.bullet.singleSwitch = false ; // beams can hit multiple targets
      player.bulletSprite.bullet = player.bulletSprite['bullet' + player.level] ;
      player.bulletSpriteL.bullet = player.bulletSpriteL['bullet' + player.level] ;
      player.bulletSpriteR.bullet = player.bulletSpriteR['bullet' + player.level] ; 
      player.bullet.image = player.bulletSprite.bullet[0] ;
      player.bullet.config.shiftY = player.bullet.config.shiftYlist[player.level - 1] ; 
      player.bullet.config.shiftXr = player.bullet.config.shiftXlist[player.level - 1] ; 

      player.bulletSprite.jump = player.bulletSprite['jump' + player.level] ;
      player.bulletSpriteL.jump = player.bulletSpriteL['jump' + player.level] ;
      player.bulletSpriteR.jump = player.bulletSpriteR['jump' + player.level] ; 
      player.jumpBullet.image = player.bulletSprite.jump[0] ;
      player.jumpBullet.config.shiftY = player.jumpBullet.config.shiftYlist[player.level] ; 
      player.jumpBullet.config.shiftXr = player.jumpBullet.config.shiftXlist[player.level] ; 
      // console.log('player.jumpBullet.config', player.jumpBullet.config)
    }

    var yDelta = 15 ;
    player.yMove += yDelta ;

	},

  setup_bullet: function player_helper_setup_bullet(viz, player, bulletConfig) {

   function bullet_transition(xNew) {

      this.opacity = 1 ;
      var bulletDur  = viz.dur * 20 ;
      var transition = $Z.transition.rounded_linear_transition_func ( 'x', bulletDur )(xNew) ; // function accepting an x end-value and returning a transition object
      transition.end = bulletHelper.default_end(viz, this, viz.enemy) ;
      viz.audio.bullet.play() ;
      return transition ;

    }

    function beam_transition(xNew) {

      // viz.player.bullet.fade ({
      //   opacity: 0,
      //   duration: viz.frameDuration * viz.player.bulletSprite['bullet' + viz.player.level].length * 1.25,
      // }) ;

      this.opacity = 1 ;
      var transition = animate (viz.player.bulletSprite['bullet' + viz.player.level], step_transition_func('image', viz.frameDuration))[0] ;

      var trans = transitionHelper.get_child (transition, viz.player.bulletSprite['bullet' + viz.player.level].length - 1) ;

      var clearedFrame = imageHelper.create(trans.endValue.width, trans.endValue.height) ;
      var rechargeDur = 1000 ;
      var last = step_transition_func('image', rechargeDur)(clearedFrame) ;
      last.end = bulletHelper.default_end(viz, this, viz.enemy) ;
      trans.child = last ; 
      viz.audio.laser.play() ;
      // transitionHelper.add_end.call (this, 'image', viz.player.bulletSprite['bullet' + viz.player.level].length -1, bulletHelper.default_end(viz, this, viz.enemy)) ;    
      // console.log('bullet helper beam trnsition', 'transition', transition, 'this', this) ;  
      return transition ;

    }


    function missile_transition(xNew) {

      this.opacity = 1 ;
      var bulletDur  = viz.dur * 30 ;
      var drift = 4 ;
      var transition1 = $Z.transition.rounded_linear_transition_func ( 'x', bulletDur / 3 )(this.x + drift)
      var transition2 = $Z.transition.rounded_linear_transition_func ( 'x', 2 * bulletDur / 3 )(xNew) ; // function accepting an x end-value and returning a transition object
      transition2.end = bulletHelper.default_end(viz, this, viz.enemy) ;
      transition1.child = transition2 ;
      viz.audio.missile.play() ;

      return transition1 ;
      
    }

    var bullet = {

      viz: viz, 
      config: bulletConfig,
      x: player.item.x + bulletConfig.shiftXr,
      y: player.item.y + bulletConfig.shiftY,
      image: bulletConfig.image,
      transition: bulletConfig.transition,
      animation: bulletConfig.animation,
      // explode: imageEffectHelper.explode, // bug - explode on bullets not working #todo
      render: drawHelper.image,
      inert: false,
      type: 'player',
      singleSwitch: true,
      collision_image: actionHelper.collision_image,
      fade: imageEffectHelper.fade,
      bullet0: bullet_transition,
      bullet1: beam_transition,
      bullet2: beam_transition,
      bullet3: beam_transition,
      jump_bullet_transition: missile_transition,
      busy: false,

    } ;

    return bullet ;

  },  

  load_bullet: function player_helper_load_bullet(viz) {

    var i         = imageHelper.image2canvas('./image/beam_spritesheet.png') ;
    var rowName   = ['bullet', 'bullet1', 'bullet2', 'bullet3', 'jump', 'jump1'] ;
    var width     = [5, 186, 200, 200, 20, 60] ;
    var height    = [5, 10, 34, 110, 12, 32] ;
    var maxHeight = Math.max.apply(null, height) ;
    var bulletSpriteSet = spriteHelper.get(i, rowName, width, height) ;

    function set_collision (canvas) {
      canvas.sourceCollisionImage = canvas.originalCanvas ;
    }
    spriteHelper.foreach(bulletSpriteSet, set_collision) ;

    // spriteset.bullet[0].sourceCollisionImage = spriteset.bullet[0] ;

    // console.log('spriteset', spriteset) ;
    // imageHelper.view(i) ;
       
    if (bulletSpriteSet.orientation === 'l') {

      viz.player.bulletSpriteL = bulletSpriteSet ;
      viz.player.bulletSpriteR = spriteHelper.horizontal_flip(player.bulletSpriteL) ;

    } else {

      viz.player.bulletSpriteR = bulletSpriteSet ;
      viz.player.bulletSpriteL = spriteHelper.horizontal_flip(viz.player.bulletSpriteR) ;

    }  

    viz.player.bulletSprite = viz.player.bulletSpriteR ;

    var bulletShiftXl     = -viz.player.bulletSprite.bullet[0].originalCanvas.width ;
    var bulletShiftXr     = viz.player.sprite.rest[0].originalCanvas.width + viz.player.bulletSprite.bullet[0].originalCanvas.width - 16 ;
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
      shiftXlist: [25, 16, 20],
      shiftYlist: [19 - maxHeight, 30 - maxHeight, 67 - maxHeight],
      image: bulletSpriteSet.bullet[0],
      // animation: undefined,
    } ;

    var jumpBulletConfig = copy_object(bulletConfig) ;
    var jumpBulletDur    = viz.dur * 40 ;

    // function jump_bullet_transition(xNew) {
    //   var transition = step_transition_func ( 'dummy', jumpBulletDur )(xNew) ; // function accepting an x end-value and returning a transition object
    //   // console.log('jump_bullet_transition', transition) ;
    //   transition.end = bulletHelper.default_end(viz, this, viz.enemy) ;
    //   return transition ;
    // }

    // jumpBulletConfig.transition = jump_bullet_transition ;

    jumpBulletConfig.image   = bulletSpriteSet.jump[0] ;
    jumpBulletConfig.shiftY  = 25 - maxHeight ;
    jumpBulletConfig.move    = bulletMove ;
    jumpBulletConfig.shiftXl = -bulletSpriteSet.jump[0].width + 20 ;
    jumpBulletConfig.shiftXr = viz.player.sprite.rest[0].originalCanvas.width + viz.player.bulletSprite.bullet[0].originalCanvas.width - 17 ;

    jumpBulletConfig.shiftXlist = new Array (jumpBulletConfig.shiftXlist.length) ;
    jumpBulletConfig.shiftYlist = new Array (jumpBulletConfig.shiftYlist.length) ;

    for (var klist = 0 ; klist < jumpBulletConfig.shiftXlist.length ; klist++) {
      jumpBulletConfig.shiftXlist[klist] = jumpBulletConfig.shiftXl ;
      jumpBulletConfig.shiftYlist[klist] = jumpBulletConfig.shiftYl ;
    }

    var yShift = -75 ;
    var xShift = 20 ; 
    
    jumpBulletConfig.shiftYlist[1] = yShift ;
    jumpBulletConfig.shiftXlist[1] = xShift ;

    viz.player.bullet     = playerHelper.setup_bullet (viz, viz.player, bulletConfig) ;  
    viz.player.jumpBullet = playerHelper.setup_bullet (viz, viz.player, jumpBulletConfig) ;  
     

    viz.player.bullet.audio     = viz.audio.bullet ;
    viz.player.jumpBullet.audio = viz.audio.missile ;
    

    viz.player.fire_bullet  = bulletHelper.fire ;
    
  },

} ;