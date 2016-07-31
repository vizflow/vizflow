var gameHelper = {

  // load_audio: function game_helper_load_audio(viz) {

  //   if(viz === undefined) {
  //     viz = this ;
  //   }

  //   viz.audio = {} ;
  
  // },  

  load: function game_helper_load(viz) {

    if(viz === undefined) {
      viz = this ;
    }

    viz.image = $Z.helper.image.adjust_ratio($Z.helper.image.image2canvas(viz.config.backgroundImageUrl)) ; 

    viz.fade({
      duration: viz.fadeDuration * 0.5,
      opacity: 1,

      end: function() {

        $Z.helper.item.add(viz, [ // this is the array of objects that are used by the vizflow visualization engine for the main animation loop          
        ]) ;

      },  // end fade child 
    }) ;

  },  

  load_select: function game_helper_load_select (viz) {
    if(viz === undefined) {
      viz = this ;
    }

    viz.sprite = viz.menuConfig.sprite_loader() ;
    viz.load_audio() ;

  },  

  you_win:  function game_you_win(viz) {

    if(viz === undefined) {
      viz = this ;
    }

    var endImage = $Z.helper.image.adjust_ratio($Z.helper.image.to_canvas('./image/you_win.png')) ;

    var endItem = $Z.helper.item.setup({ 

      x: (viz.width - endImage.originalCanvas.width) * 0.5,
      y: (viz.height - endImage.originalCanvas.height) * 0.5,
      image: endImage,
      opacity: 0,
      inert: true,
      viz: viz,

    }) ;

    endItem.add() ;
     
    viz.opacity = 1 ;
    viz.fade({

      duration: 2 * viz.fadeDuration,
    }) ;

    endItem.fade({

      duration: viz.fadeDuration * 2,

      end: function() { 
        endItem.fade({

          duration: viz.fadeDuration * 4,
          end: window.location.reload(),
        }) ;
   
      },

    }) ;

  },

  game_over: function game_over(viz) {

    if(viz === undefined) {
      viz = this ;
    }

    console.log('game over() start') ;

    var endImage = $Z.helper.image.adjust_ratio($Z.helper.image.to_canvas('./image/game_over.png')) ;

    var endItem = $Z.helper.item.setup({ 

      x: (viz.width - endImage.originalCanvas.width) * 0.5,
      y: (viz.height - endImage.originalCanvas.height) * 0.5,
      image: endImage,
      opacity: 0,
      inert: true,
      viz: viz,

    }) ;

    endItem.add() ;
     
    viz.opacity = 1 ;
    viz.fade({

      duration: 4 * viz.fadeDuration,
    }) ;

    endItem.fade({

      duration: viz.fadeDuration * 4,

      end: function() { 
        endItem.fade({

          duration: viz.fadeDuration * 4,
          end: window.location.reload(),
        }) ;
   
      },

    }) ;

  },  

} ;