function dd_tile (draw_image) {
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

	function get_tile (tileCount, rowIndex, tileWidth, tileHeight, offsetX) {
		var padX       = tileWidth ;
	  var tile       = [] ;

	  for(var t = 0 ; t < tileCount ; t++) {
	  	var image       = spriteContext.getImageData(t * tileWidth + offsetX + padX * t, rowIndex * tileHeight + offsetY, tileWidth, tileHeight)	 ;
	    //console.log ('dd_tile get_tile:', 'image', image.data) ;
	    bg_clear(bgColor, image) ;
	    var tileCanvas  = create_canvas(tileWidth, tileHeight) ;
	    var tileContext = create_context(tileCanvas) ;
	    tileContext.putImageData(image, 0, 0);
	    // var img = tileContext.createImageData (tileWidth, tileHeight) ;
	    // console.log (img.data) ;
	    //bg_clear([1, 2, 3], tileContext) ;
	    tile[t] = { image: tileCanvas, render: draw_image } ;
	  }	

	  return tile ;

	}

	var ddTile = {} ;
	ddTile.walk = get_tile (3, 1, 16, 39, 16) ;
	return ddTile ;
}