document.vizflow_page = function vizflow_page() {

  // console.log('vizflow page start') ;

  document.ratio = 1 ;

  var vtxt = ['v', 'i', 'z', 'f', 'l', 'o', 'w'] ;
  var size = 137 ;
  var spriteImage = $Z.helper.image.to_canvas( document.imageList[0] ) ;
  spriteImage.clear_color([255, 255, 255]) ;

  var scrsz = Math.max(screen.height, window.innerHeight) ;
  scrsz = Math.max(scrsz, Math.max(screen.width, window.innerWidth)) ;

  if ( scrsz > vtxt.length * (size * 1.1) ) {
    vizSize = scrsz ;
  } else {
    vizSize = 800 ;
  }

  var viz = $Z.helper.viz.setup({
    width:  vizSize,
    height: vizSize,
    fadeDuration: 400,
    coverSwitch: true,
    hCenter: true,
    vCenter: true,
    collision_detect: function() {}, // turn off collision detection for this game, improving performance          
  }) ;

  document.viz = viz ;

  var logoScale   = .75 ;
  var logoScale2  = 1/2 ;
  // var widthCutoff = 700 ;
  // if ( parseInt( viz.screenCanvas.style.width ) < widthCutoff ) {
  //   logoScale2 = 2/5 ;
  // }
  var urlScale   = 0.5 ;

  viz.Nspin    = 5 ;
  viz.tSpin    = 400 ;
  viz.longDur  = viz.delay * (2 + vtxt.length * 2) ;
  viz.xdelay   = 0.7 ;
  viz.movedur  = 350 ;
  viz.flashDur = 200 ;
  viz.delay    = 50 ;
  viz.spinDur  = viz.Nspin * viz.tSpin ;
  viz.fadeDur  = 800 ;

  viz.run() ;

  viz.logo = {

    text: vtxt,
    sprite: $Z.helper.sprite.get( spriteImage, vtxt, size, size ),
    item: new Array( vtxt.length ),

  } ;

  viz.examples = function vizflow_examples() {          

    var urlImage = $Z.helper.image.to_canvas(document.imageList[1]) ;

    viz.url = viz.setup_item({

      image: urlImage,
      x: 60, // viz.width * 0.5,
      y: 80, // viz.height - urlImage.height * 0.5,
      xOrigin: 0, // urlImage.width * 0.5,
      yOrigin: 0, // urlImage.height * 0.5,
      xScale: urlScale,
      yScale: urlScale,
      uiSwitch: true,
      addSwitch: true,
      fixed: true,

      callback: function() {
        viz.fade({
          opacity: 0,
          duration: 1000,
          end: function() {
            var vizflowUrl = 'https://github.com/vizflow/vizflow' ;
            window.location.href = vizflowUrl ;                  
          },
        }) ;
      },
    }) ;

    viz.example = new Array(document.example.length) ;

    var size0   = 376 ;
    var xpad    = 5 ;
    var exampleWidth = Math.min(size0 * 3, viz.width) ;
    var size1   = Math.round( ( (360 / 640) * exampleWidth - xpad ) / 3 );
    var scale   = size1 / size0 ;
    var xshift  = (size1 + xpad) ;

    var yShift  = 0.25 ;
    var xShift  = 0.25 ;
    var yOff    = (viz.height - size1) * 0.5 ;
    var ypad    = 10 ;
    var y1      = yOff + size1 + ypad ;

    var xList   = [viz.width * 0.5, 0.5 * viz.width - xshift, 0.5 * viz.width + xshift, viz.width * 0.5] ;
    var yList   = [yOff, y1, y1, y1] ;

    var urlList = document.example.map(function(d) {
      return 'http://vizflow.org/examples/' + d ;
    }) ;

    urlList[2] = 'http://electionfighter.com' ; // this one has its own URL

    var size0 = $Z.helper.loader.image.cache[document.exampleImage[0]].width ;
    var size1 = size0 * scale ;

    var whiteCircleImage = $Z.helper.draw.circle({
      radius: 0.8 * size1,
      fill: '#FFF',
    }) ;

    for (var kex = 0 ; kex < document.example.length ; kex++) {

      var imageK = $Z.helper.image.to_canvas( document.exampleImage[kex] ) ;

      viz.example[kex] = viz.setup_item({

        image: imageK,
        x: xList[kex],
        y: yList[kex],
        xScale: scale,
        yScale: scale,
        xOrigin:  imageK.width  * 0.5,
        yOrigin: imageK.height * 0.5,
        uiSwitch: true,
        fixed: false,
        url: urlList[kex],

        callback: function() {

          if ( viz.busy === true ) {
            return ;
          }

          viz.busy = true ;

          this.focus() ;

          var flash = $Z.helper.effect.image.fade_sequence({ 

            duration: viz.fadeDuration,
            value: [0.8, 0],

          })[0] ;

          flash.child.end = {
            item: this,
            run: function() {
              var fadeOutDur = 2000 ;

              var viz = this.item.viz ;

              viz.item.forEach(function(d) {
                d.image.clear_color([255, 255, 255]) ;
                d.fade({
                  duration: fadeOutDur,
                  opacity: 0,
                }) ;
              }) ;

              this.item.add_set(['xScale', 'yScale', 'x', 'y'], [3, 3, viz.width * 0.5, viz.height * 0.5], fadeOutDur) ;

              var url = this.item.config.url ;

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
          } ;

          this.circle.add_transition(flash) ;

          // console.log('flash', flash) ;

        },
        addSwitch: true,
        opacity: 0,

      }) ;

      var whiteCircleConfig = {

        image: whiteCircleImage,
        opacity: 0,
        xOrigin: 0.5 * whiteCircleImage.width,
        yOrigin: 0.5 * whiteCircleImage.height,

      } ;

      whiteCircle = viz.setup_item(whiteCircleConfig) ;

      // console.log('whiteCircle', whiteCircle)

      viz.example[kex].circle =  whiteCircle ;
      viz.example[kex].child  = [whiteCircle] ;
      viz.example[kex].fade() ;

    }

    var urlImage = $Z.helper.image.to_canvas(document.imageList[1]) ;

    viz.setup_ui() ;

  } ;

  var xOrigin = 0.5 * size ;
  var yOrigin = 0.5 * size ;
  var xmid    = viz.width  * 0.5 ;
  var ymid    = viz.height * 0.5 ; 
  var x0      = ( viz.width - spriteImage.height ) * 0.5 + xOrigin ;
  var y0      = ymid ;
  var kern    = size * logoScale ;
  var x1      = -0.3 ;
  var kshift  = [ 0, x1 * 0.5, x1, x1, x1, x1, x1] ;
  var x2      = -0.525 ;
  var kshift2 = [ 0, x2 * 0.5, x2, x2, x2, x2, x2] ;
  var xlogo   = [-3, -2, -1, 0, 1, 2, 3 ].map(function(d, i) { return d * kern + xmid + kshift[i] * size - 0.5 * x1 * size ; }) ;
  var xlogo2  = [ 0,  1,  2, 3, 4, 5, 6 ].map(function(d, i) { return d * size * logoScale2 + kshift2[i] * size * logoScale2 + size * logoScale2 ; }) ;

  // console.log('xlogo2', xlogo2)

  function upper_left(item) {

    if ( item === undefined ) {
      item = this ;
    }

    var scale  = item.config.scaleFinal ;
    var xScale = scale ;
    var yScale = scale ;
    var xpad   = item.config.xFinal ;
    var ypad   = 0.25 * item.image.height + 10 ;
    var x1     = xpad + item.viz.viewportX ; 
    var y1     = ypad + item.viz.viewportY ; 
    
    item.add_set(['xScale', 'yScale', 'x', 'y'], [xScale, yScale, x1, y1], item.viz.movedur, 'power', 2) ;
    item.call(function() {
      this.x -= this.viz.viewportX ;
      this.y -= this.viz.viewportY ;
      this.fixed = true ;
    }, item.viz.movedur) ;

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

    viz.logo.item[ktxt] = viz.setup_item({

      image: viz.logo.sprite[viz.logo.text[ktxt]][0],
      x: xlogo[ktxt],
      y: y0,
      xOrigin: xOrigin,
      yOrigin: yOrigin,
      xScale: logoScale,
      yScale: logoScale,
      scaleFinal: logoScale2,
      addSwitch: true,
      opacity: 0,
      k: ktxt,
      txt: vtxt[ktxt],
      xFinal: xlogo2[ktxt],

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

      // d.add_linear('x', xlogo[i], viz.fadeDuration) ;

      d.call('fade', i * viz.delay) ;
      d.call('fade_switch', viz.delay * viz.logo.item.length) ;

    }) ;

    this.item.call('fade_switch', viz.delay * viz.logo.item.length) ;

    viz.call(homepage, viz.logo.item.length * viz.delay + viz.longDur) ;
  
  } ; // ** end: spinTrans.end **

  var z = viz.logo.item[2] ; 

  z.x = viz.width * 0.5 ;
  z.add_transition(spinTrans) ;
  z.fade({
    duration: 3 * viz.fadeDur,
    opacity: 1,
  }) ;

  z.call(
    function() { z.add_linear('x', xlogo[2], (1 - viz.xdelay) * viz.spinDur) ; }, 
    viz.spinDur * viz.xdelay
  ) ;

  var fDelay = (8 + viz.logo.item.length) * viz.delay + viz.movedur ;

  function homepage() {

    viz.logo.item.forEach(function(d, i) {
      d.call('upper_left', 1.5 * viz.fadeDur + i * viz.delay) ;
    }) ;

    viz.call('examples', fDelay + 1.5 * viz.fadeDuration) ;

  }

} ;