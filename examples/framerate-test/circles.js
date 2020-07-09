document.circleList = [] ; // initialize

document.circles = function circles(nIndex) {

  //var nIndex = this.i ;
  var testConfig = document.testConfig ;

  function circle_update( circle ) { // overries the Vizflow default update() function

    if( circle === undefined ) { 
        circle = this ;
    }

    circle.x += circle.dx ;
    circle.y += circle.dy ;

    circle.reflect() ;

  }

  function rgb2hex( rgb ) {

    var c = Math.round(rgb).toString( 16 ) ;
    
    if ( c.length === 1 ) {
      c += c ; // make sure it is the right length
    }
    
    return c ;
  
  }

  function random_color() {

    return '#' 
      + rgb2hex(255 * Math.random())   // r
      + rgb2hex(255 * Math.random())   // g
      + rgb2hex(255 * Math.random()) ; // b

  }

  var text = ' ' ;

  var fpsTextConfig = {

    binarySwitch: false,
    px: document.styleConfig.font,
    font: 'C64 User',
    text: text,
    color: document.styleConfig.fontColor,

  } ;

  var wordImage = $Z.helper.image.word(fpsTextConfig) ;

  document.fpsItem.image = wordImage ;
  document.fpsItem.opacity = 1 ;

  var circleList      = Array( testConfig.nCircle[nIndex] ) ;
  document.circleList = circleList ;

  for ( var kcirc = 0 ; kcirc < testConfig.nCircle[nIndex] ; kcirc++ ) {

    var circleSize = ( Math.random() * (testConfig.maxSize - testConfig.minSize) ) + testConfig.minSize ;

    var circleImage = $Z.helper.draw.circle({

      radius: circleSize,
      fill: random_color(),

    }) ; // Canvas object

    var circleImage = $Z.helper.draw.circle({

      radius: circleSize,
      fill: random_color(),

    }) ; // Canvas object

    var circleConfig = {

      image: circleImage,
      opacity: 1 / 2,
      xOrigin: 0.5 * circleImage.width,
      yOrigin: 0.5 * circleImage.height,
      x: document.styleConfig.vizSize * 0.5,
      y: document.styleConfig.vizSize * 0.5,
      radius: circleSize,
      addSwitch: false,

    } ;

    circleList[kcirc] = document.viz.setup_item(circleConfig) ;

    var speed = testConfig.minSpeed + (testConfig.maxSpeed - testConfig.minSpeed) * Math.random() ;
    var angle = 2 * Math.PI * Math.random() ;

    circleList[kcirc].dx = speed * Math.cos(angle) ;
    circleList[kcirc].dy = speed * Math.sin(angle) ;

    circleList[kcirc].update  = circle_update ;
    circleList[kcirc].reflect = document.circle_reflect ;

  } ;

  /// framerate counter:
  
  var iterPrev = $Z.iter ;
  var tPrev    = performance.now() ;
  var fpsVal   = NaN ; // initialize
  
  document.results.list[ document.testIndex ] = [] ; // initialize

  document.results.list[nIndex] = [] ;

  document.fpsItem.update = function fps_update() {

    var dIter = $Z.iter - iterPrev ;
    var tNext = performance.now() ;
    var tWait = tNext - tPrev ;

    var tCut = document.testConfig.skip ;
    // var Niter = 60 ;

    if ( tWait >= tCut ) { // enough time has elapsed to estimate another fps value

      var dt    = .001 * ( tWait ) ;
      fpsVal    = dIter / dt ;

      document.results.list[ nIndex ].push(fpsVal) ;      
      
      fpsTextConfig.text = ( 0.1 * Math.round( fpsVal * 10 ) ).toFixed( 1 ) + ' fps' ;
      // console.log({fpsTextConfig}) ;
      document.fpsItem.image = $Z.helper.image.word( fpsTextConfig ) ;
      
      iterPrev  = $Z.iter ;
      tPrev     = tNext ;

    }

  } ;

  document.viz.call( function() { circleList.forEach( function( circ ) { circ.add() ; } ) ; }, document.testConfig.delay ) ; // let the browser settle after object creation

} ;