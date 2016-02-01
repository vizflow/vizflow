function setup_buttons (viz, ui) {

	var button = {} ;

	button.walkLeft = {
    viz: viz, 
    image: ui.buttonSprite.left[0],
    render: drawHelper.image,    
    x: ui.buttonX[0],
    y: ui.buttonY + ui.y,
    inert: true,
  } ;
  
  button.walkRight = {
    viz: viz, 
    image: ui.buttonSprite.right[0],
    render: drawHelper.image,      
    x: ui.buttonX[1],
    y: ui.buttonY + ui.y,
    inert: true,
  } ;
  
  button.attack = {
    viz: viz, 
    image: ui.buttonSprite.attack[0],
    render: drawHelper.image,
    x: ui.buttonX[2],
    y: ui.buttonY + ui.y, 
    inert: true,
  } ;
  
  button.jump = {
    viz: viz, 
    image: ui.buttonSprite.jump[0],
    render: drawHelper.image,
    x: ui.buttonX[3],
    y: ui.buttonY + ui.y, 
    inert: true
  } ;

  button.transition = step_transition_func('image', viz.frameDuration * 1) ;

  return button ;

}