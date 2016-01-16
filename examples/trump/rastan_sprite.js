function rastan_sprite () {
  
  var imgUrl          = 'rastan_spritesheet.gif' ;
  var spriteCanvas    = image2canvas(imgUrl) ;
  var spriteContext   = create_context(spriteCanvas) ;
  var bgColor         = undefined ; // [255, 163, 177] ;

	var rastanSprite    = {} ; // output variable
	rastanSprite.height = 64 ;

	var centerShift     = 8 ;

	var rastanTileCount = 1 ;
	var rastanRowIndex  = 0 ;
	var rastanTileWidth = 32 ;
	var rastanOffsetX   = 5 ;
	var rastanOffsetY   = 396 ;
	var rastanPadX      = 343 ;
	var rastanTilePadXl = 32 ;	
	var rastanTilePadXr = 16 + centerShift ;

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

	var rastanSpriteConfig2 = copy_object(rastanSpriteConfig) ;
	rastanSpriteConfig2.offsetX = 377 ; // rastanPadX - 3 * rastanTileWidth;
	rastanSprite.walk.push(get_sprite(rastanSpriteConfig2)[0]) ;

	rastanSpriteConfig.offsetY   = 474 ;
	rastanSpriteConfig.padX     -= 4 ;
	rastanSpriteConfig.tileCount = 1 ;

	rastanSprite.walk = rastanSprite.walk.concat( get_sprite (rastanSpriteConfig) ) ;
	rastanSprite.walk = [rastanSprite.walk[0], rastanSprite.walk[1], rastanSprite.walk[2], rastanSprite.walk[1]] ;
	// rastanSprite.walk = [rastanSprite.walk[1], rastanSprite.walk[0], rastanSprite.walk[1], rastanSprite.walk[2]] ;
	//rastanSprite.walk = [rastanSprite.walk[1], rastanSprite.walk[2], rastanSprite.walk[0], rastanSprite.walk[1]] ; // , rastanSprite.walk[2], rastanSprite.walk[1]] ;
	rastanSprite.rest = [rastanSprite.walk[0]] ; 

  /***
    *
    * attack:
		*
   ***/

  var attackTileCount = 1 ;
	var attackRowIndex  = 0 ;
	var attackTileWidth = 48 ;
	var attackOffsetX   = 43 ;
	var attackOffsetY   = 398 ;
	var attackPadX      = 16 ;
	var attackTilePadXl = 32 ;
	var attackTilePadXr = 0 + centerShift ;

  var attackConfig1 = {
		context: spriteContext,
		tileCount: attackTileCount,
		rowIndex: attackRowIndex,
		tileWidth: attackTileWidth,
		tileHeight: rastanSprite.height,
		offsetX: attackOffsetX,
		offsetY: rastanOffsetY,
		padX: attackPadX,
		bgColor: bgColor,
		tilePadXl: attackTilePadXl,
		tilePadXr: attackTilePadXr,
  } ;
	rastanSprite.attack = get_sprite (attackConfig1) ;

	var attackConfig2 = copy_object(attackConfig1) ;
	attackConfig2.offsetX = 100 ;
	rastanSprite.attack.push(get_sprite(attackConfig2)[0]) ;

	var attackConfig3 = copy_object(attackConfig1) ;
	attackConfig3.offsetX = 154 ;
	attackConfig3.tileWidth = 32 ;
	attackConfig3.tilePadXr = 16 + centerShift ;
	rastanSprite.attack.push(get_sprite(attackConfig3)[0]) ;

	var attackConfig4       = copy_object(attackConfig3) ;
	attackConfig4.offsetX   = 194 ;
	rastanSprite.attack.push(get_sprite(attackConfig4)[0]) ;

	var attackConfig5       = copy_object(attackConfig2) ;
	attackConfig5.offsetX   = 244 ;
	attackConfig5.tileWidth = 64 ;
	attackConfig5.tilePadXl = 0 ;
	attackConfig5.tilePadXr = 16 + centerShift ;
	rastanSprite.attack.push(get_sprite(attackConfig5)[0]) ;

	rastanSprite.attack.push(rastanSprite.attack[4]) ;
	rastanSprite.attack.push(rastanSprite.attack[4]) ;
	rastanSprite.attack.push(rastanSprite.attack[4]) ;
	rastanSprite.attack.push(rastanSprite.attack[4]) ;
	rastanSprite.attack.push(rastanSprite.attack[4]) ;
	rastanSprite.attack.push(rastanSprite.attack[4]) ;
	rastanSprite.attack.push(rastanSprite.attack[3]) ;
	rastanSprite.attack.push(rastanSprite.attack[2]) ;
	rastanSprite.attack.push(rastanSprite.attack[1]) ;
	rastanSprite.attack.push(rastanSprite.attack[0]) ;

	var attackCanvas  = rastanSprite.attack[4] ;
	var tempCanvas    = create_canvas (attackCanvas.width, attackCanvas.height)  ;
	var clearedFrame  = create_canvas (attackCanvas.width, attackCanvas.height)  ;
	tempCanvas.getContext ('2d').drawImage (attackCanvas, 0, 0) ;
	tempCanvas.getContext ('2d').clearRect (tempCanvas.width * 0.25, 0, tempCanvas.width * 0.5, rastanSprite.height) ;
	//console.log ('dd_sprite: tempCanvas', tempCanvas.getContext('2d').getImageData(0, 0, tempCanvas.width, tempCanvas.height)) ; 
	rastanSprite.attackCollision = [
		clearedFrame,
		clearedFrame, 
		clearedFrame, 
		clearedFrame, 
		tempCanvas,
		tempCanvas,
		tempCanvas,
		tempCanvas,
		tempCanvas,
		tempCanvas,
		tempCanvas,
		clearedFrame,
		clearedFrame,
		clearedFrame,
		clearedFrame,
	] ;

	rastanSprite.clearedFrame = clearedFrame ;

	var jumpConfig  = [] ;
	var Njump       = 6 ; // number of frames in the jump-attack spritesheet
	var jumpOffsetY = 53 ;
	var rowIndex    = 0 ;
	var torsoHeight = 39 ;
	var padX = 0 ;

	for ( kJump = 0 ; kJump < Njump - 1 ; kJump++ ) {
		jumpConfig.push( copy_object( attackConfig1 ) ) ;
  	jumpConfig[kJump].offsetY   = jumpOffsetY ;
  	jumpConfig[kJump].tileHeight = torsoHeight ; 
  	jumpConfig[kJump].padX      = 0 ;
	}
	jumpConfig.push( copy_object( attackConfig5 ) )
	jumpConfig[kJump].offsetY    = jumpOffsetY ;
	jumpConfig[kJump].tileHeight = torsoHeight ; 

	jumpConfig[0].offsetX = 10 ;
	jumpConfig[1].offsetX = 49 ;
	jumpConfig[2].offsetX = 106 ;
	jumpConfig[3].offsetX = 160 ;
	jumpConfig[4].offsetX = 193 ;
	jumpConfig[5].offsetX = 244 ;

	jumpConfig[0].tileWidth = 32 ;
	jumpConfig[1].tileWidth = 48 ;
	jumpConfig[2].tileWidth = 48 ;
	jumpConfig[3].tileWidth = 32 ;
	jumpConfig[4].tileWidth = 32 ;
	jumpConfig[5].tileWidth = 64 ;

	jumpConfig[0].tilePadXr = 16 + centerShift ;
	jumpConfig[3].tilePadXr = 16 + centerShift ;
	jumpConfig[4].tilePadXr = 16 + centerShift ;
	jumpConfig[5].tilePadXr = 16 + centerShift ;
	jumpConfig[5].tilePadXl = 0 ;

	// console.log('jumpConfig', jumpConfig) ;

	rastanSprite.jump = [] ; // initialize

	var legConfig         = copy_object(attackConfig1) ;
	legConfig.rowIndex    = 0 ;
	legConfig.tileCount   = 1 ;
	legConfig.tileHeight  = 30 ;
	legConfig.offsetX     = 147 ;
	legConfig.offsetY     = 813 ;
	legConfig.tileWidth   = 30 ;
	legConfig.padX        = 0 ;
	var legs = get_sprite(legConfig)[0] ;

	for ( kJump = 0 ; kJump < Njump ; kJump++ ) {
		var spriteK = get_sprite( jumpConfig[kJump] )[0] ;
		var legsK   = create_canvas(spriteK.width, legConfig.tileHeight) ;
		legsK.getContext('2d').drawImage(legs, 0, 0) ;
		var tempImg = create_canvas(spriteK.width, legConfig.tileHeight + torsoHeight) ;
		var tempCtx = tempImg.getContext('2d') ;
		//tempCtx.drawImage  ( spriteK, 0, 0 ) ;
		tempCtx.drawImage ( spriteK, 0, 0 ) ;
		tempCtx.drawImage ( legs, 0, torsoHeight) ;

		// console.log('rastan_sprite: spriteK', spriteK) ;
		rastanSprite.jump.push(tempImg) ;
	}

	// console.log('rastan', rastanSprite) ;

	rastanSprite.jump.push(rastanSprite.jump[5]) ;
	rastanSprite.jump.push(rastanSprite.jump[5]) ;
	rastanSprite.jump.push(rastanSprite.jump[5]) ;
	rastanSprite.jump.push(rastanSprite.jump[5]) ;
	rastanSprite.jump.push(rastanSprite.jump[5]) ;
	rastanSprite.jump.push(rastanSprite.jump[5]) ;
	rastanSprite.jump.push(rastanSprite.jump[4]) ;
	rastanSprite.jump.push(rastanSprite.jump[3]) ;
	rastanSprite.jump.push(rastanSprite.jump[2]) ;
	rastanSprite.jump.push(rastanSprite.jump[1]) ;
	rastanSprite.jump.push(rastanSprite.jump[0]) ;

	var jumpCanvas   = rastanSprite.jump[5] ;
	var tempCanvas   = create_canvas (jumpCanvas.width, jumpCanvas.height)  ;
	var clearedFrame = create_canvas (jumpCanvas.width, jumpCanvas.height)  ;
	tempCanvas.getContext ('2d').drawImage (jumpCanvas, 0, 0) ;
	tempCanvas.getContext ('2d').clearRect (tempCanvas.width * 0.25, 0, tempCanvas.width * 0.5, rastanSprite.height) ;

	rastanSprite.jumpCollision = [
		clearedFrame,
		clearedFrame, 
		clearedFrame, 
		clearedFrame, 
		clearedFrame, 
		tempCanvas,
		tempCanvas,
		tempCanvas,
		tempCanvas,
		tempCanvas,
		tempCanvas,
		tempCanvas,
		clearedFrame,
		clearedFrame,
		clearedFrame,
		clearedFrame,
		clearedFrame,
	] ;	

	// console.log('attack length', rastanSprite.jump.length)

 //  rastanSprite.jump     = get_sprite(spriteContext, jumpTileCount, jumpRowIndex, jumpTileWidth, rastanSprite.height, jumpOffsetX, jumpOffsetY, jumpPadX, bgColor, jumpTilePadXl, jumpTilePadXr) ;
	// console.log('rastan sprite', rastanSprite) ;

	 // rastanSprite.walk = rastanSprite.attackCollision ;

 //  var jumpTileCount = 3 ;
	// var jumpRowIndex  = 1 ;
	// var jumpTileWidth = 30 ;
	// var jumpOffsetX   = 464 ;
	// var jumpOffsetY   = 2 ;
	// var jumpPadX      = 2 ;
	// var jumpTilePadXl = 16 ;
	// var jumpTilePadXr = 0 ;

	return rastanSprite ;

}