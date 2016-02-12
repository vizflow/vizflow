function dd_sprite () {
  
  var imgUrl        = './images/dd_billy.png' ;
  var spriteCanvas  = imageHelper.image2canvas(imgUrl) ;
  var spriteContext = create_context(spriteCanvas) ;
  var bgColor       = [255, 255, 0] ;

	var ddSprite    = {} ;
	// ddSprite.height = 41 ;

	var walkTileCount = 3 ;
	var walkRowIndex  = 1 ;
	var walkTileWidth = 18 ;
	var walkOffsetX   = 16 ;
	var walkOffsetY   = -3 ;
	var walkPadX      = 14 ;
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
	ddSprite.walk = spriteHelper.get_sprite (walkConfig) ;
	ddSprite.walk.push(ddSprite.walk[1]) ;

  var attackTileCount = 2 ;
	var attackRowIndex  = 1 ;
	var attackTileWidth = 32 ;
	var attackOffsetX   = 112 ;
	var attackOffsetY   = -3 ;
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
	} ;
	ddSprite.attack = spriteHelper.get_sprite (attackConfig) ;
	//ddSprite.attack     = [ddSprite.attack[0], ddSprite.walk[0], ddSprite.attack[1]] ;

	var attackCanvas          = ddSprite.attack[0] ;
	var attackCollisionCanvas = create_canvas (attackCanvas.width, attackCanvas.height)  ;
	var clearedFrame          = create_canvas (attackCanvas.width, attackCanvas.height)  ;
	attackCollisionCanvas.getContext ('2d').drawImage (attackCanvas, 0, 0) ;
	attackCollisionCanvas.getContext ('2d').clearRect (attackTilePadXl, 0, walkTileWidth * 1.5, ddSprite.height) ;
	//console.log ('dd_sprite: attackCollisionCanvas', attackCollisionCanvas.getContext('2d').getImageData(0, 0, attackCollisionCanvas.width, attackCollisionCanvas.height)) ; 
	// ddSprite.attackCollision = [attackCollisionCanvas, clearedFrame, attackCollisionCanvas] ;

	// ddSprite.walk = ddSprite.attackCollision ; // debug only

  var jumpTileCount = 3 ;
	var jumpRowIndex  = 1 ;
	var jumpTileWidth = 30 ;
	var jumpOffsetX   = 464 ;
	var jumpOffsetY   = -3 ;
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

  ddSprite.jump = [] ;
  var jump      = spriteHelper.get_sprite(jumpSpriteConfig) ;
  ddSprite.jump.push(jump[0]) ;
  ddSprite.jump.push(jump[0]) ;
  // ddSprite.jump.push(jump[0]) ;
  // ddSprite.jump.push(jump[0]) ;
  // ddSprite.jump.push(jump[1]) ;
  // ddSprite.jump.push(jump[1]) ;
  ddSprite.jump.push(jump[1]) ;
  ddSprite.jump.push(jump[1]) ;  
  ddSprite.jump.push(jump[1]) ;
  ddSprite.jump.push(jump[1]) ;
  ddSprite.jump.push(jump[2]) ;
  ddSprite.jump.push(jump[2]) ;
  // ddSprite.jump.push(jump[2]) ;

	var jumpCollisionCanvas   = create_canvas (jump[1].width, jump[1].height)  ;
	jumpCollisionCanvas.getContext ('2d').drawImage (jump[1], 0, 0) ;
	jumpCollisionCanvas.getContext ('2d').clearRect (0, 0, jumpCollisionCanvas.width * 0.8, jump[1].height) ;
	var clearedFrame2 = create_canvas (jump[0].width, jump[0].height)  ;
	// console.log('jumpCollisionCanvas', jumpCollisionCanvas, 'clearedFrame2', clearedFrame2) ;

	// ddSprite.jumpCollision = [] ;
 //  ddSprite.jumpCollision.push(clearedFrame2) ;
 //  ddSprite.jumpCollision.push(clearedFrame2) ;
  // ddSprite.jumpCollision.push(clearedFrame2) ;
  // ddSprite.jumpCollision.push(clearedFrame2) ;
  // ddSprite.jumpCollision.push(jumpCollisionCanvas) ;
  // ddSprite.jumpCollision.push(jumpCollisionCanvas) ;
  // ddSprite.jumpCollision.push(jumpCollisionCanvas) ;
  // ddSprite.jumpCollision.push(jumpCollisionCanvas) ;
  // ddSprite.jumpCollision.push(jumpCollisionCanvas) ;
  // ddSprite.jumpCollision.push(jumpCollisionCanvas) ;
  // ddSprite.jumpCollision.push(clearedFrame2) ;
  // ddSprite.jumpCollision.push(clearedFrame2) ;
  // ddSprite.jumpCollision.push(clearedFrame2) ;
	//ddSprite.walk = ddSprite.jumpCollision ;
  //console.log('ddSprite', ddSprite) ; 
  ddSprite.rest = [ddSprite.walk[0]] ;

  ddSprite.hit = [jump[2]] ;

 	ddSprite.clearedFrame = create_canvas (attackCanvas.width, attackCanvas.height)  ;

 	// ddSprite.collisionSet = {} ; // use the active image references themselves as keys for the corresponding collision images

 	jump[1].sourceCollisionImage            = jumpCollisionCanvas ;
 	ddSprite.attack[0].sourceCollisionImage = attackCollisionCanvas ;
 	ddSprite.attack[1].sourceCollisionImage = attackCollisionCanvas ;

 	// console.log('jump1', jump[1])
 	// console.log('ddSprite', ddSprite, 'copy', copy_object(ddSprite)) ;
 	// barf
 	// ddSprite.collisionSet[ddSprite.attack[0]] = attackCollisionCanvas ;
 	// ddSprite.collisionSet[ddSprite.attack[1]] = attackCollisionCanvas ;

	return ddSprite ;

}