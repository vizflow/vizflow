function space_level () {

  var vizConfig = { // an object to configure the visualization

    backgroundImageUrl: './image/trump_bg4.png',
    loadingImageUrl: './image/megyn_title.png',
    frameDurationFactor: 3,
    run: fighterHelper.run,
    load_ui: fighterHelper.load_ui,
    load_char: fighterHelper.load_char,
    load_response: fighterHelper.load_response,
    load_audio: gameHelper.load_audio,
    buttonpress: buttonpress,    
    music: './audio/drwho.wav',

  } ;

  viz = vizHelper.setup(vizConfig) ; // frameDuration is computed from frameDurationFactor using units of base vizflow framespeed (17 ms) 

  viz.platformY  = 190 ;
  var tileHeight = 40 ;
  var tileWidth  = 40 ;

  viz.playerConfig = { 

    loop: {

      walk: {
        frameDur: viz.frameDuration,
        position: 0,
        Nstep: 1,
      },

      attack: {
        frameDur: viz.frameDuration,
        position: 0,
        Nstep: 2,
      },

      jump: {
        frameDur: viz.frameDuration,
        position: 0,
        Nstep: 1,        
      },

    },

    sprite_loader: function() {
      var i         = imageHelper.image2canvas('./image/megyn_spritesheet.png') ;
      var rowName   = ['attack', 'hit', 'jump', 'rest', 'walk'] ;
      var width     = [tileWidth, tileWidth, tileWidth, tileWidth, tileWidth] ;
      var height    = [tileHeight, tileHeight, tileHeight, tileHeight, tileHeight] ;
      var maxHeight = Math.max.apply(null, height) ;
      var spriteset = spriteHelper.get(i, rowName, width, height) ;

      // imageHelper.view(jumpCollisionCanvas) ;
      // console.log('player sprite loader', spriteset) ;
      return spriteset ;
    },

    orientation: 'r',
    frameDuration: viz.frameDuration,
    floatDuration: 10 * viz.frameDuration,
    jumpDuration: 40 * viz.frameDuration,
    hitDuration: 5 * viz.frameDuration,
    callback: playerHelper.update,
    restoreRest: true,
    transitionSet: {
      x: $Z.transition.rounded_linear_transition_func ( 'x', viz.frameDuration ),      // function accepting an x end-value and returning a transition object
      y: $Z.transition.rounded_linear_transition_func ( 'y', viz.frameDuration * 7 ), // function accepting a y end-value and returning a transition object
      jump: step_transition_func ( 'image', viz.frameDuration * 4 ),
    },
    xMove: 10,
    yMove: 60,
    xJumpMove: 0,
    y: viz.platformY - tileHeight - 1,
    type: 'player',
    bulletSwitch: true,
    healthdrop: 5,

  } ;


  var enemyTileHeight = 154 ;
  var enemyTileWidth  = 170 ;

  viz.enemyConfig = {

    sprite_loader: function() {

      // console.log('enemy sprite loader', spriteset) ;
      var i         = imageHelper.image2canvas('./image/trump_spritesheet.png') ;
      var rowName   = ['attack', 'hit', 'rest', 'walk'] ;
      var width     = [enemyTileWidth, enemyTileWidth, enemyTileWidth, enemyTileWidth] ;
      var height    = [enemyTileHeight, enemyTileHeight, enemyTileHeight, enemyTileHeight] ;
      var spriteset = spriteHelper.get(i, rowName, width, height) ;
      
      return spriteset ;

    },    

    frameDuration: viz.frameDuration * 1,
    attackDuration: 6 * viz.frameDuration,
    // hitDuration: viz.dur * 10,
    orientation: 'l',
    x: 60,
    y: viz.platformY - enemyTileHeight,
    type: 'enemy',
    opacity: 0,

  } ;

  // console.log('space level', )

  viz.load() ;
  
}
