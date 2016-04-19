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

        if ( item.clicked === true ) {
          return ;
        }

        item.clicked = true ;

        var scoreIncrease = 100 ;
        var othresh = 0.6 ;

        if ( item.image === greenRectImage && item.opacity > othresh ) {

          item.viz.flashing = true ;

          item.viz.score.increase() ;

          var fadeDur = 300 ;   

          item.white.fade({

            opacity: 1,
            duration: fadeDur,
            pause: 3 * fadeDur,

            end: function() {

              item.viz.flashing = false ;
              item.viz.green_flash() ;
              item.white.fade({
                opacity: 0,
                duration: fadeDur,
                end: function() {
                  item.clicked = false ;
                },
              }) ;

            },

          }) ;

        } else {
          item.clicked = false ;
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

  viz.green_flash = function green_flash() {

    if ( viz.flashing === true ) {
      return ;
    }

    var fadeDur = 200 ;

    var d0       = 300 ;
    var scale    = 0.6 ;
    var pauseDur = d0 - scale * d0 * (1 - Math.exp(-0.005 * viz.score.value)) ;

    var kRand = Math.floor( Nitem * Math.random() ) ;

    if ( kRand === viz.kGreen ) {
      var kShift = 5 ;
      kRand = (kRand + kShift) % Nitem ;
    }

    if(viz.kGreen !== undefined) {

      var blue = item[viz.kGreen] ; // the green item that we want to turn blue

      blue.fade({ // fade out green square

        opacity: 0,

        duration: fadeDur,

        end: function() {

          blue.image = blueRectImage ; // switch green square to blue while fully faded-out
          blue.fade({ // fade blue square back in
            opacity: 1,
            duration: fadeDur, 
          }) ;

        },

      })
    }

    viz.kGreen = kRand ;

    var green      = item[kRand] ;
    var greenPause = 2.0 * pauseDur ;

    green.fade({

      opacity: 0,
      duration: fadeDur,
      pause: pauseDur,

      end: function() { // fade random square out before turning it green

        green.image = greenRectImage ; // turn random square green

        green.fade({ // fade green square back in

          opacity: 1,
          duration: fadeDur,
          pause: greenPause,
          end: green_flash, // repeat

        }) ;

      },

    }) ;

  }

  viz.green_flash() ; // start the green squares flashing

  // console.log('viz', viz) ;

  // load_response: vizConfig.load_response,
  // load_ui: vizConfig.load_ui,
  // load_audio: vizConfig.load_audio,
  // load_char: vizConfig.load_char,
  // load: vizHelper.load,

}