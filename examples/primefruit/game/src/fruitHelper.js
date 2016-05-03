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

  setup: function fruit_helper_setup(viz, k, x, y) {

    if ( fruitHelper.sprite === undefined ) {

      fruitHelper.sprite = spriteHelper.get
      ( 
        imageHelper.to_canvas('./image/fruit.gif'), 
        ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'], 
        viz.tileWidth, 
        viz.rowHeight // function argument list, so no trailing comma 
      ) ;  

    }

    var yOffset      = 37 ;
    var xOffset      = -3 ;
    var xSpace       = 5 ;
    var initialScale = 0.5 ;
    var overlapScale = 0.25 ;

    var fruit = {} ; // initialize fruit element

    fruit.item = new Array(viz.code[k].length) ;

    for( var kitem = 0 ; kitem < viz.code[k].length ; kitem++ ) {

      var fruitConfig = {

        viz: viz,
        x: x + xOffset + viz.tileWidth * overlapScale * kitem + xSpace,
        y: y + yOffset,
        xScale: initialScale,
        yScale: initialScale,
        opacity: 0.2,
        image: fruitHelper.sprite[viz.code[k][kitem]][0],
        addSwitch: true,

      } ;

      fruit.item[kitem]              = itemHelper.setup(fruitConfig) ; // each tile contains some viz.fruit
      fruit.item[kitem].default_child() ;
      fruit.item[kitem].code         = viz.code[k][kitem] ; 
      fruit.item[kitem].is_collected = fruitHelper.is_collected ;
      fruit.code                     = viz.code[k] ;
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

} ;