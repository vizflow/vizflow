window.addEventListener( "load", function() { window.scrollTo(0, 0) ; } ) ;

document.addEventListener("touchmove", function(e) { e.preventDefault() }) ;

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

	// './audio/.wav',

] ;

document.skipIndex = 0 ;
document.ratio     = 2 ; // upsample images to ensure crisp edges on hidpi devices 

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