function setup_buttons (viz, ui) {
	var button = {} ;
	button.walkLeft = {
    viz: viz, 
    image: ui.buttonSprite[0],
    render: draw.image,    
    x: ui.buttonX[0],
    y: ui.buttonY + ui.y
  } ;
  
  button.walkRight = {
    viz: viz, 
    image: ui.buttonSprite[0],
    render: draw.image,      
    x: ui.buttonX[1],
    y: ui.buttonY + ui.y
  } ;
  
  button.attack = {
    viz: viz, 
    image: ui.buttonSprite[0],
    render: draw.image,
    x: ui.buttonX[2],
    y: ui.buttonY + ui.y
  } ;
  
  button.jump = {
    viz: viz, 
    image: ui.buttonSprite[0],
    render: draw.image,
    x: ui.buttonX[3],
    y: ui.buttonY + ui.y
  } ;

  return button ;
}