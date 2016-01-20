function load_hit(viz, playerHitConfig, enemyHitConfig) {
  viz.player.hit = setup_hit(viz, viz.player, playerHitConfig) ;
  viz.enemy.hit  = setup_hit(viz, viz.enemy, enemyHitConfig) ;	
}