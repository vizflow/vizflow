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

		      viz.player.paused = false ;

		      viz.image = imageHelper.adjust_ratio(imageHelper.to_canvas(viz.config.backgroundImageUrl)) ; 

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
		  var image = imageHelper.adjust_ratio(imageHelper.to_canvas(viz.config.backgroundImageUrl)) ; 
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

	},

	load_ui: function fighter_helper_ui (viz) {
 	
 		if(viz === undefined) {
  		viz = this ;
  	}

	  viz.ui = fighterHelper.setup_ui (viz)         ;
	
	},	

  load_response: function fighter_helper_load_response(playerResponseConfig, enemyResponseConfig, viz) {
    // console.log('response helper load start') ;

    if( viz === undefined ) {
      viz = this ;
    }
    
    if(viz.player.config.bulletSwitch) {
      viz.player.load_bullet(viz) ;
    }

    fighterHelper.load_powerup      (viz) ;
    
    if ( enemyResponseConfig === undefined ) {

      enemyResponseConfig = {

        healthdrop: viz.enemy.config.healthdrop, 
        healthbarY: undefined, 
        healthbarX: undefined,
        color: undefined,
        audio: undefined,
        sourceType: 'player',

      } ;   

    }

    if ( playerResponseConfig === undefined ) {

      playerResponseConfig = {

        healthdrop: viz.player.config.healthdrop,
        healthbarY: undefined,
        healthbarX: undefined,
        color: undefined, 
        audio: undefined,
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

        x: undefined,
        y: undefined,
        inert: true,
        type: 'powerup',

      } ;

    }

    var rowName = ['cell'] ;
    var canvas  = imageHelper.to_canvas('./image/powerup.png') ;
    var width   = [] ;
    var height  = [] ;

    var powerup     = viz.setup_item(powerupConfig) ;
    powerup.sprite  = spriteHelper.get(canvas, rowName, width, height) ;
    // console.log('vizplayerpowerupsprite', viz.player.powerup.sprite) ;
    powerup.image   = powerup.sprite.cell[0] ;

    powerup.drop    = powerupHelper.drop ;
    powerup.stop    = powerupHelper.stop ;
    powerup.deliver = powerupHelper.deliver ;
    powerup.Nmax    = 1 ;

		var deliveryImage = imageHelper.to_canvas('./image/delivery_spritesheet.png') ;
		var rowName       = [    ] ; // must match viz.config.name
		var tileWidth     = [    ] ; 
		var rowHeight     = [    ] ;
		var paddingSwitch = false ;
    var deliverySprite  = spriteHelper.get(deliveryImage, rowName, tileWidth, rowHeight, paddingSwitch) ;

  	var levelName = viz.config.name ;

  	// console.log('deliverySprite', deliverySprite, 'levelName', levelName) ;

    var deliveryConfig = {

    	sprite: deliverySprite[levelName],
    	image: deliverySprite[levelName][0],
    	x: -deliverySprite[levelName][0].originalCanvas.width,
    	y: 0, // deliverySprite[levelName][0].originalCanvas.height,
    	inert: true,
    	type: 'powerupDelivery',
    	enter: powerupHelper.release,
    	viz: viz,

    } ;

    var delivery = itemHelper.setup(deliveryConfig) ;

    viz.player.powerupDelivery = delivery ;
    viz.player.powerup = powerup ;

    viz.player.powerup.count = 0 ;

  },

	setup_ui: function fighter_helper_setup_ui (viz) {

 		if(viz === undefined) {
  		viz = this ;
  	}

	  var ui = {

	    hiddenCanvas: undefined,
	    hiddenContext: undefined,
	    leftButtonConfig: undefined,
	    buttonSprite: undefined,
	    buttonX: undefined,
	    buttonY: undefined,
	    x: undefined,
	    y: undefined,

	  } ;

	  ui.button = fighterHelper.setup_buttons (viz, ui) ;

	  return ui ;
	  
	},

	setup_buttons: function fighter_helper_setup_buttons (viz, ui) {

		var button = {} ;

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

		// console.log('update enemy end') ;

	},	

} ;