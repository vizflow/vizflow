function run_game() {
  
  // console.log('run_game: start') ;

  var Nitem = 7 ; 
  var item  = new Array(Nitem) ;

  var radius   = 100 ;
  var size     = 30 ;
  var xShift   = 0.25 * 480 ;
  var yShift   = 0.5 * 640 ;
  var blueish  = '#3030FF' ;
  var greenish = '#30FF30' ;
  var angle0   =  0.5 * Math.PI ; // HTML5 Canvas uses a left-handed coordinate system with the y-axis pointing down and angles going clockwise (?)

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

  $Z.helper.draw.rect(blueRect,  blueRectImage.context(),  rectRatio) ; // draw the non-upsampled blue square to a canvas
  $Z.helper.draw.rect(greenRect, greenRectImage.context(), rectRatio) ; // draw the non-upsampled green square to a canvas

  blueRectImage  = imageHelper.adjust_ratio( blueRectImage  ) ;
  greenRectImage = imageHelper.adjust_ratio( greenRectImage ) ;

  // console.log('run game: ', 'blueRectImage', blueRectImage) ;

  for ( var kItem = 0 ; kItem < Nitem ; kItem++ ) {

    var angle = 4 * (kItem / Nitem) * Math.PI - angle0 ; // evenly spaced around the circle 
    var x     = radius * Math.cos(angle) + xShift ;
    var y     = radius * Math.sin(angle) + yShift ;

    itemConfig = {

      x:      x,
      y:      y,
      angle:  angle,
      xAngle: 0.5 * size,
      yAngle: 0.5 * size,
      render: $Z.helper.draw.image,
      image:  blueRectImage,

      uiSwitch: true,

      callback: function item_callback() {

        var scoreIncrease = 100 ;

        if ( this.image === greenRectImage ) {

          this.viz.score.increase() ;
          var Nflash = 3 ;
          var flashDuration = 100 ;   
          this.flash(Nflash, flashDuration) ;

        }
        // console.log('item callback: ', 'this', this, 'this.viz.score', this.viz.score) ;

      },

    } ;

    item[kItem] = $Z.helper.item.setup(itemConfig) ;

  }

  var vizConfig = {
    item: item,
  } ;

  var viz = $Z.helper.viz.setup(vizConfig) ; // first create generic vizflow configuration object, then add application-specific details

  function green_flash() {

    var minDur = 100 ;

    var d0  = 400 ;
    var dur = minDur + d0 - d0 * (1 - Math.exp(-0.005 * viz.score.value)) ;

    var kRand = Math.floor( Nitem * Math.random() ) ;

    if ( kRand === viz.kGreen ) {
      var kShift = 5 ;
      kRand = (kRand + kShift) % Nitem ;
    }

    if(viz.kGreen !== undefined) {
      var blue = item[viz.kGreen] ; // the green item that we want to turn blue
      blue.fade({ // fade out green square
        duration: dur,
        end: function() {
          blue.image = blueRectImage ; // switch green square to blue while fully faded-out
          blue.fade({ // fade blue square back in
            duration: dur, 
          }) ;
        },
      })
    }

    viz.kGreen = kRand ;

    var green      = item[kRand] ;
    var bluePause  = dur ;
    var greenPause = 1.0 * dur ;

    green.fade({
      duration: dur,
      pause: bluePause,
      end: function() { // fade random square out before turning it green
        green.image = greenRectImage ; // turn random square green
        green.fade({ // fade green square back in

          duration: dur + (greenPause - bluePause),
          pause: greenPause,
          end: green_flash, // repeat

        }) ;
      },
    }) ;

  }

  var uiCanvas = imageHelper.create(viz.width, viz.height) ;

  var uiConfig = {

    canvas:   uiCanvas,
    context:  uiCanvas.context(),

  } ;

  viz.setup_ui(uiConfig) ;
  viz.setup_score() ;

  viz.run() ;

  green_flash() ; // start the green squares flashing

  // console.log('viz', viz) ;

  // load_response: vizConfig.load_response,
  // load_ui: vizConfig.load_ui,
  // load_audio: vizConfig.load_audio,
  // load_char: vizConfig.load_char,
  // load: $Z.helper.viz.load,

}