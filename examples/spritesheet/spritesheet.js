document.body.style.overflowY = 'hidden';
document.body.style.margin    = 0 ;

var canvas    = create_canvas() ;
var context   = create_context(canvas) ;
var img       = new Image() ;
var dur       = 100 ;
var tileWidth  = 16 ;
var tileHeight = 32 ;
var rowIndex  = 0 ;
var offsetX = 9 ;
var offsetY = 8 ;
var tileCount = 6 ;
var tile      = [] ;
var padX = 2 ;

function draw_image() {
	var tile = this ;
	context.drawImage(tile.image, 0 , 0) ;
}

img.onload = function() {
	//context.drawImage(img, 0, 0) ;
  canvas.width  = img.width ;
  canvas.height = img.height ;
  context.drawImage(img, 0 , 0) ;

  for(var t = 0 ; t < tileCount ; t++) {
  	var image       = context.getImageData(t * tileWidth + offsetX + padX * t, rowIndex * tileHeight + offsetY, tileWidth, tileHeight)	 ;
    var tileCanvas  = create_canvas(tileWidth, tileHeight) ;
    var tileContext = create_context(tileCanvas) ;
    tileContext.putImageData(image, 0, 0);
    tile[t] = { image: tileCanvas, render: draw_image } ;
  }

  var viz = create_canvas(tileWidth, tileHeight) ; 
  place_viz(viz) ;
  context = create_context(viz) ;

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

img.src = 'metroid_spritesheet.png' ;