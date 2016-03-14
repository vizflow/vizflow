function city_level () {

  var vizConfig = {

    backgroundImageUrl: './image/trump_bg1.png',
    loadingImageUrl: './image/city_intro.png',
    frameDurationFactor: 3,
    run: fighterHelper.run,
    load_ui: fighterHelper.load_ui,
    load_char: fighterHelper.load_char,
    load_response: fighterHelper.load_response,
    load_audio: gameHelper.load_audio,
    buttonpress: buttonpress,
    music: './audio/paQueSeLoGozen.wav',

  } ;

  viz = vizHelper.setup(vizConfig) ; // framdeDuration computed

  viz.platformY     = 170 ;
 
  var jumpDuration  = 250 ;
  var floatDuration = 200 ;
  var tileWidth     = 100 ;
  var tileHeight    = 68 ; 
  var maxHeight     = 200 ;

  function dragonpunch_trans (t, viz) {

    var dur1 = t ;
    var dur2 = t * 0.5 ;
    var dur3 = t * 3 ;
    var dur4 = t ;
    // var dur5 = t * 0.5 ;
    // var dur6 = t * 0.5 ;
    // var dur7 = t * 0.5 ;
    // var dur8 = t * 2;
    var trans1 = step_transition_func('image', dur1) (viz.player.sprite.jump1[0]) ;

    var trans2 = step_transition_func('image', dur2) (viz.player.sprite.jump1[1]) ;

    var trans3 = step_transition_func('image', dur3) (viz.player.sprite.jump1[2]) ;

    // var trans4 = step_transition_func('image', dur4) (viz.player.sprite.jump1[3]) ;
    // var trans5 = step_transition_func('image', dur5) (viz.player.sprite.jump1[4]) ;
    // var trans6 = step_transition_func('image', dur6) (viz.player.sprite.jump1[5]) ;
    // var trans7 = step_transition_func('image', dur7) (viz.player.sprite.jump1[6]) ;

    var trans4 = copy_object(trans1) ;

    var trans5 = step_transition_func('image', dur4) (viz.player.sprite.rest[0]) ;

    trans1.end = function() {
      viz.audio.sho.play() ;
    }

    var trans = transition_sequence ([trans1, trans2, trans3, trans4, trans5]) ;    

    return trans ;

  }

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

      var i = imageHelper.image2canvas('./image/jesus_spritesheet.png') ;

      var rowName = [
        'attack',
        'attack1', 
        'jump1',
        'hit',
        'jump0', 
        'rest',
        // 'jump1', 
        'walk',
      ] ;

      var width = [
        tileWidth,
        tileWidth, 
        tileWidth, 
        tileWidth, 
        tileWidth, 
        tileWidth,
        // tileWidth, 
        tileWidth,        
      ] ;

      var height = [
        tileHeight,
        tileHeight, 
        70, 
        tileHeight, 
        tileHeight, 
        tileHeight,
        // maxHeight, 
        tileHeight,
      ] ;

      maxHeight = Math.max.apply(null, height) ;
      var spriteset = spriteHelper.get(i, rowName, width, height) ;

      // console.log('city level:', 'spriteset', spriteset, 'spriteset.rest[0].originalCanvas', spriteset.rest[0].originalCanvas) ;
      // imageHelper.view(spriteset.jump1[0]) ;
      // imageHelper.view(spriteset.jump1[1]) ;      
      // imageHelper.view(spriteset.jump1[0]) ;
      // imageHelper.view(spriteset.hit[0]) ;

      var attackCollisionCanvas                = imageHelper.clear_rect (spriteset.attack[0].originalCanvas, { x: 0, y: 0, width: spriteset.attack[0].originalCanvas.width * 0.6, height: maxHeight } ) ;
      spriteset.attack[0].sourceCollisionImage = attackCollisionCanvas ;
      spriteset.attack[1].sourceCollisionImage = attackCollisionCanvas ;

      var attackCollisionCanvas                = imageHelper.clear_rect (spriteset.attack1[0].originalCanvas, { x: 0, y: 0, width: spriteset.attack1[0].originalCanvas.width * 0.6, height: maxHeight } ) ;
      spriteset.attack1[0].sourceCollisionImage = attackCollisionCanvas ;
      spriteset.attack1[1].sourceCollisionImage = attackCollisionCanvas ;

      spriteset.attack                         = [spriteset.attack[0], spriteset.walk[1], spriteset.attack[1], spriteset.walk[1]] ;
      spriteset.attack1                         = [spriteset.attack1[0], spriteset.walk[1], spriteset.attack1[1], spriteset.walk[1]] ;

      var jumpCollisionCanvas                = imageHelper.clear_rect ( spriteset.jump0[1].originalCanvas, { x: 0, y: 0, width: spriteset.jump0[0].originalCanvas.width * 0.6, height: maxHeight } ) ;
      // imageHelper.view(jumpCollisionCanvas) ;
      spriteset.jump0[1].sourceCollisionImage = jumpCollisionCanvas ;

      for (var kFrame = 0 ; kFrame < spriteset.jump1.length ; kFrame++) {
        spriteset.jump1[kFrame].sourceCollisionImage = imageHelper.clear_rect (spriteset.jump1[kFrame].originalCanvas, { x: 0, y: maxHeight - 45, width: spriteset.jump1[kFrame].originalCanvas.width * 0.6, height: spriteset.jump1[kFrame].originalCanvas.height} ) ;
      }
      // imageHelper.view(spriteset.jump1[1].sourceCollisionImage) ;
      // imageHelper.view(spriteset.jump1[2].sourceCollisionImage) ;
      // for (var kFrame = 2 ; kFrame <= 3 ; kFrame++) {
      //   spriteset.jump1[kFrame].sourceCollisionImage = spriteset.jump1[kFrame] ;
      // }      
      // spriteset.attack = spriteset.attack0 ;
      // spriteset.hit    = spriteset.hit0 ;
      spriteset.jump   = spriteset.jump0 ;
      // spriteset.rest   = spriteset.rest0 ;
      // spriteset.walk   = spriteset.walk0 ;      
      // spriteset.jump1 = spriteset.jump1.concat (spriteset.jump1) ;
      // imageHelper.view(jumpCollisionCanvas) ;
      // console.log('player sprite loader', spriteset) ;
      return spriteset ;

    },

    orientation: 'r',
    frameDuration: viz.frameDuration,
    hitDuration: viz.dur * 20,
    jumpDuration: jumpDuration,
    floatDuration: 1.5 * jumpDuration,

    callback: playerHelper.update,
    restoreRest: true,

    jump0: function() {
      var dur1 = jumpDuration * .75 ;
      var dur2 = floatDuration * 2.5 ;
      var dur3 = jumpDuration * 3 ; 
      var dur4 = jumpDuration ;
      var trans = step_transition_func('image', dur1) (viz.player.sprite.jump0[0]) ;
      trans.child = step_transition_func('image', dur2) (viz.player.sprite.jump0[1]) ;
      trans.child.child = step_transition_func('image', dur3) (viz.player.sprite.jump0[2]) ;
      trans.child.child.child = step_transition_func('image', dur4) (viz.player.sprite.rest[0]) ;
      // trans.child = animate(viz.player.sprite.jump0, step_transition_func('image', viz.player.jumpDuration), undefined, viz.player.sprite.rest[0])[0] ;
      return [trans] ;
    },

    jump1: function () {
      var jumpTime = jumpDuration * 1.5 + floatDuration ;
      var Nframe   = viz.player.sprite.jump1.length +1 ;
      var t        = jumpTime / Nframe ; // if all frames were same speed to equal total jumpDuration
      return transition_sequence(dragonpunch_trans (t, viz)) ;
    },

    transitionSet: {

      x: $Z.transition.rounded_linear_transition_func ( 'x', viz.frameDuration ), //function accepting an x end-value and returning a transition object
      attack: step_transition_func ( 'image', viz.dur * 10 ), // transition object creation 
      y: $Z.transition.rounded_linear_transition_func ( 'y', jumpDuration ), // function accepting a y end-value and returning a transition object

    },

    xMove: 7,
    yMove: 60,
    y: viz.platformY - 72,
    x: -tileWidth * 0.5 + 15,
    type: 'player',
    bulletSwitch: false,
    healthdrop: 3,

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

      spriteset.attack.push(spriteset.attack[0]) ;
      
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

  viz.load() ;

} 