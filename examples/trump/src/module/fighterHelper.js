var fighterHelper = {

	selectDur: 150,

	screen_callback: function(x, y, viz) {

	 	if(viz === undefined) {
			viz = this ;
		}

	  console.log('fighterHelper.screen_callback', 'viz.loading', viz.loading) ;

		if(viz.loading) {
	    viz.buttonpress.reset() ;
			return ;
		}

    if (y > viz.jesus.y && y <= viz.jesus.y + viz.sprite.original.jesus[0].height) {
    	viz.jesus.select.fade({ duration: fighterHelper.selectDur }) ;
    	city_level() ;
    }

    if (y > viz.rastan.y && y <= viz.rastan.y + viz.sprite.original.rastan[0].height) {
    	viz.rastan.select.fade({
    		duration: fighterHelper.selectDur,
    		end: fantasy_level,
    	}) ;
    	viz.jesus.select.fade({ duration: fighterHelper.selectDur }) ;
    }

    if (y > viz.megyn.y && y <= viz.megyn.y + viz.sprite.original.megyn[0].height) {
   		viz.megyn.select.fade({
   			duration: fighterHelper.selectDur,
   			end: space_level,
   		}) ;
    	viz.jesus.select.fade({ duration: fighterHelper.selectDur }) ;
    }

    viz.buttonpress.reset() ;

  }, 

	load: function fighter_helper_load(viz) {

 		if(viz === undefined) {
  		viz = this ;
  	}

  	viz.loading = true ; // to prevent UI from activating until menu page finishes loading

		viz.fade({
		  opacity: 1,
		  duration: viz.fadeDuration,
		  pause: viz.fadeDuration,
		  child: imageEffectHelper.fade_transition({

		    opacity: 0, 

		    end: function() {
		      // console.log(viz.config.backgroundImageUrl) ;
		      viz.image = imageHelper.adjust_ratio(imageHelper.image2canvas(viz.config.backgroundImageUrl)) ;  			
				},
		    child: imageEffectHelper.fade_transition({
		      opacity: 1,
		      end: function() {
		    		fighterHelper.load_select(viz) ;
			      viz.add_item([ // this is the array of objects that are used by the vizflow visualization engine for the main animation loop
			         viz.choose,
			         viz.jesus,
			         viz.rastan,
			         viz.megyn,
			         viz.jesus.select,
			         viz.rastan.select,
			         viz.megyn.select,
			      ]) ;

			      viz.choose.fade({
			      	end: function () {
			      		var xDur = 500 ;
			      		var x_trans_creator = $Z.transition.rounded_linear_transition_func('x', xDur) ;
			      		var xTrans = x_trans_creator(viz.jesus.x - viz.sprite.jesus[0].width) ;
			      		xTrans.end = function() {
			      			viz.shake() ;
			      			viz.audio.hit3.play() ;
			      			var xTrans = x_trans_creator(viz.rastan.x + viz.sprite.rastan[0].width) ;
			      			xTrans.end = function() {
			      				viz.shake() ;
			      				viz.audio.hit3.play() ;
			      				var xTrans = x_trans_creator(viz.megyn.x - viz.sprite.megyn[0].width) ;
			      				xTrans.end = function() {
			      					viz.audio.hit3.play() ;
			      					viz.shake() ;
			      					viz.jesus.select.fade({ 
			      						duration: fighterHelper.selectDur,
			      						end: function() {
			      							viz.loading = false ;
			      						},
			      					}) ;
			      				}
			      				
			      				viz.megyn.add_transition(xTrans) ;
			      			}

			      			viz.rastan.add_transition(xTrans) ;
			      		}

			      		viz.jesus.add_transition (xTrans) ;

			      	},
			      }) ;
		      
		    		    		
		      	// console.log('fighter helper load') ;
		      },
		    }),				
			}),
		}) ; 
	},

	run: function fighter_helper_run(viz) {
 		if(viz === undefined) {
  		viz = this ;
  	}

		viz.fade({
		  opacity: 1,
		  duration: viz.fadeDuration,
		  pause: viz.fadeDuration,
		  child: imageEffectHelper.fade_transition({

		    opacity: 0, 

		    end: function() {
		      // console.log(viz.config.backgroundImageUrl) ;
		      viz.image = imageHelper.adjust_ratio(imageHelper.image2canvas(viz.config.backgroundImageUrl)) ;

		      viz.add_item([ // this is the array of objects that are used by the vizflow visualization engine for the main animation loop
		          viz.enemy.item,
		          viz.player.item,
		          viz.ui.button.walkLeft,
		          viz.ui.button.walkRight,
		          viz.ui.button.attack,
		          viz.ui.button.jump,
		          viz.enemy.item.actionSet.hit.healthbar.item,
		          viz.player.item.actionSet.hit.healthbar.item,
		          viz.player.score,
		      ]) ;
		      
		    },

		    child: imageEffectHelper.fade_transition({
		      opacity: 1,
		      end: viz_run,
		    }),
		  }),
		}) ;

		function viz_run() {

		  var Nstep = 6 ; // 2 * Math.floor(0.5 * viz.fadeDuration / viz.frameDuration) ;

		  // console.log('viz_run', 'Nstep', Nstep, 'viz', viz) ;

		  viz.enemy.item.flash(viz.frameDuration, Nstep) ;
		  transitionHelper.add_end.call(viz.enemy.item, 'render', Nstep - 1, function() {
		    viz.enemyAttack.on = true ;
		  }) ;

		}

		function viz_switch() {

		  // console.log('viz_switch', 'viz', viz) ;
		  var image = imageHelper.adjust_ratio(imageHelper.image2canvas(viz.config.backgroundImageUrl)) ;
		  // console.log('viz', viz, 'image', image, 'viz_run', viz_run) ;
		  viz.fade({
		    opacity: 1,
		    duration: viz.fadeDuration,
		    end: viz_run,
		  }) ;
		  // viz.fade_switch({image: image, end: viz_run})     
		}
	},

	load_select: function fighter_helper_load_select (viz) {
		if(viz === undefined) {
		  viz = this ;
  	}

  	viz.sprite = viz.selectorConfig.sprite_loader() ;
  	viz.load_audio() ;

  	viz.choose = viz.setup_item ({
  		x: 4,
  		y: -20,
  		image: viz.sprite.choose[0],
  		opacity: 0, 
  	}) ; 		

  	viz.jesus = viz.setup_item ({
  		x: 13 + viz.sprite.jesus[0].width,
  		y: 40,
  		image: viz.sprite.jesus[0], 
  	}) ; 		

  	viz.rastan = viz.setup_item ({
  		x: - viz.sprite.rastan[0].width,
  		y: 100,
  		image: viz.sprite.rastan[0], 
  	}) ; 		

  	viz.megyn = viz.setup_item ({
  		x: 13 + viz.sprite.megyn[0].width,
  		y: 160,
  		image: viz.sprite.megyn[0], 	
  	}) ; 		

  	viz.jesus.select = viz.setup_item ({
  		x: 11,
  		y: 42,
  		image: viz.sprite.select[0], 
  		opacity: 0,
  	}) ; 		

  	viz.rastan.select = viz.setup_item ({
  		x: 0,
  		y: 102,
  		image: imageHelper.flip_image(viz.sprite.select[0]), 
  		opacity: 0,
  	}) ; 

  	viz.megyn.select = viz.setup_item ({
  		x: 11,
  		y: 162,
  		image: viz.sprite.select[0], 
  		opacity: 0,
  	}) ;   	  

	},

  load_char: function fighter_helper_load_characters(viz) {

  	if(viz === undefined) {
  		viz = this ;
  	}
	  viz.player = setup_element(viz, viz.playerConfig) ;
	  viz.enemy  = setup_element(viz, viz.enemyConfig) ;
	  viz.player.orientation = 'r' ; // all players start facing right

	  viz.player.adversary = viz.enemy ; // decorate the player object for convenient access to the viz.enemy object 
	  viz.enemy.adversary  = viz.player ;
		
	  viz.setup_score() ;

		viz.enemyAttack = {
		  tSkip: 0,
		  minSkip: 357,
		  skipVar: [0, 17, 23, 11, 19, 8, 0, 44, 19, 23, 14, 17, -111, 23],
		  on: false,
	  } ;
  
	  var vizPost = viz.post ;
	  viz.post =  function () {
	  	vizPost.call (this) ;
	    if ( this.enemyAttack.on && $Z.iter - this.enemyAttack.tSkip >= ( this.enemyAttack.minSkip + this.enemyAttack.skipVar[ document.skipIndex % this.enemyAttack.skipVar.length ] ) ) {

      this.enemyAttack.tSkip = $Z.iter ;
      document.skipIndex++ ;
      update_enemy.call( this.enemy ) ; // switch to "viz.enemy.update()" #todo
    
	      } 	  	
	  }

	},

	load_ui: function fighter_helper_ui (viz) {
 	
 		if(viz === undefined) {
  		viz = this ;
  	}

	  viz.ui        = fighterHelper.setup_ui (viz)         ;
	  // viz.ui.button = setup_buttons (viz, viz.ui) ;
	
	},	

	setup_ui: function fighter_helper_setup_ui (viz) {

 		if(viz === undefined) {
  		viz = this ;
  	}

	  var buttonWidth     = 26 ;
	  var buttonHeight    = 26 ;
	  var buttonTileCount = 2 ;
	  var buttonRowIndex  = 0 ;
	  var buttonOffsetX   = 0 ;
	  var buttonOffsetY   = 0 ;
	  var buttonPadX      = 0 ;
	  var buttonPadY      = 11 ;
	  var buttonPad       = Math.floor( ( viz.width - (buttonWidth * 4) ) / 4 ) ;
	  var buttonImageUrl  = './game/image/button_spritesheet.png' ;
	  var buttonCanvas    = imageHelper.image2canvas(buttonImageUrl) ;

	  var leftButtonConfig = {
	    context: buttonCanvas.context(),
	    count: buttonTileCount,
	    rowIndex: buttonRowIndex,
	    width: buttonWidth,
	    height: buttonHeight,
	    offsetX: buttonOffsetX,
	    offsetY: buttonOffsetY,
	    padX: buttonPadX,
	    bgColor: undefined,
	    padXl: 0,
	    padXr: 0,
	  } ;  

	  rightButtonConfig = copy_object(leftButtonConfig) ;
	  rightButtonConfig.rowIndex = 1 ;

	  attackButtonConfig = copy_object(leftButtonConfig) ;
	  attackButtonConfig.rowIndex = 2 ;

	  jumpButtonConfig = copy_object(leftButtonConfig) ;
	  jumpButtonConfig.rowIndex = 3 ;

	  var buttonSprite = spriteHelper.get(buttonCanvas, ['left', 'right', 'attack', 'jump'], [26, 26, 26, 26], [26, 26, 26, 26]) ;

	  // var buttonSprite = {
	  //   left:   spriteHelper.get_sprite(leftButtonConfig),
	  //   right:  spriteHelper.get_sprite(rightButtonConfig),
	  //   attack: spriteHelper.get_sprite(attackButtonConfig),
	  //   jump:   spriteHelper.get_sprite(jumpButtonConfig),
	  // } ;

	  var buttonKey = ['left', 'right', 'attack', 'jump'] ;

	  var Nbutton = 4 ;
	  var buttonX = [] ;
	  var buttonY = buttonPad ;

	  // for(var kButton = 0 ; kButton < Nbutton ; kButton++) { // compute the horizontal positions for the buttons based on the available width of the vizualization 
	  //   buttonX.push(Math.floor( kButton * (buttonPad + buttonWidth) + buttonPad * 0.5)) ;
	  // }  
	  // var ratio        = document.ratio ; //(window.devicePixelRatio || 1) ;
	  // buttonWidth  *= ratio ;
	  // buttonHeight *= ratio ;
	  // buttonPad     = Math.floor( ( viz.width - (buttonWidth * 4) ) / 4 ) ;
	  // var buttonY = buttonPad ;

	  var uiWidth         = viz.width ;
	  var uiHeight        = buttonHeight + 2 * buttonPadY ;
	  var uiY             = viz.height - uiHeight ;
	  var uiX             = 0 ;
	  var uiCanvas        = imageHelper.create  (uiWidth, uiHeight) ;
	  var uiContext       = uiCanvas.context() ;
	  var hiddenUICanvas  = imageHelper.create  (uiWidth, uiHeight) ;
	  var hiddenUIContext = hiddenUICanvas.context() ;

	  for( var kButton = 0 ; kButton < Nbutton ; kButton++ ) {

	    buttonX.push(Math.floor( kButton * (buttonPad + buttonWidth) + buttonPad * 0.5)) ;

	    uiContext.drawImage(buttonSprite[buttonKey[kButton]][0], buttonX[kButton], buttonY) ; // draw visible buttonSprite

	    var buttonData = buttonSprite[buttonKey[kButton]][0].context().getImageData(0, 0, buttonWidth, buttonHeight) ; // ImageData object
	    var imagek     = image2index(buttonData, kButton) ; // ImageData object

	    var tempCanvas = imageHelper.create(buttonWidth, buttonHeight) ;

	    tempCanvas
	      .context()
	      .clearRect(0, 0, tempCanvas.width, tempCanvas.height) ;

	    tempCanvas
	      .context()
	      .putImageData(imagek, 0, 0) ;

	    hiddenUIContext.drawImage(tempCanvas, buttonX[kButton], buttonY) ; // draw color-indexed buttonSprite for color picking

	  }

	  var hiddenCanvas  = imageHelper.create(viz.width, viz.height) ;
	  var hiddenContext = hiddenCanvas.context() ;
	  hiddenContext.drawImage(hiddenUICanvas, uiX, uiY) ; // draw ui

	  buttonSpriteBig = spriteHelper.foreach(buttonSprite, imageHelper.adjust_ratio) ;
	  buttonSpriteBig.original = buttonSprite; 

	  var ui = {

	    hiddenCanvas: hiddenCanvas,
	    hiddenContext: hiddenContext,
	    leftButtonConfig: leftButtonConfig,
	    buttonSprite: buttonSpriteBig,
	    buttonX: buttonX,
	    buttonY: buttonY,
	    x: uiX,
	    y: uiY,

	  } ;

	  ui.button = fighterHelper.setup_buttons (viz, ui) ;

	  return ui ;
	  
	},

	setup_buttons: function fighter_helper_setup_buttons (viz, ui) {

		var button = {} ;

		button.walkLeft = {
	    viz: viz, 
	    image: ui.buttonSprite.left[0],
	    render: drawHelper.image,    
	    x: ui.buttonX[0],
	    y: ui.buttonY + ui.y,
	    inert: true,
	  } ;
	  
	  button.walkRight = {
	    viz: viz, 
	    image: ui.buttonSprite.right[0],
	    render: drawHelper.image,      
	    x: ui.buttonX[1],
	    y: ui.buttonY + ui.y,
	    inert: true,
	  } ;
	  
	  button.attack = {
	    viz: viz, 
	    image: ui.buttonSprite.attack[0],
	    render: drawHelper.image,
	    x: ui.buttonX[2],
	    y: ui.buttonY + ui.y, 
	    inert: true,
	  } ;
	  
	  button.jump = {
	    viz: viz, 
	    image: ui.buttonSprite.jump[0],
	    render: drawHelper.image,
	    x: ui.buttonX[3],
	    y: ui.buttonY + ui.y, 
	    inert: true
	  } ;

	  button.transition = step_transition_func('image', viz.frameDuration * 1) ;

	  return button ;

	},

	load_audio: function viz_helper_load_audio(viz) {

		if(viz === undefined) {
			viz = this ;
		}

		viz.audio = {} ;

	  viz.audio.hit3    = audioLoader.cache['./audio/hit3.wav'] ;
	  viz.audio.jump1   = audioLoader.cache['./audio/jump1.wav'] ;
	  viz.audio.bullet = audioLoader.cache['./audio/bullet2.wav'] ;
	  viz.audio.laugh1  = audioLoader.cache['./audio/laugh1.wav'] ;
	  // console.log('fighter helper load audio end', 'viz.audio', viz.audio) ;
	},	
	
	update_enemy: function fighter_helper_update_enemy (enemy) {

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

  update_player: function fighter_helper_update_player(state, player) { 
    // console.log ('fighterHelper.update_player: this.callback: state', state, 'this', this) ;

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
        // console.log ('fighterHelper.update_player 27') ;
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