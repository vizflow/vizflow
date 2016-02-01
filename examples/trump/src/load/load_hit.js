function load_hit(viz, playerHitConfig, enemyHitConfig) {

	if (enemyHitConfig === undefined) {
	  enemyHitConfig = {
	    healthbarY: 10, 
	    healthdrop: 10,
	    color: '#900',
	    audio: viz.audio.hit2,
	    sourceType: 'player',
	  } ;		
	}

	if (playerHitConfig === undefined) {
	  playerHitConfig = {
	  	healthdrop: 2 * enemyHitConfig.healthdrop,
	    healthbarY: 19,
	    color: '#009', 
	    audio: viz.audio.hit2,
	    sourceType: 'enemyBullet',
	  } ;
	}
    
  viz.player.item.actionSet.hit = setup_hit(viz, viz.player, playerHitConfig) ;
  viz.enemy.item.actionSet.hit  = setup_hit(viz, viz.enemy, enemyHitConfig) ;	

  // load_player_bullet (viz) ;
  load_enemy_bullet  (viz) ;

}