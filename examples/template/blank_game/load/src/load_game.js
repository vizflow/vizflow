function load_game () {
  
  // document.ratio     = ( Math.ceil(window.devicePixelRatio) || 1 ) ;
  document.ratio = 2 ; // force upsampling of images to ensure crisp edges on hidpi devices

  var selectInput = {

    down: inputEvent.down,
    up: null,
    
  } ;

  var vizConfig = {

    backgroundImageUrl: './image/background.png',
    run: gameHelper.title,
    inputEvent: selectInput,
    screen_callback: gameHelper.screen_callback,
    keyboard_callback: gameHelper.keyboard_callback,
    load_audio: gameHelper.load_audio,
    music: './audio/.wav',

  } ;

  viz = vizHelper.setup(vizConfig) ; // frameDuration computed

  viz.menuConfig = {
 
    sprite_loader: function() {

      var i = imageHelper.image2canvas('./image/menu_spritesheet.png') ;

      var rowName = [
      ] ;

      var width = [
      ] ;

      var height = [
      ] ;

      var maxHeight  = Math.max.apply(null, height) ;
      var spriteset = spriteHelper.get(i, rowName, width, height) ;

      return spriteset ;

    },

    callback: undefined,

  } ;

  viz.load() ;

}