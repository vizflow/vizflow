function samus_sprite () {
  
  var imgUrl        = 'metroid_spritesheet.png' ;
  var spriteCanvas  = image2canvas(imgUrl) ;
  var spriteContext = create_context(spriteCanvas) ;
  var bgColor       = [0, 0, 0] ;

	var samusSprite    = {} ;
	samusSprite.height = 32 ;

	var walkTileCount = 3 ;
	var walkRowIndex  = 17 ;
	var walkTileWidth = 16 ;
	var walkPadX      = 4 ;
	var walkOffsetX   = 88 ;
	var walkOffsetY   = 24 ;
	var walkTilePadXl = 0 ;
	var walkTilePadXr = 0 ;
	var walkConfig    = {
		context: spriteContext,
		tileCount: walkTileCount,
		rowIndex: walkRowIndex,
		tileWidth: walkTileWidth,
		tileHeight: samusSprite.height,
		offsetX: walkOffsetX,
		offsetY: walkOffsetY,
		padX: walkPadX,
		bgColor: bgColor,
		tilePadXl: walkTilePadXl,
		tilePadXr: walkTilePadXr,
	} ;
	samusSprite.walk  = get_sprite (walkConfig) ;
	samusSprite.walk.push(samusSprite.walk[1]) ;

 //  var punchTileCount = 2 ;
	// var punchRowIndex  = 1 ;
	// var punchTileWidth = 32 ;
	// var punchOffsetX   = 112 ;
	// var punchOffsetY   = 2 ;
	// var punchPadX      = 16 ;
	// var punchTilePadXl = 16 ;
	// var punchTilePadXr = 0 ;
	// samusSprite.punch     = get_sprite (spriteContext, punchTileCount, punchRowIndex, punchTileWidth, samusSprite.height, punchOffsetX, punchOffsetY, punchPadX, bgColor, punchTilePadXl, punchTilePadXr) ;
	// samusSprite.punch     = [samusSprite.punch[0], samusSprite.walk[0], samusSprite.punch[1]] ;

	// var punchCanvas  = samusSprite.punch[0] ;
	// var tempCanvas   = create_canvas (punchCanvas.width, punchCanvas.height)  ;
	// var clearedFrame = create_canvas (punchCanvas.width, punchCanvas.height)  ;
	// tempCanvas.getContext ('2d').drawImage (punchCanvas, 0, 0) ;
	// tempCanvas.getContext ('2d').clearRect (punchTilePadXl, 0, walkTileWidth * 1.5, samusSprite.height) ;
	// //console.log ('dd_sprite: tempCanvas', tempCanvas.getContext('2d').getImageData(0, 0, tempCanvas.width, tempCanvas.height)) ; 
	// samusSprite.punchCollision = [tempCanvas, clearedFrame, tempCanvas] ;

 //  var jumpTileCount = 3 ;
	// var jumpRowIndex  = 1 ;
	// var jumpTileWidth = 30 ;
	// var jumpOffsetX   = 464 ;
	// var jumpOffsetY   = 2 ;
	// var jumpPadX      = 2 ;
	// var jumpTilePadXl = 16 ;
	// var jumpTilePadXr = 0 ;
 //  samusSprite.jump     = get_sprite(spriteContext, jumpTileCount, jumpRowIndex, jumpTileWidth, samusSprite.height, jumpOffsetX, jumpOffsetY, jumpPadX, bgColor, jumpTilePadXl, jumpTilePadXr) ;

	return samusSprite ;

}