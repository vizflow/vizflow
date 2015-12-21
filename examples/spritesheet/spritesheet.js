document.body.style.overflowY       = 'hidden';
document.body.style.margin          = 0 ;

var Nrect = 270 ;
var canvas = create_canvas(Nrect) ;

var context                         = canvas.getContext('2d') ;  
context.mozImageSmoothingEnabled    = false ;
context.imageSmoothingEnabled       = false ;
context.font                        = "48px Arial" ; 
context.globalAlpha                 = 1.0 ;

document.body.appendChild(canvas) ;

function resize() {
  set_canvas_position( canvas ) ;
}

resize() ;
var tResize = 85 ; // how often to check for window resize events (85 is ve 17 ms frames)
setInterval( resize, tResize ) ;

var img = new Image();
img.onload = function() {
    context.drawImage(img, 0, 0);
}
img.src = 'burgertime_spritesheet.png';