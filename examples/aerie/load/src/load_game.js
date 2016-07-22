function load_game () {
  // console.log ('load game start') ;
  document.ratio = 1 ; // upsample images to ensure crisp edges on hidpi devices

  var vizConfig = {

    background: undefined,
    music:      undefined,
    inputEvent: inputEvent,
    width: 320,
    height: 240,

    run: title, // fade in vizflow URL for title screen by default

  } ;

  var viz = vizHelper.setup(vizConfig) ; // frameDuration computed
  
  viz.run() ;

  function title(viz) {

    if(viz === undefined) {
      viz = this ;
    }

    var vizflowImage = imageHelper.adjust_ratio(imageHelper.to_canvas('./image/vizflow.png')) ;

    var vizflowItem = $Z.helper.item.setup({ 

      x: (viz.width - vizflowImage.originalCanvas.width) * 0.5,
      y: (viz.height - vizflowImage.originalCanvas.height) * 0.5,
      image: vizflowImage,
      opacity: 0,
      inert: true,
      viz: viz,

    }) ;

    vizflowItem.add() ;

    vizHelper.run(viz) ; // call the generic run function
    
    viz.opacity = 1 ;

    vizflowItem.fade({

      opacity:  1,
      duration: viz.fadeDuration,
      pause:    viz.fadeDuration,

      end: function() { 

        vizflowItem.fade({
          
          opacity:  0,
          duration: viz.fadeDuration,
          end: start_text,
          
        }) ;

      },

    }) ;
   
    function start_text() {

      var startConfig = {
        image:  imageHelper.adjust_ratio(imageHelper.to_canvas('./image/aerie_title.png')),
        x: 0,
        y: -300,
        opacity: 0,
        addSwitch: true,

      } ; 
      var startTextConfig = {
        image:  imageHelper.adjust_ratio(imageHelper.to_canvas('./image/start.png')),
        x: 130,
        y: 320,
        opacity: 1,
        addSwitch: true,
      }  ;

      var swordConfig = {
        image: imageHelper.adjust_ratio(imageHelper.to_canvas('./image/title_blade.png')),
        x: 240,
        y: 76,

      } ;

    var scaleDur = 2000 ;

    viz.swordItem = viz.setup_item(swordConfig) ;

    viz.startItem = viz.setup_item(startConfig) ;
    viz.startText =viz.setup_item(startTextConfig) ;
    viz.startItem.add_linear('y', -80,scaleDur) ;
    viz.startText.add_linear('y', 160 , scaleDur );
    viz.swordItem.add_linear('x', 36, .3 * scaleDur) ;
    viz.startText.flash(100) ;
    viz.setup_item(startTextConfig) ;
    
    viz.overlay          = $Z.helper.viz.clear_cover(viz) ;
    viz.overlay.callback = run_title ;

    viz.setup_ui() ;

    viz.startItem.call(['fade'], [0, 4*viz.fadeDuration]) ; 

    } ;
    
  }    

    function run_title() {

      viz.overlay.remove() ;

      viz.startItem.fade({
        duration: 0.5 * viz.fadeDuration,
        opacity: 0,
        end: function() {
          viz.startItem.remove() ;

        }
      })

      viz.startText.fade({
        duration: 0.5 * viz.fadeDuration,
        opacity: 0,
        end: function() {
          viz.startText.remove() ;

        }
      })

      //   viz.sword.fade({
      //   duration: 2 * viz.fadeDuration,
      //   opacity: 0,
      //   end: function() {
      //     viz.sword.remove() ;

      //   }
      // })

      // var width = 320 ;    
      // var height = 240;
      // var sprite = spriteHelper.get(imageHelper.to_canvas('./image/aerie_title.png'), ['bg'], width, height) ;

      // viz.title = {

      //   sprite: sprite,
      //   bgConfig: {
      //     image: sprite.bg[0],
      //     x: 0,
      //     y: -80,
      //   },


      // } ;

      viz.overlay.remove() ;

      //viz.title.bg          = viz.setup_item(viz.title.bgConfig) ; 

      viz.swordItem.add() ;
      //viz.title.bg.fade() ;
      viz.swordItem.call('fade', 3 * viz.fadeDuration) ; 

      viz.swordItem.call(function() {

        var fade = 4 ;
        // viz.audio.music.fade(fade) ;

        // viz.zoom({
        //   x: x0,
        //   y: y0, 
        //   width: viz.width / 3,
        //   height: viz.height / 3,
        //   duration: 4 * viz.fadeDuration,
        // }) ;
       viz.swordItem.add_linear('x', -300, 0.5 * viz.fadeDuration) ;
     
        viz.swordItem.fade({
          duration: 2 * viz.fadeDuration,
          opacity: 0,
          end: battle_screen,
        }) ;
      }, 4 * viz.fadeDuration) ;
      
  }



}