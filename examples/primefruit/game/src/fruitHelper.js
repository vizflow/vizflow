var fruitHelper = {

  x_scale: function fruit_helper_x_scale(shift) {

    if ( shift === undefined ) {
      shift = 0 ;
    }

    var xScaleTrans   = transitionHelper.new_linear('xScale', scale0, viz.fadeDuration) ;
    xScaleTrans.pause = viz.fadeDuration * 3 ;
    xScaleTrans.child = transitionHelper.new_linear('xScale', scale1, viz.fadeDuration) ;
    return xScaleTrans ;

  },

  y_scale: function fruit_helper_y_scale(shift) {

    if ( shift === undefined ) {
      shift = 0 ;
    }

    var yScaleTrans   = transitionHelper.new_linear('yScale', scale0, viz.fadeDuration) ;
    yScaleTrans.pause = viz.fadeDuration * 3 ;
    yScaleTrans.child = transitionHelper.new_linear('yScale', scale1, viz.fadeDuration) ;     
    return yScaleTrans ;

  },

  setup: function fruit_helper_setup(viz, k, x, y) { // fruit elements are arrays of items representing fruit clusters corresponding to the prime factorization

    if ( fruitHelper.sprite === undefined ) {

      fruitHelper.sprite = spriteHelper.get
      ( 
        imageHelper.to_canvas('./image/fruit.gif'), 
        ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'], 
        viz.tileWidth, 
        viz.rowHeight // function argument list, so no trailing comma 
      ) ;  

    }

    var yExtra       = 1.75 ;
    var xExtra       = 6 ;
    var yOffset      = 30 ;
    var xOffset      = -6 ;
    var initialScale = 0.75 ;
    var overlapScale = .29 ;

    var fruit = {} ; // initialize fruit element

    fruit.item = new Array(viz.code[k].length) ;

    for( var kitem = 0 ; kitem < viz.code[k].length ; kitem++ ) {

      var factor = Math.min(5, viz.key[viz.code[k][kitem]] - 1) ;

      var fruitConfig = {

        viz: viz,
        x: x + xOffset + viz.tileWidth * overlapScale * kitem + xExtra * (4 - viz.code[k].length),
        y: y + yOffset - factor * yExtra,
        xScale: initialScale,
        yScale: initialScale,
        opacity: 0.5,
        image: fruitHelper.sprite[viz.code[k][kitem]][0],
        addSwitch: true,

      } ;

      fruit.item[kitem]              = itemHelper.setup(fruitConfig) ; // each tile contains some viz.fruit
      fruit.item[kitem].code         = viz.code[k][kitem] ; 
      fruit.item[kitem].is_collected = fruitHelper.is_collected ;
      fruit.item[kitem].pulse        = fruitHelper.pulse ;
      fruit.item[kitem].fade_pulse   = fruitHelper.fade_pulse ;
      fruit.item[kitem].show         = fruitHelper.show ;
      fruit.code                     = viz.code[k] ;
        // console.log('pf: ', 'k', k, 'fruitConfig', fruitConfig) ;
      fruit.item[kitem].default_child() ;

    }

    return fruit ;

  },

  is_collected: function fruit_helper_is_collected( fruit ) {

    if ( fruit === undefined ) {
      fruit = this ;
    }

    // console.log('fruit helper is collected: ', 'fruit', fruit) ;

    if ( fruit.viz.collected[ fruit.viz.code ] === undefined ) {
      return false ;
    } else {  
      return true ;
    }

  },

  // pulse: function fruit_helper_pulse( fruit ) {
    
  //   if ( fruit === undefined ) {
  //     fruit = this ; 
  //   }

  //   var trans = document.fade(fruit.primeFade)[0] ;

  //   var child = transitionHelper.get_child(transK, 'last') ;
    
  //   child.end = {
  //     item: viz.fruit[kfruit].item[kitem],
  //     run: prime_fade,
  //   } ;

  // }

  fade_pulse: function fruit_helper_fade_pulse( ) {

    var fadeDur = [.5, 1, .75, .5, .25] ;

    return document.fade(fadeDur)[0] ;

  },

  pulse: function fruit_helper_pulse ( fruit ) {

    if ( fruit === undefined ) {
      fruit = this ;
    }

    fruit.loop(fruitHelper.fade_pulse) ;
  },

  show: function fruit_helper_show ( fruit ) {

    if ( fruit === undefined ) {
      fruit = this ;
    }

    var viz = fruit.viz ;

    fruit.fade({

      duration: viz.fadeDuration,
      opacity: 1,

      end: function() {
        fruit.white.add_transition(document.fade([1, 1, 0])) ;
      },

    }) ;

    var scale0 = 3 ;
    var scale1 = viz.xGridMini / viz.xGrid ;

    var x0 = viz.width  * 0.5 - (viz.tileWidth * scale0) * 0.5 ;
    var y0 = viz.height * 0.5 - (viz.rowHeight * scale0) * 0.5 ;    

    var xTrans0 = transitionHelper.new_linear('x', x0, viz.fadeDuration * 4) ;
    var yTrans0 = transitionHelper.new_linear('y', y0, viz.fadeDuration * 4) ;

    // console.log('jar.fruit.code', jar.fruit.code)

    xTrans0.child = fruitHelper.x_trans(viz, fruit.code) ;
    yTrans0.child = fruitHelper.y_trans(viz, fruit.code) ;

    fruit.add_transition(xTrans0) ;
    fruit.add_transition(yTrans0) ;    

  },


  y_trans: function jar_helper_y_trans(viz, code) {

    var index = code.charCodeAt(0) - 'a'.charCodeAt(0) ;
    var row   = Math.floor(index / viz.Nside) ;
    var yNew  = row * viz.yGridMini ;    
    return transitionHelper.new_linear('y', yNew, viz.fadeDuration) ;

  },

  x_trans: function jar_helper_x_trans(viz, code) {

    var index = code.charCodeAt(0) - 'a'.charCodeAt(0) ;
    var col   = index % viz.Nside ;
    var xNew  = col * viz.xGridMini ;
    return transitionHelper.new_linear('x', xNew, viz.fadeDuration) ;

  },

} ;