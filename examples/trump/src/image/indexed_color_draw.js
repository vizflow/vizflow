function indexed_color_draw(item, width, height) {
  var canvas  = create_canvas (width, height) ;
  var context = hiddenUICanvas.context() ;

  for(var kItem = 0 ; kItem < Nitem ; kItem++) {

  	var imageDataK  = item[kItem]
  		.image
  		.context()
  		.getImageData(0, 0, item[kItem].image.width, item[kItem].image.height) ;

    var imageK     = image2index(imageDataK, kItem) ; // ImageData object
    var tempCanvas = create_canvas(item[kItem].image.width, item[kItem].image.height) ;

    tempCanvas
      .context()
      .clearRect(0, 0, tempCanvas.width, tempCanvas.height) ;
    tempCanvas
      .context()
      .putImageData(imageK, 0, 0) ;

    context.drawImage(tempCanvas, item[kItem].x, item[kItem].y) ; // draw color-indexed button for color picking

  }	
}