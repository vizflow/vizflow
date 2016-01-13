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


  if(elementConfig.collisionImage === undefined) {
    elementConfig.collisionImage = 'collision' ;
  }

  element.sprite = element.spriteR ;
  
  if (element.sprite[elementConfig.collisionImage] === undefined) {
    var clearedFrame = create_canvas(element.sprite.rest[0].width, element.sprite.rest[0].height) ; 
    element.sprite[elementConfig.collisionImage] = [clearedFrame] ;
  }

  element.loop = {
    frameDur : elementConfig.frameDuration,
    position : 0
  } ; // position is from 0 to 1
  
  element.item = {
    viz: viz, 
    image: element.sprite.rest[0],
    collisionImage: element.sprite[elementConfig.collisionImage][0],
    render: draw.image,
    x: elementConfig.x,
    y: elementConfig.y - element.sprite.height 
  } ;
  
  element.orientation = 'r' ; // r for facing right

  element.callback = elementConfig.callback ;

  element.transitionSet = {
    image: step_transition_func('image', elementConfig.frameDuration),
  } ;

  element.restoreRest = true ;

  return element ;

}