function rastan_sprite () {
  
  var imgUrl          = 'rastan_spritesheet.gif' ;
  var spriteCanvas    = image2canvas(imgUrl) ;
  var spriteContext   = create_context(spriteCanvas) ;
  var bgColor         = [255, 163, 177] ;

	var rastanSprite    = {} ; // output variable
	rastanSprite.height = 64 ;

	var rastanTileCount = 2 ;
	var rastanRowIndex  = 0 ;
	var rastanTileWidth = 32 ;
	var rastanOffsetX   = 5 ;
	var rastanOffsetY   = 396 ;
	var rastanPadX      = 343 ;
	var rastanTilePadXl = 0 ;	
	var rastanTilePadXr = 0 ;

  var rastanSpriteConfig = {
		context: spriteContext,
		tileCount: rastanTileCount,
		rowIndex: rastanRowIndex,
		tileWidth: rastanTileWidth,
		tileHeight: rastanSprite.height,
		offsetX: rastanOffsetX,
		offsetY: rastanOffsetY,
		padX: rastanPadX,
		bgColor: bgColor,
		tilePadXl: rastanTilePadXl,
		tilePadXr: rastanTilePadXr,
  } ;

	rastanSprite.walk = get_sprite (rastanSpriteConfig) ;

	// rastanSprite.walk = [rastanSprite.walk[1], rastanSprite.walk[0]] ;

	rastanSpriteConfig.offsetY   = 474 ;
	rastanSpriteConfig.padX     -= 4 ;
	rastanSpriteConfig.tileCount = 1 ;
	rastanSprite.walk            = rastanSprite.walk.concat( get_sprite (rastanSpriteConfig) ) ;
	rastanSprite.walk = [rastanSprite.walk[1], rastanSprite.walk[0], rastanSprite.walk[1], rastanSprite.walk[2]] ;

 //  var punchTileCount = 2 ;
	// var punchRowIndex  = 1 ;
	// var punchTileWidth = 32 ;
	// var punchOffsetX   = 112 ;
	// var punchOffsetY   = 2 ;v 
	// var punchPadX      = 16 ;
	// var punchTilePadXl = 16 ;
	// var punchTilePadXr = 0 ;
	// rastanSprite.punch = get_sprite (spriteContext, punchTileCount, punchRowIndex, punchTileWidth, rastanSprite.height, punchOffsetX, punchOffsetY, punchPadX, bgColor, punchTilePadXl, punchTilePadXr) ;
	// rastanSprite.punch = [rastanSprite.punch[0], rastanSprite.walk[0], rastanSprite.punch[1]] ;

	// var punchCanvas  = rastanSprite.punch[0] ;
	// var tempCanvas   = create_canvas (punchCanvas.width, punchCanvas.height)  ;
	// var clearedFrame = create_canvas (punchCanvas.width, punchCanvas.height)  ;
	// tempCanvas.getContext ('2d').drawImage (punchCanvas, 0, 0) ;
	// tempCanvas.getContext ('2d').clearRect (punchTilePadXl, 0, rastanTileWidth * 1.5, rastanSprite.height) ;
	// //console.log ('dd_sprite: tempCanvas', tempCanvas.getContext('2d').getImageData(0, 0, tempCanvas.width, tempCanvas.height)) ; 
	// rastanSprite.punchCollision = [tempCanvas, clearedFrame, tempCanvas] ;

 //  var jumpTileCount = 3 ;
	// var jumpRowIndex  = 1 ;
	// var jumpTileWidth = 30 ;
	// var jumpOffsetX   = 464 ;
	// var jumpOffsetY   = 2 ;
	// var jumpPadX      = 2 ;
	// var jumpTilePadXl = 16 ;
	// var jumpTilePadXr = 0 ;
 //  rastanSprite.jump     = get_sprite(spriteContext, jumpTileCount, jumpRowIndex, jumpTileWidth, rastanSprite.height, jumpOffsetX, jumpOffsetY, jumpPadX, bgColor, jumpTilePadXl, jumpTilePadXr) ;

	return rastanSprite ;

}