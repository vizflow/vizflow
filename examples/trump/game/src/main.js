window.addEventListener( "load", function() { window.scrollTo(0, 0) ; } ) ;

document.addEventListener("touchmove", function(e) { e.preventDefault() }) ;

document.body.style.overflowY = 'hidden' ;
document.body.style.margin    = 0 ;

document.image = [ 
	'./images/jesus_spritesheet.png', 
	'./images/button_spritesheet.png', 
	'./images/trump_spritesheet.png', 
	'./images/trump_bg1.png', 
	'./images/trump_bg3.png', 
	'./images/trump_bg4.png', 
	'./images/megyn_spritesheet.png', 
	'./images/beam_spritesheet.png', 
	'./images/rastan_spritesheet.png',
	'./images/trump_attack.png', 
	'./images/city_intro.png',
	'./images/rastan_intro.png',
	'./images/megyn_title.png',
	'./images/0-9.png',
] ;
	  
document.audio = [
	'./audio/bullet2.wav',
	'./audio/hit3.wav',  
	'./audio/jump1.wav', 
	'./audio/laser1.wav',  
	'./audio/laugh1.wav',  
	// './audio/bullet2.wav',  
	// './audio/bump1.wav',  
	// './audio/bump2.wav',  
	// './audio/explode1.wav',  
	// './audio/laser2.wav',  
	// './audio/missile1.wav',  
	// './audio/powerup1.wav',  
	// './audio/powerup2.wav', 
	// './audio/powerup3.wav', 
	// './audio/powerup4.wav',
] ;

imageLoader.preload ( document.image, function preload_audio() {
	audioLoader.preload( document.audio, trump_game ) ;
}) ;

		// function() {
		// $Z.maxIter = 10 ;
		// console.log('after preload', '$Z.iter', $Z.iter, '$Z.maxIter', $Z.maxIter) ;
		// $Z.run() ;

		// // setInterval(function() {
		// // 	console.log('setInterval $Z.iter', $Z.iter, '$Z.maxIter', $Z.maxIter ) ;
		// // }, 1000)
	
	// } ) ;
// }) ;
