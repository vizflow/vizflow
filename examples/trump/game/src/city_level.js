function city_level () {

  document.nextLevel = fantasy_level ;

  var vizConfig = {

    backgroundImageUrl: './image/trump_bg1.png',
    loadingImageUrl: './image/city_intro.png',
    frameDurationFactor: 5,
    run: fighterHelper.run,
    load_ui: fighterHelper.load_ui,
    load_char: fighterHelper.load_char,
    load_response: hitHelper.load,
    load_audio: fighterHelper.load_audio,
    buttonpress: buttonpress,

  } ;

  viz = vizHelper.setup(vizConfig) ; // framdeDuration computed

  var jumpDuration  = 300 ;
  var floatDuration = 200 ;

  viz.playerConfig = {

    sprite_loader: function() {

      var i         = imageHelper.image2canvas('./image/jesus_spritesheet.png') ;
      var rowName   = ['attack', 'hit', 'jump', 'rest', 'walk'] ;
      var width     = [50, 50, 50, 50, 50] ;
      var height    = [48, 48, 48, 48, 48] ;
      var maxHeight = Math.max.apply(null, height) ;
      var spriteset = spriteHelper.get(i, rowName, width, height) ;

      // console.log('city level:', 'spriteset', spriteset) ;

      var attackCollisionCanvas = imageHelper.clear_rect (spriteset.attack[0], { x: 0, y: 0, width: 36, height: maxHeight } ) ;
      spriteset.attack[0].sourceCollisionImage = attackCollisionCanvas ;
      spriteset.attack[1].sourceCollisionImage = attackCollisionCanvas ;
      spriteset.attack = [spriteset.attack[0], spriteset.walk[1], spriteset.attack[1], spriteset.walk[1]] ;

      var jumpCollisionCanvas = imageHelper.clear_rect ( spriteset.jump[1], { x: 0, y: 0, width: 36, height: maxHeight } ) ;
      spriteset.jump[1].sourceCollisionImage = jumpCollisionCanvas ;

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
        var dur1 = jumpDuration * 0.125 ;
        var dur2 = floatDuration ;
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
    y: 123,
    type: 'player',
    bulletSwitch: false,

  } ;

  viz.enemyConfig = {

    sprite_loader: function() {

      // console.log('enemy sprite loader', spriteset) ;
      var i         = imageHelper.image2canvas('./image/trump_spritesheet.png') ;
      var rowName   = ['attack', 'hit', 'rest', 'walk'] ;
      var width     = [170, 170, 170, 170] ;
      var height    = [154, 154, 154, 154] ;
      var spriteset = spriteHelper.get(i, rowName, width, height) ;
      
      return spriteset ;

    },    

    frameDuration: viz.frameDuration * 1,
    attackDuration: 5 * viz.frameDuration,
    hitDuration: viz.dur * 10,
    orientation: 'l',
    x: 60,
    y: 17,
    type: 'enemy',

  } ;

  viz.load() ;

} 