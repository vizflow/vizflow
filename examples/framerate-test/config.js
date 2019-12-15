(function framerateConfig() {

  document.svgNS = "http://www.w3.org/2000/svg" ;

  document.imageList = ['./image/frameratetest.png'] ; // configure static assets for the preloader (need at least one image for preloader to work)
  document.audioList = [] ; // optional static audio assets

  var fontHeight = 50 ;
  var margin     = 15 ;

  document.zip = function zip(a, b) {
    var c = a.map(function (e, i) {
        return [e, b[i]];
    });

    return c;
  } ;

  document.styleConfig = {

    font:       fontHeight,
    topMargin:  fontHeight + 2 * margin,
    leftMargin: margin,
    margin:     margin,
    bgColor:   '#FFF',
    fontColor: '#6D83FF',
    barColor:  '#575757',
    vizSize:    1200,

  } ;

  document.testConfig = {

    nCircle:  [ 50, 100, 250 ], // 2500, 5000, 10000, 25000],
    duration: 3,
    skip:     1000,
    delay:    500,
    maxSpeed: 30,
    minSpeed: 5,
    maxSize:  50,
    minSize:  5,
  
  } ;

  document.results = {

    list: [], // an array of arrays of frames-per-second values, one for each test 

  } ;

  document.svgConfig = {

    lineLength: 10,
    lineColor: "blue",
    circleRadius: 5,
    circleBorderColor: "red",
    circleFill: "blue",
    strokeWidth: "2px",
    height: 1000,
    width: 1000,
    numTicks: 10,
    marginPercent: .05,
    tickLength: 5,
    fontSize: 20,
    textOffsetX: 10,
    textOffsetY: 20,
    precision: 6,
    parentNode: document.body,

  };  

})(); // immediately invoked function declaration