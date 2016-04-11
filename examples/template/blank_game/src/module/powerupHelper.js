var powerupHelper = {

  duration: 3000,

  release: function(deliveryItem) {

    if(deliveryItem === undefined) {
      deliveryItem = this ;
    }

  },

  drop: function(item) {

    if(item === undefined) {
      item = this ;
    }

    // console.log('powerupHelper drop:', 'item', item) ;

  },

  stop: function(endConfig) {

    if(endConfig === undefined) {
      endConfig = this ;
    }

    var item = this.item ;

    // console.log ('powerup helper stop', 'item', item) ;

  },  

  deliver: function(powerup) {

    if(powerup === undefined) {
      powerup = this ;
    }

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

    var newPowerup = Object.copy ( element[name] ) ;

    if(newPowerup.drop !== undefined) {
      element.powerupDelivery.powerup = newPowerup ;
      element.powerupDelivery.enter() ;
      // newPowerup.drop() ; // overwriting the previous value of newPowerup.transition with the output of the newPowerup.transition function call
    }

    element[name].count++ ;

  },  
	
} ;