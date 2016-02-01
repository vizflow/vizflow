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

    // var data = image.data ;

    // if(data.length === 64) {

      // console.log('data 1', data) ;

      // for(var kd = 0 ; kd < data.length  / 4 ; kd++) {
      //   var r = data[kd * 4 + 0] ;
      //   var g = data[kd * 4 + 1] ;
      //   var b = data[kd * 4 + 2] ;
      //   var a = data[kd * 4 + 3] ;
      //   console.log('get_sprite pre k', kd, 'r', r, 'g', g, 'b', b, 'a', a) ;
      // }    

    // }

    // console.log('spriteConfig.padXl', spriteConfig.padXl, 'tileCanvas', tileCanvas) ;

    tileContext.putImageData(image, spriteConfig.padXl, 0);

    // var data2 = tileContext.getImageData(0, 0, tileCanvas.width, tileCanvas.height).data ;

    // if(data2.length === 64) {

    //   console.log('data 2', data2) ;

    //   // for(var kd = 0 ; kd < data.length  / 4 ; kd++) {
    //   //   var r = data[kd * 4 + 0] ;
    //   //   var g = data[kd * 4 + 1] ;
    //   //   var b = data[kd * 4 + 2] ;
    //   //   var a = data[kd * 4 + 3] ;
    //   //   console.log('get_sprite post k', kd, 'r', r, 'g', g, 'b', b, 'a', a) ;
    //   // }    

    // }

    // var img = tileContext.createImageData (spriteConfig.tileWidth, spriteConfig.tileHeight) ;
    // console.log (img.data) ;
    //bg_clear([1, 2, 3], tileContext) ;
    tile[t] = tileCanvas ;

  }

  return tile ;

}