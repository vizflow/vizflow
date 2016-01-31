var hitHelper = {

  itemPair: [null, null], // temporary variable used by collision()

  collision: { // temporary variable used by collision()
    width: null, 
    height: null, 
    item: null, 
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

	detect: function hit_helper_detect(sourceItem, hit) {

		if(hit === undefined) {
			hit = this ;
		}

		var targetItem = hit.element ; // by convention, attach the hit action config object to the target element

	  hitHelper.collision.width  = viz.width ; // setup temporary variable used later for detailed collision detection (if necessary)
	  hitHelper.collision.height = viz.height ; 

	  var typeCheck = hit.type_check(sourceItem) ; // boolean variable storing the resuls of the type-validity check function contained in the target item's hit config object

	  if( typeCheck ) { // the target item type matches the source item, so we can perform a detailed collision check for collision image overlap (phase 2)

	    hitHelper.source.image = hit.sourceCollisionImage[sourceItem.image] ; // use the item's current display image as the key for the collision image lookup table 
	    hitHelper.source.x     = sourceItem.x ; 
	    hitHelper.source.y     = sourceItem.y ; 

	    hitHelper.target.image = hit.targetCollisionImage[targetItem.image] ; // use the item's current display image as the key for the collision image lookup table 
	    hitHelper.target.x     = targetItem.x ; 
	    hitHelper.target.y     = targetItem.y ; 

	    hitHelper.itemPair[0]  = hitHelper.target ;
	    hitHelper.itemPair[1]  = hitHelper.source ;

	    hitHelper.collision.item = hitHelper.itemPair ;

	    hitHelper.collision.detect() ; // run collision detection again using the actual collision images for detailed collision detection (phase 2)

	    if( hitHelper.collision.list.length > 0 ) { // this means that the displayed images are overlapping (will optimize computational efficiency later #todo)
	      return true ; // all checks passed, stage the hit for execution
	    }

	  }

	  return false ;

	},  

  perform: function hit_helper_perform (hit) {
    // console.log ('perform hit hit: this', this) ;
    // if (hit.element.item.transition !== undefined && hit.element.item.transition.length > 0) {
    //   return ;
    // }        

    if(hit === undefined) {
    	hit = this ;
    }

    hit.healthbar.health -= hit.healthdrop ;
    
    if (hit.healthbar.health < 0 && hit.element === hit.viz.enemy) {
      if(document.nextLevel === null) {
        alert('congratulations! you did it') ;
        $Z.item([]) ;
      } else {
        $Z.maxIter = 0 ; // force exit 
        document.nextLevel() ; 
        $Z.maxIter = Infinity ;
      }
      // alert ('game over') ;
      hit.healthbar.health = 0 ;
    }

    if (hit.healthbar.health < 0 && hit.element === hit.viz.player) {
      alert('game over') ;
      $Z.item([]) ;
      hit.healthbar.health = 0 ;
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
    var transition = hit.transition() ; // returns an array of transition objects
    var replacementSwitch = true ; // interrupt current player transitions due to hit
    for (var kTrans = 0 ; kTrans < transition.length ; kTrans++) {
      transitionHelper.add.call(hit.element.item, transition[kTrans], replacementSwitch) ;
    }

    if(hit.audio !== undefined && hit.audio.buffer !== undefined) {
      hit.audio.play() ;
    }
    // console.log ('perform hit hit end', 'hit.element.item.transition', hit.element.item.transition) ;

  }, 

  reset: function hit_helper_reset (element) {
    //console.log ('hit_reset');

    if( element === undefined ) {
      element = this ;
    }
    
    element.item.inert = false ;
  },

  transition: function hit_helper_transition(element) {

    // console.log ('hit transition', 'element', element, 'hitDur', hitDur) ;

    if(element === undefined) {
      element = this ;
    }

    element.item.inert  = true ;

    var hitDur          = ( element.adversary.sprite.attack.length + 20 ) * viz.dur ;
    var hit             = step_transition_func('image', hitDur) ;
    var hitTransition   = step_transition_func('image', viz.dur * 12)(element.sprite.hit[0]) ;
    hitTransition.child = hit(element.sprite.rest[0]) ;
    // hitTransition.child.end = [hitHelper.reset, hit_reset] ;
    hitTransition       = [hitTransition, undefined, undefined] ;

    var reset           = step_transition_func ('dummy', hitDur) (0) ;
    reset.end           = [hitHelper.reset] ;
    hitTransition[1]    = reset ;

    var frameDuration   = hitDur * .1 ;
    var Nstep           = 2 * (Math.floor(0.25 * hitDur / frameDuration)) ;
    var flash           = effect.flash.call(element, frameDuration, Nstep) ;
    hitTransition[2]  = flash.animation[0] ;

    // console.log('setup hit', 'flash', flash) ;

    return hitTransition ;

  },
	
} ;