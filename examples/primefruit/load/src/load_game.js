function load_game () {
  
  function title(viz) {

    if(viz === undefined) {
      viz = this ;
    }

    var vizflowImage = imageHelper.adjust_ratio(imageHelper.to_canvas('./image/vizflow.png')) ;

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

    // console.log('load game title: before fade')

    vizflow.fade({

      opacity:  1,
      duration: viz.fadeDuration,
      pause:    2 * viz.fadeDuration,

      end: function() { 

        // console.log('fade end: ', 'viz.opacity', viz.opacity, 'viz.width', viz.width, 'vizflow.opacity', vizflow.opacity) ;

        vizflow.fade({

          opacity:  0,
          duration: viz.fadeDuration,
          end:      primefruit,
          
        }) ;

      },

    }) ;


  } 

  var vizConfig = {

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