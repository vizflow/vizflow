function load_hit(viz, playerHitConfig, enemyHitConfig) {

	if (enemyHitConfig === undefined) {
	  enemyHitConfig = {
	    healthbarY: 10, 
	    healthdrop: 10,
	    color: '#900',
	    audio: viz.audio.hit2,
	  } ;		
	}

	if (playerHitConfig === undefined) {
	  playerHitConfig = {
	  	healthdrop: 2 * enemyHitConfig.healthdrop,
	    healthbarY: 19,
	    color: '#009', 
	    audio: viz.audio.hit2,
	  } ;
	}
    
  viz.player.hit = setup_hit(viz, viz.player, playerHitConfig) ;
  viz.enemy.hit  = setup_hit(viz, viz.enemy, enemyHitConfig) ;	
}