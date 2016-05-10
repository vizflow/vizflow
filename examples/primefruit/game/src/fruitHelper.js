var fruitHelper = {

  setup: function fruit_helper_setup( viz, k, x, y ) { // fruit elements are arrays of items representing fruit clusters corresponding to the prime factorization

    if ( fruitHelper.sprite === undefined ) {

      fruitHelper.sprite = spriteHelper.get
      ( 
        imageHelper.to_canvas('./image/fruit.gif'), 
        ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'], 
        viz.tileWidth, 
        viz.rowHeight // function argument list, so no trailing comma 
      ) ;  

      var overlayImage = imageHelper.to_canvas('./image/fruit-overlay.png') ;
      overlayImage = imageEffectHelper.color_filter(overlayImage, [100, 128, 255]) ; // jar lid color

      fruitHelper.overlay = spriteHelper.get
      ( 
        overlayImage, 
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

    var fruit  = {
      code: viz.code[k],
      item: new Array(viz.code[k].length),
    } ; // initialize fruit element

    for( var kitem = 0 ; kitem < viz.code[k].length ; kitem++ ) {

      var factor = Math.min(5, viz.key[viz.code[k][kitem]] - 1) ;

      var fruitConfig = {

        viz: viz,
        x: x + xOffset + viz.tileWidth * overlapScale * kitem + xExtra * (4 - viz.code[k].length),
        y: y + yOffset - factor * yExtra,
        xScale: initialScale,
        yScale: initialScale,
        opacity: 0.2,
        image: fruitHelper.sprite[viz.code[k][kitem]][0],
        addSwitch: true,
        k: kitem,
        kjar: k,

      } ;

      var digitConfig = {

        viz: viz,
        image: fruitHelper.overlay[viz.code[k][kitem]][0],
        opacity: 0,
        addSwitch: false,
        childFade: false,
        parent: fruit.item[kitem],

      } ;

      fruit.item[kitem]          = itemHelper.setup( fruitConfig ) ; // each tile contains some viz.fruit
      fruit.item[kitem].digit    = itemHelper.setup( digitConfig ) ;
      fruit.item[kitem].code     = viz.code[k][kitem] ; 
      fruit.item[kitem].pausedur = viz.fadeDuration * 2 ;
      fruit.item[kitem].duration = viz.fadeDuration * 3 ;
      fruit.item[kitem].parent   = fruit ;

      fruit.item[kitem].default_child() ;
      fruit.item[kitem].digit.default_child() ;
      fruit.item[kitem].child.push( fruit.item[kitem].digit ) ;

      Object.assign( fruit.item[kitem], fruitHelper.method ) ;

    }

    return fruit ;

  },

  method: {

    final: function fruit_helper_method_final ( fruit ) {

      if ( fruit === undefined ) {
        fruit = this ;
      }

      // console.log('fruit final', 'fruit', fruit) ;

      var duration2 = 3 * fruit.viz.fadeDuration ;
      var offset = 20 ;
      var viz = fruit.viz ;
      var s1 = 2 ;

      fruit.xy_scale(s1) ;
      fruit.add_linear('x', s1 * fruit.x * viz.Ncol + offset, duration2) ;
      fruit.add_linear('y', s1 * fruit.y * viz.Ncol + offset, duration2) ;
      fruit.white.add_transition(document.fade([0, 1, 1, 1, 0]))      

    },

    center: function fruit_helper_method_center ( fruit ) {

      if ( fruit === undefined ) {
        fruit = this ;
      }

      var xmid = fruit.image.originalCanvas.width  * 0.5 ;
      var ymid = fruit.image.originalCanvas.height * 0.5 ;

      fruit.xOrigin = xmid ;
      fruit.white.xOrigin = xmid ;
      fruit.digit.xOrigin = xmid ;
      fruit.digit.white.xOrigin = xmid ;

      fruit.yOrigin = ymid ;
      fruit.white.yOrigin = ymid ;
      fruit.digit.yOrigin = ymid ;
      fruit.digit.white.yOrigin = ymid ;

      fruit.x += xmid * fruit.xScale ;
      fruit.y += ymid * fruit.yScale ;

    },

    grab: function fruit_helper_grab (kitem, fk) {

      if ( fk === undefined ) {
        fk = this ; 
      }

      fk.release() ;

    },

    raise: function fruit_helper_method_raise( fruit ) {

      if ( fruit === undefined ) {
        fruit = this ;
      }

      var dur = fruit.duration * ( fruit.config.k + 1 ) / fruit.parent.item.length ;

      fruit.add_linear('y', fruit.y - 170, dur) ;

      if ( fruit.parent.item.length > 1 ) {

        var width  = 0.5 * fruit.image.originalCanvas.width * fruit.xScale ; // allow some tile overlap
        var xShift = width * (fruit.parent.item.length - 1 ) * 0.5 ;
        var xNew   = fruit.x - xShift + fruit.config.k * width ;

        fruit.call(
          function() { fruit.add_linear('x', xNew, fruit.duration) ; }, 
          dur
        ) ;

      }

    },

    show_digit: function fruit_helper_method_show_digit ( fruit ) { 

      if ( fruit === undefined ) {
        fruit = this ;
      }

      fruit.white.      add_transition(document.fade([1, 0])) ;
      fruit.digit.      add_transition(document.fade([0, 0, 0.5, 1, 1, 1, 1, 1, 1, 0.5, 0])) ;
      fruit.digit.white.add_transition(document.fade([0, 0,   0, 0, 0, 0, 1, 0, 0,   0, 0])) ;

    },

    stash: function fruit_helper_method_stash ( fruit ) {

      if ( fruit === undefined ) {
        fruit = this ;
      }

      var scale1 = fruit.config.xScale ;

      fruit.add_transition(fruit.x_trans()) ;
      fruit.add_transition(fruit.y_trans()) ;
      fruit.add_linear('xScale', scale1, fruit.duration) ;
      fruit.add_linear('yScale', scale1, fruit.duration) ;
      if ( fruit.parent.item.length > 1 ) {
        fruit.call(['whiteflash', 'fadeout', 'remove'], fruit.duration) ;
      } 

    },

    fadeout: function fruit_helper_method_shrink ( fruit ) {

      if ( fruit === undefined ) {
        fruit = this ;
      }

      fruit.fade({ duration: fruit.duration, opacity: 0 }) ;

    },

    release: function fruit_helper_method_release( fruit ) {

      if ( fruit === undefined ) {
        fruit = this ;
      }

      fruit.center() ;
      fruit.prep() ;
      fruit.fade({ opacity: 1 }) ;
      fruit.call('raise',      fruit.duration) ;
      fruit.call('show_digit', 2 * fruit.duration) ;
      fruit.call('stash',      6 * fruit.duration) ;

    },

    prep: function fruit_helper_method_prep( fruit ) {

      if ( fruit === undefined ) {
        fruit = this ;
      }

      var yShift   = fruit.viz.height - 64 ;
      var scale0   = 3 ;
      var x0       = fruit.viz.width  * 0.5 ;
      var y0       = yShift ;
      fruit.x      = x0 ;
      fruit.y      = y0 ;
      fruit.xScale = scale0 ;
      fruit.yScale = scale0 ;

    },

    show: function fruit_helper_show ( callback, fruit ) {

      if ( fruit === undefined ) {
        fruit = this ;
      }

      fruit.release() ;
      fruit.call( callback, fruit.duration * 9 ) ;            

    },

    y_trans: function fruit_helper_y_trans(fruit) {

      if ( fruit === undefined ) { 
        fruit = this ;
      }

      var viz = fruit.viz ;
      var code = fruit.code ;

      var index = code.charCodeAt(0) - 'a'.charCodeAt(0) ;
      var row   = Math.floor(index / viz.Nside) ;
      var yNew  = row * viz.yGridMini + 16 * row ;    

      if ( fruit.yOrigin !== 0 ) {
        yNew += fruit.yOrigin ;
      }

      return transitionHelper.new_linear('y', yNew, fruit.duration) ;

    },

    x_trans: function fruit_helper_x_trans(fruit) {

      if ( fruit === undefined ) {
        fruit = this ;
      }

      var viz = fruit.viz ;
      var code = fruit.code ;

      var index = code.charCodeAt(0) - 'a'.charCodeAt(0) ;
      var col   = index % viz.Nside ;
      var xNew  = col * viz.xGridMini + 16 * col ;

      if ( fruit.xOrigin !== 0 ) {
        xNew += fruit.xOrigin ;
      }

      return transitionHelper.new_linear('x', xNew, fruit.duration) ;

    },

    xy_scale: function fruit_helper_xy_scale(value, fruit) {
      
      if (fruit === undefined ) { 
        fruit = this ;
      }

      if ( value === undefined ) {
        value = fruit.config.xScale ;
      }

      fruit.add_transition([fruit.x_scale(value), fruit.y_scale(value)]) ; 
    },

    x_scale: function fruit_helper_x_scale(scale1, fruit) {

      if ( fruit === undefined ) {
        fruit = this ;
      }

      if ( scale1 === undefined ) {
        scale1 = fruit.config.xScale ;
      }

      var xScaleTrans = transitionHelper.new_linear('xScale', scale1, fruit.duration) ;
      
      return xScaleTrans ;

    },

    y_scale: function fruit_helper_y_scale(scale1, fruit) {

      if ( fruit === undefined ) {
        fruit = this ;
      }

      if ( scale1 === undefined ) {
        scale1 = fruit.config.yScale ;
      }

      var yScaleTrans   = transitionHelper.new_linear('yScale', scale1, fruit.duration) ;
      
      return yScaleTrans ;

    },

    is_collected: function fruit_helper_is_collected( fruit ) {

      if ( fruit === undefined ) {
        fruit = this ;
      }

      // console.log('fruit helper is collected: ', 'fruit', fruit.code, ) ;

      if ( fruit.viz.collected[ fruit.code ] === undefined ) {
        return false ;
      } else {  
        return true ;
      }

    },

    is_prime: function fruit_helper_is_prime( fruit ) {

      if ( fruit === undefined ) {
        fruit = this ;
      }


      if ( fruit.parent.item.length === 1 ) {
        return true ;
      } else {  
        return false ;
      }

    },

    pulse: function fruit_helper_pulse ( fruit ) {

      if ( fruit === undefined ) {
        fruit = this ;
      }

      fruit.loop(fruitHelper.fade_pulse) ;
    
    },

  },

  fade_pulse: function fruit_helper_fade_pulse( ) {

    var fadeDur = [.5, 1, .75, .5, .25] ;

    return document.fade(fadeDur)[0] ;

  },

} ;


      // var pauseDur = 3 * fk.duration ;
      // var xyDur    = fk.duration ;
      // var xTrans   = transitionHelper.new_linear('x', 0.5 * fk.viz.width, xyDur) ;      
      // var yTrans   = transitionHelper.new_linear('y', 0.5 * fk.viz.width, xyDur) ; 
      // var index    = fk.code.charCodeAt(0) - 'a'.charCodeAt(0) ; // prime number index 

      // xTrans.end = function() {
      //   fk.add_transition(yTrans) ;            
      //   fk.xy_scale(3) ;
      //   fk.viz.prime[index].white.add_transition( document.fade([1, 0]) ) ;        
      //   fk.call(function() { 
      //     fk.white.add_transition(document.fade([1, 0])) ;
      //     fk.digit.add_transition(      document.fade([0, 0, 1, 1, 1, 1, 0])) ;
      //     fk.digit.white.add_transition(document.fade([0, 0, 0, 0, 1, 0])) ;
      //   }, fk.duration * 2 ) ;

      //   fk.call( function() {
      //     fk.xy_scale(0.75) ;         
      //     fk.add_transition([fk.x_trans(), fk.y_trans()]) ;          
      //   }, fk.duration * 5) ;
      // }

      // var xInit = transitionHelper.new_linear('x', fk.viz.jar[fk.config.kjar].x, xyDur) ;
      // xInit.end = function() {
      //   fk.add_transition(yInit) ;        
      // }

      // var yInit = transitionHelper.new_linear('y', fk.y - 32, xyDur) ;
      // yInit.end = function() {
      //   fk.add_transition(xTrans) ;
      // }

      // fk.add_transition(xInit) ;