function dd_sprite () {
  
  var imgUrl        = 'dd_billy.png' ;
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
	ddSprite.walk     = get_sprite (spriteContext, walkTileCount, walkRowIndex, walkTileWidth, ddSprite.height, walkOffsetX, walkOffsetY, walkPadX, bgColor, walkTilePadXl, walkTilePadXr) ;
	ddSprite.walk.push(ddSprite.walk[1]) ;

  var punchTileCount = 2 ;
	var punchRowIndex  = 1 ;
	var punchTileWidth = 32 ;
	var punchOffsetX   = 112 ;
	var punchOffsetY   = 2 ;
	var punchPadX      = 16 ;
	var punchTilePadXl = 16 ;
	var punchTilePadXr = 0 ;
	ddSprite.punch     = get_sprite (spriteContext, punchTileCount, punchRowIndex, punchTileWidth, ddSprite.height, punchOffsetX, punchOffsetY, punchPadX, bgColor, punchTilePadXl, punchTilePadXr) ;
	ddSprite.punch     = [ddSprite.punch[0], ddSprite.walk[0], ddSprite.punch[1]] ;

	var punchCanvas  = ddSprite.punch[0] ;
	var tempCanvas   = create_canvas (punchCanvas.width, punchCanvas.height)  ;
	var clearedFrame = create_canvas (punchCanvas.width, punchCanvas.height)  ;
	tempCanvas.getContext ('2d').drawImage (punchCanvas, 0, 0) ;
	tempCanvas.getContext ('2d').clearRect (punchTilePadXl, 0, walkTileWidth * 1.5, ddSprite.height) ;
	//console.log ('dd_sprite: tempCanvas', tempCanvas.getContext('2d').getImageData(0, 0, tempCanvas.width, tempCanvas.height)) ; 
	ddSprite.punchCollision = [tempCanvas, clearedFrame, tempCanvas] ;

  var jumpTileCount = 3 ;
	var jumpRowIndex  = 1 ;
	var jumpTileWidth = 30 ;
	var jumpOffsetX   = 464 ;
	var jumpOffsetY   = 2 ;
	var jumpPadX      = 2 ;
	var jumpTilePadXl = 16 ;
	var jumpTilePadXr = 0 ;
  ddSprite.jump     = get_sprite(spriteContext, jumpTileCount, jumpRowIndex, jumpTileWidth, ddSprite.height, jumpOffsetX, jumpOffsetY, jumpPadX, bgColor, jumpTilePadXl, jumpTilePadXr) ;

	return ddSprite ;

}