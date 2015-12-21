document.body.style.overflowY  = 'hidden';
document.body.style.margin     = 0 ;

var Nrect   = 0 ;
var canvas  = create_canvas(Nrect) ;
var context = create_context(canvas) ;

var img       = new Image();
var tileSize  = 16 ;
var rowIndex  = 6 ;
var tileCount = 6 ;
var tiles     = [] ;
img.onload = function() {
	//context.drawImage(img, 0, 0) ;
  canvas.width  = img.width ;
  canvas.height = img.height ;
  context.drawImage(img, 0 , 0) ;

  for(var t = 0 ; t < tileCount ; t++) {
    tiles[t] = context.getImageData(t * tileSize, rowIndex * tileSize, tileSize, tileSize) ;
  }

  var viz = create_canvas(tileSize) ; 
  place_viz(viz) ;
  context = create_context(viz) ;
  context.putImageData(tiles[0], 0, 0) ;
}
img.src = 'burgertime_spritesheet.png';