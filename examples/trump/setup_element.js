function setup_element (viz, elementConfig) {

  var element = {} ;

  if(elementConfig.orientation === undefined) {
    elementConfig.orientation = 'r' ;
  }

  if(elementConfig.orientation === 'l') {

    element.spriteL    = elementConfig.sprite_loader () ;
    element.spriteR    = horizontal_flip(element.spriteL) ;

  } else {

    element.spriteR    = elementConfig.sprite_loader () ;
    element.spriteL    = horizontal_flip(element.spriteR) ;

  }

  if(elementConfig.x === undefined) {
    elementConfig.x = Math.round(viz.width / 12) - 1 ;
  }

  if(elementConfig.y === undefined) {
    elementConfig.y = Math.round(viz.height / 2) - 1 ;
  }

  element.sprite     = element.spriteR ;

  var clearedFrame = create_canvas(element.sprite.rest[0].width, element.sprite.rest[0].height) ; 
  // var positionObject = {x: 0, y: 241 - element.sprite.height} ;

  element.loop = {
    totalDur : 2 * viz.dur,
    frameDur : viz.dur,
    position : 0
  } ; // position is from 0 to 1
  
  element.item = {
    viz: viz, 
    image: element.sprite.rest[0],
    collisionImage: clearedFrame,
    render: draw.image,
    x: elementConfig.x,
    y: elementConfig.y - element.sprite.height 
  } ;
  
  element.orientation = 'r' ; // r for facing right

  return element ;

}