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

  var duration = 500 ;
  var width  = 320 ;
  var height = 320 ;

  var vizConfig = {
    width: width,
    height: height,
  } ;
  
  var viz = vizHelper.setup(vizConfig) ; // first create generic vizflow configuration object, then add application-specific details

  var N     = 25 ; // how many numbers to represent with viz.fruit baskets
  var Ncol  = 5 ; // how many columns to arrange the baskets in 
  var xGrid = 64 ;
  var yGrid = 64 ;

  var tileWidth = 47 ; 
  var rowHeight = 52 ;

  var sprite = spriteHelper.get
  ( 
    imageHelper.image2canvas('./image/fruit.gif'), 
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'], 
    [tileWidth, tileWidth, tileWidth, tileWidth, tileWidth, tileWidth, tileWidth, tileWidth, tileWidth], 
    [rowHeight, rowHeight, rowHeight, rowHeight, rowHeight, rowHeight, rowHeight, rowHeight, rowHeight] // function argument list, so no trailing comma 
  ) ;

  // console.log('prime viz.fruit', 'sprite', sprite);

  viz.fruit = new Array(N - 1) ; // initialize array of viz.fruit 
  viz.jar   = new Array(N - 1) ; // initialize array of jars 

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

  var yOffset = 30 ;
  var xOffset = 0 ;

  var text  = imageHelper.text_sprite() ;
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

  for ( var k = 0 ; k < N - 1 ; k++ ) { // setup the jars of viz.fruit

    var x = xGrid * ((k + 1) % Ncol) ;
    var y = Math.floor((k + 1) / Ncol) * yGrid  ;

    viz.fruit[k] = {} ; // initialize viz.fruit element

    viz.fruit[k].item = new Array(code[k].length) ;

    for( var kitem = 0 ; kitem < code[k].length ; kitem++ ) {

      var fruitConfig = {

        viz: viz,
        x: x + xOffset + tileWidth * overlapScale * kitem,
        y: y + yOffset,
        xScale: 0.7,
        yScale: 0.7,
        opacity: 0,
        image: sprite[code[k][kitem]][0],
        addSwitch: false,

      } ;

      viz.fruit[k].item[kitem] = itemHelper.setup(fruitConfig) ; // each tile contains some viz.fruit
      viz.fruit[k].item[kitem].default_child() ;

      // console.log('pf: ', 'k', k, 'fruitConfig', fruitConfig) ;

    }
    
    var jarImage = imageHelper.adjust_ratio(imageHelper.image2canvas('./image/jar.png')) ;    

    var jarConfig = {

      viz: viz,
      image: jarImage,
      x: x,
      y: y,
      addSwitch: true,
      uiSwitch: true,
      callback: jarclick,
      k: k,

    } ;

    viz.jar[k]   = itemHelper.setup( jarConfig ) ;
    var xJar = 40 ;
    var yJar = 50 ;
    var xPad = [0, 20, 19] ;

    var digit = imageHelper.text2image({
      text: k + 2,
      sprite: text,
    }) ;

    viz.jar[k].image.context().drawImage( digit, xJar - xPad[Math.floor((k + 2) / 10)], yJar ) ;

    viz.jar[k].all_collected = all_collected ;

    // tile[k].default_child() ;
    // tile[k].child.push(tile[k].viz.jar) ;

  }

  var x_scale = $Z.transition.linear_transition_func('xScale', duration) ;
  var y_scale = $Z.transition.linear_transition_func('yScale', duration) ;

  function show_primefruit(jar) {

    var Nprime    = 9 ;
    var Nside     = Math.sqrt(Nprime) ;
    var xGridMini = xGrid / Nside ;
    var yGridMini = yGrid / Nside ;

    var scale0 = 3 ;
    var scale1 = xGridMini / xGrid ;

    var xScaleTrans = x_scale(scale0) ;
    var yScaleTrans = y_scale(scale0) ;

    xScaleTrans.pause = duration ;
    yScaleTrans.pause = duration ;

    xScaleTrans.child = x_scale(scale1) ;
    yScaleTrans.child = y_scale(scale1) ; 

    var fk   = viz.fruit[jar.config.k].item[0] ;

    fk.fade({
      duration: duration,
      opacity: 1,
    }) ;

    // xScaleTrans.end = function() {

    var index = code[jar.config.k].charCodeAt(0) - 'a'.charCodeAt(0) ;

    var row       = Math.floor(index / Nside) ;
    var col       = index % Nside ;
    var xNew      = col * xGridMini ;
    var yNew      = row * yGridMini ;

    fk.add_linear('x', xNew, duration) ;
    fk.add_linear('y', yNew, duration) ;

    // } ;

    xScaleTrans.pause = duration ;

    fk.add_transition(xScaleTrans) ;
    fk.add_transition(yScaleTrans) ;

  }

  function jarclick(jar) {
    
    if ( jar === undefined ) { 
      jar = this ;
    }

    if ( viz.busy === true ) { 
      return ;
    }

    viz.busy = true ;

    viz.add_sequence([true, false], transitionHelper.fixed_duration_step('busy', duration)) ;

    function fade(fadeVal) {

      return imageEffectHelper.fade_sequence({ 
        duration: duration,
        value: fadeVal
      }) ;

    }
 
    // console.log('jarclick: ', 'jar', jar, 'jarFade', jarFade) ;

    if ( code[jar.config.k].length === 1 ) { // this jar reprsents a prime number i.e. contains a single "prime viz.fruit"

      jar.add_transition(fade([0, 0, 1])) ;
      show_primefruit(jar) ; // show the selected jar's primefruit whether or not it has been collected yet

      if ( viz.collected[code[jar.config.k]] === undefined ) {
        viz.collected[code[jar.config.k]] = true ;
      } else { // white flash reminds the player that they already collected the fruit from the selected jar 
        viz.fruit[jar.config.k].item[0].white.add_transition(fade([1, 0])) ;
      }

    } else if ( jar.all_collected() ) {

      jar.add_transition(fade([0, 0, 1])) ;

      for ( var kitem = 0 ; kitem < viz.fruit[jar.config.k].item.length ; kitem++ ) {
      
        var fk    = viz.fruit[jar.config.k].item[kitem] ;
        var trans = fade([1, 1, 0]) ;
        fk.add_transition(trans) ;
      
      }
    
    } else {

      jar.flash(
        3,
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

    }

  }

  viz.collected = {} ; // the goal of the game is to collect all of the prime fruits

  viz.fruit.forEach(function(f) { // add all the fruit items at the end to make sure they are on top of the jars during and after opacity/fade transitions
    f.item.forEach(function(d) {
      d.add() ;
    }) ;
  }) ; 

  viz.setup_ui() ;
  viz.run() ;

  console.log('viz', viz) ;

}