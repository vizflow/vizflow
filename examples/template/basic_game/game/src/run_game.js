function run_game() {

  /*
   * when using vizflow it's easier to create the viz object and then add the items to it afterwards:
   */
  
  var viz = vizHelper.setup() ; // first create generic vizflow configuration object, then add application-specific details

  // console.log('run_game: start') ;

  var Nitem = 7 ; 
  var item  = new Array(Nitem) ;

  var radius   = 100 ;
  var size     = 40 ;
  var xShift   = 0.5 * 480 ;
  var yShift   = 0.5 * 640 ;
  var blueish  = '#3030FF' ;
  var greenish = '#30FF30' ;
  var angle0   =  0.5 * Math.PI ; // HTML5 Canvas uses a left-handed coordinate system with the y-axis pointing down and angles going clockwise (?)

  var blueRect = { 

    color:  blueish,
    height: size,
    width:  size,
    angle:  0,
    x:      0,
    y:      0,

  } ;

  var greenRect      = Object.assign( Object.copy(blueRect), { color: greenish } ) ;

  var blueRectImage  = imageHelper.create(size, size) ;
  var greenRectImage = imageHelper.create(size, size) ;
  var rectRatio      = 1 ;

  drawHelper.rect(blueRect,  blueRectImage.context(),  rectRatio) ; // draw the non-upsampled blue square to a canvas
  drawHelper.rect(greenRect, greenRectImage.context(), rectRatio) ; // draw the non-upsampled green square to a canvas

  blueRectImage  = imageHelper.adjust_ratio( blueRectImage  ) ;
  greenRectImage = imageHelper.adjust_ratio( greenRectImage ) ;

  // console.log('run game: ', 'blueRectImage', blueRectImage) ;

  for ( var kItem = 0 ; kItem < Nitem ; kItem++ ) {

    var angle = 2 * (kItem / Nitem) * Math.PI - angle0 ; // evenly spaced around the circle 
    var x     = radius * Math.cos(angle) + xShift ;
    var y     = radius * Math.sin(angle) + yShift ;

    itemConfig = {

      x:      x,
      y:      y,
      angle:  angle,
      xAngle: 0.5 * size,
      yAngle: 0.5 * size,
      image:  blueRectImage,

      uiSwitch: true,

      callback: function item_callback() {

        var item = this ;

        var scoreIncrease = 100 ;

        if ( item.image === greenRectImage ) {

          item.viz.score.increase() ;
          var fadeDur = 400 ;   
          item.white.fade({
            duration: fadeDur,
            pause: fadeDur * 2,
            end: function() {
              item.white.fade({
                duration: fadeDur,
              }) ;
            },
          }) ;

        }
        // console.log('item callback: ', 'this', this, 'this.viz.score', this.viz.score) ;

      },

    } ;

    item[kItem] = viz.setup_item(itemConfig) ;
    item[kItem].default_child() ;
    item[kItem].add() ;

  }


  var uiCanvas = imageHelper.create(viz.width, viz.height) ;

  var uiConfig = {

    canvas:   uiCanvas,
    context:  uiCanvas.context(),

  } ;  

  viz.setup_ui(uiConfig) ;
  viz.setup_score() ;
  viz.run() ;

  function green_flash() {

    var minDur = 200 ;

    var d0  = 300 ;
    var dur = minDur + d0 - d0 * (1 - Math.exp(-0.0025 * viz.score.value)) ;

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
    var greenPause = 2.0 * dur ;

    green.fade({
      duration: dur,
      pause: bluePause,
      end: function() { // fade random square out before turning it green
        green.image = greenRectImage ; // turn random square green
        green.fade({ // fade green square back in

          duration: d0,
          pause: greenPause,
          end: green_flash, // repeat

        }) ;
      },
    }) ;

  }

  green_flash() ; // start the green squares flashing

  // console.log('viz', viz) ;

  // load_response: vizConfig.load_response,
  // load_ui: vizConfig.load_ui,
  // load_audio: vizConfig.load_audio,
  // load_char: vizConfig.load_char,
  // load: vizHelper.load,

}