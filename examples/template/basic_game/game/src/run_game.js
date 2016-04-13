function run_game() {
  
  // console.log('run_game: start') ;

  var Nitem = 7 ; 
  var item  = new Array(Nitem) ;

  var radius   = 100 ;
  var size     = 40 ;
  var xShift   = 0.5 * 480 ;
  var yShift   = 0.5 * 640 ;
  var blueish  = '#6666FF' ;
  var greenish = '#66FF66' ;

  var blueRect = { 

    color: blueish,
    height: size,
    width: size,
    angle: 0,
    x: 0,
    y: 0,

  } ;

  var greenRect = Object.assign( Object.copy(blueRect), { color: greenish } ) ;

  var blueRectImage  = imageHelper.create(size, size) ;
  var greenRectImage = imageHelper.create(size, size) ;
  var rectRatio      = 1 ;

  drawHelper.rect(blueRect,  blueRectImage.context(),  rectRatio) ; // draw the non-upsampled blue square to a canvas
  drawHelper.rect(greenRect, greenRectImage.context(), rectRatio) ; // draw the non-upsampled green square to a canvas

  blueRectImage  = imageHelper.adjust_ratio( blueRectImage  ) ;
  greenRectImage = imageHelper.adjust_ratio( greenRectImage ) ;

  // console.log('run game: ', 'blueRectImage', blueRectImage) ;

  for ( var kItem = 0 ; kItem < Nitem ; kItem++ ) {

    var angle = 2 * (kItem / Nitem) * Math.PI ; // evenly spaced around the circle 
    var x     = radius * Math.cos(angle) + xShift ;
    var y     = radius * Math.sin(angle) + yShift ;

    itemConfig = {

      x:      x,
      y:      y,
      angle:  angle,
      xAngle: 0.5 * size,
      yAngle: 0.5 * size,
      render: drawHelper.image,
      image:  blueRectImage,

      uiSwitch: true,

      callback: function item_callback() {

        var scoreIncrease = 100 ;

        if ( this.image === greenRectImage ) {
          this.viz.score += scoreIncrease ;
          var Nflash = 3 ;
          var flashDuration = 100 ;   
          this.flash(Nflash, flashDuration) ;
        }
        // console.log('item callback: ', 'this', this, 'this.viz.score', this.viz.score) ;

      },

    } ;

    item[kItem] = itemHelper.setup(itemConfig) ;

  }

  var vizConfig = {
    item: item,
  } ;

  var viz = vizHelper.setup(vizConfig) ; // first create generic vizflow configuration object, then add application-specific details

  viz.score = 0 ; // initialize

  var greenFlash = {
    
    prep: function green_flash() {

      var thresh = 0.25 + 0.75 * ( 1 - Math.exp( -viz.score * 0.001 ) ) ; // gradually approach max speed as score increases towards infinity
      var rand   = Math.random() ;

      if ( rand <= thresh ) { // choose an item to become green

        var kRand = Math.floor( Nitem * Math.random() ) ;

        if ( viz.kGreen !== undefined ) { 

          item[viz.kGreen].image = blueRectImage ;

        }

        item[kRand].image = greenRectImage ;

        viz.kGreen = kRand ;

      }

    },
  
  } ;

  var uiCanvas = imageHelper.create(viz.width, viz.height) ;

  var uiConfig = {

    canvas:   uiCanvas,
    context:  uiCanvas.context(),

  } ;

  viz.setup_ui(uiConfig) ;

  viz.run() ;

  $Z.prep([viz, greenFlash]) ; // add our custom prep function to vizflow in addition to the default one

  // console.log('viz', viz) ;

  // load_response: vizConfig.load_response,
  // load_ui: vizConfig.load_ui,
  // load_audio: vizConfig.load_audio,
  // load_char: vizConfig.load_char,
  // load: vizHelper.load,

}