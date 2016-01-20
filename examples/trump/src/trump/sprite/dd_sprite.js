function dd_sprite () {
  
  var imgUrl        = '/images/dd_billy.png' ;
  var spriteCanvas  = image2canvas(imgUrl) ;
  var spriteContext = create_context(spriteCanvas) ;
  var bgColor       = [64, 136, 252] ;

	var ddSprite    = {} ;
	ddSprite.height = 39 ;

	var walkTileCount = 3 ;
	var walkRowIndex  = 1 ;
	var walkTileWidth = 16 ;
	var walkOffsetX   = 16 ;
	var walkOffsetY   = 2 ;
	var walkPadX      = 16 ;
	var walkTilePadXl = 16 ;
	var walkTilePadXr = 16 ;
	var walkConfig    = {
		context: spriteContext,
		count: walkTileCount,
		rowIndex: walkRowIndex,
		width: walkTileWidth,
		height: ddSprite.height,
		offsetX: walkOffsetX,
		offsetY: walkOffsetY,
		padX: walkPadX,
		bgColor: bgColor,
		padXl: walkTilePadXl,
		padXr: walkTilePadXr,
	} ;
	// console.log ('walk config', walkConfig) ;
	ddSprite.walk     = get_sprite (walkConfig) ;
	//ddSprite.walk.push(ddSprite.walk[1]) ;

  var attackTileCount = 2 ;
	var attackRowIndex  = 1 ;
	var attackTileWidth = 32 ;
	var attackOffsetX   = 112 ;
	var attackOffsetY   = 2 ;
	var attackPadX      = 16 ;
	var attackTilePadXl = 16 ;
	var attackTilePadXr = 0 ;

	var attackConfig    = {
		context: spriteContext,
		count: attackTileCount,
		rowIndex: attackRowIndex,
		width: attackTileWidth,
		height: ddSprite.height,
		offsetX: attackOffsetX,
		offsetY: attackOffsetY,
		padX: attackPadX,
		bgColor: bgColor,
		padXl:  attackTilePadXl,
		padXr: attackTilePadXr,
	}
	ddSprite.attack     = get_sprite (attackConfig) ;
	//ddSprite.attack     = [ddSprite.attack[0], ddSprite.walk[0], ddSprite.attack[1]] ;

	var attackCanvas  = ddSprite.attack[0] ;
	var tempCanvas   = create_canvas (attackCanvas.width, attackCanvas.height)  ;
	var clearedFrame = create_canvas (attackCanvas.width, attackCanvas.height)  ;
	tempCanvas.getContext ('2d').drawImage (attackCanvas, 0, 0) ;
	tempCanvas.getContext ('2d').clearRect (attackTilePadXl, 0, walkTileWidth * 1.5, ddSprite.height) ;
	//console.log ('dd_sprite: tempCanvas', tempCanvas.getContext('2d').getImageData(0, 0, tempCanvas.width, tempCanvas.height)) ; 
	ddSprite.attackCollision = [tempCanvas, clearedFrame, tempCanvas] ;

  var jumpTileCount = 3 ;
	var jumpRowIndex  = 1 ;
	var jumpTileWidth = 30 ;
	var jumpOffsetX   = 464 ;
	var jumpOffsetY   = 2 ;
	var jumpPadX      = 2 ;
	var jumpTilePadXl = 16 ;
	var jumpTilePadXr = 0 ;

	var jumpSpriteConfig = copy_object (walkConfig) ;
	jumpSpriteConfig.count = jumpTileCount ;
	jumpSpriteConfig.rowIndex = jumpRowIndex ;
	jumpSpriteConfig.width = jumpTileWidth ;
	jumpSpriteConfig.height = ddSprite.height ;
	jumpSpriteConfig.offsetX = jumpOffsetX ;
	jumpSpriteConfig.offsetY = jumpOffsetY ;
	jumpSpriteConfig.padX = jumpPadX ;
	//jumpSpriteConfig.bgColor = jumpBgColor ;
	jumpSpriteConfig.padXl = jumpTilePadXl ;
	jumpSpriteConfig.padXr = jumpTilePadXr ;

  ddSprite.jump     = get_sprite(jumpSpriteConfig) ;
  //console.log('ddSprite', ddSprite) ; 

  ddSprite.rest = [ddSprite.walk[0]] ;

	return ddSprite ;

}