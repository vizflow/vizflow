window.addEventListener( "load", function() { window.scrollTo(0, 0) ; } ) ;

document.addEventListener("touchmove", function(e) { e.preventDefault() }) ;

document.body.style.overflowY = 'hidden' ;
document.body.style.margin    = 0 ;

document.image = [ 
	
	'./image/select_spritesheet.png',
	'./image/background.png',
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
	'./image/title_sprite.png',
	'./image/vizflow.png',

] ;
	  
document.audio = [
	'./audio/thud.wav',
	'./audio/hit2.wav',
	'./audio/jump1.wav',
	'./audio/laugh1.wav',
	'./audio/bump2.wav',
	'./audio/powerup0.wav',
	'./audio/powerup3.wav',
	'./audio/paQueSeLoGozen.wav',
	'./audio/85riddim.wav',
	'./audio/drwho.wav',
	'./audio/pump.wav',
	'./audio/ineh-choh.wav',
	'./audio/fight.wav',
	'./audio/inspector.wav',
	'./audio/laser2.wav',  
	'./audio/ah.wav',  
	'./audio/grunt.wav',  
	'./audio/grunt2.wav',  
	'./audio/missile1.wav',  
	'./audio/bullet.wav',  
	'./audio/explode1.wav',  
	'./audio/shoryuken.wav', 
	'./audio/wolf.wav',
	'./audio/powerup.wav',

] ;

	// './audio/trump/best_ever.wav',  
	// './audio/trump/build_a_wall.wav',  
	// './audio/trump/gonna_win.wav',  
	// './audio/trump/its_amazing.wav',  
	// './audio/trump/love_me.wav',  
	// './audio/trump/mexicans.wav',  
	// './audio/trump/muslims.wav',  
	// './audio/trump/schlonged.wav',  
	// './audio/trump/take_his_coat.wav',  
	// './audio/trump/the_blacks.wav',
	// './audio/trump/the_poll.wav',

document.skipIndex = 0 ;

imageLoader.preload ( document.image, function preload_audio() {
	// console.log('preload_audio 18') ;
	audioLoader.preload( 
		document.audio, 
		function main_run() {
			// window.clearInterval(id) ;
			// document.body.parentNode.style.backgroundColor = color ;
			var div = document.getElementById('loading') ;
			document.body.removeChild(div) ;
			load_game() ;
		} 
	) ;
}) ;