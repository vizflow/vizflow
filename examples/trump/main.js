document.body.style.overflowY = 'hidden';
document.body.style.margin    = 0 ;

// var spriteImageUrl = 'metroid_spritesheet.png' ;
// var bgImageUrl     = 'blaster_background_1.png' ;

var ddSpriteImageUrl     = 'dd_billy.png' ;
var buttonSpriteImageUrl = 'blue_button2.png' ;
var trumpSpriteImageUrl  = 'trump1.png' ;
var img                  = [ ddSpriteImageUrl, buttonSpriteImageUrl, trumpSpriteImageUrl ] ;

imageLoader.preload ( img, trump_game ) ;