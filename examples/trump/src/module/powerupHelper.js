var powerupHelper = {

  setup: function powerup_helper_setup(powerupConfig, viz) {

    if( viz === undefined ) {
      viz = this ;
    }

    if (powerupConfig === undefined) {

      powerupConfig = {

        x: viz.width * 0.5,
        y: -20,
        inert: true,

      } ;

    }

    viz.player.powerup = itemHelper.setup(powerupConfig, viz) ;

    var rowName = ['cell'] ;
    var canvas  = imageHelper.image2canvas('./images/powerup.png') ;
    var width   = [22] ;
    var height  = [20] ;

    viz.player.powerup.sprite = spriteHelper.get(canvas, rowName, width, height) ;
    viz.player.powerup.image  = viz.player.powerup.sprite.cell[0] ;

  },
	
} ;

// imageHelper.view(viz.player.powerup.image) ;