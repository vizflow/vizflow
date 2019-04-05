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

  var viz = $Z.helper.viz.setup( vizConfig ) ; // main visualization object

  document.viz = viz ; // for convenience
  
  viz.run() ; // starts the render loop - can be done later too

  var dummyWordConfig = {

    binarySwitch: false,
    px: document.layoutConfig.font,
    font: 'C64 User',
    text: 'dummy_text',
    color: '#6D83FF',

  } ;

  $Z.helper.image.word(dummyWordConfig) ; // for some reason the Canvas font setting does not take effect until after the first call (bug?)

  document.framerate_splash() ; // call the first phase of the visualization

} ; // end framerate_page