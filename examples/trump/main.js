document.body.style.overflowY = 'hidden';
document.body.style.margin    = 0 ;

// var spriteImageUrl = 'metroid_spritesheet.png' ;
// var bgImageUrl     = 'blaster_background_1.png' ;

var ddSpriteImageUrl      = 'dd_billy.png' ;
var rastanSpriteImageUrl  = 'rastan_spritesheet.gif' ;
var metroidSpriteImageUrl = 'metroid_spritesheet.png' ;
var buttonSpriteImageUrl  = 'button_spritesheet.png' ;
var trumpSpriteImageUrl   = 'trump_spritesheet2.png' ;
var backgroundImageUrl1   = 'trump_bg1.png' ;
var backgroundImageUrl3   = 'trump_bg3.png' ;
var backgroundImageUrl4   = 'trump_bg4.png' ;
var bulletImageUrl        = 'bullet.png' ;

var img                   = [ 
	ddSpriteImageUrl, 
	buttonSpriteImageUrl, 
	trumpSpriteImageUrl, 
	backgroundImageUrl1, 
	backgroundImageUrl3, 
	backgroundImageUrl4, 
	metroidSpriteImageUrl, 
	bulletImageUrl, 
	rastanSpriteImageUrl, 
] ;

imageLoader.preload ( img, trump_game ) ;