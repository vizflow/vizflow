document.circleList = [] ; // initialize

document.circles = function circles(nIndex) {

  //var nIndex = this.i ;
  var testConfig = document.testConfig ;

  function circle_update(circle) { // overries the Vizflow default update() function

    if( circle === undefined ) { 
        circle = this ;
    }

    circle.x += circle.dx ;
    circle.y += circle.dy ;

    var xtolR = circle.viz.width - circle.config.radius ;
    var xtolL = circle.config.radius ;

    var xOvershoot = circle.x <= xtolL || circle.x >= xtolR ;
    // var xTolerance = circle.x - circle.config.radius < tol || circle.x + circle.config.radius > circle.viz.width - tol ;

    if ( xOvershoot ) {

      circle.dx *= -1 ;

      if( circle.x < xtolL ) {
        circle.x = xtolL ; 
      } else {
        circle.x = xtolR ;
      }

    }

    var ytolT = circle.config.radius + document.layoutConfig.topMargin  ;
    var ytolB = circle.viz.height - circle.config.radius ;

    var yOvershoot = circle.y < ytolT || circle.y > ytolB ;
    // var yTolerance = circle.y - circle.config.radius < document.layoutConfig.topMargin + tol || circle.y + circle.config.radius > circle.viz.height - tol ;

    if ( yOvershoot ) {
      
      circle.dy *= -1 ;

      if( circle.y < ytolT ) {
        circle.y = ytolT ; 
      } else {
        circle.y = ytolB ;
      }

    }

  } ;

  function rgb2hex(rgb) {
    var c = Math.round(rgb).toString(16) ;
    if (c.length === 1) c += c ; // make sure it is the right length
    return c ;
  }

  function random_color() {
    return '#' +
      rgb2hex(255 * Math.random()) // r
      +
      rgb2hex(255 * Math.random()) // g
      +
      rgb2hex(255 * Math.random()) ; // b
  }

  var text = ' ' ;

  var fpsTextConfig = {

    binarySwitch: false,
    px: document.layoutConfig.font,
    font: 'C64 User',
    text: text,
    color: '#6D83FF',

  } ;

  var wordImage = $Z.helper.image.word(fpsTextConfig) ;

  document.fpsItem.image = wordImage ;
  document.fpsItem.add() ;  

  var circleList      = Array(testConfig.nCircle[nIndex]) ;
  document.circleList = circleList ;

  for (var kcirc = 0 ; kcirc < testConfig.nCircle[nIndex] ; kcirc++) {

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
      x: testConfig.vizSize * 0.5,
      y: testConfig.vizSize * 0.5,
      radius: circleSize,

    } ;

    circleList[kcirc] = document.viz.setup_item(circleConfig) ;

    var speed = testConfig.minSpeed + (testConfig.maxSpeed - testConfig.minSpeed) * Math.random() ;
    var angle = 2 * Math.PI * Math.random() ;

    circleList[kcirc].dx = speed * Math.cos(angle) ;
    circleList[kcirc].dy = speed * Math.sin(angle) ;

    circleList[kcirc].update = circle_update ;

  }

  /// framerate counter:
  
  var iterPrev = $Z.iter ;
  var tPrev    = performance.now() ;

  document.results.min[nIndex] =  Infinity ; // initialize
  document.results.max[nIndex] = -Infinity ; // initialize

  var fpsFade = 250 ;
  document.fpsItem.opacity = 1 ;

  document.fpsItem.update = function () {

    var dIter = $Z.iter - iterPrev ;
    var Niter = 60 ;

    if (dIter >= Niter) {

      var tNext  = performance.now() ;
      var dt     = .001 * (tNext - tPrev) ;
      var fpsVal = dIter / dt ;
      
      document.results.min[nIndex] = document.results.min[nIndex] > fpsVal ? fpsVal : document.results.min[nIndex] ;
      document.results.max[nIndex] = document.results.max[nIndex] < fpsVal ? fpsVal : document.results.max[nIndex] ;
      
      fpsTextConfig.text = (0.1 * Math.round(fpsVal * 10)).toFixed(1) + ' fps' ;
      // console.log({fpsTextConfig}) ;
      document.fpsItem.image = $Z.helper.image.word( fpsTextConfig ) ;
      

      iterPrev  = $Z.iter ;
      tPrev     = tNext ;

    }

  } ;

} ;