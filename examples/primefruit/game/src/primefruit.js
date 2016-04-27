function primefruit() {

/***
  
    primes <= 25: 2 3 5 7 11 13 17 19 23
    
    factorizations for i <= 25:

     2
     3
     2     2
     5
     2     3
     7
     2     2     2
     3     3
     2     5
    11
     2     2     3
    13
     2     7
     3     5
     2     2     2     2
    17
     2     3     3
    19
     2     2     5
     3     7
     2    11
    23
     2     2     2     3
     5     5

***/  

  console.log('prime viz.fruit: start') 

  /*
   * when using vizflow it's easier to create the viz object and then add the items to it afterwards:
   */


  var duration = 150 ;
  var width  = 320 ;
  var height = 320 ;
  var vizConfig = {
    width: width,
    height: height,
  } ;
  
  var viz = vizHelper.setup(vizConfig) ; // first create generic vizflow configuration object, then add application-specific details

  var Nprime = 9 ;
  var N      = 25 ; // how many numbers to represent with viz.fruit baskets
  var Ncol   = 5 ; // how many columns to arrange the baskets in 
  var xGrid  = 64 ;
  var yGrid  = 64 ;
  var Nside     = Math.sqrt(Nprime) ;
  var xGridMini = xGrid / Nside ;
  var yGridMini = yGrid / Nside ;


  var tileWidth = 47 ; 
  var rowHeight = 52 ;

  var scale0 = 3 ;
  var scale1 = xGridMini / xGrid ;

  var x0 = width  * 0.5 - (tileWidth * scale0) * 0.5 ;
  var y0 = height * 0.5 - (rowHeight * scale0) * 0.5 ;

  var sprite = spriteHelper.get
  ( 
    imageHelper.to_canvas('./image/fruit.gif'), 
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'], 
    tileWidth, 
    rowHeight // function argument list, so no trailing comma 
  ) ;

  // console.log('prime viz.fruit', 'sprite', sprite);

  viz.fruit  = new Array(N - 1) ; // initialize array of viz.fruit 
  viz.jar    = new Array(N - 1) ; // initialize array of jars 
  viz.target = N - 1 ;
  viz.score  = 0 ;

  var code = [
    'a',
    'b',
    'aa',
    'c',
    'ab',
    'd',
    'aaa',
    'bb',
    'ac',
    'e',
    'aab',
    'f',
    'ad',
    'bc',
    'aaaa',
    'g',
    'abb',
    'h',
    'aac',
    'bd',
    'ae',
    'i',
    'aaab',
    'cc',
  ] ;

  var key = {
    'a': 2,
    'b': 3,
    'c': 5,
    'd': 7,
    'e': 11,
    'f': 13,
    'g': 17,
    'h': 19,
    'i': 23,
  } ;

  var yOffset = 37 ;
  var xOffset = -3 ;
  var xSpace  = 5 ;
  var initialScale = 0.5 ;

  // var text  = imageHelper.text_sprite() ;

  var textWidth    = 32 ;
  var textHeight   = 32 ;
  var text         = spriteHelper.get_text(document.textUrl, textWidth, textHeight) ;
  text             = spriteHelper.foreach(text, imageHelper.get_original) ;
  var overlapScale = 0.25 ;

  function all_collected( jar ) { // attach this function to the viz.jar objects inside the for loop below

    if ( jar === undefined ) {
      jar = this ;
    }

    var jarCode = code[jar.config.k] ;

    for ( var k = 0 ; k < jarCode.length ; k++ ) {
      if( viz.collected[jarCode[k]] === undefined ) {
        return false ;
      }
    }

    return true ; 

  }

  function any_collected( jar ) { // attach this function to the viz.jar objects inside the for loop below

    if ( jar === undefined ) {
      jar = this ;
    }

    var jarCode = code[jar.config.k] ;

    for ( var k = 0 ; k < jarCode.length ; k++ ) {
      if( viz.collected[jarCode[k]] !== undefined ) {
        return true ;
      }
    }

    return false ; 

  }

  function open( jar ) {

    if( jar === undefined ) { 
      jar = this ;
    }

    jar.image = jar.image2 ;

  }

  var jarImage = imageHelper.adjust_ratio(imageHelper.to_canvas('./image/jar.png')) ;    
  var openImage = imageHelper.adjust_ratio(imageHelper.to_canvas('./image/jarOpen.png')) ;

  viz.prime = new Array(Nprime) ;

  for ( var k = 0 ; k < N - 1 ; k++ ) { // setup the jars of viz.fruit

    var x = xGrid * ((k + 1) % Ncol) ;
    var y = Math.floor((k + 1) / Ncol) * yGrid  ;

    viz.fruit[k] = {} ; // initialize viz.fruit element

    viz.fruit[k].item = new Array(code[k].length) ;

    for( var kitem = 0 ; kitem < code[k].length ; kitem++ ) {

      var fruitConfig = {

        viz: viz,
        x: x + xOffset + tileWidth * overlapScale * kitem + xSpace,
        y: y + yOffset,
        xScale: initialScale,
        yScale: initialScale,
        opacity: 0,
        image: sprite[code[k][kitem]][0],
        addSwitch: true,

      } ;

      viz.fruit[k].item[kitem] = itemHelper.setup(fruitConfig) ; // each tile contains some viz.fruit
      viz.fruit[k].item[kitem].default_child() ;
      viz.fruit[k].item[kitem].code = code[k][kitem] ; 

      // console.log('pf: ', 'k', k, 'fruitConfig', fruitConfig) ;

    }

    if ( code[k].length === 1 ) { 
      var index = code[k].charCodeAt(0) - 'a'.charCodeAt(0) ;
      viz.prime[index] = viz.fruit[k].item[0] ;
    }
    
    var jarConfig = {

      viz: viz,
      image: imageHelper.copy(jarImage),
      x: x,
      y: y,
      addSwitch: true,
      uiSwitch: true,
      callback: jarclick,
      k: k,

    } ;

    viz.jar[k]   = itemHelper.setup( jarConfig ) ;
    var xJar = 40 ;
    var yJar = 42 ;
    var xPad = [25, 25, 25] ;

    var digit = imageHelper.text2image({
      text: k + 2,
      sprite: text,
      xShift: 0,
    }) ;

    viz.jar[k].image.context().drawImage( digit, xJar - xPad[Math.floor((k + 2) / 10)], yJar ) ;

    viz.jar[k].image2 = imageHelper.copy(openImage) ;
    viz.jar[k].image2.context().drawImage( digit, xJar - xPad[Math.floor((k + 2) / 10)], yJar ) ;

    viz.jar[k].all_collected = all_collected ;
    viz.jar[k].any_collected = any_collected ;
    viz.jar[k].open          = open ;

    // tile[k].default_child() ;
    // tile[k].child.push(tile[k].viz.jar) ;

  } // end loop over tiles/jars

  var x_scale_func = $Z.transition.linear_transition_func('xScale', duration) ;
  var y_scale_func = $Z.transition.linear_transition_func('yScale', duration) ;

  function fade(fadeVal) {

    return imageEffectHelper.fade_sequence({ 
      duration: duration,
      value: fadeVal
    }) ;

  }

  function x_scale(shift) {

    if ( shift === undefined ) {
      shift = 0 ;
    }

    var xScaleTrans = x_scale_func(scale0) ;
    xScaleTrans.pause = duration * 3 ;
    xScaleTrans.child = x_scale_func(scale1) ;
    return xScaleTrans ;

  }

  function y_scale(shift) {

    if ( shift === undefined ) {
      shift = 0 ;
    }

    var yScaleTrans = y_scale_func(scale0) ;
    yScaleTrans.pause = duration * 3 ;
    yScaleTrans.child = y_scale_func(scale1) ;     
    return yScaleTrans ;

  }

  function y_trans(code) {

    var index = code.charCodeAt(0) - 'a'.charCodeAt(0) ;
    var row  = Math.floor(index / Nside) ;
    var yNew = row * yGridMini ;    
    return transitionHelper.new_linear('y', yNew, duration) ;

  }

  function x_trans(code) {

    var index = code.charCodeAt(0) - 'a'.charCodeAt(0) ;
    var col  = index % Nside ;
    var xNew = col * xGridMini ;
    return transitionHelper.new_linear('x', xNew, duration) ;

  }

  function show_primefruit(jar) {

    var fk = viz.fruit[jar.config.k].item[0] ;

    fk.fade({

      duration: duration,
      opacity: 1,
      end: function() {
        fk.white.add_transition(fade([1, 1, 0])) ;
      },

    }) ;

    var xTrans0 = transitionHelper.new_linear('x', x0, duration * 4) ;
    var yTrans0 = transitionHelper.new_linear('y', y0, duration * 4) ;

    xTrans0.child = x_trans(code[jar.config.k]) ;
    yTrans0.child = y_trans(code[jar.config.k]) ;

    fk.add_transition(xTrans0) ;
    fk.add_transition(yTrans0) ;    
    fk.add_transition(x_scale()) ;
    fk.add_transition(y_scale()) ;

    for ( var kfruit = 0 ; kfruit < viz.fruit.length ; kfruit++ ) {

      if ( kfruit === jar.config.k ) {
        continue ;
      }

      for ( var kitem = 0 ; kitem < viz.fruit[kfruit].item.length ; kitem++ ) {

        if ( fk.image === viz.fruit[kfruit].item[kitem].image ) {
          viz.fruit[kfruit].item[kitem].add_transition(fade([.5, 1, .75, .5])) ;
        }

      }

    }

  }

  viz.win = function win() {
    viz.prime.forEach(function(d) {
      var duration2 = 3 * duration ;
      var offset = 20 ;
      d.add_linear('xScale', 1, duration2) ;
      d.add_linear('yScale', 1, duration2) ;
      d.add_linear('x', d.x * Ncol + offset, duration2) ;
      d.add_linear('y', d.y * Ncol + offset, duration2) ;
      d.white.add_transition(fade([0, 1, 1, 1, 0])) ;
      var reset = transitionHelper.new_step('reset', undefined, duration * 5) ;
      reset.end = function() {
        viz.fade({
          duration: duration * 5,
          opacity: 0,
          end: function() {
            load_game() ;
          },
        })
      } ;
      viz.add_transition(reset) ;

    }) ;
  } ;

  viz.scoreup = function() {
    viz.score += 1 ;
    if ( viz.score === viz.target ) {
      console.log('you win!') ;
      viz.win() ;
    }
  } ;

  function bg_jar(jar) {
    var o1 = .4 ;
    var bgFade = [o1, o1, o1, o1, 1] ;

    for ( var kjar = 0 ; kjar < viz.jar.length ; kjar++ ) {
      
      if( viz.jar[kjar] === jar) {
        continue ;
      }

      viz.jar[kjar].add_transition(fade(bgFade)) ;

    }    
  }

  function jarclick(jar) {
    
    if ( jar === undefined ) { 
      jar = this ;
    }

    if ( viz.busy === true ) { 
      return ;
    }

    viz.busy = true ;

    viz.add_sequence([true, false], transitionHelper.fixed_duration_step('busy', duration * 6)) ;

    var jarFade = [0, 0, 0, 0, 1] ;

    // console.log('jarclick: ', 'jar', jar, 'jarFade', jarFade) ;

    if ( jar.any_collected() ) {

      jar.fade({

        duration: duration,
        opacity: 0,
        end: function() {
          jar.remove() ;
          viz.scoreup() ;
        },

      }) ;

      for ( var kitem = 0 ; kitem < viz.fruit[jar.config.k].item.length ; kitem++ ) {
      
        var fk = viz.fruit[jar.config.k].item[kitem] ;
    
        var fruitFade = [1, 1, 1, 1, .25] ;
        var trans = fade(fruitFade) ;
        var index = fk.code.charCodeAt(0) - 'a'.charCodeAt(0) ;

        transitionHelper.get_child(trans[0], fruitFade.length - 1).end = {
          
          index: index, 

          item: fk,

          run: function(endConfig) {
            
            if ( endConfig === undefined ) {
              endConfig = this ;
            }

            endConfig.item.remove() ;
            var replacementSwitch = false ;
            viz.prime[endConfig.index].white.add_transition(fade([1, 0]), replacementSwitch) ;
            jar_open_next() ;
          
          },

        } ;

        var xTrans = x_trans(fk.code) ;
        var yTrans = y_trans(fk.code) ;

        var shift = 50 * kitem ;

        var xTrans0 = transitionHelper.new_linear('x', x0 + shift, duration * 3) ; 
        xTrans0.child = xTrans ;

        var yTrans0 = transitionHelper.new_linear('y', y0, duration * 3) ; 
        yTrans0.child = yTrans ;

        fk.add_transition(trans) ;
        fk.add_transition(xTrans0) ;
        fk.add_transition(yTrans0) ;    
        fk.add_transition(x_scale()) ;
        fk.add_transition(y_scale()) ;
      
      }

      bg_jar(jar) ;

    } else if ( jar.image !== jar.image2 ) { // jar is closed

      jar.flash(
        10,
        0.25 * duration // no trailing comma for arglists
      ) ;

      for ( var kitem = 0 ; kitem < viz.fruit[jar.config.k].item.length ; kitem++ ) {

        if ( viz.collected[code[jar.config.k]] === undefined) {
          continue ;
        }
      
        viz
          .fruit[ jar.config.k ]
          .item[ kitem ] ( fade ( [1, 1, 0] ) ) ;
      
      }

    } else if ( code[jar.config.k].length === 1 ) { // this jar reprsents a prime number i.e. contains a single "prime viz.fruit"

      jar.fade({
        duration: duration,
        opacity: 0,
        end: function() {
          jar.remove() ;
          viz.scoreup() ;
          jar_image_update() ;
        },
      }) ;

      bg_jar(jar) ;

      show_primefruit(jar) ; // show the selected jar's primefruit whether or not it has been collected yet

      if ( viz.collected[code[jar.config.k]] === undefined ) {
        viz.collected[code[jar.config.k]] = true ;
      }

      // } else { // white flash reminds the player that they already collected the fruit from the selected jar 
        // viz.fruit[jar.config.k].item[0].white.add_transition(fade([1, 0])) ;
      // }

    }

  }

  viz.collected = {} ; // the goal of the game is to collect all of the prime fruits
  viz.current   = 'a'.charCodeAt(0) ;

  viz.jar[0].open() ;

  function jar_image_update() {
    
    var curr = String.fromCharCode(viz.current) ;
    // var next = String.fromCharCode(viz.current + 1) ;
    var kCurr = key[curr] - 2 ;
    
    // var kNext = key[next] - 1 ;

    var count = 0 ;
    
    for ( var kJar = kCurr ; kJar < viz.jar.length ; kJar++ ) {

      if ( viz.jar[kJar].removeSwitch === true ) { 
        continue ;
      }
      
      // console.log('jar_image_update: ', 'kNext', kNext, 'kJar', kJar) ;
      
      if( code[ viz.jar[kJar].config.k ].contains(curr) ) {
        viz.jar[kJar].open() ;        
        count++ ;
      }

    }
  
  }

  function jar_open_next() {
    var count = 0 ;
    for ( var kjar = 0 ; kjar < viz.jar.length ; kjar++ ) {
      if ( viz.jar[kjar].removeSwitch === undefined && viz.jar[kjar].image === viz.jar[kjar].image2 ) { // jar is open and waiting to be selected for removal
        count++ ;
      }
    }
    if ( count === 0 ) {
      viz.current += 1 ;
      curr = String.fromCharCode(viz.current) ;
      kCurr = key[curr] - 2 ; 
      viz.jar[kCurr].open() ;       
    }    
  }

  viz.setup_ui() ;
  viz.run() ;

  console.log('viz', viz) ;

}