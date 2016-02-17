function setup_ui (viz) {

  var buttonWidth     = 26 ;
  var buttonHeight    = 26 ;
  var buttonTileCount = 2 ;
  var buttonRowIndex  = 0 ;
  var buttonOffsetX   = 0 ;
  var buttonOffsetY   = 0 ;
  var buttonPadX      = 0 ;
  var buttonPadY      = 11 ;
  var buttonPad       = Math.floor( ( viz.width - (buttonWidth * 4) ) / 4 ) ;
  var buttonImageUrl  = './images/button_spritesheet.png' ;
  var buttonCanvas    = imageHelper.image2canvas(buttonImageUrl) ;

  var leftButtonConfig = {
    context: buttonCanvas.context(),
    count: buttonTileCount,
    rowIndex: buttonRowIndex,
    width: buttonWidth,
    height: buttonHeight,
    offsetX: buttonOffsetX,
    offsetY: buttonOffsetY,
    padX: buttonPadX,
    bgColor: undefined,
    padXl: 0,
    padXr: 0,
  } ;  

  rightButtonConfig = copy_object(leftButtonConfig) ;
  rightButtonConfig.rowIndex = 1 ;

  attackButtonConfig = copy_object(leftButtonConfig) ;
  attackButtonConfig.rowIndex = 2 ;

  jumpButtonConfig = copy_object(leftButtonConfig) ;
  jumpButtonConfig.rowIndex = 3 ;

  var buttonSprite = spriteHelper.get(buttonCanvas, ['left', 'right', 'attack', 'jump'], [26, 26, 26, 26], [26, 26, 26, 26]) ;

  // var buttonSprite = {
  //   left:   spriteHelper.get_sprite(leftButtonConfig),
  //   right:  spriteHelper.get_sprite(rightButtonConfig),
  //   attack: spriteHelper.get_sprite(attackButtonConfig),
  //   jump:   spriteHelper.get_sprite(jumpButtonConfig),
  // } ;

  var buttonKey = ['left', 'right', 'attack', 'jump'] ;

  var Nbutton = 4 ;
  var buttonX = [] ;
  var buttonY = buttonPad ;

  // for(var kButton = 0 ; kButton < Nbutton ; kButton++) { // compute the horizontal positions for the buttons based on the available width of the vizualization 
  //   buttonX.push(Math.floor( kButton * (buttonPad + buttonWidth) + buttonPad * 0.5)) ;
  // }  
  // var ratio        = document.ratio ; //(window.devicePixelRatio || 1) ;
  // buttonWidth  *= ratio ;
  // buttonHeight *= ratio ;
  // buttonPad     = Math.floor( ( viz.width - (buttonWidth * 4) ) / 4 ) ;
  // var buttonY = buttonPad ;

  var uiWidth         = viz.width ;
  var uiHeight        = buttonHeight + 2 * buttonPadY ;
  var uiY             = viz.height - uiHeight ;
  var uiX             = 0 ;
  var uiCanvas        = imageHelper.create  (uiWidth, uiHeight) ;
  var uiContext       = uiCanvas.context() ;
  var hiddenUICanvas  = imageHelper.create  (uiWidth, uiHeight) ;
  var hiddenUIContext = hiddenUICanvas.context() ;

  for( var kButton = 0 ; kButton < Nbutton ; kButton++ ) {

    buttonX.push(Math.floor( kButton * (buttonPad + buttonWidth) + buttonPad * 0.5)) ;

    uiContext.drawImage(buttonSprite[buttonKey[kButton]][0], buttonX[kButton], buttonY) ; // draw visible buttonSprite

    var buttonData = buttonSprite[buttonKey[kButton]][0].context().getImageData(0, 0, buttonWidth, buttonHeight) ; // ImageData object
    var imagek     = image2index(buttonData, kButton) ; // ImageData object

    var tempCanvas = imageHelper.create(buttonWidth, buttonHeight) ;

    tempCanvas
      .context()
      .clearRect(0, 0, tempCanvas.width, tempCanvas.height) ;

    tempCanvas
      .context()
      .putImageData(imagek, 0, 0) ;

    hiddenUIContext.drawImage(tempCanvas, buttonX[kButton], buttonY) ; // draw color-indexed buttonSprite for color picking

  }

  var hiddenCanvas  = imageHelper.create(viz.width, viz.height) ;
  var hiddenContext = hiddenCanvas.context() ;
  hiddenContext.drawImage(hiddenUICanvas, uiX, uiY) ; // draw ui

  buttonSpriteBig = spriteHelper.foreach(buttonSprite, imageHelper.adjust_ratio) ;
  buttonSpriteBig.original = buttonSprite; 

  var ui = {

    hiddenCanvas: hiddenCanvas,
    hiddenContext: hiddenContext,
    leftButtonConfig: leftButtonConfig,
    buttonSprite: buttonSpriteBig,
    buttonX: buttonX,
    buttonY: buttonY,
    x: uiX,
    y: uiY,

  } ;

  ui.button = setup_buttons (viz, ui) ;

  return ui ;
  
}