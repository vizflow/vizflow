// console.log('main.js start') ;

window.addEventListener( "load", function() { window.scrollTo(0, 0) ; } ) ;

document.addEventListener("touchmove", function(e) { e.preventDefault() }) ;

document.body.style.overflowY = 'hidden' ;
document.body.style.margin    = 0 ;
// console.log('main start') ;

document.image = [ 
	
	'./image/knight_battle_spritesheet.png',
	'./image/vizflow.png',
  './image/start.png',
	'./image/monster_spritesheet.png',
	'./image/aerie_title.png',
	
	'./image/title_blade.png',
	'./image/you_win.png',
	'./image/hero.png',
	'./image/monster.png',

	'./image/left_button_spritesheet.png',
	'./image/right_button_spritesheet.png',
	'./image/slash_button_spritesheet.png',
  './image/block_button_spritesheet.png',
	'./image/thrust_button_spritesheet.png',
	'./image/finisher_button_spritesheet.png',
	'./image/game_over.png',
	'./image/battlescreen_background.png',
	'./image/battlescreen_clouds.png',

	// './image/knight.png',
	// './image/knight_spritesheet.png',
	// './image/powerup.png',
	// './image/battlescreen.png',
	//'./image/leftButton.png',
	//'./image/rightButton.png',
	// './image/attackButton.png',
	//'./image/healButton.png',	
	//'./image/battlescreen_moon.png',
] ;
	  
document.audio = [

'./audio/bgm1.wav',
'./audio/slash.wav',
'./audio/shield.wav',
'./audio/thrust.wav',
'./audio/growl1.wav',
'./audio/finisher.wav',

//'./audio/growl2.wav',
//'./audio/blocked.wav',
//'./audio/.wav',

] ;

document.skipIndex = 0 ;

// console.log('before loader') ;

$Z.helper.loader.all ( document.image, document.audio, function main_run() {
	// console.log('main.js: main_run', Date.now()) ;
	var div = document.getElementById('loading') ;
	div.style.visibility = 'hidden' ;
	load_game() ;
} ) ; 