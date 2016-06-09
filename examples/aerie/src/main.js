window.addEventListener( "load", function() { window.scrollTo(0, 0) ; } ) ;

document.addEventListener("touchmove", function(e) { e.preventDefault() }) ;

document.body.style.overflowY = 'hidden' ;
document.body.style.margin    = 0 ;

document.image = [ 
	
	'./image/vizflow.png',
	'./image/camp.png',
	'./image/knight.png',
	'./image/knight_spritesheet.png',
	'./image/monster_spritesheet.png',
	'./image/powerup.png',
	'./image/battlescreen.png',
	'./image/knight_battle_spritesheet.png',
	'./image/leftButton.png',
	'./image/rightButton.png',
	'./image/attackButton.png',
	'./image/blockButton.png',
	'./image/healButton.png',	
	'./image/left_button_spritesheet.png',
	'./image/right_button_spritesheet.png',
	'./image/attack_button_spritesheet.png',
	'./image/block_button_spritesheet.png',
	'./image/thrust_button_spritesheet.png',
	'./image/finisher_button_spritesheet.png',
	'./image/game_over.png',



] ;
	  
document.audio = [

'./audio/bgm1.wav',
'./audio/slash.wav',
'./audio/shield.wav',
'./audio/thrust.wav',
'./audio/growl1.wav',
'./audio/growl2.wav',
'./audio/finisher.wav',

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