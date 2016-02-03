var hitHelper = {

  pair: { // temporary variable used by collision()
    width: null, 
    height: null, 
    item: [null, null], 
    detect: collisionDetection.pixelwise,
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

  type_check: function hit_helper_type_check(sourceItem, hit) {

    if(hit === undefined) {
      hit = this ;
    }

    if(sourceItem.type === hit.sourceType) {
      return true ;
    } else {
      return false ;
    }

  },

	detect: function hit_helper_detect(sourceItem, hit) {

    // console.log('hit helper detect start', 'sourceItem', sourceItem, 'hit', hit) ;

		if(hit === undefined) {
			hit = this ;
		}

		var targetItem = hit.element.item ; // by convention, attach the hit action config object to the target element

	  hitHelper.pair.width  = viz.width ; // setup temporary variable used later for detailed collision detection (if necessary)
	  hitHelper.pair.height = viz.height ; 

	  var typeCheck = hit.type_check(sourceItem) ; // boolean variable storing the resuls of the type-validity check function contained in the target item's hit config object

    // console.log('hit helper detect', 'typeCheck', typeCheck, 'sourceItem', sourceItem, 'hit', hit) ;

	  if( typeCheck ) { // the target item type matches the source item, so we can perform a detailed collision check for collision image overlap (phase 2)

      // console.log('hit helper detect 1', 'source item collision image', hitHelper.source.image, 'target item collision image', hitHelper.target.image) ;
      // console.log('sourceItem', sourceItem)
	    hitHelper.source.image = sourceItem.collision_image('source') ; // use the item's current display image as the key for the collision image lookup table 
      // console.log('hit helper detect 2', 'source item collision image', hitHelper.source.image, 'target item collision image', hitHelper.target.image) ;
	    hitHelper.target.image = targetItem.collision_image('target') ; // use the item's current display image as the key for the collision image lookup table 
      // console.log('hit helper detect 3', 'source item collision image', hitHelper.source.image, 'target item collision image', hitHelper.target.image) ;

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

	    hitHelper.pair.item[0] = hitHelper.target ;
	    hitHelper.pair.item[1] = hitHelper.source ;

      // console.log('before pair detect', 'source x', sourceItem.x, 'target x', targetItem.x) ;
	    hitHelper.pair.detect() ; // run collision detection again using the actual collision images for detailed collision detection (phase 2)
      // console.log('after pair detect')

	    if( hitHelper.pair.collision.count > 0 ) { // this means that the displayed images are overlapping (will optimize computational efficiency later #todo)
        // console.log('hitHelper detect()', 'hitHelper', hitHelper, 'hitHelper.pair.collision', hitHelper.pair.collision, 'source x', sourceItem.x, 'target x', targetItem.x) ;
	      return true ; // all checks passed, stage the hit for execution
	    }

	  }

	  return false ;

	},  

  perform: function hit_helper_perform (hit) {
    // console.log ('hit helper perform start: this', this) ;
    // if (hit.element.item.transition !== undefined && hit.element.item.transition.length > 0) {
    //   return ;
    // }        

    if(hit === undefined) {
    	hit = this ;
    }

    if( hit.sourceItem.singleSwitch ) {
      hit.sourceItem.inert = true ; // deactivate the bullet after it hits
    }

    hit.healthbar.health -= hit.healthdrop ;
    
    if (hit.healthbar.health < 0 && hit.element === hit.viz.enemy) {
      hit.viz.trumpAttack.on = false ;
      if(document.nextLevel === null) {
        // alert('congratulations! you did it') ;
        $Z.item([]) ;
        hit.viz.fade({opacity: 0, duration: hit.viz.fadeDuration}) ;
      } else {
        $Z.item([]) ;
        hit.viz.fade({
          direction: 'out', 
          end: function() {
            $Z.exit() ;
            document.nextLevel() ;           
          }
        }) ;
      }
      // alert ('game over') ;
      hit.healthbar.health = 0 ;
    }

    if (hit.healthbar.health < 0 && hit.element === hit.viz.player) {
      // alert('game over') ;
      $Z.item([]) ;
      hit.viz.fade({direction: 'out', duration: hit.viz.fadeDuration}) ;
      hit.healthbar.health = 0 ;
      hit.viz.audio.laugh1.play() ;
      hit.viz.trumpAttack.on = false ;
    }

    if (hit.element.item.transition === undefined) {
      hit.element.item.transition = [] ;
    }

    if (hit.healthbar.item.transition === undefined) {
      hit.healthbar.item.transition = [] ;
    }
    //hit.healthbar.item.width = hit.healthbar.health ;
      // console.log('perform hit hit 24') ;
    transitionHelper.update_end_value.call(hit.healthbar.item, 'width', hit.healthbar.health, hit.health_transition) ;
      //console.log('PAH 25', 'this', this, 'hit.healthbar.health', hit.healthbar.health, 'hit.healthbar.item.transition', hit.healthbar.item.transition) ;
    // console.log ('hit.healthbar.item', hit.healthbar.item) ;

    //console.log('hit hit transition', this, 'hit.element', hit.element) ;

    // $Z.detect([]) ; // turn off collision detection until after the hit.element.item character finishes animating
    //console.log('detection off')

    //hit.reset () ;

    // hit.element.item.transition = 
    // console.log('hit.element.sprite', hit.element.sprite) ;
    // var transitionFunc = hit.element.transitionSet.image ;
    // var transition     = animate(hit.element.sprite.hit, transitionFunc, undefined, hit.element.sprite.rest[0]) ;
    // console.log('perform hit hit 41', 'hit.element.item.transition', hit.element.item.transition) ;
    hit.transition() ; // returns an array of transition objects
    // console.log('hit helper perform: hit transition', transition) ;
    if(hit.audio !== undefined && hit.audio.buffer !== undefined) {
      hit.audio.play() ;
    }
    // console.log ('perform hit hit end', 'hit.element.item.transition', hit.element.item.transition) ;

  }, 

  reset: function hit_helper_reset (hit) {
    // console.log ('hit_reset', 'this', this);

    if( hit === undefined ) {
      hit = this.hit ;
    }
    
    hit.detectSwitch = true ;
  },

  duration: 300,

  transition: function hit_helper_transition(hit) {

    // console.log ('hit transition', 'element', element, 'hitDur', hitDur) ;

    if(hit === undefined) {
      hit = this ;
    }

    var element = this.element ;

    var hitDur         = hitHelper.duration ; // ( element.adversary.sprite.attack.length + 20 ) * viz.dur ;
    var hitTransition            = step_transition_func('image', viz.dur * 12)(element.sprite.hit[0]) ;
    hitTransition.child          = step_transition_func('image', hitDur)(element.sprite.rest[0]) ;
    // hitTransition.child.end = [hitHelper.reset, hit_reset] ;

    // var reset = step_transition_func ('hitReset', hitDur) (0) ;

    // reset.end = { 

    //   hit: element.item.actionSet.hit,

    //   run: hitHelper.reset,

    // } ;

    // var Nstep          = 2 * (Math.floor(2.5 * hitDur)) ;
    // var flash          = effectHelper.flash.call(element, hitDur / Nstep, Nstep).animation[0] ;

//    var hitTransition  = [hit, reset, flash] ;

    var replacementSwitch = true ; // interrupt current player transitions due to hit
    element.item.add_transition(hitTransition, replacementSwitch) ;

    hitHelper.flash(hit) ;
    hitHelper.detect_switch(hit) ;

  },

  flash: function hit_helper_flash(hit) {

    if(hit === undefined) {
      hit = this ;
    }

    var element = hit.element ;

    var hitDur         = hitHelper.duration ;
    var Nstep          = 6 ; 
    // console.log('hitDur', hitDur, 'Nstep', Nstep) ;
    element.item.flash(hitDur / Nstep, Nstep) ;
    // var flash          = effectHelper.flash.call(element, hitDur / Nstep, Nstep).animation[0] ;
    // element.item.add_transition(flash) ;

  },

  detect_switch: function hit_helper_flash(hit) {

    if(hit === undefined) {
      hit = this ;
    }

    var element = hit.element ;

    hit.detectSwitch = false ;

    var hitDur = hitHelper.duration ;

    var reset = step_transition_func ('hitReset', hitDur) (0) ;

    reset.end = { 

      hit: element.item.actionSet.hit,

      run: hitHelper.reset,

    } ;

    element.item.add_transition(reset) ;

  },

  setup: function hit_helper_setup(viz, element, setupHitConfig) {

    if(setupHitConfig === undefined) {
      setupHitConfig = {} ;
    }

    if(setupHitConfig.elementHealth === undefined) {
      setupHitConfig.elementHealth = 100 ;
    }

    if(setupHitConfig.healthbarHeight === undefined) {
      setupHitConfig.healthbarHeight = 7 ;
    }
    
    if(setupHitConfig.audio === undefined) {
      setupHitConfig.audio = viz.audio.hit1 ;
    }

    var audio = setupHitConfig.audio ;

    var healthbar = setup_healthbar (
      viz, 
      setupHitConfig.elementHealth, 
      setupHitConfig.healthbarHeight, 
      setupHitConfig.healthbarY, 
      setupHitConfig.color
    ) ;

    var health_transition = $Z.transition.linear_transition_func ( 'width', viz.dur * 4 ) ; 

    if(setupHitConfig.healthdrop === undefined) {    
      setupHitConfig.healthdrop = 10 ;
    }
   
    var hit = { // action config object

      perform: hitHelper.perform,
      detect: hitHelper.detect,
      healthbar: healthbar,
      healthdrop: setupHitConfig.healthdrop,
      health_transition: health_transition,
      transition: hitHelper.transition,
      element: element,
      viz: viz,
      audio: audio,
      sourceType: setupHitConfig.sourceType,
      type_check: hitHelper.type_check,
      detectSwitch: true,
      performSwitch: false,

    } ; 

    return hit ;

  },    
	
} ;