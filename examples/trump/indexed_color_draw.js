function indexed_color_draw(item, width, height) {
  var canvas  = create_canvas (width, height) ;
  var context = hiddenUICanvas.getContext('2d') ;

  for(var kItem = 0 ; kItem < Nitem ; kItem++) {

  	var imageDataK  = item[kItem]
  		.image
  		.getContext('2d')
  		.getImageData(0, 0, item[kItem].image.width, item[kItem].image.height) ;

    var imageK     = image2index(imageDataK, kItem) ; // ImageData object
    var tempCanvas = create_canvas(item[kItem].image.width, item[kItem].image.height) ;

    tempCanvas
      .getContext('2d')
      .clearRect(0, 0, tempCanvas.width, tempCanvas.height) ;
    tempCanvas
      .getContext('2d')
      .putImageData(imageK, 0, 0) ;

    context.drawImage(tempCanvas, item[kItem].x, item[kItem].y) ; // draw color-indexed button for color picking

  }	
}