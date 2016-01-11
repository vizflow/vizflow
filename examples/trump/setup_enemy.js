function setup_enemy (viz) {
	var enemy = {} ;

	enemy.sprite = trump_sprite() ; 
  
  enemy.item = {
    viz: viz, 
    image: enemy.sprite.blink[0],
    collisionImage: enemy.sprite.blink[0],
    render: draw.image,       
    x: 80,
    y: 50,
  } ;
  //console.log ('enemy', enemy) ;

  return enemy ;

}