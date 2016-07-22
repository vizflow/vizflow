function vizflow_page() {

  // console.log('vizflow page start') ;

  document.ratio = 1 ;

  var vtxt = ['v', 'i', 'z', 'f', 'l', 'o', 'w'] ;
  var size = 102 ;
  var spriteImage = $Z.helper.image.to_canvas( document.imageList[0] ) ;
  spriteImage.clear_color([255, 255, 255]) ;

  var viz = $Z.helper.viz.setup({
    width:  1200,
    height: 1200,
    fadeDuration: 400,
    collision_detect: function() {}, // turn off collision detection for this game, improving performance          
  }) ;

  document.viz = viz ;

  viz.Nspin    = 6 ;
  viz.tSpin    = 400 ;
  viz.longDur  = viz.delay * (2 + vtxt.length * 2) ;
  viz.xdelay   = 0.7 ;
  viz.movedur  = 350 ;
  viz.flashDur = 200 ;
  viz.delay    = 50 ;
  viz.spinDur  = viz.Nspin * viz.tSpin ;
  viz.fadeDur  = 1000 ;

  viz.run() ;

  viz.logo = {

    text: vtxt,
    sprite: $Z.helper.sprite.get( spriteImage, vtxt, size, size ),
    item: new Array( vtxt.length ),

  } ;

  viz.examples = function vizflow_examples() {          

    viz.example = new Array(document.example.length) ;

    var yShift  = 0.25 ;
    var xShift  = 0.25 ;
    var yOff    = 220 ;

    var xList   = [viz.width * 0.5, viz.width * (0.5 - xShift), viz.width * (0.5 + xShift), viz.width * 0.5] ;
    var yList   = [yOff, viz.height * (0.5 - yShift) + yOff, viz.height * (0.5 - yShift) + yOff, viz.height * (0.5 - yShift) + yOff] ;

    var urlList = document.example.map(function(d) {
      return 'http://vizflow.org/examples/' + d ;
    }) ;

    urlList[2] = 'http://electionfighter.com' ; // this one has its own URL

    for (var kex = 0 ; kex < document.example.length ; kex++) {

      var imageK = $Z.helper.image.to_canvas( document.exampleImage[kex] ) ;

      viz.example[kex] = viz.setup_item({

        image: imageK,
        x: xList[kex],
        y: yList[kex],
        xScale: 0.75,
        yScale: 0.75,
        xOrigin:  imageK.width  * 0.5,
        yOrigin: imageK.height * 0.5,
        uiSwitch: true,
        url: urlList[kex],

        callback: function() {

          this.focus() ;

          var fadeOutDur = 3000 ;

          this.viz.item.forEach(function(d) {
            d.image.clear_color([255, 255, 255]) ;
            d.fade({
              duration: fadeOutDur,
              opacity: 0,
            }) ;
          }) ;

          this.add_linear('xScale', 3, fadeOutDur) ;
          this.add_linear('yScale', 3, fadeOutDur) ;
          this.add_linear('x', viz.width * 0.5, fadeOutDur) ;
          this.add_linear('y', viz.height * 0.5, fadeOutDur) ;

          var url = this.config.url ;

          viz.call(function() { 
            viz.fade({
              opacity: 0,
              duration: 2000,
              end: function() {
                window.location.href = url ;
              },
            }) ;
          }, 1000) ;

        },
        addSwitch: true,
        opacity: 0,

      }) ;

      viz.example[kex].fade() ;

    }

    var urlImage = $Z.helper.image.to_canvas(document.imageList[1]) ;

    viz.url = viz.setup_item({
      image: urlImage,
      x: 18, // viz.width * 0.5,
      y: 80, // viz.height - urlImage.height * 0.5,
      xOrigin: 0, // urlImage.width * 0.5,
      yOrigin: 0, // urlImage.height * 0.5,
      xScale: 0.5,
      yScale: 0.5,
      uiSwitch: true,
      addSwitch: true,
      callback: function() {
        viz.fade({
          opacity: 0,
          duration: 2000,
          item: this,
          run: function() {
            var vizflowUrl = 'https://github.com/vizflow/vizflow' ;
            window.location.href = vizflowUrl ;                  
          },
        }) ;
      },
    }) ;

    viz.setup_ui() ;

  } ;

  var xOrigin = 0.5 * size ;
  var yOrigin = 0.5 * size ;
  var xmid    = viz.width  * 0.5 ;
  var ymid    = viz.height * 0.5 ; 
  var x0      = ( viz.width - spriteImage.height ) * 0.5 + xOrigin ;
  var y0      = ymid ;
  var xpad    =  10 ;
  var xoff1   = -xpad * 2 ;   // shift the "i" relative to "v" 
  var xoff2   = -2.5 * xpad ; // shift more letters
  var xoff3   =  0.5 * xpad ; // shift the letters some more 

  function upper_left(item) {

    if ( item === undefined ) {
      item = this ;
    }

    var scale  = 0.5 ;
    var xScale = scale ;
    var yScale = scale ;
    var xpad   = -100 ;
    var ypad   = -260 ;
    var x1     = xpad + scale * item.x ; 
    var y1     = ypad + scale * item.y ; 
    
    item.add_set(['xScale', 'yScale', 'x', 'y'], [xScale, yScale, x1, y1], viz.movedur, 'power', 2) ;

  }

  function fade_switch(item) {
    
    if (item === undefined) {
      item = this ;
    }

    var trans = item.viz.fader([1, 0]) ;
    trans.end = function() {
      item.image = item.viz.logo.sprite[item.config.txt][1] ;
    }

    item.white.add_transition(trans) ;

  }

  for ( ktxt = vtxt.length - 1 ; ktxt >= 0 ; ktxt-- ) {

    var x = x0 + ktxt * (size + xpad) ;

    if ( ktxt > 0 ) {
      x += xoff1 ;
    }

    if ( ktxt > 1 ) {
      x += xoff2 ;
    }

    if ( ktxt > 2 ) {
      x += xoff3 ;
    }

    viz.logo.item[ktxt] = viz.setup_item({

      image: viz.logo.sprite[viz.logo.text[ktxt]][0],
      x: x,
      y: y0,
      xOrigin: xOrigin,
      yOrigin: yOrigin,
      addSwitch: true,
      opacity: 0,
      k: ktxt,
      txt: vtxt[ktxt],

    }) ;

    viz.logo.item[ktxt].upper_left  = upper_left ;
    viz.logo.item[ktxt].fade_switch = fade_switch ;
    viz.logo.item[ktxt].default_child() ;

  }

  /* done setting up logo items, run the logo transitions: */        

  var endAngle   = Math.PI * 2 * viz.Nspin ;
  var angle_func = $Z.helper.transition.fixed_duration('angle', viz.spinDur) ;
  var spinTrans  = angle_func(endAngle) ;

  spinTrans.power = 0.25 ; 

  spinTrans.end = function () {
    viz.logo.item.forEach(function(d, i) {

      if ( i === 2 ) {
        return ; // z fades in first
      }

      d.call('fade', i * viz.delay) ;

    }) ;

    viz.call(homepage, viz.logo.item.length * viz.delay + viz.longDur) ;
  
  } // ** end: spinTrans.end **

  var z = viz.logo.item[2] ; 

  z.x = viz.width * 0.5 ;
  z.add_transition(spinTrans) ;
  z.fade({
    duration: viz.fadeDur,
    opacity: 1,
  })

  z.call(
    function() { z.add_linear('x', z.config.x, (1 - viz.xdelay) * viz.spinDur) ; }, 
    viz.spinDur * viz.xdelay
  ) ;

  var fDelay = (8 + viz.logo.item.length) * viz.delay + viz.movedur ;

  function homepage() {
    viz.logo.item.forEach(function(d, i) {
      d.call('upper_left', viz.fadeDur + i * viz.delay) ;
      if ( i < viz.logo.item.length - 1) {
        d.call('fade_switch', fDelay) ;
      } else {
        d.call(['fade_switch', function() { viz.examples() ; }], [fDelay, 1.5 * viz.fadeDuration]) ;
      }
    }) ;
  }


}


