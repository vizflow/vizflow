function setup_word (viz, elementName, wordConfig) {

  var element = viz[elementName] ;
 
  var word = {
    viz: viz, 
    config: wordConfig,
    x: element.item.x + wordConfig.shiftXr,
    y: element.item.y + wordConfig.shiftY,
    image: wordConfig.image,
    collisionImage: wordConfig.image,
    transition: wordConfig.transition,
    render: draw.image,
  } ;

  return word ;  
  
}