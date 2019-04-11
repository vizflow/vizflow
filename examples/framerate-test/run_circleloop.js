document.run_circleloop = function run_circleloop() {

  var bgImage = $Z.helper.draw.rect({

    color: document.styleConfig.bgColor,
    x: 0,
    y: 0,
    width: document.viz.width,
    height: document.viz.height,
    
  }) ; // Canvas object for background rectangle

  // $Z.helper.image.view( bgImage ) ;

  document.viz.image = bgImage ;

  var topBarImage = $Z.helper.draw.rect({

    color: document.styleConfig.barColor,
    x: 0,
    y: 0,
    width: document.viz.width,
    height: document.styleConfig.topMargin,

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
    opacity: 0,
    x: document.viz.width - fpsPadding,
    y: document.styleConfig.margin,

  } ;

  var numPadY = 3 ;

  var numConfig = { // ready to start the main visualization - create the framerate counter item

    image: undefined,
    opacity: 0,
    x: document.styleConfig.leftMargin,
    y: document.styleConfig.margin + numPadY,

  } ;

  document.topBar  = document.viz.setup_item( topBarConfig ) ;
  document.fpsItem = document.viz.setup_item( fpsConfig ) ;
  document.numItem = document.viz.setup_item( numConfig ) ;

  document.testIndex = -1 ; // initialize test counter
  document.run_test() ; // run the framerate demo


} ;