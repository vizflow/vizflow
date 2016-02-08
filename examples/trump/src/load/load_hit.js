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
	  	healthdrop: enemyHitConfig.healthdrop,
	    healthbarY: 19,
	    color: '#009', 
	    audio: viz.audio.hit2,
	    sourceType: 'enemy',
	  } ;
	}
    
  viz.player.item.actionSet.hit = hitHelper.setup(viz, viz.player, playerHitConfig) ;
  viz.enemy.item.actionSet.hit  = hitHelper.setup(viz, viz.enemy, enemyHitConfig) ;	

  if(viz.player.config.bulletSwitch) {
	  load_player_bullet (viz) ;
  }

  load_enemy_bullet  (viz) ;

}