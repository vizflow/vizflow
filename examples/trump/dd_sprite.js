function dd_sprite (draw_image) {
  //var tileWidth  = 16 ;
  //var tileHeight = 39 ;
	//var rowIndex   = 1 ;
  //var offsetX    = 16 ;
  var offsetY    = 2 ;
  //var tileCount  = 2 ;
  
  var imgUrl       = 'dd_billy.png' ;
  var spriteCanvas = image2canvas(imgUrl) ;
  var spriteContext = create_context(spriteCanvas) ;
  var bgColor = [64, 136, 252] ;

	function get_sprite (tileCount, rowIndex, tileWidth, tileHeight, offsetX, padX) {
	  var tile       = [] ;

	  for(var t = 0 ; t < tileCount ; t++) {
	  	var image       = spriteContext.getImageData(t * tileWidth + offsetX + padX * t, rowIndex * tileHeight + offsetY, tileWidth, tileHeight)	 ;
	    //console.log ('dd_sprite get_sprite:', 'image', image.data) ;
	    bg_clear(bgColor, image) ;
	    var tileCanvas  = create_canvas(tileWidth, tileHeight) ;
	    var tileContext = create_context(tileCanvas) ;
	    tileContext.putImageData(image, 0, 0);
	    // var img = tileContext.createImageData (tileWidth, tileHeight) ;
	    // console.log (img.data) ;
	    //bg_clear([1, 2, 3], tileContext) ;
	    tile[t] = tileCanvas ;
	  }	

	  return tile ;

	}

	var ddSprite    = {} ;
	ddSprite.height = 39 ;

	var walkTileCount = 3 ;
	var walkRowIndex  = 1 ;
	var walkTileWidth = 16 ;
	var walkOffsetX   = 16 ;
	var walkPadX      = 16 ;
	ddSprite.walk     = get_sprite (walkTileCount, walkRowIndex, walkTileWidth, ddSprite.height, walkOffsetX, walkPadX) ;

  var punchTileCount = 2 ;
	var punchRowIndex  = 1 ;
	var punchTileWidth = 32 ;
	var punchOffsetX   = 112 ;
	var punchPadX      = 16 ;
	ddSprite.punch     = get_sprite (punchTileCount, punchRowIndex, punchTileWidth, ddSprite.height, punchOffsetX, punchPadX) ;
	ddSprite.punch     = [ddSprite.punch[0], ddSprite.walk[0], ddSprite.punch[1]] ;

  var kickTileCount = 3 ;
	var kickRowIndex  = 1 ;
	var kickTileWidth = 30 ;
	var kickOffsetX   = 464 ;
	var kickPadX      = 2 ;
  ddSprite.kick     = get_sprite(kickTileCount, kickRowIndex, kickTileWidth, ddSprite.height, kickOffsetX, kickPadX) ;

	return ddSprite ;
}