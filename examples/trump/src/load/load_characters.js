function load_characters(viz) {

  viz.player = setup_element(viz, viz.playerConfig) ;
  console.log('first') ;
  viz.enemy  = setup_element(viz, viz.enemyConfig) ;
  console.log('second') ;
  viz.player.orientation = 'r' ; // all players start facing right

  viz.player.adversary = viz.enemy ; // decorate the player object for convenient access to the viz.enemy object 
  viz.enemy.adversary  = viz.player ;
	
}