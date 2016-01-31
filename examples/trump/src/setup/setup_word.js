function setup_word (viz, wordConfig) {
 
  var word = {
    viz: viz, 
    config: wordConfig,
    image: wordConfig.image,
    transition: wordConfig.transition,
    render: draw.image,
    type: 'enemyBullet',
  } ;

  return word ;  
  
}