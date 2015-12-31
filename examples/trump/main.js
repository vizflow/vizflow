document.body.style.overflowY = 'hidden';
document.body.style.margin    = 0 ;

// var spriteImageUrl = 'metroid_spritesheet.png' ;
var spriteImageUrl = 'dd_billy.png' ;
//var bgImageUrl     = 'blaster_background_1.png' ;
var img = [ spriteImageUrl ] ;
imageLoader.preload ( img, trump_game ) ;