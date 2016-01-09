function rastan_sprite () {
  
  var imgUrl          = 'rastan_spritesheet.png' ;
  var spriteCanvas    = image2canvas(imgUrl) ;
  var spriteContext   = create_context(spriteCanvas) ;
  var bgColor         = [255, 163, 177] ;
	var rastanSprite    = {} ;
	rastanSprite.height = 39 ;

	var walkTileCount = 2 ;
	var walkRowIndex  = 0 ;
	var walkTileWidth = 16 ;
	var walkOffsetX   = 0 ;
	var walkOffsetY   = 400 ;
	var walkPadX      = 380 ;
	var walkTilePadXl = 0 ;	
	var walkTilePadXr = 0 ;
	rastanSprite.walk = get_sprite (spriteContext, walkTileCount, walkRowIndex, walkTileWidth, rastanSprite.height, walkOffsetX, walkOffsetY, walkPadX, bgColor, walkTilePadXl, walkTilePadXr) ;
	rastanSprite.walk.push(rastanSprite.walk[1]) ;

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
	// tempCanvas.getContext ('2d').clearRect (punchTilePadXl, 0, walkTileWidth * 1.5, rastanSprite.height) ;
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