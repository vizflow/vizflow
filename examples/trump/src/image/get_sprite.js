function get_sprite (spriteConfig) {

  var tile = [] ;
  
  for (var t = 0 ; t < spriteConfig.count ; t++) {

  	var image = spriteConfig.context.getImageData (
      t * spriteConfig.width + spriteConfig.offsetX + spriteConfig.padX * t,
      spriteConfig.rowIndex * spriteConfig.height + spriteConfig.offsetY, 
      spriteConfig.width, 
      spriteConfig.height
    )	 ;

    // console.log ('dd_sprite get_sprite:', 'image', image.data, 'spriteConfig.bgColor', spriteConfig.bgColor) ;

    if(spriteConfig.bgColor !== undefined) { // clear the background color
    	bg_clear(spriteConfig.bgColor, image) ;
    }

    if (spriteConfig.padXl === undefined) {
      spriteConfig.padXl = 0 ;
    }

    if (spriteConfig.padXr === undefined) {
      spriteConfig.padXr = 0 ;
    }

    var tileCanvas  = create_canvas(spriteConfig.width + spriteConfig.padXl + spriteConfig.padXr, spriteConfig.height) ;
    var tileContext = tileCanvas.getContext('2d') ;
    tileContext.putImageData(image, spriteConfig.padXl, 0);
    // var img = tileContext.createImageData (spriteConfig.tileWidth, spriteConfig.tileHeight) ;
    // console.log (img.data) ;
    //bg_clear([1, 2, 3], tileContext) ;
    tile[t] = tileCanvas ;

  }

  return tile ;

}