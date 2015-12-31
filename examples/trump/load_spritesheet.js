function load_spritesheet(spriteSheetIndex) {
  var spriteImage     = imageLoader.cache[img[spriteImageIndex]] ; // temporary variable
  var spriteCanvas    = create_canvas() ;
  var spriteContext   = create_context(spriteCanvas) ;
  spriteCanvas.width  = spriteImage.width ;
  spriteCanvas.height = spriteImage.height ;
  spriteContext.drawImage(spriteImage, 0, 0) ;
  return spriteCanvas ;
}