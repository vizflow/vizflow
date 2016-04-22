var hitHelper = {

  duration: 420,

  pair: { // temporary variable used by collision()
    width: null, 
    height: null, 
    item: [null, null], 
    detect: collisionDetect.pixelwise,
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
      setupResponseConfig.elementHealth = undefined ;
    }

    if(setupResponseConfig.healthbarHeight === undefined) {
      setupResponseConfig.healthbarHeight = undefined ;
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

      var health_transition = $Z.transition.linear_transition_func ( 'width', viz.dur * 4 ) ; 

      if(setupResponseConfig.healthdrop === undefined) {    
        setupResponseConfig.healthdrop = 10 ;
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

      // console.log('hit setup', 'element', element) ;

      var hit = { // action config object

        perform: hitHelper.perform,
        confirm: hitHelper.confirm,
        // transition: function() { 
        //   // console.log('hit helper',  'this', this) ;
        // },
        element: element,
        viz: viz,
        audio: audio,
        sourceType: setupResponseConfig.sourceType,
        type_check: responseHelper.type_check,
        onSwitch: true,
        performSwitch: false,

      } ; 

      // console.log('hit helper setup', 'hit', hit) ;

    }

    return hit ;

  },    

  confirm: function hit_helper_detect(sourceItem, hit) {

    // console.log('hit helper detect start', 'sourceItem', sourceItem, 'hit', hit) ;

		if(hit === undefined) {
			hit = this ;
		}

    var targetItem ;
    if(hit.element.item === undefined) {
      targetItem = hit.element ;
    } else {
      targetItem = hit.element.item ; // by convention, attach the hit action config object to the target element
    }
    // console.log('hitHelper detect', targetItem)

	  hitHelper.pair.width  = hit.viz.width ; // setup temporary variable used later for detailed collision detection (if necessary)
	  hitHelper.pair.height = hit.viz.height ; 

	  var typeCheck = hit.type_check(sourceItem) ; // boolean variable storing the resuls of the type-validity check function contained in the target item's hit config object

    // console.log('hit helper detect', 'typeCheck', typeCheck, 'sourceItem height', sourceItem.image.height, 'hit', hit) ;

	  if( typeCheck ) { // the target item type matches the source item, so we can perform a detailed collision check for collision image overlap (phase 2)

      // console.log('hit helper detect 1', 'targetItem', targetItem) ;
      // console.log('hitHelper detect', 'sourceItem', sourceItem) ;

	    hitHelper.source.image = sourceItem.collision_image('source') ; // use the item's current display image as the key for the collision image lookup table 
	    hitHelper.target.image = targetItem.collision_image('target') ; // use the item's current display image as the key for the collision image lookup table 
      
      // console.log('hit helper detect 2', 'source item collision image', hitHelper.source.image, 'target item collision image', hitHelper.target.image) ;

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

      // console.log('hitHelper pair', hitHelper.pair) ;

	    if( hitHelper.pair.collision.count > 0 ) { // this means that the displayed images are overlapping (will optimize computational efficiency later #todo)
        // console.log('hitHelper detect()', 'source item type', sourceItem.type, 'hitHelper', hitHelper, 'hitHelper.pair.collision', hitHelper.pair.collision, 'source x', sourceItem.x, 'target x', targetItem.x) ;
	      return true ; // all checks passed, stage the hit for execution
	    }

	  }

	  return false ;

	},  

  perform: function hit_helper_perform (response) {
    // console.log ('response helper perform start: this', this) ;

    if(response === undefined) {
    	response = this ;
    }

    // console.log('hitHelper perform sourceItem', response.sourceItem, 'sourceItem type', response.sourceItem.type) ;

    response.occurred = response.confirm(response.sourceItem) ; 

    if( response.occurred ) { // i.e. either the player or the enemy was response since we passed the detailed collision detection step

      // console.log('hitHelper perform', 'element', response.element) ;

      if( response.sourceItem.singleSwitch ) {
        // console.log('perform inert')
        response.sourceItem.inert = true ; // deactivate the bullet after it hits
      }     

      var item = response.element.item === undefined ? response.element : response.element.item ;

      // console.log('hitHelper perform:', 'response', response) ;
      
      var playerSource  = response.sourceItem.type === 'player' ;
      var attackCheck   = item.collision_image('source') !== undefined ;
      var playerTarget  = response.element === response.viz.player ;
      var playerCounter = (attackCheck && playerTarget) || (attackCheck && response.sourceItem.responseSet === undefined) ; // player or bullet attacking the enemy word
      var enemyTarget   = response.element === response.viz.enemy ;

      if(playerSource && enemyTarget) { 
        // enemy was hit directly by player
      }

      if(playerCounter) {
        // player counterattack on enemy 
      }

      if(response.element.explode !== undefined) {
        response.element.explode() ;
        viz.audio.explode.play() ;
      }

      if(response.sourceItem.explode !== undefined) {
        response.sourceItem.explode() ;
      }

      if(response.healthbar !== undefined & !playerCounter) { // i.e. player or enemy response was triggered while in their attack frame state

        var healthDamping = 1 ;

        response.healthbar.health -= response.healthdrop * healthDamping ;

        hitHelper.flash(response) ; 
        if(response.audio !== undefined && response.audio.buffer !== undefined) {
          response.audio.play() ;
        }

        if (response.healthbar.health < 0 && response.element === response.viz.enemy) {
        }

        if (response.healthbar.health < 0 && response.element === response.viz.player) {
        }

        transitionHelper.update_end_value.call(response.healthbar.item, 'width', response.healthbar.health, response.health_transition) ;

      }

    }

    if(response.transition !== undefined && !playerCounter) {
      response.transition() ;      
    }    

  }, 

  reset: function hit_helper_reset (response) {
    // console.log ('hit_reset', 'this', this);

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

    // console.log ('response transition', 'element', element, 'hitDur', hitDur) ;

    if(response === undefined) {
      response = this ;
    }

    var element = this.element ;

    if(response.occurred) {

      // console.log('response occurred start') ;

      var hitDur = hitHelper.duration ; 
      var tran_func;
      var frameDur = element.config.hitDuration ;

      if(element === response.viz.enemy) {
        frameDur = hitDur * 2 ;
      } 

      // console.log('hitHelper transition:', 'frameDur', frameDur) ;
      tran_func = transitionHelper.step_func('image', frameDur) ;        
      hitTransition = animate(element.sprite.hit, tran_func, undefined, element.sprite.rest[0])[0] ;

      // console.log('hitHelper transition:', 'hitTransition', hitTransition) ;

      // imageHelper.view(element.sprite.hit[0]) ;

      var replacementSwitch = true ; // interrupt current player transitions due to response
      element.item.add_transition(hitTransition, replacementSwitch) ;

      if(element === element.item.viz.enemy) {

        var fadeDuration = 100 ;

        element.item.fade({
          duration: fadeDuration,
          opacity: 0.65,
        })

      }

      hitHelper.detect_switch(response) ;

      // console.log('response occurred end', 'hit', response, 'element', element) ;

    } 
    
    if(element.explode !== undefined) {
      element.explode() ;
    }

  },

  flash: function hit_helper_flash(response) {

    if(response === undefined) {
      response = this ;
    }

    var element = response.element ;

    var hitDur = hitHelper.duration ;
    var Nstep  = 3 ; 
    // console.log('hitDur', hitDur, 'Nstep', Nstep) ;
    var flashDuration = 100 ;
    element.item.flash(Nstep, flashDuration) ;
    // var flash          = effectHelper.flash.call(element, hitDur / Nstep, Nstep).animation[0] ;
    // element.item.add_transition(flash) ;

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

    var reset = transitionHelper.step_func ('hitReset', hitDur) (0) ;

    reset.end = { 

      response: element.item.responseSet.hit,

      run: hitHelper.reset,

    } ;

    var replacementSwitch = false ;
    element.item.add_transition(reset, replacementSwitch) ;

  },
	
} ;