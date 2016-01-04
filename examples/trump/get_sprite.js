function get_sprite (spriteContext, tileCount, rowIndex, tileWidth, tileHeight, offsetX, offsetY, padX, bgColor, tilePadXl, tilePadXr) {

  var tile = [] ;

  for (var t = 0 ; t < tileCount ; t++) {

  	var image       = spriteContext.getImageData(t * tileWidth + offsetX + padX * t, rowIndex * tileHeight + offsetY, tileWidth, tileHeight)	 ;
    // console.log ('dd_sprite get_sprite:', 'image', image.data, 'bgColor', bgColor) ;

    if(bgColor !== undefined) { // clear the background color
    	bg_clear(bgColor, image) ;
    }

    if (tilePadXl === undefined) {
      tilePadXl = 0 ;
    }

    if (tilePadXr === undefined) {
      tilePadXr = 0 ;
    }

    var tileCanvas  = create_canvas(tileWidth + tilePadXl + tilePadXr, tileHeight) ;
    var tileContext = tileCanvas.getContext('2d') ;
    tileContext.putImageData(image, tilePadXl, 0);
    // var img = tileContext.createImageData (tileWidth, tileHeight) ;
    // console.log (img.data) ;
    //bg_clear([1, 2, 3], tileContext) ;
    tile[t] = tileCanvas ;

  }

  return tile ;

}