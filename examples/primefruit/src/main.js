window.addEventListener( "load", function() { window.scrollTo(0, 0) ; } ) ;

document.addEventListener("touchmove", function(e) { e.preventDefault() ; }) ;

document.body.style.overflowY = 'hidden' ;
document.body.style.margin    = 0 ;

document.textUrl = ['./image/text8.png', './image/text2.png'] ;

document.image = [ 
	
	'./image/vizflow.png',
	'./image/fruit.gif',
	'./image/fruit-overlay.png',
	'./image/jarLidGray.png',
	'./image/jarLidPurp.png',
	'./image/jarLidBlue.png',
	'./image/jarOpen.png',
	'./image/pf-title.png',

].concat(document.textUrl) ;
	  
document.audio = [

	'./audio/starman.wav',
	'./audio/lizardstick.wav',
	'./audio/win.wav',
	'./audio/a.wav',
	'./audio/b.wav',
	'./audio/c.wav',
	'./audio/d.wav',
	'./audio/e.wav',
	'./audio/f.wav',
	'./audio/g.wav',
	'./audio/h.wav',
	'./audio/i.wav',
	'./audio/pf.wav',
	'./audio/10.wav',
	'./audio/12.wav',
	'./audio/14.wav',
	'./audio/15.wav',
	'./audio/16.wav',
	'./audio/18.wav',
	'./audio/20.wav',
	'./audio/21.wav',
	'./audio/22.wav',
	'./audio/24.wav',
	'./audio/25.wav',
	'./audio/4.wav',
	'./audio/6.wav',
	'./audio/8.wav',
	'./audio/9.wav',

] ;

document.skipIndex = 0 ;
document.ratio     = 2 ; // upsample images to ensure crisp edges on hidpi devices 

$Z.helper.loader.all ( document.image, document.audio, function main_run() {
	// console.log('main.js: main_run') ;
	var div = document.getElementById('loading') ;
	div.style.visibility = 'hidden' ;
	load_game() ;
} ) ; 