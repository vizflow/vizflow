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

  // console.log('prime viz.fruit: start') ;

  /*
   * when using vizflow it's easier to create the viz object and then add the items to it afterwards:
   */

  var duration = 200 ;
  var width    = 320 ;
  var height   = 320 ;

  var vizConfig = {
    width:  width,
    height: height,
    fadeDuration: duration,
    opacity: 0,
  } ;
  
  var viz = vizHelper.setup(vizConfig) ; // first create generic vizflow configuration object, then add application-specific details

  viz.Nprime    = 9 ;
  viz.N         = 25 ; // how many numbers to represent with viz.fruit baskets
  viz.Ncol      = 5 ; // how many columns to arrange the baskets in 
  viz.xGrid     = 64 ;
  viz.yGrid     = 64 ;
  viz.Nside     = Math.sqrt(viz.Nprime) ;
  viz.xGridMini = viz.xGrid / viz.Nside ;
  viz.yGridMini = viz.yGrid / viz.Nside ;

  viz.tileWidth = 47 ; 
  viz.rowHeight = 52 ;

  // console.log('prime viz.fruit', 'sprite', sprite);

  viz.fruit  = new Array(viz.N - 1) ; // initialize array of viz.fruit 
  viz.jar    = new Array(viz.N - 1) ; // initialize array of jars 
  viz.target = viz.N - 5 ;
  viz.score  = 0 ;

  viz.code = [
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

  viz.key = {
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

  // var text  = imageHelper.text_sprite() ;

  var textWidth  = 32 ;
  var textHeight = 32 ;
  var text       = spriteHelper.get_text(document.textUrl, textWidth, textHeight) ;
  viz.text       = spriteHelper.foreach(text, imageHelper.get_original) ;

  document.fade = function fade(fadeVal) {

    return imageEffectHelper.fade_sequence({ 

      duration: duration,
      value: fadeVal,

    }) ;

  } ;

  viz.prime = new Array(viz.Nprime) ;

  for ( var k = 0 ; k < viz.N - 1 ; k++ ) { // setup the jars of viz.fruit

    var x = viz.xGrid * ((k + 1) % viz.Ncol) ;
    var y = Math.floor((k + 1) / viz.Ncol) * viz.yGrid  ;

    viz.fruit[k] = fruitHelper.setup(viz, k, x, y) ;

    if ( viz.code[k].length === 1 ) { 
      var index = viz.code[k].charCodeAt(0) - 'a'.charCodeAt(0) ;
      viz.prime[index] = viz.fruit[k].item[0] ;
    }
    
    viz.jar[k] = jarHelper.setup(viz, k, x, y) ;

  } // end loop over tiles/jars

  viz.scoreup = function viz_scoreup() {

    viz.score += 1 ;

    if ( viz.score === viz.target ) { // you win!

      var count = 0 ;

      for ( kjar = 0 ; kjar < viz.jar.length ; kjar++ ) {

        var jar = viz.jar[kjar] ;

        if ( jar.removeSwitch === true ) {
          continue ;
        }

        jar.unlock() ;

        jar.call('show_prime', jar.duration + count * 8 * jar.duration) ;

        count++ ;

      }

      // var dur = (2 + 4 * 8) * jar.duration  ;

      setTimeout(function() { viz.win() ; }, 6500) ;

    }
  } ;

  viz.win = function win() {

    console.log('you win!') ;

    viz.prime.forEach(function(d) {

      var duration2 = 3 * duration ;
      var offset = 20 ;
      d.add_linear('xScale', 1, duration2) ;
      d.add_linear('yScale', 1, duration2) ;
      d.add_linear('x', d.x * viz.Ncol + offset, duration2) ;
      d.add_linear('y', d.y * viz.Ncol + offset, duration2) ;
      d.white.add_transition(document.fade([0, 1, 1, 1, 0])) ;

      var reset = transitionHelper.new_step('reset', undefined, duration * 5) ;

      reset.end = function() {

        viz.fade({

          duration: duration * 5,
          opacity: 0,
          
          end: function() {
            load_game() ;
          },

        }) ;

      } ;

      viz.add_transition(reset) ;

    }) ;

  } ;  

  viz.all_closed = function viz_all_closed() {

    for (var k = 0 ; k < viz.jar.length ; k++ ) {
      
      if ( viz.jar[k].removeSwitch === true ) {
        continue ;
      }

      if ( viz.jar[k].is_open() ) {
        // console.log('primefruit all_closed: ', 'k', k, 'viz.jar[k]', viz.jar[k])
        return false ;
      }

    }

    // console.log('primefruit all_closed: ', true) ;

    return true ;

  } ;

  viz.collected = {} ; // the goal of the game is to collect all of the prime fruits
  viz.current = 'a'.charCodeAt(0) ;

  viz.setup_ui() ;
  viz.run() ;

  viz.unlock_jars = function unlock_jars( viz ) { 

    if ( viz === undefined ) {
      viz = this ;
    }

    // console.log('unlock jars start') ;
    
    for ( var kJar = 0 ; kJar < viz.jar.length ; kJar++ ) {

      if ( viz.jar[kJar].removeSwitch === true ) { 
        continue ;
      }
            
      if( viz.jar[kJar].all_collected() ) {
        viz.jar[kJar].unlock() ;
        // count++ ;
      }

    }

    viz.open_next() ;
  
  } ;

  viz.open_next = function open_next( viz ) { 

    if ( viz === undefined ) { 
      viz = this ;
    }

    if ( viz.all_closed() ) {

      viz.current++ ;  
      curr  = String.fromCharCode( viz.current ) ;

      if ( viz.key[curr] === undefined ) {
        return ;
      }

      kCurr = viz.key[curr] - 2 ; 
      // console.log( 'viz.current', viz.current, 'curr', curr, 'kCurr', kCurr ) ;
      viz.jar[kCurr].unlock() ;

    }

  } ;

  viz.fruit_pulse = function fruit_pulse( viz ) {

    if ( viz === undefined ) {
      viz = this ; 
    }

    for ( var kfruit = 0 ; kfruit < viz.fruit.length ; kfruit++ ) {

      for ( var kitem = 0 ; kitem < viz.fruit[kfruit].item.length ; kitem++ ) {

        if ( viz.fruit[kfruit].item[kitem].is_prime() ) {
          continue ;
        }

        if ( viz.fruit[kfruit].item[kitem].removeSwitch === true ) {
          continue ;
        }

        if ( viz.fruit[kfruit].item[kitem].is_collected() ) {
          viz.fruit[kfruit].item[kitem].pulse() ;
        }

      }

    }

  } ;

  viz.reset = function viz_reset ( viz ) {

    if ( viz === undefined ) {
      viz = this ;
    }

    viz.busy = false ;

  } ;

  viz.fade({
    
    duration: viz.fadeDuration * 5,
    
    end: function() {
     viz.jar[0].unlock() ;
    },

  }) ;

}