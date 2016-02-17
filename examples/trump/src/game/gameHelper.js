var gameHelper = {

  load_char: function game_helper_load_characters(viz) {

  	if(viz === undefined) {
  		viz = this ;
  	}

	  viz.player = setup_element(viz, viz.playerConfig) ;
	  viz.enemy  = setup_element(viz, viz.enemyConfig) ;
	  viz.player.orientation = 'r' ; // all players start facing right

	  viz.player.adversary = viz.enemy ; // decorate the player object for convenient access to the viz.enemy object 
	  viz.enemy.adversary  = viz.player ;
		
	  viz.setup_score() ;

	},
	
} ;