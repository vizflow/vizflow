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
    var yOffset      = 28 ;
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
      fruit.code                     = viz.code[k] ;
      fruit.item[kitem].pulse        = fruitHelper.pulse ;
      fruit.item[kitem].fade_pulse   = fruitHelper.fade_pulse ;
      fruit.item[kitem].default_child() ;
      // console.log('pf: ', 'k', k, 'fruitConfig', fruitConfig) ;

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

} ;