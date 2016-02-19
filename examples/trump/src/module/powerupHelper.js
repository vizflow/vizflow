var powerupHelper = {

  setup: function powerup_helper_setup(powerupConfig, viz) {

    if( viz === undefined ) {
      viz = this ;
    }

    if ( powerupConfig === undefined ) {

      powerupConfig = {

        x: viz.width * 0.5,
        y: -20,
        inert: true,

      } ;

    }

    var rowName = ['cell'] ;
    var canvas  = imageHelper.image2canvas('./image/powerup.png') ;
    var width   = [22] ;
    var height  = [20] ;

    viz.player.powerup         = itemHelper.setup(powerupConfig, viz) ;
    viz.player.powerup.sprite  = spriteHelper.get(canvas, rowName, width, height) ;
    viz.player.powerup.image   = viz.player.powerup.sprite.cell[0] ;

    viz.player.powerup.drop    = powerupHelper.drop ;
    viz.player.powerup.stop    = powerupHelper.stop ;
    viz.player.powerup.deliver = powerupHelper.deliver ;

  },

  drop: function(item) {

    if(item === undefined) {
      item = this ;
    }

    var dropDur = 3000 ;
    var yTrans  = $Z.transition.rounded_linear_transition_func('y', dropDur) ;

    yTrans.end = {
      item: item,
      run: item.stop,
    }

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

      viz: viz, 
      config: powerupResponseConfig,
      image: spriteset.pack[0],
      transition: powerupHelper.deliver,
      render: drawHelper.image,
      type: 'powerup',
      collision_image: actionHelper.collision_image,
      singleSwitch: true,
      opacity: 0,
      inert: false,
      actionSet: {},
      explode: imageEffectHelper.explode,
      fade: imageEffectHelper.fade,
      fadeDuration: 200,

    } ;

    return powerupResponse ;
    
  },
	
} ;

// imageHelper.view(viz.player.powerup.image) ;