function get_sprite (spriteConfig) {

  var tile = [] ;
  
  for (var t = 0 ; t < spriteConfig.tileCount ; t++) {

  	var image = spriteConfig.context.getImageData (
      t * spriteConfig.tileWidth + spriteConfig.offsetX + spriteConfig.padX * t,
      spriteConfig.rowIndex * spriteConfig.tileHeight + spriteConfig.offsetY, 
      spriteConfig.tileWidth, 
      spriteConfig.tileHeight
    )	 ;

    // console.log ('dd_sprite get_sprite:', 'image', image.data, 'spriteConfig.bgColor', spriteConfig.bgColor) ;

    if(spriteConfig.bgColor !== undefined) { // clear the background color
    	bg_clear(spriteConfig.bgColor, image) ;
    }

    if (spriteConfig.tilePadXl === undefined) {
      spriteConfig.tilePadXl = 0 ;
    }

    if (spriteConfig.tilePadXr === undefined) {
      spriteConfig.tilePadXr = 0 ;
    }

    var tileCanvas  = create_canvas(spriteConfig.tileWidth + spriteConfig.tilePadXl + spriteConfig.tilePadXr, spriteConfig.tileHeight) ;
    var tileContext = tileCanvas.getContext('2d') ;
    tileContext.putImageData(image, spriteConfig.tilePadXl, 0);
    // var img = tileContext.createImageData (spriteConfig.tileWidth, spriteConfig.tileHeight) ;
    // console.log (img.data) ;
    //bg_clear([1, 2, 3], tileContext) ;
    tile[t] = tileCanvas ;

  }

  return tile ;

}