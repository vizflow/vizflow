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

} ;