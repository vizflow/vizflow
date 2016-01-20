function load_characters(viz, playerConfig, enemyConfig) {

  viz.player = setup_element(viz, playerConfig) ;
  viz.enemy  = setup_element(viz, enemyConfig) ;

  viz.player.orientation = 'r' ; // all players start facing right

  viz.player.adversary = viz.enemy ; // decorate the player object for convenient access to the viz.enemy object 
  viz.enemy.adversary  = viz.player ;
	
}