document.framerate_splash = function framerate_splash() {

  var splashImage = $Z.helper.image.to_canvas( document.imageList[0] ) ;
  var xMid = document.viz.width * 0.5 ;
  var yMid = document.viz.height * 0.5 ;
  var splashPadY = 0 ;

  var splash = document.viz.setup_item( {

     image: splashImage,
     x: xMid,
     y: splashPadY,
     xOrigin: splashImage.width * 0.5,
     yOrigin: 0,
     opacity: 0,

  }) ;

  var splashFadeDuration = 300 ;
  var splashFadeVal = [ 1, 1, 1, 0 ] ;

  var splashFade = $Z.helper.effect.image.fade_sequence({ 
    
    duration: splashFadeDuration,
    value: splashFadeVal,

  })[0] ;

  $Z.helper.transition.get_child(splashFade, 'last').end = function splash_fade() { // this function will run after the splash item fades out

    splash.remove() ; // remove the splash item 
    document.viz.opacity = 0 ;  
    document.run_circleloop() ;

  } ;

  splash.add_transition( splashFade ) ;

} ;