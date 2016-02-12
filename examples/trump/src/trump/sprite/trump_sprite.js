function trump_sprite () {
  
  var imgUrl        = './images/trump_spritesheet_new.png' ;
  var spriteCanvas  = imageHelper.image2canvas(imgUrl) ;
  var spriteContext = create_context(spriteCanvas) ;
  var bgColor       = undefined ; // [49, 164, 170] ;

	var trumpSprite    = {} ;
	// trumpSprite.height = 160 ;

	var frameCount    = 2 ;
	var frameRowIndex = 0 ;
	var frameWidth    = 120 ;
	var frameOffsetX  = 0 ;
	var frameOffsetY  = 0 ;
	var padX          = 0 ;
	var framePadXl    = 0 ;
	var framePadXr    = 0 ;

	var trumpSpriteConfig    = {
		context: spriteContext,
		count: frameCount,
		rowIndex: frameRowIndex,
		width: frameWidth,
		height: trumpSprite.height,
		offsetX: frameOffsetX,
		offsetY: frameOffsetY,
		padX: padX,
		bgColor: bgColor,
		padXl: framePadXl,
		padXr: framePadXr,
	} ;

	trumpSprite.hit = spriteHelper.get_sprite (trumpSpriteConfig) ;

	trumpSprite.rest = [trumpSprite.hit[0]] ; // resting bitch face

	trumpSprite.hit = [trumpSprite.hit[1]] ;

	// trumpSprite.attack = trumpSprite.hit ;

  var attackImgUrl        = './images/trump_attack.png' ;
  var attackSpriteCanvas  = imageHelper.image2canvas(attackImgUrl) ;
  var attackSpriteContext = create_context(attackSpriteCanvas) ;
	var attackFrameCount    = 1 ;

	var attackConfig = copy_object(trumpSpriteConfig) ;
	attackConfig.context = attackSpriteContext ;
	attackConfig.frameCount = attackFrameCount ;
	trumpSprite.attack = spriteHelper.get_sprite(attackConfig) ;	

	return trumpSprite ;

}