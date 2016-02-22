function fantasy_level () {

  document.nextLevel = space_level ;

  var vizConfig = { // an object to configure the visualization

    backgroundImageUrl: './image/trump_bg3.png',
    loadingImageUrl: './image/rastan_intro.png',
    frameDurationFactor: 5,
    run: fighterHelper.run,
    load_ui: fighterHelper.load_ui,
    load_char: fighterHelper.load_char,
    load_response: fighterHelper.load_response,
    load_audio: fighterHelper.load_audio,
    buttonpress: buttonpress,    

  } ;

  viz = vizHelper.setup (vizConfig) ; // frameDuration is computed from frameDurationFactor using units of base vizflow framespeed (17 ms) 

  viz.platformY = 173 ;

  var tileHeight = 75 ;
  var tileWidth = 100 ;

  viz.playerConfig = { 
    sprite_loader: function() {

      var i         = imageHelper.image2canvas('./image/rastan_spritesheet.png') ;
      var rowName   = ['attack', 'hit', 'jump', 'rest', 'walk'] ;
      var width     = [tileWidth, tileWidth, tileWidth, tileWidth, tileWidth] ;
      var height    = [tileHeight, tileHeight, tileHeight, tileHeight, tileHeight] ;
      var maxHeight = Math.max.apply(null, height) ;
      var spriteset = spriteHelper.get(i, rowName, width, height) ;
    
      spriteset.attack.push(spriteset.attack[4]) ;
      spriteset.attack.push(spriteset.attack[4]) ;
      spriteset.attack.push(spriteset.attack[4]) ;
      spriteset.attack.push(spriteset.attack[4]) ;
      spriteset.attack.push(spriteset.attack[4]) ;
      spriteset.attack.push(spriteset.attack[4]) ;
      spriteset.attack.push(spriteset.attack[3]) ;
      spriteset.attack.push(spriteset.attack[2]) ;
      spriteset.attack.push(spriteset.attack[1]) ;
      spriteset.attack.push(spriteset.attack[0]) ;
      spriteset.attack.push(spriteset.rest[0]) ;

      spriteset.jump.push(spriteset.jump[5]) ;
      spriteset.jump.push(spriteset.jump[5]) ;
      spriteset.jump.push(spriteset.jump[5]) ;
      spriteset.jump.push(spriteset.jump[5]) ;
      spriteset.jump.push(spriteset.jump[5]) ;
      spriteset.jump.push(spriteset.jump[5]) ;
      spriteset.jump.push(spriteset.jump[4]) ;
      spriteset.jump.push(spriteset.jump[3]) ;
      spriteset.jump.push(spriteset.jump[2]) ;
      spriteset.jump.push(spriteset.jump[1]) ;
      spriteset.jump.push(spriteset.jump[0]) ;

/*      spriteset.response.push(spriteset.response[2]) ;
      spriteset.response.push(spriteset.response[2]) ;
      spriteset.response.push(spriteset.response[1]) ;
      spriteset.response.push(spriteset.response[1]) ;
      spriteset.response.push(spriteset.response[1]) ;
      spriteset.response.push(spriteset.response[0]) ;
      spriteset.response.push(spriteset.response[0]) ;
*/
      // console.log('spriteset', spriteset) ;
      var attackCollisionCanvas = imageHelper.clear_rect (spriteset.attack[4], { x: spriteset.attack[4].width * 0.25, y: 0, width: spriteset.attack[4].width * 0.75, height: maxHeight } ) ;
      // imageHelper.view(attackCollisionCanvas) ;
      spriteset.attack[4].sourceCollisionImage = attackCollisionCanvas ;
      // spriteset.attack[1].sourceCollisionImage = attackCollisionCanvas ;
      // spriteset.attack = [spriteset.attack[0], spriteset.walk[1], spriteset.attack[1], spriteset.walk[1]] ;

      var jumpCollisionCanvas = imageHelper.clear_rect ( spriteset.jump[5], { x: spriteset.jump[0].width * 0.25, y: 0, width: spriteset.jump[0].width * 0.75, height: maxHeight } ) ;
      // imageHelper.view(jumpCollisionCanvas) ;
      spriteset.jump[5].sourceCollisionImage = jumpCollisionCanvas ;

      // imageHelper.view(jumpCollisionCanvas) ;
      // console.log('player sprite loader', spriteset) ;
      return spriteset ;
    },

    orientation: 'l',
    frameDuration: viz.frameDuration,
    hitDuration: viz.frameDuration * 1.5,
    floatDuration: viz.dur * 30,
    callback: fighterHelper.update_player,
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
    y: viz.platformY - tileHeight,
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