function trump_game () {
  document.skipIndex = 0 ;
  document.ratio     = ( Math.ceil(window.devicePixelRatio) || 1 ) ;
  var minRatio = 2 ; 
  if(document.ratio === 1) {
  	document.ratio = minRatio ;
  }

  city_level() ;
  //fantasy_level() ;
  // space_level() ;	
}