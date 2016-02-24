var fighterHelper = {

	selectDur: 150,

	loadState: 'jesus', // starting character state

	loadList: ['jesus', 'rastan', 'megyn'],

	loadCallback: {
		jesus: city_level,
		rastan: fantasy_level,
		megyn: space_level,
	},

	keyboard_callback: function(event, viz) {

			if(viz === undefined) {
				viz = this ;
			}

      var transition = [] ;
      var state ;

      switch (event.keyCode) {

        case 37: // left
        case 38: // up
          state    = 'u' ;
          var newIndex ;
          var index = fighterHelper.loadList.indexOf( fighterHelper.loadState ) ;
        	// console.log('fighterHelper.keyboard_callback', 'u', 'index', index, 'fighterHelper.loadState', fighterHelper.loadState)
					if(index > 0) {
						newIndex = --index ;
					} else {
						newIndex = fighterHelper.loadList.length - 1 ;
					}
          newState = fighterHelper.loadList[newIndex] ;
          // console.log('fighterHelper keyboard_callback', 'index', index, 'newIndex', newIndex, 'newState', newState) ;
          break;
        case 39: // right
        case 40: // down
          state    = 'd' ;
          newState = fighterHelper.loadList[(fighterHelper.loadList.indexOf(fighterHelper.loadState) + 1 ) % fighterHelper.loadList.length] ;
          break;
        case 13: // enter
        case 32: // space
        	state = 'x' ; // execute the game code
        	fighterHelper.loadCallback[fighterHelper.loadState]() ;
        	break;
      } 

      //console.log ('state', state) ;
      if (state === undefined) {  // user does not hit arrow key
        viz.buttonpress.reset() ;
      } else {
	    	viz[fighterHelper.loadState].select.fade({
	    	 duration: fighterHelper.selectDur,
	    	 end: { 
	    	 	viz: viz,
	    	 	run: function() { this.viz.buttonpress.reset() },
	    	 },
	      }) ;
	      // console.log('fighterHelper keyboard callback', 'state', state, 'newState', newState)
	    	viz[newState].select.fade({
	    	 duration: fighterHelper.selectDur,
	      }) ;
	      fighterHelper.loadState = newState ;	      
      }

	},

	screen_callback: function(x, y, viz) {

	 	if(viz === undefined) {
			viz = this ;
		}

	  // console.log('fighterHelper.screen_callback', 'viz.loading', viz.loading) ;

		if(viz.loading) {
	    viz.buttonpress.reset() ;
			return ;
		}

    if (y > viz.jesus.y && y <= viz.jesus.y + viz.sprite.original.jesus[0].height) { // user selected the city level

    	viz.jesus.select.fade({ duration: fighterHelper.selectDur }) ;
    	city_level() ;

    }

    if (y > viz.rastan.y && y <= viz.rastan.y + viz.sprite.original.rastan[0].height) { // user selected the fantasy level

    	viz.rastan.select.fade({
    		duration: fighterHelper.selectDur,
    		end: fantasy_level,
    	}) ;

    	viz.jesus.select.fade({ 
    		duration: fighterHelper.selectDur,
    	}) ;

    }

    if (y > viz.megyn.y && y <= viz.megyn.y + viz.sprite.original.megyn[0].height) { // user selected the space level

   		viz.megyn.select.fade({
   			duration: fighterHelper.selectDur,
   			end: space_level,
   		}) ;

    	viz.jesus.select.fade({
    	 duration: fighterHelper.selectDur,
      }) ;

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
			      			viz.audio.death.play() ;
			      			var xTrans = x_trans_creator(viz.rastan.x + viz.sprite.rastan[0].width) ;

			      			xTrans.end = function() {

			      				viz.shake() ;
			      				viz.audio.death.play() ;
			      				var xTrans = x_trans_creator(viz.megyn.x - viz.sprite.megyn[0].width) ;

			      				xTrans.end = function() {

			      					viz.audio.death.play() ;
			      					viz.shake() ;
			      					viz[fighterHelper.loadState].select.fade({ 
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
		      }, // end end: function() ...
		    }),	// end fade child child
			}), // end fade child
		}) ; 
	},

	run: function fighter_helper_run(viz) {
 		if(viz === undefined) {
  		viz = this ;
  	}
  	// console.log('fighter helper run start') ;
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
		          viz.enemy.item.responseSet.hit.healthbar.item,
		          viz.player.item.responseSet.hit.healthbar.item,
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

	  playerHelper.setup(viz) ; // adds viz.player to viz object
	  viz.enemy  = setup_element(viz, viz.enemyConfig) ;

	  viz.enemy.update = fighterHelper.update_enemy ;

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

	      if(this.enemy.update !== undefined) {
	      	this.enemy.update() ;
	      }
	    
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
	  var buttonImageUrl  = './image/button_spritesheet.png' ;
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

	  viz.audio.death    = audioLoader.cache['./audio/death.wav'] ;
	  viz.audio.hit3     = audioLoader.cache['./audio/hit3.wav'] ;
	  viz.audio.jump1    = audioLoader.cache['./audio/jump1.wav'] ;
	  viz.audio.bullet   = audioLoader.cache['./audio/bullet2.wav'] ;
	  viz.audio.laugh1   = audioLoader.cache['./audio/laugh1.wav'] ;
	  viz.audio.bump1    = audioLoader.cache['./audio/bump1.wav'] ;
	  viz.audio.powerup0 = audioLoader.cache['./audio/powerup0.wav'] ;
	  viz.audio.powerup3 = audioLoader.cache['./audio/powerup3.wav'] ;
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
				this.element.fire_bullet('bullet') ;

			}
		}) ;		

		// console.log('update enemy end') ;

	},	


  load_response: function fighter_helper_load_response(playerResponseConfig, enemyResponseConfig, viz) {
    // console.log('response helper load start') ;

    if( viz === undefined ) {
      viz = this ;
    }
    
    if(viz.player.config.bulletSwitch) {
      viz.player.load_bullet(viz) ;
    }

    fighterHelper.load_enemy_bullet (viz) ;
    fighterHelper.load_powerup      (viz) ;
    
    if ( enemyResponseConfig === undefined ) {

      enemyResponseConfig = {

        healthbarY: 2, 
        healthbarX: Math.floor(viz.width * 0.5) + 1,
        healthdrop: 0.1,
        color: '#900',
        audio: viz.audio.hit3,
        sourceType: 'player',

      } ;   

    }

    if ( playerResponseConfig === undefined ) {

      playerResponseConfig = {

        healthdrop: enemyResponseConfig.healthdrop,
        healthbarY: 2,
        healthbarX: 1,
        color: '#009', 
        audio: viz.audio.hit3,
        sourceType: 'enemy',

      } ;

    }
  
    var powerupResponseConfig = {
    	sourceType: 'powerup',
    } ;

    viz.player.item.responseSet.hit = hitHelper.setup_response(viz, viz.player, playerResponseConfig) ;
    viz.player.item.responseSet.powerup = powerupHelper.setup_response(viz, viz.player, powerupResponseConfig) ;

    viz.enemy.item.responseSet.hit  = hitHelper.setup_response(viz, viz.enemy, enemyResponseConfig) ; 

  },	  

  load_powerup: function fighter_helper_load_powerup(viz, powerupConfig) {

    if( viz === undefined ) {
      viz = this ;
    }

    if ( powerupConfig === undefined ) {

      powerupConfig = {

        x: 50,
        y: -20,
        inert: true,
        type: 'powerup',

      } ;

    }

    var rowName = ['cell'] ;
    var canvas  = imageHelper.image2canvas('./image/powerup.png') ;
    var width   = [20] ;
    var height  = [22] ;

    viz.player.powerup         = itemHelper.setup(powerupConfig, viz) ;
    viz.player.powerup.sprite  = spriteHelper.get(canvas, rowName, width, height) ;
    // console.log('vizplayerpowerupsprite', viz.player.powerup.sprite) ;
    viz.player.powerup.image   = viz.player.powerup.sprite.cell[0] ;

    viz.player.powerup.drop    = powerupHelper.drop ;
    viz.player.powerup.stop    = powerupHelper.stop ;
    viz.player.powerup.deliver = powerupHelper.deliver ;
    viz.player.powerup.Nmax    = 2 ;
    if (viz.player.bulletSprite !== undefined && viz.player.bulletSprite.bullet3 !== undefined) {
    	viz.player.powerup.Nmax = 3
    }
    viz.player.powerup.count   = 0 ;

  },

	load_enemy_bullet: function fighter_helper_load_enemy_bullet(viz) {
		
	  var wordConfig = {
	    move: viz.width,
	    shiftXl: 0,
	    shiftXr: 0, 
	    shiftY: 110,
	    element: viz.enemy,
	  } ;

		viz.enemy.bullet        = setup_word (viz, wordConfig) ; 
	  viz.enemy.bullet.remove = false ;
	  viz.enemy.bullet.audio  = viz.audio.bullet1 ;

	 	viz.enemy.fire_bullet   = bulletHelper.fire ;

	  viz.enemy.bulletResponseConfig = {
	    audio: viz.audio.hit3,
	    sourceType: 'player',
	  } ;

	},

} ;