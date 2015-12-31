function load_bg() {
  var bgImageIndex = 1 ; 
  var bgImage     = imageLoader.cache[img[bgImageIndex]] ;
  var bgCanvas    = create_canvas() ;
  var bgContext   = create_context(bgCanvas) ;
  bgCanvas.width  = bgImage.width ;
  bgCanvas.height = bgImage.height ;
  bgContext.drawImage(bgImage, 0, 0) ;
  var bgTileCanvas  = [] ;
  var bgTileContext = [] ;
  var bgTile        = [] ;
  var bgXY          = [[34, 0], [34, 17], [51, 0], [51, 17]] ;
  var bgTileSize    = 16 ;

  for (var kTile = 0; kTile < bgXY.length ; kTile++) {
    bgTile[kTile]        = bgContext.getImageData (bgXY[kTile][0], bgXY[kTile][1], bgTileSize, bgTileSize) ;
    bgTileCanvas[kTile]  = create_canvas(bgTileSize, bgTileSize) ;
    bgTileContext[kTile] = create_context(bgTileCanvas[kTile]) ;
    bgTileContext[kTile].putImageData(bgTile[kTile], 0, 0);
  } 	

}