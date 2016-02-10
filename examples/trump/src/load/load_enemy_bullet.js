function load_enemy_bullet(viz) {
	
  var wordConfig = {
    move: viz.width,
    shiftXl: 0,
    shiftXr: 0, 
    shiftY: 110,
    element: viz.enemy,
  } ;

	viz.enemy.bullet        = setup_word (viz, wordConfig) ; 
  viz.enemy.bullet.remove = false ;
  viz.enemy.bullet.audio  = viz.audio.bullet1 ;

  viz.enemy.bulletHitConfig = {
    audio: viz.audio.hit2,
    sourceType: 'player',
  } ;

}