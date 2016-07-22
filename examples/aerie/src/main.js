window.addEventListener( "load", function() { window.scrollTo(0, 0) ; } ) ;

document.addEventListener("touchmove", function(e) { e.preventDefault() }) ;

document.body.style.overflowY = 'hidden' ;
document.body.style.margin    = 0 ;

document.image = [ 
	
	'./image/vizflow.png',
  './image/start.png',
	// './image/knight.png',
	// './image/knight_spritesheet.png',
	'./image/monster_spritesheet.png',
	// './image/powerup.png',
	'./image/battlescreen.png',
	'./image/knight_battle_spritesheet.png',
	'./image/leftButton.png',
	'./image/rightButton.png',
	'./image/attackButton.png',
	'./image/aerie_title.png',
	'./image/aerie_start_title.png',
	'./image/title_blade.png',
	'./image/you_win.png',

	'./image/healButton.png',	
	'./image/left_button_spritesheet.png',
	'./image/right_button_spritesheet.png',
	'./image/slash_button_spritesheet.png',
  './image/block_button_spritesheet.png',
	'./image/thrust_button_spritesheet.png',
	'./image/finisher_button_spritesheet.png',
	'./image/game_over.png',
	'./image/battlescreen_background.png',
	'./image/battlescreen_moon.png',
	'./image/battlescreen_clouds.png',



] ;
	  
document.audio = [

'./audio/bgm1.wav',
'./audio/slash.wav',
'./audio/shield.wav',
'./audio/thrust.wav',
'./audio/growl1.wav',
'./audio/growl2.wav',
'./audio/finisher.wav',
'./audio/blocked.wav',

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