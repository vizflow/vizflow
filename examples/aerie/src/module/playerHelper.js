var playerHelper = {

	setup: function player_helper_setup(viz) {

	  viz.player              = setup_element(viz, viz.playerConfig) ;
	  viz.player.orientation  = 'r' ; // all players start facing right
	  viz.player.level        = 0 ;
	  viz.player.update       = playerHelper.update_player ;
	  viz.player.levelup      = playerHelper.levelup ;
	  viz.player.load_bullet  = playerHelper.load_bullet ;
      viz.player.fire_powerup = powerupHelper.fire ;
      viz.player.paused       = true ;

	},
	
  update: function player_helper_update(state, player) {

    // console.log ('playerHelper.update: this.callback: state', state, 'this', this) ;

    if( player === undefined ) {
    	player = this ;
    }

    if( player.paused === true ) {
      return ;
    }

    if( state !== undefined ) {      
      player.state = state ;
    }

    var transition ;

    switch( player.state ) {

    }

  },


	levelup: function player_helper_levelup( player ) {
		
		if( player === undefined ) {
			player = this ;
		}

		// console.log('levelup start')

		player.level++ ; // increment the level value (level-up)

		// console.log('playerHelper levelup:', 'player.level', player.level, 'player.sprite[attack + player.level]', player.sprite['attack' + player.level]) ;

		if( player.sprite['attack' + player.level] !== undefined ) {
    	player.sprite.attack = player.sprite['attack' + player.level] ;
    	player.spriteL.attack = player.spriteL['attack' + player.level] ;
    	player.spriteR.attack = player.spriteR['attack' + player.level] ;
		}

		if( player.sprite['hit' + player.level] !== undefined ) {
    	player.sprite.hit = player.sprite['hit' + player.level] ;			
    	player.spriteL.hit = player.spriteL['hit' + player.level] ;			
    	player.spriteR.hit = player.spriteR['hit' + player.level] ;			
		}

		if( player.sprite['jump' + player.level] !== undefined ) {
    	player.sprite.jump = player.sprite['jump' + player.level] ;			
    	player.spriteL.jump = player.spriteL['jump' + player.level] ;			
    	player.spriteR.jump = player.spriteR['jump' + player.level] ;			
		}

		if( player.sprite['rest' + player.level] !== undefined ) {
    	player.sprite.rest = player.sprite['rest' + player.level] ;			
    	player.spriteL.rest = player.spriteL['rest' + player.level] ;			
    	player.spriteR.rest = player.spriteR['rest' + player.level] ;			
		}

		if( player.sprite['walk' + player.level] !== undefined ) {
    	player.sprite.walk = player.sprite['walk' + player.level] ;			
    	player.spriteL.walk = player.spriteL['walk' + player.level] ;			
    	player.spriteR.walk = player.spriteR['walk' + player.level] ;			
		}

		player.item.image = player.sprite.rest[0] ;

	},

  setup_bullet: function player_helper_setup_bullet( viz, player, bulletConfig ) {

    var bullet = {} ;

    return bullet ;

  },  

  load_bullet: function player_helper_load_bullet( viz ) {

    viz.player.bullet      = playerHelper.setup_bullet ( viz, viz.player, bulletConfig ) ;  
    viz.player.jumpBullet  = playerHelper.setup_bullet ( viz, viz.player, jumpBulletConfig ) ;      
    
    viz.player.fire_bullet = bulletHelper.fire ;
    
  },

} ;