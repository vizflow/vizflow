function tiled_canvas() {

  var tiledCanvas    = create_canvas () ;
  var tiledContext   = create_context (tiledCanvas) ;

  tiledCanvas.width  = Math.sqrt(bgXY.length) * bgTileSize ;
  tiledCanvas.height = Math.sqrt(bgXY.length) * bgTileSize ;
  tiledContext.drawImage(bgTileCanvas[0], 0, 0, bgTileSize, bgTileSize, 0, 0, bgTileSize, bgTileSize) ;
  tiledContext.drawImage(bgTileCanvas[1], 0, 0, bgTileSize, bgTileSize, 0, bgTileSize, bgTileSize, bgTileSize) ;
  tiledContext.drawImage(bgTileCanvas[2], 0, 0, bgTileSize, bgTileSize, bgTileSize, 0, bgTileSize, bgTileSize) ;
  tiledContext.drawImage(bgTileCanvas[3], 0, 0, bgTileSize, bgTileSize, bgTileSize, bgTileSize, bgTileSize, bgTileSize) ;      

  var bgDataUri = tiledCanvas.toDataURL () ;

}