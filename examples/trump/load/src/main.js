window.addEventListener( "load", function() { window.scrollTo(0, 0) ; } ) ;

document.addEventListener("touchmove", function(e) { e.preventDefault() }) ;

document.body.style.overflowY = 'hidden' ;
document.body.style.margin    = 0 ;

document.image = [ 
	'./load/image/select_spritesheet.png',
	'./load/image/background.png',
	'./load/image/titlescreen.png',
	'./game/image/jesus_spritesheet.png', 
	'./game/image/button_spritesheet.png', 
	'./game/image/trump_spritesheet.png', 
	'./game/image/trump_bg1.png', 
	'./game/image/trump_bg3.png', 
	'./game/image/trump_bg4.png', 
	'./game/image/megyn_spritesheet.png', 
	'./game/image/beam_spritesheet.png', 
	'./game/image/rastan_spritesheet.png',
	'./game/image/trump_attack.png', 
	'./game/image/city_intro.png',
	'./game/image/rastan_intro.png',
	'./game/image/megyn_title.png',
	'./game/image/0-9.png',
] ;
	  
document.audio = [
	'./audio/hit3.wav',  
] ;
// console.log('main 15') ;

imageLoader.preload ( document.image, function preload_audio() {
	// console.log('preload_audio 18') ;
	audioLoader.preload( document.audio, load_game ) ;
}) ;