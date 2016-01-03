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

	var ddSprite = {} ;

	ddSprite.walk  = get_sprite (3, 1, 16, 39, 16, 16) ;

	ddSprite.punch = get_sprite (2, 1, 32, 39, 112, 16) ;
	ddSprite.punch = [ddSprite.punch[0], ddSprite.walk[0], ddSprite.punch[1]] ;

  ddSprite.kick = get_sprite(3, 1, 30, 40, 464, 2) ;
  //ddSprite.kick = [ddSprite.walk[0], ddSprite.kick[0]] ;

	return ddSprite ;
}