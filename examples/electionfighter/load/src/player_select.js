function player_select () {
  
  // console.log('player_select start') ;

  var selectInput = {

    down: inputEvent.down,
    up: null,
    
  } ;

  var vizConfig = {

    // loadingImageUrl: './image/titlescreen.png',
    backgroundImageUrl: './image/background.png',
    run: gameHelper.title,
    inputEvent: selectInput,
    screen_callback: gameHelper.screen_callback,
    keyboard_callback: gameHelper.keyboard_callback,
    load_audio: gameHelper.load_audio,
    music: './audio/inspector.wav',

  } ;

  viz = vizHelper.setup(vizConfig) ; // frameDuration computed

  // console.log('player_select vizHelper') ;

  viz.selectorConfig = {

    sprite_loader: function() {

      var i = imageHelper.image2canvas('./image/select_spritesheet.png') ;

      var rowName = [
        'jesus', 
        'rastan', 
        'megyn', 
        'choose', 
        'select',
      ] ;

      var width = [
        168, 
        168, 
        168, 
        172, 
        172,
      ] ;

      var height = [
        49, 
        49, 
        49, 
        28, 
        55,
      ] ;

      var maxHeight  = Math.max.apply(null, height) ;
      var spriteset = spriteHelper.get(i, rowName, width, height) ;

      // imageHelper.view(jumpCollisionCanvas) ;
      // console.log('player sprite loader', spriteset) ;

      return spriteset ;

    },

    orientation: 'r',
    callback: undefined,
    y: 123,

  } ;

  viz.load() ;

  // console.log ('player_select 36') ;

} 