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

  confirm: function hit_helper_(sourceItem, hit) {

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

      // console.log('before pair detect', 'source type', sourceItem.type, 'source y', sourceItem.y, 'target x', targetItem.y) ;
      // console.log('pair detection', 'hitHelper.pair.item[0].image', hitHelper.pair.item[0].image, 'hitHelper.pair.item[1].image', hitHelper.pair.item[1].image) ;
      // console.log('hitHelper.source', hitHelper.source, 'hitHelper.target', hitHelper.target) ;
      // console.log('after pair detect')

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
    var sourceItem = response.sourceItem ;
    var notAttack = sourceItem.image.sourceCollisionImage === undefined ; // may need more if attack animation interferes
    var img       = response.element.item.image ;
    var isAttack  = response.element.sprite.attack.indexOf(img) > -1 ;  // current image is in attack sprite
    var isRest    = response.element.sprite.rest.indexOf(img) > -1 ;
    var isShield  = !isAttack && !isRest ;
    var element = response.element ;

    if (notAttack === true) {
     
      return ;
    }   
    if (isShield === true) {
      var isRest = img === element.sprite.rest[0] ;
      console.log('hit helper perform is shield', 'isRest', isRest) ;
       // insert audio here
       element.health -= 0.2 ;
    } else {
     // console.log('rpg hit helper perform') ;
      element.health -= 2 ;
    }
    // if (element.health < 0) {
    //   // console.log('rpg helper: negative health') ;
    // } else {
      element.healthbar.image = element.health_bar() ;
    // }
    
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
      var hitDur = hitHelper.duration ; // ( element.adversary.sprite.attack.length + 20 ) * viz.dur ;

      var tran_func;
  
      var frameDur = element.config.hitDuration ;

      if(element === response.viz.enemy) {
        frameDur = hitDur * 2 ;
      } 

      // console.log('hitHelper transition:', 'frameDur', frameDur) ;
      tran_func = step_transition_func('image', frameDur) ;        
      // } else {
      //   tran_func = step_transition_func('image', element.config.hitDuration) ;
      // }
      hitTransition = animate(element.sprite.hit, tran_func, undefined, element.sprite.rest[0])[0] ;

      // console.log('hitHelper transition:', 'hitTransition', hitTransition) ;

      // imageHelper.view(element.sprite.hit[0]) ;

      // if(element === response.viz.enemy) { // perform zoom in-out and screen shake effects on enemy response

      //   var shakeSwitch = true ;

      //   var freq = 1 / 8 ;
      //   if(Math.random() < freq) {
      //     effectHelper.zoom_inout(response.viz, hitDur, shakeSwitch) ;        
      //   }

      // }

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

    var reset = step_transition_func ('hitReset', hitDur) (0) ;

    reset.end = { 

      response: element.item.responseSet.hit,

      run: hitHelper.reset,

    } ;

    var replacementSwitch = false ;
    element.item.add_transition(reset, replacementSwitch) ;

  },
	
} ;