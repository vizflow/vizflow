function trump_sprite () {
  
  var imgUrl        = 'trump_spritesheet2.png' ;
  var spriteCanvas  = image2canvas(imgUrl) ;
  var spriteContext = create_context(spriteCanvas) ;
  var bgColor       = undefined ; // [49, 164, 170] ;

	var trumpSprite    = {} ;
	trumpSprite.height = 170 ;

	var frameCount    = 2 ;
	var frameRowIndex = 0 ;
	var frameWidth    = 140 ;
	var frameOffsetX  = 0 ;
	var frameOffsetY  = 0 ;
	var padX          = 0 ;
	var framePadXl    = 0 ;
	var framePadXr    = 0 ;

	var trumpConfig    = {
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

	trumpSprite.blink = get_sprite (trumpConfig) ;
	
	return trumpSprite ;

}