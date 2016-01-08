document.body.style.overflowY = 'hidden';
document.body.style.margin    = 0 ;

// var spriteImageUrl = 'metroid_spritesheet.png' ;
// var bgImageUrl     = 'blaster_background_1.png' ;

var ddSpriteImageUrl      = 'dd_billy.png' ;
var metroidSpriteImageUrl = 'metroid_spritesheet.png' ;
var buttonSpriteImageUrl  = 'blue_button2.png' ;
var trumpSpriteImageUrl   = 'trump_spritesheet.png' ;
var backgroundImageUrl1    = 'trump_bg1.png' ;
var backgroundImageUrl4    = 'trump_bg4.png' ;
var img                   = [ ddSpriteImageUrl, buttonSpriteImageUrl, trumpSpriteImageUrl, backgroundImageUrl1, backgroundImageUrl4, metroidSpriteImageUrl ] ;

imageLoader.preload ( img, trump_game ) ;