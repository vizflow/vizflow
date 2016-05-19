function load_game () {
  
  function title(viz) {

    if(viz === undefined) {
      viz = this ;
    }

    var vizflowImage = imageHelper.adjust_ratio(imageHelper.to_canvas('./image/vizflow.png')) ;

    var vizflow = itemHelper.setup({ 

      x: (viz.width  - vizflowImage.originalCanvas.width)  * 0.5,
      y: (viz.height - vizflowImage.originalCanvas.height) * 0.5,
      image: vizflowImage,
      opacity: 0,
      inert: true,
      viz: viz,

    }) ;

    vizflow.add() ;

    vizHelper.run(viz) ; // call the generic run function
    
    viz.opacity = 1 ;

    // console.log('load game title: before fade')

    function run_title() {
     
      var size = 320 ;    

      var sprite = spriteHelper.get(imageHelper.to_canvas('./image/pf-title.png'), ['bg', 'fruit', 'prime'], size, size) ;

      viz.title = {

        sprite: sprite,
        
        fruitConfig: {
          image: sprite.fruit[0],
          opacity: 0,
        },

        primeConfig: {
          image: sprite.prime[0],
          opacity: 0,
        },

        fOverConfig: {
          image: sprite.fruit[1],
          opacity: 0,
          childFade: true,
        },

        pOverConfig: {
          image: sprite.prime[1],
          opacity: 0,
          childFade: true,
        },

        bgConfig: {
          image: sprite.bg[0],
          opacity: 0,
          childFade: true,
        },

      } ;

      var wordDelay = 5 * viz.fadeDuration ;

      viz.title.bg          = viz.setup_item(viz.title.bgConfig) ; 
      viz.title.bg.image    = imageEffectHelper.color_filter(viz.title.bg.image, [, 64, 64]) ;
      viz.title.prime       = viz.setup_item(viz.title.primeConfig) ;
      viz.title.fruit       = viz.setup_item(viz.title.fruitConfig) ;
      viz.title.fruit.child = [viz.setup_item(viz.title.fOverConfig)] ;
      viz.title.prime.child = [viz.setup_item(viz.title.pOverConfig)] ;

      viz.title.bg.add() ; // add background first so that it's rendered below other items
      viz.title.prime.add() ;
      viz.title.fruit.add() ;
      viz.title.prime.fade() ;
      viz.title.fruit.call('fade', 2 * viz.fadeDuration) ;
      viz.title.prime.child[0].call('loop_fade', wordDelay) ;
      viz.title.fruit.child[0].call('loop_fade', wordDelay) ;
      viz.title.bg            .call('loop_fade', wordDelay) ;

      viz.key = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'] ;
      viz.tileWidth = 47 ; 
      viz.rowHeight = 52 ;

      viz.fruit = {

        sprite: spriteHelper.get
        ( 
          imageHelper.to_canvas('./image/fruit.gif'), 
          viz.key, 
          viz.tileWidth, 
          viz.rowHeight // function argument list, so no trailing comma 
        ),

      } ;

      var fruitFade = [.6, 0] ;

      viz.fruit.item = new Array(viz.key.length) ;

      var fruit_fader = function(fadeVal) {
        var duration = viz.fadeDuration * 0.5 ;
        return viz.fader(fadeVal, duration) ;
      }

      for( var k = 0 ; k < viz.key.length ; k++ ) { 

        var key  = viz.key[k] ;
        var xPad = 17 ;
        var yPad = 25 ;
        var x0   = 125 ;
        var y0   = 225 ;

        var fruitConfig = {

          image: viz.fruit.sprite[key][0],
          opacity: 0,
          xScale: .5,
          yScale: .5,
          x: (k % 3) * xPad + x0,
          y: Math.floor(k/3) * yPad + y0,
          addSwitch: true,

        } ;

        var fk = viz.setup_item(fruitConfig) ;

        viz.fruit.item[k] = fk ;

        fk.default_child() ;
        fk.call('fade', k * viz.fadeDuration / viz.key.length + 3 * viz.fadeDuration) ;
        fk.white.call(function() { this.loop_fade(fruit_fader, fruitFade) ; }, 7 * viz.fadeDuration) ;
      
      }

      var textWidth = 32 ; var textHeight = 32 ;
      viz.text  = spriteHelper.get_text('./image/text2.png', textWidth, textHeight) ;
      // viz.text       = spriteHelper.foreach(viz.text, imageHelper.get_original) ;

      var textImage = imageHelper.text2image({
        sprite: viz.text,
        text: 'start',
      }) ;

      var startConfig = {
        image: textImage,
        x: 0.5 * viz.width,
        y: 0.5 * viz.height + 32,
        xOrigin: 0.5 * textImage.width / document.ratio,
        yOrigin: 0.5 * textImage.height / document.ratio,
        opacity: 0,
        addSwitch: true,
        uiSwitch: true,
        callback: function() {
          viz.fade({
            opacity: 0,
            duration: viz.fadeDuration * 2,
            end: primefruit,
          })
        },
        xScale: 1,
        yScale: 1,
      } ;

      viz.title.start = viz.setup_item(startConfig) ;

      function loop_flash() {
        viz.title.start.loop(function() {
          return itemHelper.method.flash(1, 200)[0] ;
        }) ;
      }

      viz.title.start.call(['fade', loop_flash], [10 * viz.fadeDuration, viz.fadeDuration]) ;
      
    }

    vizflow.fade({

      opacity:  1,
      duration: viz.fadeDuration,
      pause:    viz.fadeDuration,

      end: function() { 

        // console.log('fade end: ', 'viz.opacity', viz.opacity, 'viz.width', viz.width, 'vizflow.opacity', vizflow.opacity) ;

        vizflow.fade({

          opacity:  0,
          duration: viz.fadeDuration,
          end:      run_title,
          
        }) ;

      },

    }) ;

  } ;

  var vizConfig = {

    width: 320,
    height: 320,
    paddingFactor: 1,
    background: undefined,
    music:      undefined,
    inputEvent: inputEvent,
    run:        title, // fade in vizflow URL for title screen by default

  } ;

  var viz = vizHelper.setup(vizConfig) ; // frameDuration computed

  viz.menuConfig = {
 
    sprite_loader: undefined,
    callback:      undefined,

  } ;

  viz.run() ;

}