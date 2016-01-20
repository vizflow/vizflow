function load_enemy_bullet(viz) {
	
  var wordConfig = {
    move: 200,
    shiftXl: 0,
    shiftXr: 0, 
    shiftY: viz.enemy.config.y - 113,
    image: word_image ('schlonged'),
    transition: $Z.transition.rounded_linear_transition_func ( 'x', viz.dur * 70 ), // sets speed of word block
  } ;

	viz.enemy.bullet = setup_word (viz, 'enemy', wordConfig) ; 
	
}