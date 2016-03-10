var fighterHelper = {

	run: function fighter_helper_run(viz) {

 		if(viz === undefined) {
  		viz = this ;
  	}

  	// console.log('fighter helper run start', 'viz', viz, 'viz.player.item.y', viz.player.item.y) ;

		viz.fade({

		  opacity: 1,
		  duration: viz.fadeDuration,
		  pause: viz.fadeDuration,

		  child: imageEffectHelper.fade_transition({

		    opacity: 0, 

		    end: function() {
		      // console.log('fighter helper run end: start', 'viz', viz) ;

		      viz.image = imageHelper.adjust_ratio(imageHelper.image2canvas(viz.config.backgroundImageUrl)) ;

		      itemHelper.add(viz, [ // this is the array of objects that are used by the vizflow visualization engine for the main animation loop

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


		if ( viz.config.music !== undefined ) {

		  viz.audio.music.loop = true ;
			viz.audio.music.play() ;
		  viz.audio.music.gain.gain.value = 0 ;
		  viz.audio.music.volume = 0.3 ;
			var fade  = 4 ; // seconds
			var delay = 4 ; // seconds
			viz.audio.music.fade(fade, delay) ;			

		}

		function viz_run() {

		  // var Nstep = 5 ; // 2 * Math.floor(0.5 * viz.fadeDuration / viz.frameDuration) ;
		  // var flashDuration = 100 ;
		  // console.log('viz_run', 'Nstep', Nstep, 'viz', viz) ;
		  // viz.enemy.item.flash(Nstep, flashDuration) ;
		  // console.log('viz run', 'viz.enemy.item.transition', viz.enemy.item.transition) ;
	  	viz.enemy.item.fade( {
	  		duration: viz.fadeDuration,
	  		opacity: 1,
	  		end: function() {
	  			viz.enemyAttack.on = true ;
	  		}
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
		  minSkip: 320,
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

        healthbarY: 12, 
        healthbarX: Math.floor(viz.width * 0.5) + 1,
        healthdrop: 3,
        color: '#C00',
        audio: viz.audio.grunt,
        sourceType: 'player',

      } ;   

    }

    if ( playerResponseConfig === undefined ) {

      playerResponseConfig = {

        healthdrop: viz.player.config.healthdrop, // || enemyResponseConfig.healthdrop * 0.5,
        healthbarY: 12,
        healthbarX: 1,
        color: '#00C', 
        audio: viz.audio.hit,
        sourceType: 'enemy',

      } ;

    }
  
    var powerupResponseConfig = {
    	sourceType: 'powerup',
    } ;

    viz.player.item.responseSet.hit     = hitHelper.setup(viz, viz.player, playerResponseConfig) ;
    viz.player.item.responseSet.powerup = powerupHelper.setup(viz, powerupResponseConfig) ;
    viz.player.item.responseSet.bump    = bumpHelper.setup(viz) ;

    viz.enemy.item.responseSet.hit  = hitHelper.setup(viz, viz.enemy, enemyResponseConfig) ; 

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
    viz.player.powerup.image   = imageHelper.adjust_ratio(viz.player.powerup.image) ;

    viz.player.powerup.drop    = powerupHelper.drop ;
    viz.player.powerup.stop    = powerupHelper.stop ;
    viz.player.powerup.deliver = powerupHelper.deliver ;
    viz.player.powerup.Nmax    = 1 ;

    // if (viz.player.bulletSprite !== undefined && viz.player.bulletSprite.bullet3 !== undefined) {
    // 	viz.player.powerup.Nmax = 3 ;
    // }

    viz.player.powerup.count = 0 ;

  },

	load_enemy_bullet: function fighter_helper_load_enemy_bullet(viz) {
		
	  var wordConfig = {

	    move: viz.width,
	    shiftXl: 20,
	    shiftXr: 0, 
	    shiftY: 110,
	    element: viz.enemy,

	  } ;

		viz.enemy.bullet        = gameHelper.setup_word (viz, wordConfig) ; 
	  viz.enemy.bullet.remove = false ;
	  viz.enemy.bullet.audio  = viz.audio.bullet1 ;

	 	viz.enemy.fire_bullet   = bulletHelper.fire ;

	  viz.enemy.bulletResponseConfig = {
	    audio: viz.audio.hit,
	    sourceType: 'player',
	  } ;

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
	    fixed: true,
	  } ;
	  
	  button.walkRight = {
	    viz: viz, 
	    image: ui.buttonSprite.right[0],
	    render: drawHelper.image,      
	    x: ui.buttonX[1],
	    y: ui.buttonY + ui.y,
	    inert: true,
	    fixed: true,
	  } ;
	  
	  button.attack = {
	    viz: viz, 
	    image: ui.buttonSprite.attack[0],
	    render: drawHelper.image,
	    x: ui.buttonX[2],
	    y: ui.buttonY + ui.y, 
	    inert: true,
	    fixed: true,
	  } ;
	  
	  button.jump = {
	    viz: viz, 
	    image: ui.buttonSprite.jump[0],
	    render: drawHelper.image,
	    x: ui.buttonX[3],
	    y: ui.buttonY + ui.y, 
	    inert: true,
	    fixed: true,
	  } ;

	  button.transition = step_transition_func('image', viz.frameDuration * 1) ;

	  return button ;

	},

	setup_healthbar: function fighter_helper_setup_healthbar (viz, health, height, x, y, color) {
		var healthbar = {} ;

	  healthbar.item = {
		  viz: viz, 

		  rect: {
		    viz: viz, 
		    x: x,
		    y: y,
		    width: health,
		    height: height,
		    color: color,
		    inert: true,
		    fixed: true,
	  	},

	    render: function draw_bar() {
	    	this.rect.width = this.width ;
	      drawHelper.rect (this.rect, viz.fullContext) ;
	    },

	    width: health,
	 } ;

	 healthbar.initialHealth = health ;
	 healthbar.health = health ;

	 return healthbar ;

	},

	update_enemy: function fighter_helper_update_enemy (enemy) {

		if(enemy === undefined) {
			enemy = this ;
		}

		// console.log('update_enemy start') ;

		enemy.item.responseSet.hit.onSwitch = false ; // enemy cannot be hit while attacking
		enemy.item.fade({
			duration: enemy.config.frameDuration * 2,
			opacity: 0.6,
		}) ;

	  var transition = animate(enemy.sprite.attack, step_transition_func('image', enemy.config.attackDuration), undefined, enemy.sprite.rest[0])[0] ;

	  // var transDur = transitionHelper.duration(transition) ;
	  // var Nflash   = 6 ;
	  // var flashDuration = transDur / Nflash ;

	  // enemy.item.flash(Nflash, flashDuration) ;

		var replacementSwitch = true ;	
		
		enemy.item.add_transition(transition, replacementSwitch) ;

		enemy.item.add_end('image', 1, {

			element: enemy,

			run: function() {
				// console.log('enemy bullet run')
				this.element.fire_bullet('bullet') ;

			}
		}) ;

		enemy.item.add_end('image', enemy.sprite.attack.length, function() {
			enemy.item.fade({
				duration: enemy.config.frameDuration * enemy.sprite.attack.length,
				opacity: 1.0,
				end: {
					item: enemy.item, 
					run: function() {
						this.item.responseSet.hit.onSwitch = true ;
					},
				},
			}) ;			
		}) ;	

		// console.log('update enemy end') ;

	},	

} ;