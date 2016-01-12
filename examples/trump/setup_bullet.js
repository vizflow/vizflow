function setup_bullet (viz, player, bulletConfig) {

  var bullet = {
    viz: viz, 
    x: player.item.x + bulletConfig.shiftX,
    y: player.item.y + bulletConfig.shiftY,
    image: bulletConfig.image,
    collisionImage: bulletConfig.image,
    render: draw.image,
  } ;

  return bullet ;

}