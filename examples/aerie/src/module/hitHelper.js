var hitHelper = {

  duration: 420,

  pair: { // temporary variable used by collision()
    width: null, 
    height: null, 
    item: [null, null], 
    detect: $Z.helper.collision.pixelwise,
  },

  source: {  // temporary variable used by collision()
    x: null,
    y: null, 
    image: null,
  },

  target: { // temporary variable used by collision()
    x: null,
    y: null, 
    image: null,
  },

  setup: function hit_helper_setup(viz, element, setupResponseConfig) {

    if(setupResponseConfig === undefined) {
      setupResponseConfig = {} ;
    }

    if(setupResponseConfig.elementHealth === undefined) {
      setupResponseConfig.elementHealth = 88 ;
    }

    if(setupResponseConfig.healthbarHeight === undefined) {
      setupResponseConfig.healthbarHeight = 10 ;
    }
    
    var audio = setupResponseConfig.audio ;

    if(setupResponseConfig.healthdrop !== undefined) {

      var healthbar = fighterHelper.setup_healthbar (

        viz, 
        setupResponseConfig.elementHealth, 
        setupResponseConfig.healthbarHeight, 
        setupResponseConfig.healthbarX,
        setupResponseConfig.healthbarY, 
        setupResponseConfig.color

      ) ;

      var health_transition = $Z.helper.transition.linear_transition_func ( 'width', viz.dur * 4 ) ; 

      if(setupResponseConfig.healthdrop === undefined) {    
        setupResponseConfig.healthdrop = 2 ;
      }
     
      var hit = { // action config object

        perform: hitHelper.perform,
        confirm: hitHelper.confirm,
        healthbar: healthbar,
        healthdrop: setupResponseConfig.healthdrop,
        health_transition: health_transition,
        transition: hitHelper.transition,
        element: element,
        viz: viz,
        audio: audio,
        sourceType: setupResponseConfig.sourceType,
        type_check: responseHelper.type_check,
        onSwitch: true,
        performSwitch: false,

      } ; 

    } else {

      var hit = { // action config object

        perform: hitHelper.perform,
        confirm: hitHelper.confirm,
        element: element,
        viz: viz,
        audio: audio,
        sourceType: setupResponseConfig.sourceType,
        type_check: responseHelper.type_check,
        onSwitch: true,
        performSwitch: false,

      } ; 

    }

    return hit ;

  },    

  confirm: function hit_helper_(sourceItem, hit) {

		if(hit === undefined) {
			hit = this ;
		}

    var targetItem ;
    if(hit.element.item === undefined) {
      targetItem = hit.element ;
    } else {
      targetItem = hit.element.item ; // by convention, attach the hit action config object to the target element
    }

	  hitHelper.pair.width  = hit.viz.width ; // setup temporary variable used later for detailed collision detection (if necessary)
	  hitHelper.pair.height = hit.viz.height ; 

	  var typeCheck = hit.type_check(sourceItem) ; // boolean variable storing the resuls of the type-validity check function contained in the target item's hit config object

	  if( typeCheck ) { // the target item type matches the source item, so we can perform a detailed collision check for collision image overlap (phase 2)

	    hitHelper.source.image = sourceItem.collision_image('source') ; // use the item's current display image as the key for the collision image lookup table 
	    hitHelper.target.image = targetItem.collision_image('target') ; // use the item's current display image as the key for the collision image lookup table 
      
      if
      (
           hitHelper.source.image === undefined 
        || hitHelper.source.image === null 
        || hitHelper.target.image === undefined 
        || hitHelper.target.image === null
      ) 
      {
        // assume the elements are not on a collision frame if the appropriate source and target collision images are not defined
        return false ;
      }

      hitHelper.source.x = sourceItem.x ; 
      hitHelper.source.y = sourceItem.y ; 

	    hitHelper.target.x = targetItem.x ; 
	    hitHelper.target.y = targetItem.y ; 

	    hitHelper.pair.item[1] = hitHelper.target ;
	    hitHelper.pair.item[0] = hitHelper.source ;
      hitHelper.pair.detect() ; // run collision detection again using the actual collision images for detailed collision detection (phase 2)

	    if( hitHelper.pair.collision.count > 0 ) { // this means that the displayed images are overlapping (will optimize computational efficiency later #todo)
	      return true ; // all checks passed, stage the hit for execution
	    }

	  }

	  return false ;

	},  

  perform: function hit_helper_perform (response) {
    var sourceItem = response.sourceItem ;
    var notAttack = sourceItem.image.sourceCollisionImage === undefined ; // may need more if attack animation interferes
    var img       = response.element.item.image ;
    var isAttack  = response.element.sprite.attack.indexOf(img) > -1 ;  // current image is in attack sprite
    var isRest    = response.element.sprite.rest.indexOf(img) > -1 ;
    var isShield  = !isAttack && !isRest ;
    var isHit     = response.element.sprite.hit.indexOf(img) > -1 ;
    var element   = response.element ;

    if (notAttack === true) {
     
      return ;
    }   
    if (isShield === true) {
      var isRest = img === element.sprite.rest[0] ;

        element.health -= 0.5 ;
    } else { 
      element.hit() ;
      element.item.whiteflash(50) ;  
      element.health -= 2 ;
    }
    if (response.healthbar.health < 0 && response.element === response.viz.player) {
      function game_over(viz) {
    element.item.viz.player.healthbar.image.remove() ;

        if(viz === undefined) {
          viz = this ;
        }
        response.healthbar.health = 0 ;
        var endImage = $Z.helper.image.adjust_ratio($Z.helper.image.to_canvas('./image/game_over.png')) ;

        var endItem = $Z.helper.item.setup({ 

          x: (viz.width - endImage.originalCanvas.width) * 0.5,
          y: (viz.height - endImage.originalCanvas.height) * 0.5,
          image: endImage,
          opacity: 0,
          inert: true,
          viz: viz,

        }) ;

        endItem.add() ;
         
        viz.opacity = 1 ;
        viz.fade({

          duration: 4 * viz.fadeDuration,
        }) ;

        endItem.fade({

          duration: viz.fadeDuration * 4,

          end: function() { 
            endItem.fade({

              duration: viz.fadeDuration * 4,
              end: window.location.reload(),
            }) ;
       
          },

        }) ;

      } 

    game_over (viz) ;
  
    } else {
      element.healthbar.image = element.health_bar() ;
    }

  if (element.item.viz.enemy.health < 1) {

 function you_win(viz) {
        element.item.viz.enemy.healthbar.image.remove() ;

    if(viz === undefined) {
      viz = this ;
    }

    var endImage = $Z.helper.image.adjust_ratio($Z.helper.image.to_canvas('./image/you_win.png')) ;

    var endItem = $Z.helper.item.setup({ 

      x: (viz.width - endImage.originalCanvas.width) * 0.5,
      y: (viz.height - endImage.originalCanvas.height) * 0.5,
      image: endImage,
      opacity: 0,
      inert: true,
      viz: viz,

    }) ;

    endItem.add() ;
     
    viz.opacity = 1 ;
    viz.fade({

      duration: 2 * viz.fadeDuration,
    }) ;

    endItem.fade({

      duration: viz.fadeDuration * 2,

      end: function() { 
        endItem.fade({

          duration: viz.fadeDuration * 4,
          end: window.location.reload(),
        }) ;
   
      },

    }) ;

  } 

  you_win (viz) ;
  
    } else {
      element.healthbar.image = element.health_bar() ;
    }
    
  }, 
  reset: function hit_helper_reset (response) {

    if( response === undefined ) {
      response = this.response ;
    }

    var fadeDuration = 100 ;

    response.element.item.fade({
      duration: fadeDuration,
      opacity: 1,
    })
    
    response.onSwitch = true ;
  },

  transition: function hit_helper_transition(response) {

    if(response === undefined) {
      response = this ;
    }

    var element = this.element ;

    if(response.occurred) {
      var hitDur = hitHelper.duration ; // ( element.adversary.sprite.attack.length + 20 ) * viz.dur ;

      var tran_func;
  
      var frameDur = element.config.hitDuration ;

      if(element === response.viz.enemy) {
        frameDur = hitDur * 2 ;
      } 

      tran_func = step_transition_func('image', frameDur) ;        
      // } else {
      //   tran_func = step_transition_func('image', element.config.hitDuration) ;
      // }
      hitTransition = animate(element.sprite.hit, tran_func, undefined, element.sprite.rest[0])[0] ;

      var replacementSwitch = false ; // interrupt current player transitions due to response
      element.item.add_transition(hitTransition, replacementSwitch) ;

      if(element === element.item.viz.enemy) {

        var fadeDuration = 100 ;

        element.item.fade({
          duration: fadeDuration,
          opacity: 0.65,
        })

      }

      hitHelper.detect_switch(response) ;

    } 
    
    if(element.explode !== undefined) {
      element.explode() ;
    }

  },

  detect_switch: function hit_helper_detect_switch(response) {

    if(response === undefined) {
      response = this ;
    }

    var element = response.element ;

    response.onSwitch = false ;

    var hitDur = response.duration || hitHelper.duration ;

    var detectPause = 500 ; // slight extra delay to prevent double-hits

    hitDur += detectPause ;

    var reset = step_transition_func ('hitReset', hitDur) (0) ;

    reset.end = { 

      response: element.item.responseSet.hit,

      run: hitHelper.reset,

    } ;

    var replacementSwitch = false ;
    element.item.add_transition(reset, replacementSwitch) ;

  },
	
} ;