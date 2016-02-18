var fighterHelper = {

	screen_callback: function(x, y, viz) {
	 	if(viz === undefined) {
			viz = this ;
		}
    if (y > viz.jesus.y && y <= viz.jesus.y + viz.sprite.original.jesus[0].height) {
    	viz.jesus.select.fade() ;
      console.log ('load jesus level') ;
    }
    if (y > viz.rastan.y && y <= viz.rastan.y + viz.sprite.original.rastan[0].height) {
    	viz.rastan.select.fade() ;
    	viz.jesus.select.fade() ;

      console.log ('load rastan level') ;
    }
    if (y > viz.megyn.y && y <= viz.megyn.y + viz.sprite.original.megyn[0].height) {
   		viz.jesus.select.fade() ;
    	viz.megyn.select.fade() ;

      console.log ('load megyn level') ;
    }
  }, 

	load: function fighter_helper_load(viz) {
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
		      console.log(viz.config.backgroundImageUrl) ;
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
			      						duration: 150,
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

	ui: function fighter_helper_ui (viz) {
 	
 		if(viz === undefined) {
  		viz = this ;
  	}

	  viz.ui        = setup_ui      (viz)         ;
	  viz.ui.button = setup_buttons (viz, viz.ui) ;
	
	},	
} ;