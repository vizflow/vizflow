document.framerate_splash = function framerate_splash() {

  var splashImage = $Z.helper.image.to_canvas( document.imageList[0] ) ;
  var xMid = document.viz.width * 0.5 ;
  var yMid = document.viz.height * 0.5 ;

  var splash = document.viz.setup_item( {

     image: splashImage,
     x: xMid,
     y: yMid,
     xOrigin: splashImage.width * 0.5,
     yOrigin: splashImage.height * 0.5,
     opacity: 0,

  }) ;

  var splashFadeDuration = 1000 ;
  var splashFadeVal = [ 1, 1, 0 ] ;

  var splashFade = $Z.helper.effect.image.fade_sequence({ 

          duration: splashFadeDuration,
          value: splashFadeVal,

  })[0] ;

  splashFade.child.child.end = function() {
    splash.remove() ;
    document.circleloop() ; // call the next phase of the visualization
  } ;

  splash.add_transition( splashFade ) ;

} ;