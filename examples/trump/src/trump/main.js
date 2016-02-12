document.body.style.overflowY = 'hidden';
document.body.style.margin    = 0 ;
document.addEventListener("touchmove", function(e) { e.preventDefault() });
window.addEventListener("load", function() { window.scrollTo(0, 0); });

// var body = document.documentElement;
// if (body.requestFullscreen) {
//   body.requestFullscreen();
// } else if (body.webkitrequestFullscreen) {
//   body.webkitrequestFullscreen();
// } else if (body.mozrequestFullscreen) {
//   body.mozrequestFullscreen();
// } else if (body.msrequestFullscreen) {
//   body.msrequestFullscreen();
// }

// var spriteImageUrl = 'images/metroid_spritesheet.png' ;
// var bgImageUrl     = 'images/blaster_background_1.png' ;

var ddSpriteImageUrl      = './images/jesus_spritesheet.png' ;
var rastanSpriteImageUrl  = './images/rastan_spritesheet.gif' ;
var metroidSpriteImageUrl = './images/megyn_spritesheet.png' ;
var buttonSpriteImageUrl  = './images/button_spritesheet.png' ;
var trumpSpriteImageUrl   = './images/trump_spritesheet_new.png' ;
var backgroundImageUrl1   = './images/trump_bg1.png' ;
var backgroundImageUrl3   = './images/trump_bg3.png' ;
var backgroundImageUrl4   = './images/trump_bg4.png' ;
var bulletImageUrl        = './images/beam_spritesheet.png' ;
var jumpBulletImageUrl    = './images/beam1.png' ;
var trumpAttackSpriteUrl  = './images/trump_attack.png' ;
var titleUrl              = './images/trumped1.png' ;

document.image = [ 
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
	titleUrl,
] ;

	  
document.audio = [
	'./audio/bullet1.wav',
	'./audio/bullet2.wav',  
	'./audio/bump1.wav',  
	'./audio/bump2.wav',  
	'./audio/explode1.wav',  
	'./audio/hit1.wav',  
	'./audio/hit2.wav',  
	'./audio/hit3.wav',  
	'./audio/jump1.wav', 
	'./audio/laser1.wav',  
	'./audio/laser2.wav',  
	'./audio/laugh1.wav',  
	'./audio/missile1.wav',  
	'./audio/powerup1.wav',  
	'./audio/powerup2.wav', 
	'./audio/powerup3.wav', 
	'./audio/powerup4.wav',
],

imageLoader.preload ( document.image, function preload_audio() {
	audioLoader.preload( document.audio, trump_game ) ;
}) ;