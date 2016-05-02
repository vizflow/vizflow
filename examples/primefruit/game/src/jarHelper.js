var jarHelper = {

  setup: function jar_helper_setup(viz, k, x, y) {

    if ( jarHelper.lidImage === undefined ) {
      jarHelper.lidImage = [
          imageHelper.adjust_ratio(imageHelper.to_canvas('./image/jarLidGray.png')), 
          imageHelper.adjust_ratio(imageHelper.to_canvas('./image/jarLidPurp.png')),
      ] ;
    }

    if ( jarHelper.image === undefined ) {
      jarHelper.image = imageHelper.adjust_ratio(imageHelper.to_canvas('./image/jarOpen.png')) ;      
    }

    var jarConfig = {

      viz: viz,
      image: imageHelper.copy(jarHelper.image),
      x: x,
      y: y,
      addSwitch: true,
      uiSwitch: true,
      callback: jarHelper.click,
      k: k,

    } ;

    var jarK = itemHelper.setup( jarConfig ) ;
    // jarK.default_child() ;

    var lidConfig = {

      viz: viz,
      image: jarHelper.lidImage[0],
      x: x,
      y: y,
      addSwitch: false,

    } ;

    jarK.scale0 = 3 ;
    jarK.scale1 = viz.xGridMini / viz.xGrid ;

    jarK.x0 = viz.width  * 0.5 - (viz.tileWidth * jarK.scale0) * 0.5 ;
    jarK.y0 = viz.height * 0.5 - (viz.rowHeight * jarK.scale0) * 0.5 ;    

    lidK = itemHelper.setup ( lidConfig ) ;
    lidK.default_child() ;

    // var lidConfigBlue = Object.assign({image: jarHelper.lidImage[2]}, lidConfig) ;
    // var lidKblue      = itemHelper.setup ( lidConfigBlue ) ;
    // lidK.blue         = lidKblue ;

    // lidK.child.push(lidKblue) ;

    jarK.lid   = lidK ;
    jarK.child = [jarK.lid] ;

    jarK.all_collected = jarHelper.all_collected ;
    jarK.any_collected = jarHelper.any_collected ;
    jarK.unlock        = jarHelper.unlock ;
    jarK.open          = jarHelper.open ;
    jarK.is_open       = jarHelper.is_open ;
    jarK.focus         = jarHelper.focus ;
    jarK.fruit         = viz.fruit[k] ;

    var digit = imageHelper.text2image({
      text: k + 2,
      sprite: viz.text,
      xShift: 0,
    }) ;

    var xJar = 40 ;
    var yJar = 42 ;
    var xPad = [15, 25, 15] ;

    jarK.image.context().drawImage( digit, xJar - xPad[Math.floor((k + 2) / 10)], yJar ) ;

    return jarK ;

  },

  all_collected: function jar_helper_all_collected( jar ) { // attach this function to the jar objects inside the for loop below

    if ( jar === undefined ) {
      jar = this ;
    }

    var jarCode = jar.fruit.code ;

    for ( var k = 0 ; k < jarCode.length ; k++ ) {
      if( jar.viz.collected[jarCode[k]] === undefined ) {
        return false ;
      }
    }

    return true ; 

  },

  any_collected: function jar_helper_any_collected( jar ) { // attach this function to the jar objects inside the for loop below

    if ( jar === undefined ) {
      jar = this ;
    }

    var jarCode = jar.fruit.code ;

    for ( var k = 0 ; k < jarCode.length ; k++ ) {
      if( viz.collected[jarCode[k]] !== undefined ) {
        return true ;
      }
    }

    return false ; 

  },

  unlock: function jar_helper_unlock( jar ) {

    if( jar === undefined ) { 
      jar = this ;
    }

    var flash     = [1, 0, .25] ;
    var fadeTrans = document.fade(flash) ;

    transitionHelper.get_child(fadeTrans[0], flash.length - 2).end = function() {
      jar.lid.image = jarHelper.lidImage[1] ;
    } ;

    jar.lid.white.add_transition(fadeTrans) ;

  },

  
  is_open: function jar_helper_is_open( jar ) {

    if ( jar === undefined ) {
      jar = this ;
    }

    if ( jar.lid.image === jarHelper.lidImage[1] ) {
      return true ;
    } else {
      return false ;
    }

  },

  open: function jar_helper_open( jar ) {

    if ( jar === undefined ) {
      jar = this ;
    }

    var viz = jar.viz ;

    jar.lid.white.add_transition(document.fade([.5, 1, .5, 0])) ;

    jar.lid.fade({

      duration: viz.fadeDuration * 4,
      opacity: 0,

      end: function() {

        jar.fade({
        
          duration: viz.fadeDuration,
          opacity: 0,

          end: function() {

            jar.remove() ;
            viz.scoreup() ;
            viz.update_jar() ;

          },
        
        }) ;

      },
    }) ;

  },

  click: function jar_helper_click( jar ) {
    
    if ( jar === undefined ) { 
      jar = this ;
    }

    var viz = jar.viz ;

    if ( viz.busy === true ) { 
      return ;
    }

    viz.busy = true ;

    console.log('viz.fadeDuration', viz.fadeDuration)

    viz.add_sequence( [true, false], transitionHelper.fixed_duration_step('busy', viz.fadeDuration * 6) ) ;

    var jarFade = [0, 0, 0, 0, 1] ;

    // console.log('jarHelper.click: ', 'jar', jar, 'jarFade', jarFade) ;

    if ( jar.all_collected() ) {

      jar.open() ;

      jar.focus() ;

    } else if ( jar.lid.image !== jarHelper.lidImage[1] ) { // jar is closed

      // console.log('jar helper click', 'jar.lid', jar.lid)

      jar.lid.flash(2, 200) ;

      // jar.add_transition(document.fade([0.5, 1])) ;

      for ( var kitem = 0 ; kitem < jar.fruit.item.length ; kitem++) {
        if ( jar.fruit.item[kitem].is_collected() === true ) {
          jar.fruit.item[kitem].add_transition(document.fade([.25, .5, 0])) ;          
        }
      }

    } else if ( jar.fruit.code.length === 1 ) { // this jar reprsents a prime number i.e. contains a single "prime viz.fruit"

      jar.open() ;

      jar.focus() ;

      jarHelper.show_prime(jar) ; // show the selected jar's primefruit whether or not it has been collected yet

      if ( viz.collected[jar.fruit.code] === undefined ) {
        viz.collected[jar.fruit.code] = true ;
      }

      // } else { // white flash reminds the player that they already collected the fruit from the selected jar 
        // jar.fruit.item[0].white.add_transition(document.fade([1, 0])) ;
      // }

    }

  },

  update: function jar_helper_update( viz ) { 

    if ( viz === undefined ) {
      viz = this ;
    }
    
    // var curr = String.fromCharCode(viz.current) ;
    // var next = String.fromCharCode(viz.current + 1) ;
    // var kCurr = viz.key[curr] - 2 ;
    
    // var kNext = viz.key[next] - 1 ;

    // var count = 0 ;
    
    for ( var kJar = 0 ; kJar < viz.jar.length ; kJar++ ) {

      if ( viz.jar[kJar].removeSwitch === true ) { 
        continue ;
      }
      
      // console.log('jar_image_update: ', 'kNext', kNext, 'kJar', kJar) ;
      // console.log('jar image update: ', 'code[ viz.jar[kJar].config.k ]', code[ viz.jar[kJar].config.k ], 'curr', curr) ;
      
      if( viz.jar[kJar].all_collected() ) {
        viz.jar[kJar].unlock() ;
        // count++ ;
      }

    }
  
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

  show_prime: function jar_helper_show_prime( jar ) {

    var scale0 = jar.scale0 ;
    var scale1 = jar.scale1 ;
    var viz = jar.viz ;

    function x_scale(shift) {

      if ( shift === undefined ) {
        shift = 0 ;
      }

      var xScaleTrans   = transitionHelper.new_linear('xScale', scale0, viz.fadeDuration) ;
      xScaleTrans.pause = viz.fadeDuration * 3 ;
      xScaleTrans.child = transitionHelper.new_linear('xScale', scale1, viz.fadeDuration) ;
      return xScaleTrans ;

    }

    function y_scale(shift) {

      if ( shift === undefined ) {
        shift = 0 ;
      }

      var yScaleTrans   = transitionHelper.new_linear('yScale', scale0, viz.fadeDuration) ;
      yScaleTrans.pause = viz.fadeDuration * 3 ;
      yScaleTrans.child = transitionHelper.new_linear('yScale', scale1, viz.fadeDuration) ;     
      return yScaleTrans ;

    }

    var fk = jar.fruit.item[0] ;

    var viz = jar.viz ;

    fk.fade({

      duration: viz.fadeDuration,
      opacity: 1,
      end: function() {
        fk.white.add_transition(document.fade([1, 1, 0])) ;
      },

    }) ;

    var xTrans0 = transitionHelper.new_linear('x', jar.x0, viz.fadeDuration * 4) ;
    var yTrans0 = transitionHelper.new_linear('y', jar.y0, viz.fadeDuration * 4) ;

    // console.log('jar.fruit.code', jar.fruit.code)

    xTrans0.child = jarHelper.x_trans(viz, jar.fruit.code) ;
    yTrans0.child = jarHelper.y_trans(viz, jar.fruit.code) ;

    fk.add_transition(xTrans0) ;
    fk.add_transition(yTrans0) ;    
    // fk.add_transition(x_scale()) ;
    // fk.add_transition(y_scale()) ;

    for ( var kfruit = 0 ; kfruit < viz.fruit.length ; kfruit++ ) {

      if ( kfruit === jar.config.k ) {
        continue ;
      }

      for ( var kitem = 0 ; kitem < viz.fruit[kfruit].item.length ; kitem++ ) {

        if ( fk.image === viz.fruit[kfruit].item[kitem].image ) {
          viz.fruit[kfruit].item[kitem].add_transition(document.fade([.5, 1, .75, .5, .25, 1])) ;
        }

      }

    }

  },

  focus: function jar_helper_focus( jar ) {

    if ( jar === undefined ) {
      jar = this ;
    }

    var viz = jar.viz ;

    var o1 = 0.4 ;
    var bgFade = [o1, o1, o1, o1, 1] ;

    for ( var kjar = 0 ; kjar < viz.jar.length ; kjar++ ) {
      
      if( viz.jar[kjar] === jar) {
        continue ;
      }

      viz.jar[kjar].add_transition( document.fade(bgFade) ) ;

    }    

  },

} ;

      // jar.fade({

      //   duration: viz.fadeDuration,
      //   opacity: 0,
      //   end: function() {
      //     jar.remove() ;
      //     viz.scoreup() ;
      //     if ( viz.all_closed() ) {
      //       viz.open_next() ;
      //     }
      //   },

      // }) ;

      // for ( var kitem = 0 ; kitem < jar.fruit.item.length ; kitem++ ) {
      
      //   var fk = jar.fruit.item[kitem] ;
    
      //   var fruitFade = [1.0, 1.0, 1.0, 1.0, 0] ;
      //   var trans     = document.fade(fruitFade) ;
      //   var index     = fk.code.charCodeAt(0) - 'a'.charCodeAt(0) ; // prime number index 

      //   transitionHelper.get_child(trans[0], fruitFade.length - 1).end = {
          
      //     index: index, 

      //     item: fk,

      //     run: function(endConfig) {
            
      //       if ( endConfig === undefined ) {
      //         endConfig = this ;
      //       }

      //       endConfig.item.remove() ;
      //       var replacementSwitch = false ;
      //       viz.prime[endConfig.index].white.add_transition(document.fade([1, 0]), replacementSwitch) ;
      //       // jar_open_next() ;
          
      //     },

      //   } ;

      //   var xTrans = jarHelper.x_trans(viz, fk.code) ;
      //   var yTrans = jarHelper.y_trans(viz, fk.code) ;

      //   var shift = 50 * kitem ;

      //   var xTrans0 = transitionHelper.new_linear('x', jar.x0 + shift, viz.fadeDuration * 3) ; 
      //   xTrans0.child = xTrans ;

      //   var yTrans0 = transitionHelper.new_linear('y', jar.y0, viz.fadeDuration * 3) ; 
      //   yTrans0.child = yTrans ;

      //   fk.add_transition(trans) ;
      //   fk.add_transition(xTrans0) ;
      //   fk.add_transition(yTrans0) ;    
      //   // fk.add_transition(x_scale()) ;
      //   // fk.add_transition(y_scale()) ;
      
      // }

      // jar.focus() ;
