function trump_sprite () {
  
  var imgUrl        = 'trump_spritesheet.png' ;
  var spriteCanvas  = image2canvas(imgUrl) ;
  var spriteContext = create_context(spriteCanvas) ;
  var bgColor       = [49, 164, 170] ;

	var trumpSprite    = {} ;
	trumpSprite.height = 100 ;

	var frameCount    = 2 ;
	var frameRowIndex = 0 ;
	var frameWidth    = 100 ;
	var frameOffsetX  = 80 ;
	var frameOffsetY  = 22 ;
	var padX          = 57 ;
	var framePadXl    = 0 ;
	var framePadXr    = 0 ;

	var trumpSpriteConfig    = {
		context: spriteContext,
		tileCount: frameCount,
		rowIndex: frameRowIndex,
		tileWidth: frameWidth,
		tileHeight: trumpSprite.height,
		offsetX: frameOffsetX,
		offsetY: frameOffsetY,
		padX: padX,
		bgColor: bgColor,
		tilePadXl: framePadXl,
		tilePadXr: framePadXr,
	} ;

	trumpSprite.blink = get_sprite (trumpSpriteConfig) ;
	
	return trumpSprite ;

}