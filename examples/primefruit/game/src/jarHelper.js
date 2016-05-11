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

    var lidConfigBlue = Object.copy( lidConfig ) ;
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
    jarK.y0         = 0.5 * viz.height + 76 ;
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

    jarK.default_child() ;

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

      jar.white.add_transition(document.fade([.75, 0])) ;

      if ( jar.all_collected() ) {
        jar.show_composite() ;
      } else if ( jar.unlocked !== true ) { // jar is closed
        jar.show_locked() ;
      } else if ( jar.fruit.code.length === 1 ) { // this jar reprsents a prime number i.e. contains a single "prime viz.fruit"
        jar.show_prime() ;
      } 

    },

    show_composite: function jar_helper_show_composite ( jar ) {

      if ( jar === undefined ) {
        jar = this ;
      }

      var viz = jar.viz ;

      jar.prep('grab') ;

    },


    grab: function jar_helper_grab( jar ) {

      if ( jar === undefined ) {
        jar = this ;
      }

      var delay = jar.fruit.item[0].duration * 3 ;      
      var dur = 2 * jar.duration + delay ;

      jar.call(['fruit_grab', 'shrink', 'cleanup'], [jar.duration, dur, jar.duration]) ;

    },

    fruit_grab: function jar_helper_method_fruit_grab( jar ) {
      
      if ( jar === undefined ) {
        jar = this ;
      }

      var delay = jar.fruit.item[0].duration * 5 ;
      
      for ( var kitem = 0 ; kitem < jar.fruit.item.length ; kitem++ ) {        
        jar.fruit.item[kitem].grab() ;
      }
    
    },

    show_locked: function jar_helper_show_locked( jar ) {

      if ( jar === undefined ) {
        jar = this ;
      }
    
      jar.blue.opacity = 1 ;
      var blueFadeDur  = [0, 0, 0, 0, 0, 0, 1] ;
      var blueFade     = document.fade( blueFadeDur ) ;
      
      blueFade[0].child.end = function() {
        jar.blue.flash( 3, jar.viz.fadeDuration / 3 ) ;
        jar.viz.unlock_jars() ;
      } ;

      jar.lid.add_transition(blueFade) ;

    },

    show_prime: function jar_helper_show_prime( jar ) {

      if ( jar === undefined ) {
        jar = this ;
      }

      jar.prep('primetrans') ;

      if ( jar.viz.collected[jar.fruit.code] === undefined ) {
        jar.viz.collected[jar.fruit.code] = true ;
      }

    },

    center: function jar_helper_method_center ( jar ) {

      if ( jar === undefined ) {
        jar = this ;
      }

      jar.add_linear( 'x', jar.x0, jar.duration ) ;
      jar.add_linear( 'y', jar.y0, jar.duration ) ;        

    },

    prep: function jar_helper_method_prep( callback, jar ) {

      if ( jar === undefined ) {
        jar = this ;
      }

      function resize() {
        jar.resize(jar.scale1) ;          
      }

      jar.focus(jar.opacityLow) ;
      jar.call(['center', resize, 'open', callback ], [jar.duration * 3, jar.duration, jar.duration, jar.duration] ) ;

    },

    shrink: function jar_helper_method_shrink ( jar ) {

      if ( jar === undefined ) {
        jar = this ;
      }

      jar.resize(0) ;
      jar.fade({ duration: jar.duration, opacity: 0 }) ;
    },

    cleanup: function jar_helper_method_cleanup( jar ) {

      if ( jar === undefined ) {
        jar = this ;
      }

      jar.focus(1) ;
      jar.call('exit', jar.duration) ;

    },

    primetrans: function jar_helper_primetrans( jar ) {

      if ( jar === undefined ) {
        jar = this ;
      }

      var viz = jar.viz ;

      function callback() {
        
        jar.focus(1) ;
        jar.viz.call('fruit_pulse', jar.duration) ;
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

          duration: jar.duration,
          opacity: 0,

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

      // console.log('jar exit start', 'jar', jar) ;

      // jar.fade() ;
      jar.resize(0) ;

      function jar_remove_func() {
        jar.remove() ;
        jar.viz.scoreup() ;
        jar.viz.unlock_jars() ;
      }

      jar.call(jar_remove_func, 2 * jar.duration) ;

    },

    resize: function jar_helper_resize( scale, dur, jar ) {
      
      if ( jar === undefined ) { 
        jar = this ; 
      }

      if ( dur === undefined ) { 
        dur = jar.duration ;
      }

      jar.add_linear('xScale', scale, dur) ;
      jar.add_linear('yScale', scale, dur) ;

    },

    focus: function jar_helper_focus( o1, callback, jar ) {

      if ( jar === undefined ) {
        jar = this ;
      }

      if ( o1 === undefined ) {
        if ( jar.viz.jar.every( function(jar) { return jar.removeSwitch === true || jar.opacity == 1 ; } ) ) {
          o1 = jar.opacityLow ;
        } else {
          o1 = 1 ;
        }
      }

      var viz = jar.viz ;

      var trans = transitionHelper.new_linear( 'opacity', o1, jar.duration * 3 ) ;

      for ( var kjar = 0 ; kjar < viz.jar.length ; kjar++ ) {
        
        for ( var kfruit = 0 ; kfruit < viz.jar[kjar].fruit.item.length ; kfruit++ ) { 
          
          var fk = viz.jar[kjar].fruit.item[kfruit] ;
          
          if ( o1 < 1 && !( viz.collected[fk.code] && fk.is_prime() ) ) {
            fk.remove_transition('opacity') ;
            fk.opacity = 0 ;
          } 

        }

        if( viz.jar[kjar] === jar) {
          continue ;
        }

        viz.jar[kjar].lid.remove_transition('opacity') ;
        viz.jar[kjar].lid.white.remove_transition('opacity') ;        
        viz.jar[kjar].lid.add_transition( trans ) ;
        viz.jar[kjar].blue.add_transition( trans ) ;
        viz.jar[kjar].add_transition( trans ) ;

      }

      if ( o1 === 1 ) {
        fk.viz.call('fruit_pulse', jar.duration) ; // restore the pulsing
      }

      if ( callback !== undefined ) {
        jar.call(callback, jar.duration) ;
      }

    },  

  },

} ;