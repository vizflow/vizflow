var powerupHelper = {

  duration: 3000,

  release: function(deliveryItem) {

    if(deliveryItem === undefined) {
      deliveryItem = this ;
    }

    var travelDur = powerupHelper.duration * 0.5 ;
    var xShift    = 50 ;
    var xMove     = 0.5 * deliveryItem.viz.width - xShift ;
    var x         = $Z.transition.rounded_linear_transition_func('x', travelDur) ;
    var xTrans    = x(xMove) ;
    xTrans.child  = x(deliveryItem.viz.width) ;

    xTrans.end = function () {
      deliveryItem.image = deliveryItem.config.sprite[1] ;
      deliveryItem.powerup.x = deliveryItem.x + deliveryItem.image.originalCanvas.width * 0.5 - deliveryItem.powerup.image.originalCanvas.width * 0.5 ;
      deliveryItem.powerup.y = deliveryItem.y + deliveryItem.image.originalCanvas.height * 0.5 - deliveryItem.powerup.image.originalCanvas.height ;
      deliveryItem.powerup.add() ; 
      deliveryItem.powerup.drop() ;
    }

    xTrans.child.end = function() {
      deliveryItem.remove() ;
    } ;

    // console.log('powerupHelper release:', 'deliveryItem', deliveryItem) ;

    deliveryItem.add() ;
    deliveryItem.add_transition(xTrans) ;    

  },

  drop: function(item) {

    if(item === undefined) {
      item = this ;
    }

    // console.log('powerupHelper drop:', 'item', item) ;

    var dropDur = powerupHelper.duration ;
    var offsetY = 4 ;
    var yTrans  = $Z.transition.rounded_linear_transition_func('y', dropDur)(item.viz.platformY - (item.image.height / document.ratio) - offsetY) ;

    yTrans.end = {
      item: item,
      run: item.stop,
    } ;

    item.add_transition(yTrans) ;

    var Nstep         = 15 ;
    var frameDuration = 0.5 * dropDur / Nstep ;
    item.flash(Nstep, frameDuration) ;

    viz.audio.powerup3.play() ;

  },

  stop: function(endConfig) {

    if(endConfig === undefined) {
      endConfig = this ;
    }

    var item = this.item ;
    item.inert = false ;
    console.log ('powerup helper stop', 'item', item) ;

    // item.viz.audio.bump.play() ;

  },  

  deliver: function(powerup) {

    if(powerup === undefined) {
      powerup = this ;
    }

    powerup.viz.audio.powerup0.play() ;
    var dur = 500 ;
    var delay = 0.25 ;

    powerup.fade({
      duration: dur,
      end: function() {
        powerup.viz.player.levelup() ;        
        powerup.viz.audio.powerup.play(delay) ;
        powerup.remove() ;
      },
    }) ;

  },

  perform: function (powerupResponse) {

    if (powerupResponse === undefined) {
      powerupResponse = this ;
    }

    var typeCheck = powerupResponse.type_check(powerupResponse.sourceItem) ; // boolean variable storing the resuls of the type-validity check function contained in the target item's hit config object
    // console.log('powerup helper, perform start', 'this', this, 'this.element.inert', this.element.inert, 'this.sourceItem', this.sourceItem, 'typeCheck', typeCheck) ;

    if (typeCheck === true) {

      powerupResponse.sourceItem.inert = true ;
      var item = powerupResponse.sourceItem ;
      powerupResponse.sourceItem.deliver() ;
      // console.log('before levelup') ;
      
    }

  },

  setup: function powerup_helper_setup (viz, powerupResponseConfig) {
 
    var powerupResponse = { // action config object

      perform: powerupHelper.perform,
      transition: powerupHelper.deliver, 
      element: viz.player,
      viz: viz,
      // audio: audio,
      sourceType: powerupResponseConfig.sourceType || 'powerup',
      type_check: responseHelper.type_check,
      onSwitch: true,
      performSwitch: false,

    } ; 

    return powerupResponse ;
    
  },

  fire: function powerup_helper_fire (name, element) {

    if(name === undefined) {
      name = 'powerup' ;
    }

    if(element === undefined) {
      element = this ; // e.g. the player character game element
    }

    var newPowerup = copy_object ( element[name] ) ;

    if(newPowerup.drop !== undefined) {
      element.powerupDelivery.powerup = newPowerup ;
      element.powerupDelivery.enter() ;
      // newPowerup.drop() ; // overwriting the previous value of newPowerup.transition with the output of the newPowerup.transition function call
    }

    element[name].count++ ;

  },  
	
} ;

// this[name].audio.play() ;
// console.log ('fire_powerup end powerup if-block') ;

// console.log('fire powerup', 'this', this, 'name', name, 'this.adversary[name]', this.adversary[name]) ;

// if (this[name] !== undefined) { // check if this character shoots powerups


// console.log('newPowerup', newPowerup)

// if(elemen.powerupResponseConfig !== undefined) {
// newPowerup.responseSet.hit = powerupHelper.setup(this.item.viz, newPowerup, this.powerupResponseConfig) ;
// }

// newPowerup.y = this.item.y + this[name].config.shiftY ;
// console.log ('newPowerup', newPowerup, 'this', this, 'powerup', this[name]) ;

// console.log('fire powerup', 'transition', newPowerup.transition) ;
// console.log('fire powerup', 'newPowerup', newPowerup, 'this', this) ;
// console.log('this.adversary.item, newPowerup', this.adversary.item, newPowerup) ;
// imageHelper.view(newPowerup.image)

// imageHelper.view(viz.player.powerup.image) ;