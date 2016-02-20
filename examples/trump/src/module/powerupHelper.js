var powerupHelper = {

  drop: function(item) {

    if(item === undefined) {
      item = this ;
    }

    console.log('powerupHelper drop:', 'item', item)

    var dropDur = 3000 ;
    var yTrans  = $Z.transition.rounded_linear_transition_func('y', dropDur) ;

    yTrans.end = {
      item: item,
      run: item.stop,
    } ;

    item.add_transition(yTrans) ;

    var Nstep         = 5 ;
    var frameDuration = dropDur / Nstep ;
    item.flash(frameDuration, Nstep) ;

    viz.audio.powerup3.play() ;

  },

  stop: function(endConfig) {

    if(endConfig === undefined) {
      endConfig = this ;
    }

    var item = this.item ;

    item.viz.audio.bump1.play() ;

  },  

  deliver: function(item) {

    if(item === undefined) {
      item = this ;
    }

    item.viz.audio.powerup0.play() ;

  },

  setup_response: function powerup_helper_setup_response (viz, powerupResponseConfig) {
   
    var powerupResponse = {

      type: 'enemy',
      viz: viz, 
      image: powerupResponseConfig.image,
      config: powerupResponseConfig,
      transition: powerupHelper.deliver,
      render: drawHelper.image,
      collision_image: actionHelper.collision_image,
      explode: imageEffectHelper.explode,
      fade: imageEffectHelper.fade,
      singleSwitch: true,
      opacity: 0,
      inert: false,
      responseSet: {},
      fadeDuration: 200,

    } ;

    return powerupResponse ;
    
  },

  fire: function powerup_helper_fire (name) {

    if(name === undefined) {
      name = 'powerup' ;
    }

    // console.log('fire powerup', 'this', this, 'name', name, 'this.adversary[name]', this.adversary[name]) ;

    // if (this[name] !== undefined) { // check if this character shoots powerups

    var newPowerup = copy_object ( this.adversary[name] ) ;

    // console.log('newPowerup', newPowerup)

    if(this.powerupResponseConfig !== undefined) {
      // newPowerup.responseSet.hit = powerupHelper.setup_response(this.item.viz, newPowerup, this.powerupResponseConfig) ;
    }

    // newPowerup.y = this.item.y + this[name].config.shiftY ;
    // console.log ('newPowerup', newPowerup, 'this', this, 'powerup', this[name]) ;

    // console.log('fire powerup', 'transition', newPowerup.transition) ;
    console.log('fire powerup', 'newPowerup', newPowerup, 'this', this) ;
    // console.log('this.adversary.item, newPowerup', this.adversary.item, newPowerup) ;
    // imageHelper.view(newPowerup.image)

    this.item.viz.add_item(newPowerup) ;

    if(newPowerup.drop !== undefined) {
      newPowerup.drop() ; // overwriting the previous value of newPowerup.transition with the output of the newPowerup.transition function call
    }

    // this[name].audio.play() ;
    // console.log ('fire_powerup end powerup if-block') ;

  },  
	
} ;

// imageHelper.view(viz.player.powerup.image) ;