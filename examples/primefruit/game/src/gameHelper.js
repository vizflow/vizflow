var gameHelper = {

  load_audio: function game_helper_load_audio(viz) {

    if(viz === undefined) {
      viz = this ;
    }

    viz.audio = {} ;
  
  },  

  title: function game_helper_title_animation(viz) {

    if(viz === undefined) {
      viz = this ;
    }

    viz.loading = true ; // to prevent UI from activating until menu page finishes loading

    function title_sprite() {

      var i = imageHelper.image2canvas('') ;

      var rowName = [
      ] ;

      var width = [
      ] ;

      var height = [
      ] ;

      var maxHeight  = Math.max.apply(null, height) ;
      var spriteset = spriteHelper.get(i, rowName, width, height) ;

      // imageHelper.view() ;

      return spriteset ;

    }

    var sprite = title_sprite() ;

    var stars = itemHelper.setup({
      x: 0,
      y: 0,
      image: ,
      opacity: 1,
      inert: true,
      viz: viz,
    }) ;

    var vizflowImage = imageHelper.adjust_ratio(imageHelper.image2canvas('./image/vizflow.png')) ;

    var vizflow = itemHelper.setup({ 
      x: (viz.width - vizflowImage.originalCanvas.width) * 0.5,
      y: 226,
      image: vizflowImage,
      opacity: 0,
      inert: true,
      viz: viz,
    }) ;

    vizflow.add() ;

    viz.fade({
      duration: viz.fadeDuration,
    }) ;

  },

  load: function game_helper_load(viz) {

    if(viz === undefined) {
      viz = this ;
    }

    viz.image = imageHelper.adjust_ratio(imageHelper.image2canvas(viz.config.backgroundImageUrl)) ; 

    viz.fade({
      duration: viz.fadeDuration * 0.5,
      opacity: 1,

      end: function() {

        itemHelper.add(viz, [ // this is the array of objects that are used by the vizflow visualization engine for the main animation loop          
        ]) ;

    }) ;  // end fade child 

  },  

  load_select: function game_helper_load_select (viz) {
    if(viz === undefined) {
      viz = this ;
    }

    viz.sprite = viz.menuConfig.sprite_loader() ;
    viz.load_audio() ;

  },  

  keyboard_callback: function(event, viz) {

      if(viz === undefined) {
        viz = this ;
      }

      if(viz.loading) {
        viz.buttonpress.reset() ;
        return ; // wait until viz finishes loading to activate ui controls
      }

      var transition = [] ;
      var state ;

      var newState ; 
      switch (event.keyCode) {

        case 37: // left
        case 38: // up
        case 39: // right
        case 40: // down
        case 13: // enter
        case 32: // space

      } 

      //console.log ('state', state) ;
              
  },

  screen_callback: function(x, y, viz) {

    if(viz === undefined) {
      viz = this ;
    }

    if(viz.loading) {
      viz.buttonpress.reset() ;
      return ;
    }

    viz.buttonpress.reset() ;

  },  

} ;