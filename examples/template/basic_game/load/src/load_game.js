function load_game () {
  
  function title(viz) {

    if(viz === undefined) {
      viz = this ;
    }

    var vizflowImage = imageHelper.adjust_ratio(imageHelper.image2canvas('./image/vizflow.png')) ;

    var vizflow = itemHelper.setup({ 

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
          end: run_game,
          
        }) ;

      },

    }) ;


  } 

  document.ratio = 2 ; // upsample images to ensure crisp edges on hidpi devices

  var vizConfig = {

    background: undefined,
    music:      undefined,
    inputEvent: inputEvent,
    run: title, // fade in vizflow URL for title screen by default

  } ;

  var viz = vizHelper.setup(vizConfig) ; // frameDuration computed

  viz.menuConfig = {
 
    sprite_loader: undefined,
    callback:      undefined,

  } ;

  // load_response: vizConfig.load_response, 
  // load_ui: vizConfig.load_ui,
  // load_audio: vizConfig.load_audio,
  // load_char: vizConfig.load_char,
  // load: vizHelper.load,

  viz.run() ;

}