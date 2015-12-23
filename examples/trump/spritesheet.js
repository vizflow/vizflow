document.body.style.overflowY = 'hidden';
document.body.style.margin    = 0 ;

var dur       = 100 ;
var tileWidth  = 16 ;
var tileHeight = 32 ;
var vizWidth  = 200 ;
var vizHeight = 320 ;
var rowIndex  = 0 ;
var offsetX = 9 ;
var offsetY = 8 ;
var tileCount = 6 ;
var tile      = [] ;
var padX = 2 ;

function draw_image() {
	var tile = this ;
	spriteContext.drawImage(tile.image, 0 , 0) ;
}

function draw_rect() {
  var rect = this ;
  spriteContext.beginPath() ;
  spriteContext.rect(rect.x, rect.y, rect.width, rect.height) ;
  spriteContext.fillStyle = rect.color ;
  spriteContext.fill() ;
  spriteContext.closePath() ;
}


var spriteImageUrl = 'metroid_spritesheet.png' ;
var bgImageUrl = 'blaster_background_1.png' ;
var img = [spriteImageUrl, bgImageUrl] ;

function run_game () {
	//spriteContext.drawImage(img, 0, 0) ;
  var spriteImageIndex = 0 ; 
  var spriteImage     = imageLoader.cache[img[spriteImageIndex]] ;
  var spriteCanvas    = create_canvas() ;
  var spriteContext   = create_context(spriteCanvas) ;
  spriteCanvas.width  = spriteImage.width ;
  spriteCanvas.height = spriteImage.height ;
  spriteContext.drawImage(spriteImage, 0, 0) ;

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
    bgTile[kTile]         = bgContext.getImageData (bgXY[kTile][0], bgXY[kTile][1], bgTileSize, bgTileSize) ;
    bgTileCanvas[kTile]   = create_canvas(bgTileSize, bgTileSize) ;
    bgTileContext[kTile]  = create_context(bgTileCanvas[kTile]) ;
    bgTileContext[kTile].putImageData(bgTile[kTile], 0, 0);
  } 
  var tiledCanvas  = create_canvas () ;
  var tiledContext = create_context (tiledCanvas) ;
  tiledCanvas.width = Math.sqrt(bgXY.length) * bgTileSize ;
  tiledCanvas.height = Math.sqrt(bgXY.length) * bgTileSize ;
  tiledContext.drawImage(bgTileCanvas[0], 0, 0, bgTileSize, bgTileSize, 0, 0, bgTileSize, bgTileSize) ;
  tiledContext.drawImage(bgTileCanvas[1], 0, 0, bgTileSize, bgTileSize, 0, bgTileSize, bgTileSize, bgTileSize) ;
  tiledContext.drawImage(bgTileCanvas[2], 0, 0, bgTileSize, bgTileSize, bgTileSize, 0, bgTileSize, bgTileSize) ;
  tiledContext.drawImage(bgTileCanvas[3], 0, 0, bgTileSize, bgTileSize, bgTileSize, bgTileSize, bgTileSize, bgTileSize) ;      

  var bgDataUri = tiledCanvas.toDataURL () ;

  for(var t = 0 ; t < tileCount ; t++) {
  	var image       = spriteContext.getImageData(t * tileWidth + offsetX + padX * t, rowIndex * tileHeight + offsetY, tileWidth, tileHeight)	 ;
    var tileCanvas  = create_canvas(tileWidth, tileHeight) ;
    var tileContext = create_context(tileCanvas) ;
    tileContext.putImageData(image, 0, 0);
    tile[t] = { image: tileCanvas, render: draw_image } ;
  }

  var vizCanvas = create_canvas(vizWidth, vizHeight) ; 
  place_viz(vizCanvas) ;
  vizContext = create_context(vizCanvas) ;
  //vizContext.drawImage(spriteCanvas, 0, 0) ;
  vizCanvas.style.background = 'url("' + bgDataUri + '")' ;
  vizCanvas.style.backgroundSize = '200px' ;
  //draw_rect.call({ x: 0, y: 0, width: 200, height: 320, color: '#000'}) ;


  var step_transition = step_transition_func('image', dur) ;
  //console.log(stepTransition)
  //console.log(tile)

  var item = [{image: tile[0].image, render: draw_image}] ;
  $Z.item(item)   ; // load the user data into the visualization engine to initialize the time equals zero (t = 0) state
	$Z.prep([prep]) ; // sets the preprocessing to perform on each frame of the animation (prior to updating and rendering the elements)
	$Z.run()        ; // run the interactive visualization (infinite loop by default)

  var counter = 0 ;
  function loop() {  	
	  var stepTransition = step_transition( tile[counter % tile.length].image ) ;
	  item[0].transition = [stepTransition] ;
	  counter++ ;
  }

  setInterval(loop, dur * 2) ;

}

imageLoader.preload (img, run_game) ;
