window.addEventListener( "load", function() { window.scrollTo(0, 0) ; } ) ;

document.addEventListener("touchmove", function(e) { e.preventDefault() }) ;

document.body.style.overflowY = 'hidden' ;
document.body.style.margin    = 0 ;

document.image = [ 
	'./load/image/select_spritesheet.png',
	'./load/image/background.png',
	'./load/image/titlescreen.png', 
] ;
	  
document.audio = [
	'./audio/hit3.wav',  
] ;
// console.log('main 15') ;

imageLoader.preload ( document.image, function preload_audio() {
	// console.log('preload_audio 18') ;
	audioLoader.preload( document.audio, load_game ) ;
}) ;