document.framerate_test = function framerate_test() {

  document.ratio = 1 ;

  //  var scrsz = Math.max(screen.height, window.innerHeight) ;
  //  scrsz = Math.max(scrsz, Math.max(screen.width, window.innerWidth)) ;

  var vizSize = 1200 ;

  var vizConfig = {

    width: vizSize,
    height: vizSize,
    fadeDuration: 400,
    collision_detect: function () {}, // turn off collision detection for this game, improving performance

  } ;

  var viz = $Z.helper.viz.setup( vizConfig ) ;

  document.viz = viz ; // for convenience

  var bgImage = $Z.helper.draw.rect({
    color: document.testConfig.bgColor,
    x: 0,
    y: 0,
    width: vizSize,
    height: vizSize,
  }) ; // Canvas object for background rectangle

  // $Z.helper.image.view( bgImage ) ;

  viz.image = bgImage ;
  
  viz.run() ; // starts the render loop - can be done later too

  document.framerate_splash() ; // call the first phase of the visualization

} ; // end framerate_page