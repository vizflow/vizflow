function load_game () {
  // console.log ('load game start') ;
  document.ratio = 2 ; // upsample images to ensure crisp edges on hidpi devices

  var vizConfig = {

    background: undefined,
    music:      undefined,
    inputEvent: inputEvent,
    run: title, // fade in vizflow URL for title screen by default
    width: 320,
    height: 240,
    paddingFactor: 1,

  } ;

  var viz = vizHelper.setup(vizConfig) ; // frameDuration computed

  viz.run() ;

  function title(viz) {

    if(viz === undefined) {
      viz = this ;
    }

    var vizflowImage = imageHelper.adjust_ratio(imageHelper.to_canvas('./image/vizflow.png')) ;

    var vizflow = $Z.helper.item.setup({ 

      x: (viz.width - vizflowImage.originalCanvas.width) * 0.5,
      y: (viz.height - vizflowImage.originalCanvas.height) * 0.5,
      image: vizflowImage,
      opacity: 0,
      inert: true,
      viz: viz,

    }) ;

    vizflow.add() ;

    vizHelper.run(viz) ; // call the generic run function
    
    viz.opacity = 1 ;

    vizflow.fade({

      duration: viz.fadeDuration,

      end: function() { 

        vizflow.fade({

          duration: viz.fadeDuration,
          end: start_text,
          
        }) ;

      },

    }) ;

    function start_text() {

      // viz.text       = spriteHelper.foreach(viz.text, imageHelper.get_original) ;

      var startImage = imageHelper.adjust_ratio (imageHelper.to_canvas ('./image/aerie_title.png')) ;

      var startConfig = {
        image: startImage,
        x: 0,
        y: -200,
        opacity: 0,
        addSwitch: true,

      } ;

      var startTextConfig = {
        image: imageHelper.adjust_ratio (imageHelper.to_canvas ('./image/start.png')),
        x: 160,
        y: 300,
        opacity: 1,
        addSwitch: true,
      } ;

      var linDur = 2000 ;

      viz.startItem        = viz.setup_item(startConfig) ;
      viz.startTextItem    = viz.setup_item(startTextConfig) ;
      viz.startItem.add_linear('y', 0, linDur) ;
      viz.startTextItem.add_linear('y', 130, linDur) ;
      viz.overlay          = $Z.helper.viz.clear_cover(viz) ;
      viz.overlay.callback = run_title ;

      viz.setup_ui() ;

     // function loop_flash() {
     //    viz.startItem.loop(function() {
     //      return $Z.helper.item.method.flash(1, 420)[0] ;
     //    }) ;
     //  }

      viz.startItem.call(['fade'], [0, 4 * viz.fadeDuration]) ;      
    
    }    

    function run_title() {

      viz.overlay.remove() ;

      viz.startItem.fade({
        duration: 0.5 * viz.fadeDuration,
        opacity: 0,
        end: function() {
          viz.startItem.remove() ;
          viz.startTextItem.remove() ;
        }
      })

      var size = 320 ;    

      var sprite = spriteHelper.get(imageHelper.to_canvas('./image/aerie_title.png'), ['bg'], 320, 240) ;

      viz.title = {

        sprite: sprite,
        
        bgConfig: {
          image: sprite.bg[0],
          opacity: 0,
          childFade: true,
        },

      } ;

      var wordDelay = 5 * viz.fadeDuration ;

      viz.title.bg          = viz.setup_item(viz.title.bgConfig) ; 
      // viz.title.bg.image    = imageEffectHelper.color_filter(viz.title.bg.image, [, 64, 64]) ;
      // viz.title.prime       = viz.setup_item(viz.title.primeConfig) ;
      // viz.title.fruit       = viz.setup_item(viz.title.fruitConfig) ;
      // viz.title.fruit.child = [viz.setup_item(viz.title.fOverConfig)] ;
      // viz.title.prime.child = [viz.setup_item(viz.title.pOverConfig)] ;

      viz.title.bg.add() ; // add background first so that it's rendered below other items
      // viz.title.prime.add() ;
      // viz.title.fruit.add() ;
      // viz.title.prime.fade() ;
      // viz.title.fruit.call('fade', viz.fadeDuration) ;
      // viz.title.prime.child[0].call('loop_fade', wordDelay) ;
      // viz.title.fruit.child[0].call('loop_fade', wordDelay) ;

      // var delay = 1 ;
      // viz.audio.pf.volume = 1 ;
      // viz.audio.pf.play(delay) ;

      // var fade = 4 ;
      // viz.audio.music.loop = true ;
      // viz.audio.music.play() ;
      // viz.audio.music.gain.gain.value = 0 ;
      // viz.audio.music.volume = 0.5 ;
      // viz.audio.music.fade(fade) ;
      // // viz.audio.music.volume = 0 ;
      // // viz.audio.music.fade() ;
      // // viz.title.bg            .call('loop_fade', wordDelay) ;

   



       //  var fade = 4 ;
        // viz.audio.music.fade(fade) ;

      
        
        viz.title.bg.fade({
          duration: 3 * viz.fadeDuration,
          opacity: 0,
          end: battle_screen,
        }) ;
 

    }

  } 


  // viz.menuConfig = {
 
  //   sprite_loader: undefined,
  //   callback:      undefined,

  // } ;

  // load_response: vizConfig.load_response, 
  // load_ui: vizConfig.load_ui,
  // load_audio: vizConfig.load_audio,
  // load_char: vizConfig.load_char,
  // load: vizHelper.load,


}