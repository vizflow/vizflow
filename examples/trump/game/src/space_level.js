function space_level () {

  document.nextLevel = null ;

  var vizConfig = { // an object to configure the visualization
    backgroundImageUrl: './game/image/trump_bg4.png',
    loadingImageUrl: './game/image/megyn_title.png',
    frameDurationFactor: 2,
    run: fighterHelper.run,
    load_ui: fighterHelper.load_ui,
    load_char: fighterHelper.load_char,
    load_hit: hitHelper.load,
    load_audio: fighterHelper.load_audio,
    buttonpress: buttonpress,    
  } ;

  viz = vizHelper.setup(vizConfig) ; // frameDuration is computed from frameDurationFactor using units of base vizflow framespeed (17 ms) 

  viz.playerConfig = { 

    sprite_loader: function() {
      var i         = imageHelper.image2canvas('./game/image/megyn_spritesheet.png') ;
      var rowName   = ['attack', 'hit', 'jump', 'rest', 'walk'] ;
      var width     = [40, 40, 40, 40, 40] ;
      var height    = [40, 40, 40, 40, 40] ;
      var maxHeight = Math.max.apply(null, height) ;
      var spriteset = spriteHelper.get(i, rowName, width, height) ;

      // imageHelper.view(jumpCollisionCanvas) ;
      // console.log('player sprite loader', spriteset) ;
      return spriteset ;
    },
    orientation: 'r',
    frameDuration: viz.frameDuration,
    floatDuration: 15 * viz.frameDuration,
    jumpDuration: 40 * viz.frameDuration,
    callback: fighterHelper.update_player,
    restoreRest: true,
    transitionSet: {
      x: $Z.transition.rounded_linear_transition_func ( 'x', viz.frameDuration ),      // function accepting an x end-value and returning a transition object
      y: $Z.transition.rounded_linear_transition_func ( 'y', viz.frameDuration * 10 ), // function accepting a y end-value and returning a transition object
    },
    xMove: 10,
    yMove: 100,
    xJumpMove: 0,
    y: 150,
    type: 'player',
    bulletSwitch: true,

  } ;

  viz.enemyConfig = {

    sprite_loader: function() {
      var i       = imageHelper.image2canvas('./game/image/trump_spritesheet.png') ;
      var rowName = ['attack', 'hit', 'rest', 'walk'] ;
      var width   = [170, 170, 170, 170] ;
      var height  = [154, 154, 154, 154] ;
      var spriteset = spriteHelper.get(i, rowName, width, height) ;
      // console.log('enemy sprite loader', spriteset) ;
      return spriteset ;
    },    
    frameDuration: viz.frameDuration,
    attackDuration: 20 * viz.frameDuration,
    orientation: 'l',
    x: 70,
    y: 35,
    type: 'enemy',
  } ;  

  viz.load() ;
  
}
