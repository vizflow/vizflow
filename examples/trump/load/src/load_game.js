function load_game () {
  
  document.ratio     = ( Math.ceil(window.devicePixelRatio) || 1 ) ;
  var minRatio       = 3 ; 

  if(document.ratio === 1) {
  	document.ratio = minRatio ;
  }
	// console.log('load_game 9') ;
  player_select() ;

}