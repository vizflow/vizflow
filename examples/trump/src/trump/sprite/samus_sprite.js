function samus_sprite () {
  
  var imgUrl        = './images/metroid_spritesheet.png' ;
  var spriteCanvas  = imageHelper.image2canvas(imgUrl) ;
  var spriteContext = create_context(spriteCanvas) ;
  var bgColor       = [0, 0, 0] ;

	var samusSprite    = {} ;
	samusSprite.height = 32 ;

	var walkTileCount = 3 ;
	var walkRowIndex  = 17 ;
	var walkTileWidth = 16 ;
	var walkPadX      = 5 ;
	var walkOffsetX   = 88 ;
	var walkOffsetY   = 22 ;
	var walkTilePadXl = 2 ;
	var walkTilePadXr = 2 ;
	var walkConfig    = {
		context: spriteContext,
		count: walkTileCount,
		rowIndex: walkRowIndex,
		width: walkTileWidth,
		height: samusSprite.height,
		offsetX: walkOffsetX,
		offsetY: walkOffsetY,
		padX: walkPadX,
		bgColor: bgColor,
		padXl: walkTilePadXl,
		padXr: walkTilePadXr,
	} ;
	samusSprite.walk  = spriteHelper.get_sprite (walkConfig) ;
	//samusSprite.walk.push(samusSprite.walk[1]) ;

	var restOffsetX  = 298 ;
	var restConfig    = {
		context: spriteContext,
		count: 1,
		rowIndex: walkRowIndex,
		width: walkTileWidth,
		height: samusSprite.height,
		offsetX: restOffsetX,
		offsetY: walkOffsetY,
		padX: walkPadX,
		bgColor: bgColor,
		padXl: walkTilePadXl,
		padXr: walkTilePadXr,
	} ;

	samusSprite.rest = spriteHelper.get_sprite (restConfig) ;

  var attackTileCount = 1 ;
	var attackOffsetX   = 53 ;
	var attackOffsetY   = 22 ;
	var attackTileWidth = 18 ;
	var attackTilePadXl = 2 ;
	var attackTilePadXr = 0 ;

	var attackConfig    = {
		context: spriteContext,
		count: attackTileCount,
		rowIndex: walkRowIndex,
		width: attackTileWidth,
		height: samusSprite.height,
		offsetX: attackOffsetX,
		offsetY: walkOffsetY,
		padX: walkPadX,
		bgColor: bgColor,
		padXl: attackTilePadXl,
		padXr: attackTilePadXr,
	} ;
	samusSprite.attack  = spriteHelper.get_sprite (attackConfig) ;

	var jumpTileWidth = 24 ;
	var jumpOffsetX   = 390 ;
	var jumpTileCount = 1 ;
  
	var jumpSpriteConfig     = copy_object (walkConfig) ;
	jumpSpriteConfig.width   = 26 ;
	jumpSpriteConfig.offsetX = jumpOffsetX ;
	jumpSpriteConfig.count   = jumpTileCount ;

  samusSprite.jump = spriteHelper.get_sprite(jumpSpriteConfig) ;

  samusSprite.hit = [samusSprite.jump[0]] ;

	//samusSprite.attack  = [samusSprite.attack[0], samusSprite.walk[0], samusSprite.attack[1]] ;
	// samusSprite.clearedFrame = create_canvas (samusSprite.walk[0].width, samusSprite.walk[0].height)  ;

	// var attackCanvas  = samusSprite.attack[0] ;
	// var tempCanvas   = create_canvas (attackCanvas.width, attackCanvas.height)  ;
	// tempCanvas.context().drawImage (attackCanvas, 0, 0) ;
	// tempCanvas.context().clearRect (attackTilePadXl, 0, walkTileWidth * 1.5, samusSprite.height) ;
	// //console.log ('dd_sprite: tempCanvas', tempCanvas.context().getImageData(0, 0, tempCanvas.width, tempCanvas.height)) ; 
	// samusSprite.attackCollision = [tempCanvas, clearedFrame, tempCanvas] ;

 //  var jumpTileCount = 3 ;
	// var jumpRowIndex  = 1 ;
	// var jumpTileWidth = 30 ;
	// var jumpOffsetX   = 464 ;
	// var jumpOffsetY   = 2 ;
	// var jumpPadX      = 2 ;
	// var jumpTilePadXl = 16 ;
	// var jumpTilePadXr = 0 ;
 //  samusSprite.jump     = spriteHelper.get_sprite(spriteContext, jumpTileCount, jumpRowIndex, jumpTileWidth, samusSprite.height, jumpOffsetX, jumpOffsetY, jumpPadX, bgColor, jumpTilePadXl, jumpTilePadXr) ;

	return samusSprite ;

}