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

    var jarImage = imageHelper.copy(jarHelper.image) ;
    var xmid     = jarImage.originalCanvas.width * 0.5 ;
    var ymid     = jarImage.originalCanvas.height * 0.5

    var jarConfig = {

      viz: viz,
      image: jarImage,
      x: x + xmid,
      y: y + ymid,
      addSwitch: true,
      uiSwitch: true,
      callback: jarHelper.click,
      k: k,
      xOrigin: xmid,
      yOrigin: ymid,

    } ;

    var jarK = itemHelper.setup( jarConfig ) ;
    // jarK.default_child() ;

    var lidConfig = {

      viz: viz,
      image: jarHelper.lidImage[0],
      addSwitch: false,
      xOrigin: xmid,
      yOrigin: ymid,
      childFade: true,

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

    Object.assign(jarK, jarHelper.method) ;

    // jarK.flash_func    = jarHelper.flash_func ;
    jarK.fruit      = viz.fruit[k] ;
    jarK.unlocked   = false ; // jars start out locked
    jarK.x0         = 0.5 * viz.width ;
    jarK.y0         = 0.5 * viz.height ;
    jarK.duration   = 3 * viz.fadeDuration ;
    jarK.scale1     = 2.5 ;
    jarK.opacityLow = 0.05 ;

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

  method: {

    callback: function jar_helper_click( jar ) {
      
      if ( jar === undefined ) { 
        jar = this ;
      }

      var viz = jar.viz ;

      if ( viz.busy === true ) { 
        return ;
      }

      viz.busy = true ;

      if ( jar.all_collected() ) {

        jar.grab() ;

      } else if ( jar.unlocked !== true ) { // jar is closed

        jar.blue.opacity = 1 ;
        var blueFadeDur  = [0, 0, 0, 0, 0, 0, 1] ;
        var blueFade     = document.fade( blueFadeDur ) ;
        
        blueFade[0].child.end = function() {
          jar.blue.flash( 3, viz.fadeDuration / 3 ) ;
        } ;

        jar.lid.add_transition(blueFade) ;

        for ( var kitem = 0 ; kitem < jar.fruit.item.length ; kitem++ ) {
          if ( jar.fruit.item[kitem].is_collected() === true ) {
            jar.fruit.item[kitem].add_transition( document.fade( [.25, .5, 0] ) ) ;
          }
        }

        jar.focus_inout() ;


      } else if ( jar.fruit.code.length === 1 ) { // this jar reprsents a prime number i.e. contains a single "prime viz.fruit"

        jar.prime_transition() ;

      } 

    },

    grab: function jar_helper_grab ( jar ) {

      if ( jar === undefined ) {
        jar = this ;
      }

      var viz = jar.viz ;

      for ( var kitem = 0 ; kitem < jar.fruit.item.length ; kitem++ ) {
        
          var fk        = jar.fruit.item[kitem] ;
          fk.grab(kitem) ;
        
      }

      function delay1() { jar.focus(jar.opacityLow) ; }

      function delay2() { 
        jar.focus(1) ;
        jar.exit() ; 
      }

      function delay3() { 
        jar.viz.busy = false ;
      }

      jar.call([delay1, delay2, delay3], jar.duration) ;

    },

    prime_transition: function jar_helper_prime_transition( jar ) {

      if ( jar === undefined ) {
        jar = this ;
      }

      function delay1() {
        jar.resize(jar.scale1) ;  
      }

      function delay2() {
        jar.open() ;
      }
  
      function delay3() {
        jar.showprime() ; // show the selected jar's primefruit whether or not it has been collected yet        
        jar.viz.open_next() ;
        jar.viz.busy = false ;
      }

      jar.focus(jar.opacityLow) ;
      jar.add_linear('x', jar.x0, jar.duration) ;
      jar.add_linear('y', jar.y0, jar.duration) ;        
      jar.call([ delay1, delay2, delay3 ], jar.duration ) ;

      if ( jar.viz.collected[jar.fruit.code] === undefined ) {
        jar.viz.collected[jar.fruit.code] = true ;
      }

    },

    showprime: function jar_helper_showprime( jar ) {

      if ( jar === undefined ) {
        jar = this ;
      }

      var viz = jar.viz ;

      function callback() {
        
        jar.focus(1) ;

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

        jar.exit() ;

      }

      jar.fruit.item[0].show(callback) ;

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

        var flashValue = [0, 1] ;
        var fadeTrans = document.fade(flashValue)[0] ;
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

    open: function jar_helper_open( removeSwitch, jar ) {

      if ( jar === undefined ) {
        jar = this ;
      }

      function end_func() {

        jar.lid.fade({

          duration: jar.duration * 2,
          opacity: 0,
          pause: jar.duration * 2,

        }) ;

      }

      var trans = document.fade([1, 1, 1, 0])[0] ;
      trans.child.end = end_func ;

      jar.blue.opacity = 0 ;
      jar.lid.white.remove_transition('opacity') ;
      jar.lid.white.opacity = 0 ;
      jar.lid.white.add_transition(trans) ;

    },

    exit: function jar_helper_exit ( jar ) {

      if ( jar === undefined ) {
        jar = this ;
      }

      var viz = jar.viz ;

      jar.resize(0) ;

      jar.fade({
      
        duration: viz.fadeDuration * 3,

        opacity: 0,

        end: function() {

          jar.remove() ;
          viz.scoreup() ;
          viz.unlock_jars() ;

        },
      
      }) ;

    },

    resize: function jar_helper_resize( scale, jar ) {
      
      if ( jar === undefined ) { 
        jar = this ; 
      }

      jar.add_linear('xScale', scale, jar.duration) ;
      jar.add_linear('yScale', scale, jar.duration) ;

    },

    focus: function jar_helper_focus( o1, callback, jar ) {

      if ( jar === undefined ) {
        jar = this ;
      }

      var viz = jar.viz ;

      var trans = transitionHelper.new_linear('opacity', o1, jar.duration ) ;

      for ( var kjar = 0 ; kjar < viz.jar.length ; kjar++ ) {
        
        if( viz.jar[kjar] === jar) {
          continue ;
        }
        
        viz.jar[kjar].lid .add_transition( trans ) ;
        viz.jar[kjar].blue.add_transition( trans ) ;

        for ( var kfruit = 0 ; kfruit < viz.jar[kjar].fruit.item.length ; kfruit++ ) { 
          viz.jar[kjar].fruit.item[kfruit].xy_scale(0) ;
        }

        viz.jar[kjar].add_transition( trans ) ;

      }

      if ( callback !== undefined ) {
        jar.call(callback, jar.duration) ;
      }

    },  

    focus_inout: function jar_helper_focus( pause, jar ) {

      if ( jar === undefined ) {
        jar = this ;
      }

      var viz = jar.viz ;

      viz.busy = true ; 

      var o1 = 0 ;
      var o2 = 1 ; 
      var count = 0 ;

      var trans = transitionHelper.new_sequence( [o1, o2], transitionHelper.fixed_duration_linear('opacity', jar.duration ) ) ;
      trans[0].pause = jar.duration * 2 ;

      var trans0 = transitionHelper.copy(trans) ;
      
      for ( var kjar = 0 ; kjar < viz.jar.length ; kjar++ ) {
        
        if( viz.jar[kjar] === jar) {
          continue ;
        }
        
        // console.log('trans', trans) ;
        // console.log('transitionHelper.copy( trans )', transitionHelper.copy( trans ) ) ;

        viz.jar[kjar].lid.add_transition( trans0 ) ;
        viz.jar[kjar].blue.add_transition( trans0 ) ;

        for ( var kfruit = 0 ; kfruit < viz.jar[kjar].fruit.item.length ; kfruit++ ) { 

          viz.jar[kjar].fruit.item[kfruit].add_transition( trans0 ) ;

        }

        if ( count === viz.jar.length - 2 ) { 
          trans[0].child.end = {
            viz: viz,
            run: function() {
              this.viz.busy = false ;
              this.viz.open_next() ;
            }
          } ;
        }

        count++ ;

        viz.jar[kjar].add_transition( trans ) ;

      }

    },

  },

} ;