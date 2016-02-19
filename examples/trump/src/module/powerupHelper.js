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
        transitionSet: { 
          drop: $Z.transition.rounded_linear_transition_func,
          stop: $Z.transition.rounded_linear_transition_func,
          deliver: $Z.transition.rounded_linear_transition_func
          // remove:
        },

      } ;

    }

    var rowName = ['cell'] ;
    var canvas  = imageHelper.image2canvas('./images/powerup.png') ;
    var width   = [22] ;
    var height  = [20] ;

    viz.player.powerup        = itemHelper.setup(powerupConfig, viz) ;
    viz.player.powerup.sprite = spriteHelper.get(canvas, rowName, width, height) ;
    viz.player.powerup.image  = viz.player.powerup.sprite.cell[0] ;

  },
	
} ;

// imageHelper.view(viz.player.powerup.image) ;