function primefruit() {

/***
  
    the primes <= 25 are: 2 3 5 7 11 13 17 19 23
    
    the prime factorizations for 1, 2, ..., 25 are :

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

  // console.log('primefruit: start') ;

  /*
   *   create the viz object first, and then add the items to it using viz.setup_item()
   */

  var duration = 17 * 8 ;
  var width    = 320 ;
  var height   = 320 ;

  var vizConfig = {

    paddingFactor: 1,
    width:  width,
    height: height,
    fadeDuration: duration,
    opacity: 0,
    collision_detect: function() {}, // turn off collision detection for this game, improving performance
    music: './audio/lizardstick.wav',

  } ;
  
  var viz       = $Z.helper.viz.setup(vizConfig) ; // first create generic vizflow configuration object, then add application-specific details

  viz.audio = {
    music: $Z.helper.loader.audio.cache[vizConfig.music],
    a: $Z.helper.loader.audio.cache['./audio/a.wav'],
    b: $Z.helper.loader.audio.cache['./audio/b.wav'],
    c: $Z.helper.loader.audio.cache['./audio/c.wav'],
    d: $Z.helper.loader.audio.cache['./audio/d.wav'],
    e: $Z.helper.loader.audio.cache['./audio/e.wav'],
    f: $Z.helper.loader.audio.cache['./audio/f.wav'],
    g: $Z.helper.loader.audio.cache['./audio/g.wav'],
    h: $Z.helper.loader.audio.cache['./audio/h.wav'],
    i: $Z.helper.loader.audio.cache['./audio/i.wav'],
    10: $Z.helper.loader.audio.cache['./audio/10.wav'],
    12: $Z.helper.loader.audio.cache['./audio/12.wav'],
    14: $Z.helper.loader.audio.cache['./audio/14.wav'],
    15: $Z.helper.loader.audio.cache['./audio/15.wav'],
    16: $Z.helper.loader.audio.cache['./audio/16.wav'],
    18: $Z.helper.loader.audio.cache['./audio/18.wav'],
    20: $Z.helper.loader.audio.cache['./audio/20.wav'],
    21: $Z.helper.loader.audio.cache['./audio/21.wav'],
    22: $Z.helper.loader.audio.cache['./audio/22.wav'],
    24: $Z.helper.loader.audio.cache['./audio/24.wav'],
    25: $Z.helper.loader.audio.cache['./audio/25.wav'],
    4: $Z.helper.loader.audio.cache['./audio/4.wav'],
    6: $Z.helper.loader.audio.cache['./audio/6.wav'],
    8: $Z.helper.loader.audio.cache['./audio/8.wav'],
    9: $Z.helper.loader.audio.cache['./audio/9.wav'],
    win: $Z.helper.loader.audio.cache['./audio/win.wav'],
  } ;
  
  var fade = 4 ;
  viz.audio.music.loop   = true ;
  viz.audio.music.play() ;
  viz.audio.music.gain.gain.value = 0 ;
  viz.audio.music.volume          = 1/3 ;
  viz.audio.music.fade(fade) ;

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

  // var text  = $Z.helper.image.text_sprite() ;

  var textWidth  = 32 ;
  var textHeight = 32 ;
  var text       = $Z.helper.sprite.get_text(document.textUrl[0], textWidth, textHeight) ;
  viz.text       = $Z.helper.sprite.foreach(text, $Z.helper.image.get_original) ;

  var xImage = $Z.helper.image.create(viz.text['0'][0].width, viz.text['0'][0].height) ;

  var x  = viz.text['x'][0];
  var sx = 0 ; var sw = x.width ; 
  var sy = 0 ; var sh = x.height ;
  var dw = Math.floor(sw * 0.5) ; var dh = Math.floor(sh * 0.5) ;
  var dx = Math.floor(dw * 0.5) ;
  var dy = Math.floor(dh * 0.5) ;

  // console.log('x, sx, sy, sw, sh, dx, dy, dw, dh', x, sx, sy, sw, sh, dx, dy, dw, dh) ;

  xImage.context().drawImage(x, sx, sy, sw, sh, dx, dy, dw, dh) ;

  viz.text['x'][0] = xImage ;

  document.fade = function fade(fadeVal) {

    return $Z.helper.effect.image.fade_sequence({ 

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
      var index        = viz.code[k].charCodeAt(0) - 'a'.charCodeAt(0) ;
      viz.prime[index] = viz.fruit[k].item[0] ;
    }
    
    viz.jar[k] = jarHelper.setup(viz, k, x, y) ;

  } // end loop over tiles/jars

  viz.scoreup = function viz_scoreup() {

    viz.score += 1 ;

    if ( viz.score === viz.target ) { // you win!

      viz.busy = true ;

      var count = 0 ;
      var Ndur = 15 ;

      for ( kjar = 0 ; kjar < viz.jar.length ; kjar++ ) {

        var jar = viz.jar[kjar] ;

        if ( jar.removeSwitch === true ) {
          continue ;
        }

        jar.unlock() ;

        jar.call('show_prime', count * (5 + Ndur) * jar.duration) ;

        count++ ;

      }

      // var dur = (2 + 4 * 8) * jar.duration  ;
      var delay = 33 ;
      viz.audio.win.play(delay) ;

      setTimeout(function() { viz.win() ; }, 10000 + (count + 0.5) * jar.duration * Ndur) ;

    }
  } ;

  viz.win = function win() {

    // console.log('you win!') ;

    var duration2 = 3000 ;

    viz.prime.forEach( function(d) {

      d.add_linear('xScale', 1, duration2) ;
      d.add_linear('yScale', 1, duration2) ;
      d.white.add_transition(document.fade([1, 1, 1, 0.5, 0])) ;

      var offset = 0 ;

      d.add_linear('x', 0.5 * (d.x) * viz.Ncol + offset, duration2) ;
      d.add_linear('y', 0.5 * (d.y) * viz.Ncol + offset, duration2) ;

      viz.fade({

        duration: duration2 * 0.75,
        opacity: 0,
        
        end: function() {
          window.location.reload() ;
        },

      }) ;

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
    viz.reset() ;
  
  } ;

  viz.open_next = function open_next( viz ) { 

    if ( viz === undefined ) { 
      viz = this ;
    }

    if ( viz.all_closed() ) {

      curr  = String.fromCharCode( viz.current ) ;

      if ( viz.key[curr] === undefined ) {
        return ;
      }

      kCurr = viz.key[curr] - 2 ; 
      // console.log( 'viz.current', viz.current, 'curr', curr, 'kCurr', kCurr ) ;
      viz.jar[kCurr].unlock() ;
      viz.current++ ;  

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
      viz.unlock_jars() ;
    },

  }) ;

  viz.collected = {} ; // initialize goal-tracking object --- the goal of the game is to collect all of the prime fruits
  viz.current   = 'a'.charCodeAt(0) ;
  viz.setup_ui() ;
  viz.busy = true ;
  viz.run() ;

}