function city_level () {

  document.nextLevel = fantasy_level ;

  var vizConfig = {

    backgroundImageUrl: './image/trump_bg1.png',
    loadingImageUrl: './image/city_intro.png',
    frameDurationFactor: 5,
    run: fighterHelper.run,
    load_ui: fighterHelper.load_ui,
    load_char: fighterHelper.load_char,
    load_response: fighterHelper.load_response,
    load_audio: fighterHelper.load_audio,
    buttonpress: buttonpress,

  } ;

  viz = vizHelper.setup(vizConfig) ; // framdeDuration computed

  viz.platformY     = 172 ;
 
  var jumpDuration  = 300 ;
  var floatDuration = 200 ;
  var tileWidth     = 100 ;
  var tileHeight    = 68 ; 
  var maxHeight     = 200 ;

  viz.playerConfig = {

    sprite_loader: function() {

      var i = imageHelper.image2canvas('./image/jesus_spritesheet.png') ;

      var rowName = [
        'attack', 
        'dragonpunch',
        'hit',
        'jump', 
        'rest',
        'superdp', 
        'walk',
      ] ;

      var width = [
        tileWidth, 
        tileWidth, 
        tileWidth, 
        tileWidth, 
        tileWidth,
        tileWidth, 
        tileWidth,        
      ] ;

      var height = [
        tileHeight, 
        maxHeight, 
        48, 
        tileHeight, 
        tileHeight,
        maxHeight, 
        tileHeight,
      ] ;

      maxHeight = Math.max.apply(null, height) ;
      var spriteset = spriteHelper.get(i, rowName, width, height) ;

      // console.log('city level:', 'spriteset', spriteset) ;
      // imageHelper.view(spriteset.dragonpunch[0]) ;
      // imageHelper.view(spriteset.dragonpunch[1]) ;      
      // imageHelper.view(spriteset.dragonpunch[0]) ;
      // imageHelper.view(spriteset.hit[0]) ;

      var attackCollisionCanvas                = imageHelper.clear_rect (spriteset.attack[0], { x: 0, y: 0, width: 36, height: maxHeight } ) ;
      spriteset.attack[0].sourceCollisionImage = attackCollisionCanvas ;
      spriteset.attack[1].sourceCollisionImage = attackCollisionCanvas ;
      spriteset.attack                         = [spriteset.attack[0], spriteset.walk[1], spriteset.attack[1], spriteset.walk[1]] ;

      var jumpCollisionCanvas                = imageHelper.clear_rect ( spriteset.jump[1], { x: 0, y: 0, width: 36, height: maxHeight } ) ;
      spriteset.jump[1].sourceCollisionImage = jumpCollisionCanvas ;

      for (var kFrame = 2 ; kFrame <= 5 ; kFrame++) {
        spriteset.dragonpunch[kFrame].sourceCollisionImage = spriteset.dragonpunch[kFrame] ;
      }
      spriteset.dragonpunch[6].sourceCollisionImage = imageHelper.clear_rect (spriteset.dragonpunch[6], { x: 0, y: maxHeight - 40, width: 56 , height: 40} ) ;
      // imageHelper.view(spriteset.dragonpunch[6].sourceCollisionImage) ;
      for (var kFrame = 3 ; kFrame <= 7 ; kFrame++) {
        spriteset.superdp[kFrame].sourceCollisionImage = spriteset.superdp[kFrame] ;
      }      
      spriteset.superdp = spriteset.dragonpunch.concat (spriteset.superdp) ;

      spriteset.level = {
        0: 'jump',
        1: 'dragonpunch',
        2: 'superdp',
      } ;
/*      spriteset.jump.push(spriteset.jump[1]) ;
      spriteset.jump.push(spriteset.jump[1]) ;
      spriteset.jump.push(spriteset.jump[1]) ;
      spriteset.jump.push(spriteset.jump[1]) ;
      spriteset.jump.push(spriteset.jump[1]) ;
      spriteset.jump.push(spriteset.jump[1]) ;
      spriteset.jump.push(spriteset.jump[0]) ;
*/
      // imageHelper.view(jumpCollisionCanvas) ;
      // console.log('player sprite loader', spriteset) ;
      return spriteset ;

    },

    orientation: 'r',
    frameDuration: viz.frameDuration,
    floatDuration: floatDuration,
    hitDuration: viz.dur * 15,
    jumpDuration: jumpDuration,
    callback: fighterHelper.update_player,
    restoreRest: true,

    transitionSet: {

      x: $Z.transition.rounded_linear_transition_func ( 'x', viz.frameDuration ), //function accepting an x end-value and returning a transition object
      attack: step_transition_func ( 'image', viz.dur * 10 ), // transition object creation      
      jump: function() {
        var dur1 = jumpDuration * .75 ;
        var dur2 = floatDuration * 1.5 ;
        var dur4 = jumpDuration ; 
        var dur3 = jumpDuration ;
        var trans = step_transition_func('image', dur1) (viz.player.sprite.jump[0]) ;
        trans.child = step_transition_func('image', dur2) (viz.player.sprite.jump[1]) ;
        trans.child.child = step_transition_func('image', dur3) (viz.player.sprite.jump[2]) ;
        trans.child.child.child = step_transition_func('image', dur4) (viz.player.sprite.rest[0]) ;
        // trans.child = animate(viz.player.sprite.jump, step_transition_func('image', viz.player.jumpDuration), undefined, viz.player.sprite.rest[0])[0] ;
        return trans ;
      },
      y: $Z.transition.rounded_linear_transition_func ( 'y', jumpDuration ), // function accepting a y end-value and returning a transition object

    },

    xMove: 7,
    yMove: 50,
    y: viz.platformY - maxHeight,
    type: 'player',
    bulletSwitch: false,

  } ;
  // console.log('city level', 'viz.platformY', viz.platformY, 'maxHeight', maxHeight) ;

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