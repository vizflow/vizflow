function setup_word (viz, wordConfig) {
 
  var word = {
    viz: viz, 
    config: wordConfig,
    image: wordConfig.image,
    transition: wordConfig.transition,
    render: drawHelper.image,
    type: 'enemyBullet',
  } ;

  return word ;  
  
}