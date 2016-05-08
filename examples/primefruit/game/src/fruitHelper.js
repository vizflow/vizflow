var fruitHelper = {

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

      } ;

      fruit.item[kitem] = itemHelper.setup(fruitConfig) ; // each tile contains some viz.fruit
      
      fruit.item[kitem].code         = viz.code[k][kitem] ; 
      fruit.item[kitem].pausedur     = viz.fadeDuration * 2 ;
      fruit.item[kitem].duration     = viz.fadeDuration * 3 ;
      fruit.item[kitem].parent       = fruit ;

      fruit.item[kitem].default_child() ;

      Object.assign(fruit.item[kitem], fruitHelper.method) ;

    }

    return fruit ;

  },

  method: {

    grab: function fruit_helper_grab (kitem, fk) {

      if ( fk === undefined ) {
        fk = this ; 
      }

      fk.remove_transition('opacity') ;
      var fruitFade = [1.0, 1.0, 1.0, 1.0, 0] ;
      var trans     = document.fade(fruitFade) ;
      var index     = fk.code.charCodeAt(0) - 'a'.charCodeAt(0) ; // prime number index 

      transitionHelper.get_child(trans[0], fruitFade.length - 1).end = {
        
        index: index, 

        item: fk,

        run: function(endConfig) {
          
          if ( endConfig === undefined ) {
            endConfig = this ;
          }

          endConfig.item.remove() ;
          var replacementSwitch = false ;
          fk.viz.prime[endConfig.index].white.add_transition( document.fade([1, 0]), replacementSwitch ) ;

        },

      } ;

      var xTrans = fk.x_trans() ;
      var yTrans = fk.y_trans() ;

      var shift = 50 * kitem ;

      var xTrans0   = transitionHelper.new_linear('x', shift, fk.viz.fadeDuration * 3) ; 
      xTrans0.child = xTrans ;

      var yTrans0   = transitionHelper.new_linear('y', shift, fk.viz.fadeDuration * 3) ; 
      yTrans0.child = yTrans ;

      fk.add_transition(trans) ;
      fk.add_transition(xTrans0) ;
      fk.add_transition(yTrans0) ;    
      fk.add_transition(fk.x_scale()) ;
      fk.add_transition(fk.y_scale()) ;

    },

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

            var fade = document.fade([1, 0])[0] ;

            fade.child.pause = fruit.duration ;

            fade.child.end = function() {
              fruit.add_transition(fruit.x_trans()) ;
              fruit.add_transition(fruit.y_trans()) ;
              fruit.add_linear('xScale', scale1, fruit.viz.fadeDuration) ;
              fruit.add_linear('yScale', scale1, fruit.viz.fadeDuration) ;
              fruit.white.add_transition(document.fade([1, 1, 0])) ;
              fruit.call( callback, fruit.viz.fadeDuration * 3 ) ;            
            } ;

            fruit.white.add_transition(fade) ;          
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

    xy_scale: function fruit_helper_xy_scale(value, fruit) {
      
      if (fruit === undefined ) { 
        fruit = this ;
      }

      fruit.add_transition([fruit.x_scale(value), fruit.y_scale(value)]) ; 
    },

    x_scale: function fruit_helper_x_scale(scale1, fruit) {

      if ( fruit === undefined ) {
        fruit = this ;
      }

      if ( scale1 === undefined ) {
        scale1 = .5 ;
      }

      var xScaleTrans = transitionHelper.new_linear('xScale', scale1, fruit.duration) ;
      
      return xScaleTrans ;

    },

    y_scale: function fruit_helper_y_scale(scale1, fruit) {

      if ( fruit === undefined ) {
        fruit = this ;
      }

      if ( scale1 === undefined ) {
        scale1 = .5 ;
      }

      var yScaleTrans   = transitionHelper.new_linear('yScale', scale1, fruit.duration) ;
      
      return yScaleTrans ;

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
