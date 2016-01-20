document.body.style.overflowY = 'hidden';
document.body.style.margin    = 0 ;

// var spriteImageUrl = 'images/metroid_spritesheet.png' ;
// var bgImageUrl     = 'images/blaster_background_1.png' ;

var ddSpriteImageUrl      = '/images/dd_billy.png' ;
var rastanSpriteImageUrl  = '/images/rastan_spritesheet.gif' ;
var metroidSpriteImageUrl = '/images/metroid_spritesheet.png' ;
var buttonSpriteImageUrl  = '/images/button_spritesheet.png' ;
var trumpSpriteImageUrl   = '/images/trump_spritesheet2.png' ;
var backgroundImageUrl1   = '/images/trump_bg1.png' ;
var backgroundImageUrl3   = '/images/trump_bg3.png' ;
var backgroundImageUrl4   = '/images/trump_bg4.png' ;
var bulletImageUrl        = '/images/bullet.png' ;
var jumpBulletImageUrl    = '/images/beam1.png' ;
var trumpAttackSpriteUrl  = '/images/trump_attack.png' ;
var img = [ 
	ddSpriteImageUrl, 
	buttonSpriteImageUrl, 
	trumpSpriteImageUrl, 
	backgroundImageUrl1, 
	backgroundImageUrl3, 
	backgroundImageUrl4, 
	metroidSpriteImageUrl, 
	bulletImageUrl, 
	rastanSpriteImageUrl,
	jumpBulletImageUrl,
	trumpAttackSpriteUrl, 
] ;

imageLoader.preload ( img, trump_game ) ;