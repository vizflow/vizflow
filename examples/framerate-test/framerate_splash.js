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

  $Z.helper.transition.get_child(splashFade, 'last').end = function() { // this function will run after the splash item fades out

    splash.remove() ;
    document.viz.opacity = 0 ;  
    run_circleloop() ;

  } ;

  splash.add_transition( splashFade ) ;

  function run_circleloop() {

    var bgImage = $Z.helper.draw.rect({

      color: document.testConfig.bgColor,
      x: 0,
      y: 0,
      width: document.viz.width,
      height: document.viz.height,
      
    }) ; // Canvas object for background rectangle

    // $Z.helper.image.view( bgImage ) ;

    document.viz.image = bgImage ;

    var topBarImage = $Z.helper.draw.rect({

      color: "#444",
      x: 0,
      y: 0,
      width: document.viz.width,
      height: document.layoutConfig.topMargin,

    }) ; // Canvas object for background rectangle

    var topBarConfig = { // ready to start the main visualization - create the framerate counter item

      image: topBarImage,
      opacity: 1,
      x: 0,
      y: 0,

    } ;

    var fpsPadding = 310 ;

    var fpsConfig = { // ready to start the main visualization - create the framerate counter item

      image: undefined,
      opacity: 1,
      x: document.viz.width - fpsPadding,
      y: document.layoutConfig.margin,
      addSwitch: false,

    } ;

    var numPadY = 3 ;

    var numConfig = { // ready to start the main visualization - create the framerate counter item

      image: undefined,
      opacity: 1,
      x: document.layoutConfig.leftMargin,
      y: document.layoutConfig.margin + numPadY,
      addSwitch: false,

    } ;

    document.topBar  = document.viz.setup_item( topBarConfig ) ;
    document.fpsItem = document.viz.setup_item( fpsConfig ) ;
    document.numItem = document.viz.setup_item( numConfig ) ;

    document.circleloop() ; // call the next phase of the visualization

  }

} ;