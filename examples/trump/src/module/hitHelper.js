var hitHelper = {

  duration: 1000,

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

  setup_response: function hit_helper_setup(viz, element, setupResponseConfig) {

    if(setupResponseConfig === undefined) {
      setupResponseConfig = {} ;
    }

    if(setupResponseConfig.elementHealth === undefined) {
      setupResponseConfig.elementHealth = 88 ;
    }

    if(setupResponseConfig.healthbarHeight === undefined) {
      setupResponseConfig.healthbarHeight = 7 ;
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
        responseSwitch: true,
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
        responseSwitch: true,
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
    // console.log ('response helper perform start: this', this) ;
    // if (response.element.item.transition !== undefined && response.element.item.transition.length > 0) {
    //   return ;
    // }        

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
      
      var playerSource  = response.sourceItem.type === 'player' ;
      var attackCheck   = item.collision_image('source') !== undefined ;
      var playerTarget  = response.element === response.viz.player ;
      var playerCounter = attackCheck && playerTarget ;
      var enemyTarget   = response.element === response.viz.enemy ;

      if(playerSource && enemyTarget) { 
        response.viz.player.score.increase('enemyHit') ;
      }

      if(response.element.explode !== undefined) {
        response.element.explode() ;
        viz.audio.explode.play() ;
      }

      if(response.sourceItem.explode !== undefined) {
        response.sourceItem.explode() ;
      }

      if(response.healthbar !== undefined & !playerCounter) { // i.e. player or enemy was response while in their attack frame state

        response.healthbar.health -= response.healthdrop * (response.viz.player.level + 1) ;

        hitHelper.flash(response) ; // also sets inertSwitch - separate?
        if(response.audio !== undefined && response.audio.buffer !== undefined) {
          response.audio.play() ;
        }

        if (response.healthbar.health < 0 && response.element === response.viz.enemy) {
          response.viz.enemyAttack.on = false ;
          // if(document.nextLevel === null) {
            // alert('congratulations! you did it') ;
            // $Z.item([]) ;
            response.viz.fade({ 
              opacity: 0, 
              duration: response.viz.fadeDuration,
              end: function () { window.location.reload() ; },
            }) ;
            imageEffectHelper.explode.call(response.element.item) ;
            viz.audio.ah.play() ;
          // } // else {
            // alert ('game over') ;
            // console.log('hitHelper.perform', 'response.element.item', response.element.item)
            // response.element.item.explode() ;
            // response.healthbar.health = 0 ;            
            // var blockSize        = 12 ;
            // imageEffectHelper.explode.call(response.element.item, blockSize) ;
            // $Z.item([]) ;
            // var shakeSwitch = true ;
            // effectHelper.zoom_inout(response.viz, 3 * hitHelper.duration, shakeSwitch) ;                    
        //     response.viz.fade({
        //       opacity: 0, 
        //       end: function() {
        //         $Z.exit() ;
        //         document.nextLevel() ;           
        //       }
        //     }) ;

        //     response.viz.player.item.zoom() ;

        //   }
        }

        if (response.healthbar.health < 0 && response.element === response.viz.player) {
          // alert('game over') ;

          var blockSize = 8 ;
          imageEffectHelper.explode.call(response.element.item, blockSize, response.viz.fadeDuration) ;

          var scale = 0.25 ;

          response.viz.zoom({
            
            duration: response.viz.fadeDuration, 
            x: response.element.item.x + 0.5 * scale * response.element.item.image.width, 
            y: response.element.item.y + 0.5 * scale * response.element.item.image.height, 
            width: response.viz.width * scale, 
            height: response.viz.height * scale,

          }) ;
          
          response.viz.fade({
            opacity: 0, 
            duration: response.viz.fadeDuration,
            end: function () { window.location.reload() ; },
          }) ;

          response.healthbar.health = 0 ;
          response.viz.audio.laugh1.play() ;
          response.viz.enemyAttack.on = false ;

          if(viz.audio.music !== undefined) {
            viz.audio.music.fade(response.viz.fadeDuration) ;
          }

        }

        transitionHelper.update_end_value.call(response.healthbar.item, 'width', response.healthbar.health, response.health_transition) ;

      }

      // response.transition() ; // adds an array of transition objects to the item's transition list

    }

    if(response.transition !== undefined) {
      response.transition() ;      
    }    

  }, 

  reset: function hit_helper_reset (response) {
    // console.log ('hit_reset', 'this', this);

    if( response === undefined ) {
      response = this.response ;
    }
    
    response.responseSwitch = true ;
  },

  transition: function hit_helper_transition(response) {

    // console.log ('response transition', 'element', element, 'hitDur', hitDur) ;

    if(response === undefined) {
      response = this ;
    }

    var element = this.element ;

    if(response.occurred) {

      // console.log('response occurred start') ;

      var hitDur          = hitHelper.duration ; // ( element.adversary.sprite.attack.length + 20 ) * viz.dur ;
      // var hitTransition   = step_transition_func('image', response.viz.frameDuration * 1.5)(element.sprite.hit[0]) ;
      element.item.image = element.sprite.hit[0] ;
      // console.log('transition hittttt', element.frameDuration) ;
      hitTransition = animate(element.sprite.hit, step_transition_func('image', element.config.hitDuration), undefined, element.sprite.rest[0])[0] ;

      // if(element === response.viz.enemy) { // perform zoom in-out and screen shake effects on enemy response

      //   var shakeSwitch = true ;

      //   var freq = 1 / 8 ;
      //   if(Math.random() < freq) {
      //     effectHelper.zoom_inout(response.viz, hitDur, shakeSwitch) ;        
      //   }

      // }

      var replacementSwitch = true ; // interrupt current player transitions due to response
      element.item.add_transition(hitTransition, replacementSwitch) ;

      hitHelper.detect_switch(response) ;

      // console.log('response occurred end', 'hit', response, 'element', element) ;

    } else {

      if(element === response.viz.enemy && response.sourceItem === response.viz.player.item) { // player-enemy collision moves player back 

        function collision_check() {
          var col = {
            item: [response.element.item, response.viz.player.item],
            width: response.viz.width,
            height: response.viz.height,
          } ;

          collisionDetect.pixelwise(col) ;
          
          // console.log('hitHelper collision_check', 'col', col) ;

          return col.collision.count > 0 ;

        }

        // var replacementSwitch = true ;
        // response.viz.player.busy = true ;

        // response.viz.player.item.remove_transition('x') ;

        if(response.viz.player.state === 'j') {
          response.viz.player.item.remove_transition('x') ;          
        } else if(response.viz.player.state === 'r') {
          response.viz.player.state = 'l' ;
          response.viz.player.callback() ;
        }

        var xBump             = viz.player.config.xMove + 1 ;
        while(collision_check()) {
          response.viz.player.item.x -= xBump ;          
        }

        // var xNew              = Math.max(-response.viz.player.item.image.width * 0.5, response.viz.player.item.x - xBump) ; 
        // var trans             = response.viz.player.transitionSet.x(response.viz.player.item.x) ;
        // trans.duration        = 1 ;
        // trans.child           = response.viz.player.transitionSet.x(xNew) ;
        // response.viz.player.item.add_transition(trans) ;

      }    

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

    var hitDur         = hitHelper.duration ;
    var Nstep          = 4 ; 
    // console.log('hitDur', hitDur, 'Nstep', Nstep) ;
    element.item.flash(0.5 * hitDur / Nstep, Nstep) ;
    // var flash          = effectHelper.flash.call(element, hitDur / Nstep, Nstep).animation[0] ;
    // element.item.add_transition(flash) ;

  },

  detect_switch: function hit_helper_flash(response) {

    if(response === undefined) {
      response = this ;
    }

    var element = response.element ;

    response.responseSwitch = false ;

    var hitDur = hitHelper.duration ;

    var reset = step_transition_func ('hitReset', hitDur) (0) ;

    reset.end = { 

      response: element.item.responseSet.hit,

      run: hitHelper.reset,

    } ;

    element.item.add_transition(reset) ;

  },
	
} ;