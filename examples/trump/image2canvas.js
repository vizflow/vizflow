function image2canvas(imgUrl) {
  var image     = imageLoader.cache[imgUrl] ; // temporary variable
  var canvas    = create_canvas() ;
  var context   = create_context(canvas) ;
  canvas.width  = image.width ;
  canvas.height = image.height ;
  context.drawImage(image, 0, 0) ;
  return canvas ;
}