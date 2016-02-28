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
	// './audio/bullet2.wav',  
	// './audio/powerup1.wav',  
	// './audio/powerup2.wav', 
	// './audio/powerup4.wav',
] ;

// console.log('main 15') ;
// document.ratio     = ( Math.ceil(window.devicePixelRatio) || 1 ) ;
// var minRatio       = 1 ; 

// if(document.ratio === 1) {
// 	document.ratio = minRatio ;
// }

// var vizConfig = {
//   run: function() {
//   	var item = itemHelper.setup({
//   		viz: this,
//   		x: 20,
//   		y: 20,
//   		render: function draw_bar() {
// 	      drawHelper.rect ({
// 	      	x: 100,
// 	      	y: 100,
// 	      	width: 10,
// 	      	height: 10,
// 	      	color: '#FF0',
// 	      }, viz.screenContext) ;
// 	    },
//   	}) ;
//   	this.item = [item] ;
//   },
// } ;

// viz = vizHelper.setup(vizConfig) ; // frameDuration computed

// viz.load() ;
// viz.run() ;

var color = document.body.parentNode.style.backgroundColor ;
var count = 50 ;
var delay = 20 ;
var id = setInterval(function() {
	document.body.parentNode.style.backgroundColor = 'rgb(' + count % 255 + ', ' + count % 255 + ', ' + count % 255 + ')' ;
	count++ ;
}, delay) ;

document.skipIndex = 0 ;

imageLoader.preload ( document.image, function preload_audio() {
	// console.log('preload_audio 18') ;
	audioLoader.preload( 
		document.audio, 
		function main_run() {
			window.clearInterval(id) ;
			document.body.parentNode.style.backgroundColor = color ;
			load_game() ;
		} 
	) ;
}) ;