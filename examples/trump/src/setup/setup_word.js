function setup_word (viz, wordConfig) {
 
  var word = {
    viz: viz, 
    config: wordConfig,
    image: wordConfig.image,
    transition: wordConfig.transition,
    render: drawHelper.image,
    type: 'enemyBullet',
    collision_image: actionHelper.collision_image,
  } ;

  return word ;  
  
}