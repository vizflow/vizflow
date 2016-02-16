var hitHelper = {

  duration: 150,

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

  load: function hit_helper_load(playerHitConfig, enemyHitConfig, viz) {

    if( viz === undefined ) {
      viz = this ;
    }

    if (enemyHitConfig === undefined) {
      enemyHitConfig = {
        healthbarY: 2, 
        healthbarX: Math.floor(viz.width * 0.5) + 1,
        healthdrop: 20,
        color: '#900',
        audio: viz.audio.hit3,
        sourceType: 'player',
      } ;   
    }

    if (playerHitConfig === undefined) {
      playerHitConfig = {
        healthdrop: enemyHitConfig.healthdrop,
        healthbarY: 2,
        healthbarX: 1,
        color: '#009', 
        audio: viz.audio.hit3,
        sourceType: 'enemy',
      } ;
    }
      
    viz.player.item.actionSet.hit = hitHelper.setup(viz, viz.player, playerHitConfig) ;
    viz.enemy.item.actionSet.hit  = hitHelper.setup(viz, viz.enemy, enemyHitConfig) ; 

    if(viz.player.config.bulletSwitch) {
      load_player_bullet (viz) ;
    }

    load_enemy_bullet  (viz) ;

  },

  setup: function hit_helper_setup(viz, element, setupHitConfig) {

    if(setupHitConfig === undefined) {
      setupHitConfig = {} ;
    }

    if(setupHitConfig.elementHealth === undefined) {
      setupHitConfig.elementHealth = 88 ;
    }

    if(setupHitConfig.healthbarHeight === undefined) {
      setupHitConfig.healthbarHeight = 7 ;
    }
    
    var audio = setupHitConfig.audio ;

    if(setupHitConfig.healthdrop !== undefined) {

      var healthbar = setup_healthbar (
        viz, 
        setupHitConfig.elementHealth, 
        setupHitConfig.healthbarHeight, 
        setupHitConfig.healthbarX,
        setupHitConfig.healthbarY, 
        setupHitConfig.color
      ) ;

      var health_transition = $Z.transition.linear_transition_func ( 'width', viz.dur * 4 ) ; 

      if(setupHitConfig.healthdrop === undefined) {    
        setupHitConfig.healthdrop = 10 ;
      }
     
      var hit = { // action config object

        perform: hitHelper.perform,
        confirm: hitHelper.confirm,
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
        sourceType: setupHitConfig.sourceType,
        type_check: hitHelper.type_check,
        detectSwitch: true,
        performSwitch: false,

      } ; 

      // console.log('hit', hit) ;

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

  perform: function hit_helper_perform (hit) {
    // console.log ('hit helper perform start: this', this) ;
    // if (hit.element.item.transition !== undefined && hit.element.item.transition.length > 0) {
    //   return ;
    // }        

    if(hit === undefined) {
    	hit = this ;
    }

    // console.log('hitHelper perform sourceItem', hit.sourceItem, 'sourceItem type', hit.sourceItem.type) ;

    hit.occurred = hit.confirm(hit.sourceItem) ; 

    if( hit.occurred ) { // i.e. either the player or the enemy was hit since we passed the detailed collision detection step

      // console.log('hitHelper perform', 'element', hit.element) ;

      if( hit.sourceItem.singleSwitch ) {
        // console.log('perform inert')
        hit.sourceItem.inert = true ; // deactivate the bullet after it hits
      }     

      var item = hit.element.item === undefined ? hit.element : hit.element.item ;
      
      var playerSource  = hit.sourceItem === hit.viz.player.item ;
      var attackCheck   = item.collision_image('source') !== undefined ;
      var playerTarget  = hit.element === hit.viz.player ;
      var playerCounter = attackCheck && playerTarget ;
      var enemyTarget   = hit.element === hit.viz.enemy ;

      if(playerSource && enemyTarget) { 
        hit.viz.player.score.increase('enemyHit') ;
      }

      if(hit.element.explode !== undefined) {
        hit.element.explode() ;
      }

      if(hit.sourceItem.explode !== undefined) {
        hit.sourceItem.explode() ;
      }

      if(hit.healthbar !== undefined & !playerCounter) { // i.e. player or enemy was hit while in their attack frame state

        hit.healthbar.health -= hit.healthdrop ;
        
        hitHelper.flash(hit) ; // also sets inertSwitch - separate?
        if(hit.audio !== undefined && hit.audio.buffer !== undefined) {
          hit.audio.play() ;
        }

        if (hit.healthbar.health < 0 && hit.element === hit.viz.enemy) {
          hit.viz.enemyAttack.on = false ;
          if(document.nextLevel === null) {
            // alert('congratulations! you did it') ;
            // $Z.item([]) ;
            hit.viz.fade({ opacity: 0, duration: hit.viz.fadeDuration }) ;
            imageEffectHelper.explode.call(hit.element.item) ;
          } else {
            // alert ('game over') ;
            // console.log('hitHelper.perform', 'hit.element.item', hit.element.item)
            // hit.element.item.explode() ;
            hit.healthbar.health = 0 ;            
            var blockSize        = 12 ;
            // imageEffectHelper.explode.call(hit.element.item, blockSize) ;
            // $Z.item([]) ;
            // var shakeSwitch = true ;
            // effectHelper.zoom_inout(hit.viz, 3 * hitHelper.duration, shakeSwitch) ;                    
            hit.viz.fade({
              opacity: 0, 
              end: function() {
                $Z.exit() ;
                document.nextLevel() ;           
              }
            }) ;

            var scale = 0.25 ;
            hit.viz.zoom({duration: hit.viz.fadeDuration, x: hit.viz.player.item.x + 0.5 * scale * hit.viz.player.item.image.width, y: hit.viz.player.item.y + 0.5 * scale * hit.viz.player.item.image.height, width: hit.viz.width * scale, height: hit.viz.height * scale }) ;

          }
        }

        if (hit.healthbar.health < 0 && hit.element === hit.viz.player) {
          // alert('game over') ;

          var blockSize = 8 ;
          imageEffectHelper.explode.call(hit.element.item, blockSize, hit.viz.fadeDuration) ;

          var scale = .25 ;

          hit.viz.zoom({duration: hit.viz.fadeDuration, x: hit.element.item.x + 0.5 * scale * hit.element.item.image.width, y: hit.element.item.y + 0.5 * scale * hit.element.item.image.height, width: hit.viz.width * scale, height: hit.viz.height * scale }) ;
          hit.viz.fade({
            opacity: 0, 
            duration: hit.viz.fadeDuration,
          }) ;
          hit.healthbar.health = 0 ;
          hit.viz.audio.laugh1.play() ;
          hit.viz.enemyAttack.on = false ;

        }

        transitionHelper.update_end_value.call(hit.healthbar.item, 'width', hit.healthbar.health, hit.health_transition) ;

      }

      // hit.transition() ; // adds an array of transition objects to the item's transition list

    }

    if(hit.transition !== undefined) {
      hit.transition() ;      
    }    

  }, 

  reset: function hit_helper_reset (hit) {
    // console.log ('hit_reset', 'this', this);

    if( hit === undefined ) {
      hit = this.hit ;
    }
    
    hit.detectSwitch = true ;
  },

  transition: function hit_helper_transition(hit) {

    // console.log ('hit transition', 'element', element, 'hitDur', hitDur) ;

    if(hit === undefined) {
      hit = this ;
    }

    var element = this.element ;

    if(hit.occurred) {

      // console.log('hit occurred start') ;

      var hitDur          = hitHelper.duration ; // ( element.adversary.sprite.attack.length + 20 ) * viz.dur ;
      // var hitTransition   = step_transition_func('image', hit.viz.frameDuration * 1.5)(element.sprite.hit[0]) ;
      element.item.image = element.sprite.hit[0] ;
      // console.log('transition hittttt', element.frameDuration) ;
      hitTransition = animate(element.sprite.hit, step_transition_func('image', element.config.hitDuration), undefined, element.sprite.rest[0])[0] ;

      // if(element === hit.viz.enemy) { // perform zoom in-out and screen shake effects on enemy hit

      //   var shakeSwitch = true ;

      //   var freq = 1 / 8 ;
      //   if(Math.random() < freq) {
      //     effectHelper.zoom_inout(hit.viz, hitDur, shakeSwitch) ;        
      //   }

      // }

      var replacementSwitch = true ; // interrupt current player transitions due to hit
      element.item.add_transition(hitTransition, replacementSwitch) ;

      hitHelper.detect_switch(hit) ;

      // console.log('hit occurred end', 'hit', hit, 'element', element) ;

    } else {

      if(element === hit.viz.enemy && hit.sourceItem === hit.viz.player.item) { // player-enemy collision moves player back 

        var replacementSwitch = true ;
        var xBump             = 25 ;
        var xNew              = Math.max(-hit.viz.player.item.image.width * 0.5, hit.viz.player.item.x - xBump) ; 
        var trans             = hit.viz.player.transitionSet.x(hit.viz.player.item.x) ;
        trans.duration        = 1 ;
        trans.child           = hit.viz.player.transitionSet.x(xNew) ;
        hit.viz.player.item.add_transition(trans) ;

      }    

    }

    if(element.explode !== undefined) {
      element.explode() ;
    }

  },

  flash: function hit_helper_flash(hit) {

    if(hit === undefined) {
      hit = this ;
    }

    var element = hit.element ;

    var hitDur         = hitHelper.duration ;
    var Nstep          = 4 ; 
    // console.log('hitDur', hitDur, 'Nstep', Nstep) ;
    element.item.flash(0.5 * hitDur / Nstep, Nstep) ;
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
	
} ;