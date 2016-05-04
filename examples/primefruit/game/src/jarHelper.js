var jarHelper = {

  setup: function jar_helper_setup(viz, k, x, y) {

    if ( jarHelper.lidImage === undefined ) {
      jarHelper.lidImage = [
          imageHelper.adjust_ratio(imageHelper.to_canvas('./image/jarLidGray.png')), 
          imageHelper.adjust_ratio(imageHelper.to_canvas('./image/jarLidPurp.png')),
          imageHelper.adjust_ratio(imageHelper.to_canvas('./image/jarLidBlue.png')),
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
      addSwitch: false,

    } ;

    lidK = itemHelper.setup ( lidConfig ) ;
    lidK.default_child() ;

    var lidConfigBlue = Object.copy(lidConfig) ;
    // lidConfigBlue.opacity = 0 ;
    lidConfigBlue.image = jarHelper.lidImage[2] ;
    var lidKblue        = itemHelper.setup ( lidConfigBlue ) ;
    lidKblue.default_child() ;

    jarK.lid   = lidK ;
    jarK.blue  = lidKblue ;
    jarK.child = [jarK.blue, jarK.lid] ;

    jarK.all_collected  = jarHelper.all_collected ;
    jarK.any_collected  = jarHelper.any_collected ;
    jarK.unlock         = jarHelper.unlock ;
    jarK.open           = jarHelper.open ;
    jarK.is_open        = jarHelper.is_open ;
    jarK.focus          = jarHelper.focus ;
    jarK.grab           = jarHelper.grab ;
    jarK.showprime      = jarHelper.showprime ; 
    jarK.flash_func     = jarHelper.flash_func ;
    jarK.fruit          = viz.fruit[k] ;
    jarK.unlocked       = false ; // jars start out locked

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

  click: function jar_helper_click( jar ) {
    
    if ( jar === undefined ) { 
      jar = this ;
    }

    var viz = jar.viz ;

    if ( viz.busy === true ) { 
      return ;
    }

    var opacity  = 0.4 ;
    var duration = 3 * viz.fadeDuration ;

    // console.log('jarHelper.click: ', 'jar', jar, 'jarFade', jarFade) ;

    if ( jar.all_collected() ) {

      jar.open() ;
      jar.focus(duration) ;
      jar.grab() ;

    } else if ( jar.unlocked !== true ) { // jar is closed

      jar.focus(duration) ;
      jar.blue.opacity = 1 ;
      var blueFadeDur  = [0, 0, 0, 0, 0, 0, 1] ;
      var blueFade     = document.fade(blueFadeDur) ;
      
      blueFade[0].child.end = function() {
        jar.blue.flash(3, viz.fadeDuration / 3) ;
      } ;

      jar.lid.add_transition(blueFade) ;

      for ( var kitem = 0 ; kitem < jar.fruit.item.length ; kitem++ ) {
        if ( jar.fruit.item[kitem].is_collected() === true ) {
          jar.fruit.item[kitem].add_transition( document.fade( [.25, .5, 0] ) ) ;
        }
      }

    } else if ( jar.fruit.code.length === 1 ) { // this jar reprsents a prime number i.e. contains a single "prime viz.fruit"

      jar.open() ;
      jar.focus(duration) ;
      jar.showprime() ; // show the selected jar's primefruit whether or not it has been collected yet

      if ( viz.collected[jar.fruit.code] === undefined ) {
        viz.collected[jar.fruit.code] = true ;
      }

    } else {
      console.log('jar helper error?') ;
    }

  },

  showprime: function jar_helper_showprime( jar ) {

    if ( jar === undefined ) {
      jar = this ;
    }

    var scale0 = jar.scale0 ;
    var scale1 = jar.scale1 ;
    var viz    = jar.viz ;

    var viz = jar.viz ;

    jar.fruit.item[0].show() ;

    // fk.add_transition(fruitHelper.x_scale()) ;
    // fk.add_transition(fruitHelper.y_scale()) ;

    for ( var kfruit = 0 ; kfruit < viz.fruit.length ; kfruit++ ) {

      if ( kfruit === jar.config.k ) {
        continue ;
      }

      for ( var kitem = 0 ; kitem < viz.fruit[kfruit].item.length ; kitem++ ) {

        if ( jar.fruit.item[0].image === viz.fruit[kfruit].item[kitem].image ) {

          viz.fruit[kfruit].item[kitem].pulse() ;

        }

      }

    }

  },

  grab: function jar_helper_grab ( jar ) {

    if ( jar === undefined ) {
      jar = this ;
    }

    var viz = jar.viz ;

    for ( var kitem = 0 ; kitem < jar.fruit.item.length ; kitem++ ) {
      
        var fk        = jar.fruit.item[kitem] ;
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
            viz.prime[endConfig.index].white.add_transition( document.fade([1, 0]), replacementSwitch ) ;
          
          },

        } ;

        var xTrans = fruitHelper.x_trans(viz, fk.code) ;
        var yTrans = fruitHelper.y_trans(viz, fk.code) ;

        var shift = 50 * kitem ;

        var xTrans0 = transitionHelper.new_linear('x', shift, viz.fadeDuration * 3) ; 
        xTrans0.child = xTrans ;

        var yTrans0 = transitionHelper.new_linear('y', shift, viz.fadeDuration * 3) ; 
        yTrans0.child = yTrans ;

        fk.add_transition(trans) ;
        fk.add_transition(xTrans0) ;
        fk.add_transition(yTrans0) ;    
        // fk.add_transition(fruitHelper.x_scale()) ;
        // fk.add_transition(fruitHelper.y_scale()) ;
      
    }

    jar.fade({

      duration: viz.fadeDuration,
      opacity: 0,
      end: function() {
        jar.remove() ;
        viz.scoreup() ;
      },

    }) ;

  },

  all_collected: function jar_helper_all_collected( jar ) { // attach this function to the jar objects inside the for loop below

    if ( jar === undefined ) {
      jar = this ;
    }

    var jarCode = jar.fruit.code ;

    if ( jarCode.length === 1 ) {
      return false ; // prime
    }

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

    jar.unlocked = true ;

    function flash_func( ) {

      var flashDuration = [0, 1] ;
      var fadeTrans = document.fade(flashDuration)[0] ;
      return fadeTrans ;

    } ;

    jar.lid.white.loop(flash_func) ;

    var lidFade = document.fade([1])[0] ;

    lidFade.end = function () {
      jar.lid.image = jarHelper.lidImage[1] ;
    } ;

    jar.lid.add_transition(lidFade) ;

  },

  is_open: function jar_helper_is_open( jar ) {

    if ( jar === undefined ) {
      jar = this ;
    }

    if ( jar.unlocked === true ) {
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

    jar.blue.opacity = 0 ;
    // jar.lid.white.add_transition(document.fade(jar.doub)) ;
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
            viz.unlock_ripened() ;

          },
        
        }) ;

      },
    }) ;

  },

  focus: function jar_helper_focus( duration, pause, jar ) {

    if ( jar === undefined ) {
      jar = this ;
    }

    var viz = jar.viz ;

    viz.busy = true ; 

    var o1 = 0.4 ;
    var o2 = 1 ; 

    for ( var kjar = 0 ; kjar < viz.jar.length ; kjar++ ) {
      
      if( viz.jar[kjar] === jar) {
        continue ;
      }

      var trans = transitionHelper.new_sequence( [o1, o2], transitionHelper.fixed_duration_linear('opacity', duration ) ) ;
      
      trans[0].pause = duration * 2 ;
      // console.log('trans', trans) ;
      // console.log('transitionHelper.copy( trans )', transitionHelper.copy( trans ) ) ;
      viz.jar[kjar].lid.add_transition( transitionHelper.copy( trans ) ) ;
      viz.jar[kjar].blue.add_transition( transitionHelper.copy( trans ) ) ;

      trans[0].child.end = {
        viz: viz,
        run: function() {
          this.viz.busy = false ;
          this.viz.open_next() ;
        }
      } ;

      viz.jar[kjar].add_transition( trans ) ;

    }

  },

} ;