function fantasy_level () {

  var vizConfig = { // an object to configure the visualization

    backgroundImageUrl: './image/trump_bg3.png',
    loadingImageUrl: './image/rastan_intro.png',
    frameDurationFactor: 5,
    run: fighterHelper.run,
    load_ui: fighterHelper.load_ui,
    load_char: fighterHelper.load_char,
    load_response: fighterHelper.load_response,
    load_audio: gameHelper.load_audio,
    buttonpress: buttonpress,    
    music: './audio/85riddim.wav',

  } ;

  viz = vizHelper.setup (vizConfig) ; // frameDuration is computed from frameDurationFactor using units of base vizflow framespeed (17 ms) 

  viz.platformY = 173 ;

  var tileHeight1 = 100 ;
  var tileHeight2 = 240 ;
  var tileHeight3 = 123 ;
  var tileWidth   = 350 ;

  viz.playerConfig = { 

    sprite_loader: function() {

      var i = imageHelper.image2canvas('./image/rastan_spritesheet.png') ;
      
      var rowName = [
        'attack0', 
        'attack1', 
        'attack2', 
        'hit0', 
        'hit1', 
        'hit2', 
        'jump0', 
        'jump1', 
        'jump2', 
        'rest0', 
        'rest1', 
        'rest2', 
        'walk0',
        'walk1',
        'walk2',
      ] ;
      
      var width = [
        tileWidth, 
        tileWidth, 
        tileWidth, 
        tileWidth, 
        tileWidth,
        tileWidth, 
        tileWidth, 
        tileWidth, 
        tileWidth, 
        tileWidth,
        tileWidth, 
        tileWidth, 
        tileWidth, 
        tileWidth, 
        tileWidth,
      ] ;
      
      var height = [
        tileHeight1, 
        tileHeight3, 
        tileHeight2, 
        tileHeight1, 
        tileHeight3, 
        tileHeight2, 
        tileHeight1, 
        tileHeight3, 
        tileHeight2, 
        tileHeight1, 
        tileHeight3, 
        tileHeight2, 
        tileHeight1, 
        tileHeight3, 
        tileHeight2, 
      ] ;
      
      var maxHeight = Math.max.apply(null, height) ;
      var spriteset = spriteHelper.get(i, rowName, width, height) ;
      var level     = [0, 1, 2] ;
    
      for (var klev = 0 ; klev < level.length ; klev++) {

        spriteset['attack' + klev].push(spriteset['attack' + klev][4]) ;
        spriteset['attack' + klev].push(spriteset['attack' + klev][4]) ;
        spriteset['attack' + klev].push(spriteset['attack' + klev][4]) ;
        spriteset['attack' + klev].push(spriteset['attack' + klev][4]) ;
        spriteset['attack' + klev].push(spriteset['attack' + klev][4]) ;
        spriteset['attack' + klev].push(spriteset['attack' + klev][4]) ;
        spriteset['attack' + klev].push(spriteset['attack' + klev][3]) ;
        spriteset['attack' + klev].push(spriteset['attack' + klev][2]) ;
        spriteset['attack' + klev].push(spriteset['attack' + klev][1]) ;
        spriteset['attack' + klev].push(spriteset['attack' + klev][0]) ;
        spriteset['attack' + klev].push(spriteset['rest'   + klev][0]) ;

        spriteset['jump' + klev].push(spriteset['jump' + klev][5]) ;
        spriteset['jump' + klev].push(spriteset['jump' + klev][5]) ;
        spriteset['jump' + klev].push(spriteset['jump' + klev][5]) ;
        spriteset['jump' + klev].push(spriteset['jump' + klev][5]) ;
        spriteset['jump' + klev].push(spriteset['jump' + klev][5]) ;
        spriteset['jump' + klev].push(spriteset['jump' + klev][5]) ;
        spriteset['jump' + klev].push(spriteset['jump' + klev][4]) ;
        spriteset['jump' + klev].push(spriteset['jump' + klev][3]) ;
        spriteset['jump' + klev].push(spriteset['jump' + klev][2]) ;
        spriteset['jump' + klev].push(spriteset['jump' + klev][1]) ;
        spriteset['jump' + klev].push(spriteset['jump' + klev][0]) ;

        var attackCollisionCanvas = imageHelper.clear_rect (spriteset['attack' + klev][4], { x: spriteset['attack' + klev][4].width * 0.4, y: 0, width: spriteset['attack' + klev][4].width * 0.6, height: maxHeight } ) ;
        // imageHelper.view(attackCollisionCanvas) ;
        spriteset['attack' + klev][4].sourceCollisionImage = attackCollisionCanvas ;
        // spriteset.attack[1].sourceCollisionImage = attackCollisionCanvas ;
        // spriteset.attack = [spriteset.attack[0], spriteset.walk[1], spriteset.attack[1], spriteset.walk[1]] ;

        var jumpCollisionCanvas = imageHelper.clear_rect ( spriteset['jump' + klev][5], { x: spriteset['jump' + klev].width * 0.4, y: 0, width: spriteset['jump' + klev].width * 0.6, height: maxHeight } ) ;
        // imageHelper.view(jumpCollisionCanvas) ;
        spriteset['jump' + klev][5].sourceCollisionImage = jumpCollisionCanvas ;

      }

      spriteset.attack = spriteset.attack0 ;
      spriteset.hit    = spriteset.hit0 ;
      spriteset.jump   = spriteset.jump0 ;
      spriteset.rest   = spriteset.rest0 ;
      spriteset.walk   = spriteset.walk0 ;

      // console.log('spriteset', spriteset) ;

      // imageHelper.view(jumpCollisionCanvas) ;
      // console.log('player sprite loader', spriteset) ;
      return spriteset ;
    },

    orientation: 'l',
    frameDuration: viz.frameDuration,
    hitDuration: viz.frameDuration * 1.5,
    floatDuration: viz.dur * 30,
    callback: playerHelper.update,
    restoreRest: false,
    transitionSet: {
      x: $Z.transition.rounded_linear_transition_func ( 'x', viz.frameDuration ), // function accepting an x end-value and returning a transition object
      attack: step_transition_func ( 'image', viz.dur ), // transition object creation function
      jump: step_transition_func ( 'image', viz.dur ),
      y: $Z.transition.rounded_linear_transition_func ( 'y', viz.dur * 14 ), // function accepting a y end-value and returning a transition object
    },
    fullLoopSwitch: true,
    xMove: 8,
    yMove: 55,
    x: -tileWidth * 0.5 + 10,
    y: viz.platformY - 220,
    type: 'player',
    bulletSwitch: false,
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
    attackDuration: 5 * viz.frameDuration,
    hitDuration: viz.dur * 10,
    orientation: 'l',
    x: 60,
    y: viz.platformY - enemyTileHeight,
    type: 'enemy',

  } ;

  viz.load() ;

}