function ball_viz() {
  var ballCanvas = $Z.helper.image.to_canvas( document.imageList[0] ) ;
  
  var vizConfig = {
    width: 1200,
    height: 1200,
    collision_detect: function() {},
  } ;

  var viz = $Z.helper.viz.setup(vizConfig) ; // frameDuration computed

  var ballConfig = { 

    x: viz.width  * 0.5,
    y: viz.height * 0.5,
    xOrigin: ballCanvas.width * 0.5,
    yOrigin: ballCanvas.height * 0.5,
    image: ballCanvas,
    opacity: 1,
    uiSwitch: true,
    addSwitch: true,
    viz: viz,

  } ;

  var ball = $Z.helper.item.setup(ballConfig) ;
  
  var speed = 2 * Math.sqrt(10) ;
  ball.dx  = (Math.random() * speed) - 1 ;
  ball.dy  = (Math.random() * speed) - 1 ;

  ball.update = function ball_update( ball ) {
    
    ball = this ;
    ball.x += ball.dx ;
    ball.y += ball.dy ;

    if ( ball.x <= 0 || ball.x >= ball.viz.width ) {
      ball.dx *= -1 ;
    }

    if ( ball.y <= 0 || ball.y >= ball.viz.height ) {
      ball.dy *= -1 ;
    }

  } ;

  viz.run() ;

} 