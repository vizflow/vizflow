function trump_sprite () {
  
  var imgUrl        = 'trump1.png' ;
  var spriteCanvas  = image2canvas(imgUrl) ;
  var spriteContext = create_context(spriteCanvas) ;
  var bgColor       = undefined ; // [64, 136, 252] ;

	var trumpSprite    = {} ;
	trumpSprite.height = 100 ;

	var frameCount    = 2 ;
	var frameRowIndex = 0 ;
	var frameWidth    = 100 ;
	var frameOffsetX  = 250 ;
	var frameOffsetY  = 55 ;
	var padX          = 526 ;
	var framePadXl    = 0 ;
	var framePadXr    = 0 ;
	trumpSprite.blink = get_sprite (spriteContext, frameCount, frameRowIndex, frameWidth, trumpSprite.height, frameOffsetX, frameOffsetY, padX, bgColor, framePadXl, framePadXr) ;
	
	return trumpSprite ;

}