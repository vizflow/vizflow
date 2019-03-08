document.clearCirc = function clearCirc() {
  document.circleList.forEach(
    function (circle) {
      circle.remove() ;
    }
  ) ;
}

document.circleList = [] ;

document.circles = function fps(nIndex) {

  //var nIndex = this.i ;
  var testConfig = document.testConfig ;

  function circle_update(circle) { // overries the Vizflow default update() function

    circle = this ;
    circle.x += circle.dx ;
    circle.y += circle.dy ;

    if (circle.x <= circle.config.radius || circle.x >= circle.viz.width - circle.config.radius) {
      circle.dx *= -1 ;
    }

    if (circle.y <= circle.config.radius || circle.y >= circle.viz.height - circle.config.radius) {
      circle.dy *= -1 ;
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

  var circleList = Array(testConfig.nCircle[nIndex]) ;
  document.circleList = circleList ;

  for (var kcirc = 0 ; kcirc < testConfig.nCircle[nIndex] ; kcirc++) {

    var circleSize = (Math.random() * (testConfig.maxSize - testConfig.minSize)) + testConfig.minSize ;

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

  var fpsConfig = {

    image: undefined,
    opacity: 1,
    x: 10,
    y: 10,

  } ;

  var fps = document.viz.setup_item(fpsConfig) ;

  var text = 'Ncircle: ' + testConfig.nCircle[nIndex] + ' fps: ####' ;

  fpsTextConfig = {
    binarSwitch: false,
    px: 50,
    font: 'Sans-Serif',
    text: text,
    color: 'white',
  }

  fps.image = $Z.helper.image.word(fpsTextConfig) ;

  var iterPrev = $Z.iter ;
  var tPrev = performance.now() ;
  document.results.min[nIndex] = Infinity ;
  document.results.max[nIndex] = -Infinity ;
  fps.update = function () {

    var dIter = $Z.iter - iterPrev ;

    if (dIter >= 60) {

      var tNext = performance.now() ;
      var dt = .001 * (tNext - tPrev) ;
      var fpsVal = dIter / dt ;
      document.results.min[nIndex] = document.results.min[nIndex] > fpsVal ? fpsVal : document.results.min[nIndex] ;
      document.results.max[nIndex] = document.results.max[nIndex] < fpsVal ? fpsVal : document.results.max[nIndex] ;
      fpsTextConfig.text = 'Ncircle: ' + testConfig.nCircle[nIndex] + ' fps: ' + Math.round(fpsVal) ;

      fps.image = $Z.helper.image.word(fpsTextConfig) ;
      iterPrev = $Z.iter ;
      tPrev = tNext ;

    }

  }
} ;

document.nextStep = function nextStep() {
  document.clearCirc() ;
  document.circles(this.i) ;
} ;