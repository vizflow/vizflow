function setup_word (viz, wordConfig) {
 
  var word = {
    viz: viz, 
    config: wordConfig,
    image: wordConfig.image,
    transition: wordConfig.transition,
    render: drawHelper.image,
    type: 'enemy',
    collision_image: actionHelper.collision_image,
    singleSwitch: true,
    opacity: 1,
    inert: false,
  } ;

  return word ;  
  
}