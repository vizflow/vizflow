window.addEventListener( "load", function() { window.scrollTo(0, 0) ; } ) ;

document.addEventListener("touchmove", function(e) { e.preventDefault() }) ;

document.body.style.overflowY = 'hidden' ;
document.body.style.margin    = 0 ;

document.image = [ 
	'./image/select_spritesheet.png',
	'./image/background.png',
	'./image/titlescreen.png',
	'./image/jesus_spritesheet.png', 
	'./image/button_spritesheet.png', 
	'./image/trump_spritesheet.png', 
	'./image/trump_bg1.png', 
	'./image/trump_bg3.png', 
	'./image/trump_bg4.png', 
	'./image/megyn_spritesheet.png', 
	'./image/beam_spritesheet.png', 
	'./image/rastan_spritesheet.png',
	'./image/trump_attack.png', 
	'./image/city_intro.png',
	'./image/rastan_intro.png',
	'./image/megyn_title.png',
	'./image/0-9.png',
	'./image/powerup.png',
] ;
	  
document.audio = [
	'./audio/death.wav',
	'./audio/bullet2.wav',
	'./audio/hit2.wav',
	'./audio/jump1.wav',
	'./audio/laser1.wav',
	'./audio/laugh1.wav',
	'./audio/bump2.wav',
	'./audio/powerup0.wav',
	'./audio/powerup3.wav',
	'./audio/paQueSeLoGozen.wav',
	'./audio/85riddim.wav',
	'./audio/drwho.wav',
	// './audio/bullet2.wav',  
	// './audio/bump2.wav',  
	// './audio/explode1.wav',  
	// './audio/laser2.wav',  
	// './audio/missile1.wav',  
	// './audio/powerup1.wav',  
	// './audio/powerup2.wav', 
	// './audio/powerup3.wav', 
	// './audio/powerup4.wav',
] ;

// console.log('main 15') ;
document.skipIndex = 0 ;
document.ratio     = ( Math.ceil(window.devicePixelRatio) || 1 ) ;
var minRatio       = 2 ; 

if(document.ratio === 1) {
	document.ratio = minRatio ;
}

imageLoader.preload ( document.image, function preload_audio() {
	// console.log('preload_audio 18') ;
	audioLoader.preload( document.audio, fantasy_level ) ;
}) ;