function run_game() {
  
  // console.log('run_game: start') ;

  var Nitem = 7 ; 

  var item = new Array(Nitem) ;

  var radius = 100 ;
  var size   = 40 ;
  var xShift = 0.5 * 480 ;
  var yShift = 0.5 * 640 ;

  for ( var kItem = 0 ; kItem < Nitem ; kItem++ ) {

    var angle = 2 * (kItem / Nitem) * Math.PI ; // evenly spaced around the circle 
    var x = radius * Math.cos(angle) + xShift ;
    var y = radius * Math.sin(angle) + yShift ;

    itemConfig = {

      x:      x,
      y:      y,
      xAngle: 0.5 * size,
      yAngle: 0.5 * size,
      angle: angle,
      render: drawHelper.rect,
      color:  '#6666FF',
      width:  size,
      height: size,

    } ;

    item[kItem] = itemHelper.setup(itemConfig) ;

  }

  var vizConfig = {
    item: item,
  } ;

  var viz = vizHelper.setup(vizConfig) ; // first create generic vizflow configuration object, then add application-specific details

  viz.run() ;

  // console.log('viz', viz) ;

  // load_response: vizConfig.load_response,
  // load_ui: vizConfig.load_ui,
  // load_audio: vizConfig.load_audio,
  // load_char: vizConfig.load_char,
  // load: vizHelper.load,

}