window.addEventListener( "load", function() { window.scrollTo(0, 0) ; } ) ;

document.addEventListener("touchmove", function(e) { e.preventDefault() }) ;

document.body.style.overflowY = 'hidden' ;
document.body.style.margin    = 0 ;

document.image = [ 
	
	'./image/vizflow.png',
	'./image/camp.png',
	'./image/knight.png',
	'./image/knight_spritesheet.png',
	'./image/monster.png',
	'./image/powerup.png',
	'./image/battlescreen.png',
	'./image/knight_battle_spritesheet.png',
] ;
	  
document.audio = [

	// './audio/.wav',

] ;

document.skipIndex = 0 ;

imageLoader.preload ( document.image, function preload_audio() {
  // console.log('main.js: preload_audio') ;
	audioLoader.preload( 
		document.audio, 
		function main_run() {
			// console.log('main.js: main_run') ;
			var div = document.getElementById('loading') ;
			div.style.visibility = 'hidden' ;
			load_game() ;
		} 
	) ;
}) ;