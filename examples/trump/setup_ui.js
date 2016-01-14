function setup_ui (viz) {

  var buttonWidth     = 26 ;
  var buttonHeight    = 26 ;
  var buttonTileCount = 2 ;
  var buttonRowIndex  = 0 ;
  var buttonOffsetX   = 0 ;
  var buttonOffsetY   = 0 ;
  var buttonPadX      = 0 ;
  var buttonPad       = Math.floor( ( viz.width - (buttonWidth * 4) ) / 4 ) ;
  var buttonImageUrl  = 'button_spritesheet.png' ;
  var buttonCanvas    = image2canvas(buttonImageUrl) ;

  var leftButtonConfig    = {
    context: buttonCanvas.getContext('2d'),
    tileCount: buttonTileCount,
    rowIndex: buttonRowIndex,
    tileWidth: buttonWidth,
    tileHeight: buttonHeight,
    offsetX: buttonOffsetX,
    offsetY: buttonOffsetY,
    padX: buttonPadX,
    bgColor: undefined,
    tilePadXl: 0,
    tilePadXr: 0,
  } ;  

  rightButtonConfig          = copy_object(leftButtonConfig) ;
  rightButtonConfig.rowIndex = 1 ;

  attackButtonConfig          = copy_object(leftButtonConfig) ;
  attackButtonConfig.rowIndex = 2 ;

  jumpButtonConfig          = copy_object(leftButtonConfig) ;
  jumpButtonConfig.rowIndex = 3 ;

  var buttonSprite = {
    left:   get_sprite(leftButtonConfig),
    right:  get_sprite(rightButtonConfig),
    attack: get_sprite(attackButtonConfig),
    jump:   get_sprite(jumpButtonConfig),
  } ;

  var buttonKey = ['left', 'right', 'attack', 'jump'] ;

  var Nbutton = 4 ;
  var buttonY = buttonPad ;
  var buttonX = [] ;

  for(var kButton = 0 ; kButton < Nbutton ; kButton++) { // compute the horizontal positions for the buttons based on the available width of the vizualization 
    buttonX.push(kButton * (buttonPad + buttonWidth) + buttonPad * 0.5) ;
  }  

  var uiWidth         = viz.width ;
  var uiHeight        = buttonHeight + buttonPad * 2 ;
  var uiY             = viz.height - uiHeight ;
  var uiX             = 0 ;
  var uiCanvas        = create_canvas (uiWidth, uiHeight) ;
  var uiContext       = create_context (uiCanvas) ;
  var hiddenUICanvas  = create_canvas (uiWidth, uiHeight) ;
  var hiddenUIContext = create_context (hiddenUICanvas) ;

  for( var kButton = 0 ; kButton < Nbutton ; kButton++ ) {

    uiContext.drawImage(buttonSprite[buttonKey[kButton]][0], buttonX[kButton], buttonY) ; // draw visible buttonSprite

    var buttonData = buttonSprite[buttonKey[kButton]][0].getContext('2d').getImageData(0, 0, buttonWidth, buttonHeight) ; // ImageData object
    var imagek     = image2index(buttonData, kButton) ; // ImageData object

    var tempCanvas = create_canvas(buttonWidth, buttonHeight) ;

    tempCanvas
      .getContext('2d')
      .clearRect(0, 0, tempCanvas.width, tempCanvas.height) ;
    tempCanvas
      .getContext('2d')
      .putImageData(imagek, 0, 0) ;

    hiddenUIContext.drawImage(tempCanvas, buttonX[kButton], buttonY) ; // draw color-indexed buttonSprite for color picking

  }

  var hiddenCanvas  = create_canvas(viz.width, viz.height) ;
  var hiddenContext = hiddenCanvas.getContext('2d') ;
  hiddenContext.drawImage(hiddenUICanvas, uiX, uiY) ; // draw ui

  var ui = {

    hiddenCanvas: hiddenCanvas,
    hiddenContext: hiddenContext,
    leftButtonConfig: leftButtonConfig,
    buttonSprite: buttonSprite,
    buttonX: buttonX,
    buttonY: buttonY,
    x: uiX,
    y: uiY,

  } ;

  ui.button = setup_buttons (viz, ui) ;

  return ui ;
  
}