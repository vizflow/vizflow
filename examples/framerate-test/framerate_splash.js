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

  var splashFadeDuration = 300 ;
  var splashFadeVal = [ 1, 1, 1, 0 ] ;

  var splashFade = $Z.helper.effect.image.fade_sequence({ 

          duration: splashFadeDuration,
          value: splashFadeVal,

  })[0] ;

  $Z.helper.transition.get_child(splashFade, 'last').end = function() { // this function will run after the splash item fades out

    splash.remove() ;
    var topBarImage = $Z.helper.draw.rect({

      color: "#444",
      x: 0,
      y: 0,
      width: document.viz.width,
      height: document.layoutConfig.topMargin,
    
    }) ; // Canvas object for background rectangle



    var topBarConfig = { // ready to start the main visualization - create the framerate counter item

      image: topBarImage,
      opacity: 0,
      x: 0,
      y: 0,

    } ;


    document.topBar = document.viz.setup_item(topBarConfig) ;

    document.topBar.fade({
      opacity: 1,
      duration:500,
    })

    var fpsPadding = 250 ;

    var fpsConfig = { // ready to start the main visualization - create the framerate counter item

      image: undefined,
      opacity: 1,
      x: document.viz.width - fpsPadding,
      y: document.layoutConfig.margin,
      addSwitch: false,

    } ;

    document.fpsItem = document.viz.setup_item( fpsConfig ) ;

        var numConfig = { // ready to start the main visualization - create the framerate counter item

      image: undefined,
      opacity: 1,
      x: document.layoutConfig.leftMargin,
      y: document.layoutConfig.margin,
      addSwitch: false,

    } ;

    document.numItem = document.viz.setup_item( numConfig ) ;

    document.circleloop() ; // call the next phase of the visualization

  } ;

  splash.add_transition( splashFade ) ;

} ;