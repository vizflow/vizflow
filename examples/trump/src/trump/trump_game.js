function trump_game () {
  document.skipIndex = 0 ;
  document.ratio     = ( 1 + Math.ceil(window.devicePixelRatio) || 1 ) ;

  city_level() ;
  // fantasy_level() ;
  // space_level() ;	
}