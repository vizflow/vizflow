function setup_bullet (viz, player, bulletConfig) {

  var bullet = {
    viz: viz, 
    config: bulletConfig,
    x: player.item.x + bulletConfig.shiftXr,
    y: player.item.y + bulletConfig.shiftY,
    image: bulletConfig.image,
    collisionImage: bulletConfig.image,
    transition: bulletConfig.transition,
    render: draw.image,
  } ;

  return bullet ;

}