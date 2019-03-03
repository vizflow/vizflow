
document.framerate_test = function framerate_page() {
  document.ratio = 1 ;

//  var scrsz = Math.max(screen.height, window.innerHeight) ;
//  scrsz = Math.max(scrsz, Math.max(screen.width, window.innerWidth)) ;

  var vizSize = 1200 ;

  var viz = $Z.helper.viz.setup({
    width:  vizSize,
    height: vizSize,
    fadeDuration: 400,
    collision_detect: function() {}, // turn off collision detection for this game, improving performance
  }) ;

  document.viz = viz ; // for convenience

  viz.run() ; // starts the render loop - can be done later too

  var bgColor     = '#111' ;

  var bgImage = $Z.helper.draw.rect({
    color: bgColor,
    x: 0,
    y: 0,
    width: vizSize,
    height: vizSize,
  }) ; // Canvas object for background rectangle

  var bgConfig = { // Config object for the setup_item() factory function

    image: bgImage,
    opacity: 1,
    x: 0,
    y: 0,

  } ;


  function circle_update( circle ) { // overrides the Vizflow default update() function

    circle = this ;
    circle.x += circle.dx ;
    circle.y += circle.dy ;

    if ( circle.x <= circle.config.radius || circle.x >= circle.viz.width - circle.config.radius ) {
      circle.dx *= -1 ;
    }

    if ( circle.y <= circle.config.radius || circle.y >= circle.viz.height - circle.config.radius ) {
      circle.dy *= -1 ;
    }

  } ;

  var bg     = viz.setup_item(bgConfig) ;

  function rgb2hex( rgb ) {
    var c = Math.round( rgb ).toString( 16 ) ;
    if ( c.length === 1 ) c += c ; // make sure it is the right length
    return c ;
  }

  function random_color() {
    return '#'
      + rgb2hex( 255 * Math.random() )   // r
      + rgb2hex( 255 * Math.random() )   // g
      + rgb2hex( 255 * Math.random() ) ; // b
  }

  var maxSpeed   = 10 ;
  var minSpeed   = 5 ;
  var Ncircle    = 500 ;
  var circleList = Array( Ncircle ) ;
  var maxSize    = 50 ;
  var minSize    = 5 ;

  for( var kcirc = 0 ; kcirc < Ncircle ; kcirc++ ) {

    var circleSize = ( Math.random() * ( maxSize - minSize ) ) + minSize ;

    var circleImage = $Z.helper.draw.circle({
      radius: circleSize,
      fill: random_color(),
    }) ; // Canvas object

    var circleConfig = {

      image: circleImage,
      opacity: 1 / 2,
      xOrigin: 0.5 * circleImage.width,
      yOrigin: 0.5 * circleImage.height,
      x: vizSize * 0.5,
      y: vizSize * 0.5,
      radius: circleSize,

    } ;

    circleList[ kcirc ] = viz.setup_item( circleConfig ) ;

    var speed = minSpeed + ( maxSpeed - minSpeed ) * Math.random()  ;
    var angle = 2 * Math.PI * Math.random() ;

    circleList[kcirc].dx  = speed * Math.cos( angle ) ;
    circleList[kcirc].dy  = speed * Math.sin( angle ) ;

    circleList[kcirc].update = circle_update ;

  }

  // viz.setup_ui() ;

} // end framerate_page

//
// viz.example[kex] = viz.setup_item({
//
//   image: imageK,
//   x: xList[kex],
//   y: yList[kex],
//   xScale: scale,
//   yScale: scale,
//   xOrigin:  imageK.width  * 0.5,
//   yOrigin: imageK.height * 0.5,
//   uiSwitch: true,
//   fixed: false,
//   url: urlList[kex],
//
//   addSwitch: true,
//   opacity: 0,
//
// }) ;
