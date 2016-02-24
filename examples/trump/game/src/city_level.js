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

  function dragonpunch_trans (t, viz) {

    var dur1 = t * 1.5 ;
    var dur2 = t ;
    var dur3 = t ;
    var dur4 = t ;
    var dur5 = t ;
    var dur6 = t ;
    var dur7 = t ;
    var dur8 = t * 1.5;
    var dur9 = t ;
    var dur10 = t * 3;
    var dur11 = t ;
    
    var trans1 = step_transition_func('image', dur1) (viz.player.sprite.dragonpunch[0]) ;
    var trans2 = step_transition_func('image', dur2) (viz.player.sprite.dragonpunch[1]) ;
    var trans3 = step_transition_func('image', dur3) (viz.player.sprite.dragonpunch[2]) ;
    var trans4 = step_transition_func('image', dur4) (viz.player.sprite.dragonpunch[3]) ;
    var trans5 = step_transition_func('image', dur5) (viz.player.sprite.dragonpunch[4]) ;
    var trans6 = step_transition_func('image', dur6) (viz.player.sprite.dragonpunch[5]) ;
    var trans7 = step_transition_func('image', dur7) (viz.player.sprite.dragonpunch[6]) ;
    var trans8 = step_transition_func('image', dur8) (viz.player.sprite.dragonpunch[7]) ;
    var trans9 = step_transition_func('image', dur9) (viz.player.sprite.dragonpunch[8]) ;
    var trans10 = step_transition_func('image', dur10) (viz.player.sprite.dragonpunch[9]) ;
    var trans11 = step_transition_func('image', dur11) (viz.player.sprite.rest[0]) ;
    var trans = [trans1, trans2, trans3, trans4, trans5, trans6, trans7, trans8, trans9, trans10, trans11] ;    

    return trans ;

  }

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
        70, 
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
      for (var kFrame = 2 ; kFrame <= 6 ; kFrame++) {
        spriteset.superdp[kFrame].sourceCollisionImage = spriteset.superdp[kFrame] ;
      }      
      // spriteset.superdp = spriteset.dragonpunch.concat (spriteset.superdp) ;

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
    hitDuration: viz.dur * 15,
    jumpDuration: jumpDuration,
    floatDuration: 1.5 * jumpDuration,

    callback: playerHelper.update,
    restoreRest: true,

    transitionSet: {

      x: $Z.transition.rounded_linear_transition_func ( 'x', viz.frameDuration ), //function accepting an x end-value and returning a transition object
      attack: step_transition_func ( 'image', viz.dur * 10 ), // transition object creation 

      jump: function() {
        var dur1 = jumpDuration * .75 ;
        var dur2 = floatDuration * 1.5 ;
        var dur3 = jumpDuration ; 
        var dur4 = jumpDuration ;
        var trans = step_transition_func('image', dur1) (viz.player.sprite.jump[0]) ;
        trans.child = step_transition_func('image', dur2) (viz.player.sprite.jump[1]) ;
        trans.child.child = step_transition_func('image', dur3) (viz.player.sprite.jump[2]) ;
        trans.child.child.child = step_transition_func('image', dur4) (viz.player.sprite.rest[0]) ;
        // trans.child = animate(viz.player.sprite.jump, step_transition_func('image', viz.player.jumpDuration), undefined, viz.player.sprite.rest[0])[0] ;
        return trans ;
      },

      dragonpunch: function () {
        var jumpTime = jumpDuration * 2 + floatDuration ;
        var Nframe   = viz.player.sprite.dragonpunch.length +1 ;
        var t        = jumpTime / Nframe ; // if all frames were same speed to equal total jumpDuration
        return transition_sequence(dragonpunch_trans (t, viz))[0];
      },

      superdp: function () {
        console.log ('superdp') ;
        var jumpTime = jumpDuration * 2 + floatDuration ;
        var Nframe   = (viz.player.sprite.dragonpunch.length + viz.player.sprite.superdp.length) +1 ;
        var t        = jumpTime / Nframe ; // if all frames were same speed to equal total jumpDuration        
        var trans0 = dragonpunch_trans(t, viz) ;
        var dur1 = t * 1.5 ;
        var dur2 = t ;
        var dur3 = t ;
        var dur4 = t ;
        var dur5 = t ;
        var dur6 = t ;
        var dur7 = t ;
        var dur8 = t ;
        var trans1 = step_transition_func('image', dur1) (viz.player.sprite.superdp[0]) ;
        var trans2 = step_transition_func('image', dur2) (viz.player.sprite.superdp[1]) ;
        var trans3 = step_transition_func('image', dur3) (viz.player.sprite.superdp[2]) ;
        var trans4 = step_transition_func('image', dur4) (viz.player.sprite.superdp[3]) ;
        var trans5 = step_transition_func('image', dur5) (viz.player.sprite.superdp[4]) ;
        var trans6 = step_transition_func('image', dur6) (viz.player.sprite.superdp[5]) ;
        var trans7 = step_transition_func('image', dur7) (viz.player.sprite.superdp[6]) ;
        var trans8 = step_transition_func('image', dur8) (viz.player.sprite.rest[0]) ;
        var trans = trans0.concat([trans1, trans2, trans3, trans4, trans5, trans6, trans7, trans8]) ;    
        return transition_sequence(trans)[0] ;
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