var fruitHelper = {


  show: function fruit_helper_show ( callback, fruit ) {

    if ( fruit === undefined ) {
      fruit = this ;
    }

    var viz = fruit.viz ;

    var scale0 = 3 ;
    var scale1 = viz.xGridMini / viz.xGrid ;
    var yShift = fruit.image.originalCanvas.height * 0.5 ;

    var x0 = viz.width  * 0.5 - (fruit.image.originalCanvas.width * scale0) * 0.5 ;
    var y0 = viz.height * 0.5 - (fruit.image.originalCanvas.height * scale0) * 0.5 + yShift ;

    fruit.x = x0 ;
    fruit.y = y0 ;
    fruit.xScale = scale0 ;
    fruit.yScale = scale0 ;

    var trans = transitionHelper.new_step('show', undefined, 3 * fruit.pausedur ) ;

    trans.end = function() {

      fruit.add_linear('y', fruit.y - 80, fruit.duration) ;
  
      fruit.fade({

        duration: fruit.duration,
        opacity: 1,
        pause: fruit.duration,

        end: function() {
          fruit.add_transition(fruit.x_trans()) ;
          fruit.add_transition(fruit.y_trans()) ;
          fruit.add_linear('xScale', scale1, fruit.viz.fadeDuration) ;
          fruit.add_linear('yScale', scale1, fruit.viz.fadeDuration) ;
          fruit.white.add_transition(document.fade([1, 1, 0])) ;
          fruit.call( callback, fruit.viz.fadeDuration * 3 ) ;
        },

      }) ;
    
    } ;

    fruit.add_transition(trans) ;

  },


  y_trans: function fruit_helper_y_trans(fruit) {

    if ( fruit === undefined ) { 
      fruit = this ;
    }

    var viz = fruit.viz ;
    var code = fruit.code ;

    var index = code.charCodeAt(0) - 'a'.charCodeAt(0) ;
    var row   = Math.floor(index / viz.Nside) ;
    var yNew  = row * viz.yGridMini ;    
    return transitionHelper.new_linear('y', yNew, fruit.viz.fadeDuration) ;

  },

  x_trans: function fruit_helper_x_trans(fruit) {

    if ( fruit === undefined ) {
      fruit = this ;
    }

    var viz = fruit.viz ;
    var code = fruit.code ;

    var index = code.charCodeAt(0) - 'a'.charCodeAt(0) ;
    var col   = index % viz.Nside ;
    var xNew  = col * viz.xGridMini ;
    return transitionHelper.new_linear('x', xNew, fruit.viz.fadeDuration) ;

  },

  x_scale: function fruit_helper_x_scale(shift, fruit) {

    if ( fruit === undefined ) {
      fruit = this ;
    }

    if ( shift === undefined ) {
      shift = 0 ;
    }

    var scale1 = .5 ;

    var xScaleTrans = transitionHelper.new_linear('xScale', scale1, fruit.duration) ;
    
    return xScaleTrans ;

  },

  y_scale: function fruit_helper_y_scale(shift, fruit) {

    if ( fruit === undefined ) {
      fruit = this ;
    }

    if ( shift === undefined ) {
      shift = 0 ;
    }

    var scale1 = .5 ;

    var yScaleTrans   = transitionHelper.new_linear('yScale', scale1, fruit.duration) ;
    
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
        opacity: 0,
        image: fruitHelper.sprite[viz.code[k][kitem]][0],
        addSwitch: true,

      } ;

      fruit.item[kitem]              = itemHelper.setup(fruitConfig) ; // each tile contains some viz.fruit
      fruit.item[kitem].code         = viz.code[k][kitem] ; 
      fruit.item[kitem].is_collected = fruitHelper.is_collected ;
      fruit.item[kitem].pulse        = fruitHelper.pulse ;
      fruit.item[kitem].fade_pulse   = fruitHelper.fade_pulse ;
      fruit.item[kitem].show         = fruitHelper.show ;
      fruit.item[kitem].x_scale      = fruitHelper.x_scale ;
      fruit.item[kitem].y_scale      = fruitHelper.y_scale ;
      fruit.item[kitem].x_trans      = fruitHelper.x_trans ;
      fruit.item[kitem].y_trans      = fruitHelper.y_trans ;
      fruit.item[kitem].pausedur     = viz.fadeDuration * 2 ;
      fruit.item[kitem].duration     = viz.fadeDuration * 3 ;
      fruit.item[kitem].parent       = fruit ;
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

} ;