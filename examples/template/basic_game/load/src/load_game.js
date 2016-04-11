function load_game () {
  
  function title(viz) {

    if(viz === undefined) {
      viz = this ;
    }

    viz.loading = true ; // to prevent UI from activating until menu page finishes loading

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

    viz.fade({
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
    load_audio: undefined,
    inputEvent: inputEvent,
    run: title, // fade in vizflow URL for title screen by default

  } ;

  viz = vizHelper.setup(vizConfig) ; // frameDuration computed

  viz.menuConfig = {
 
    sprite_loader: undefined,
    callback:      undefined,

  } ;

  viz.load() ;

}