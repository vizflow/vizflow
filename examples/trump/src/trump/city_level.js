function city_level () {

  document.nextLevel = fantasy_level ;

  var vizConfig = {
    backgroundImageUrl: './images/trump_bg1.png',
    loadingImageUrl: './images/trumped1.png',
    frameDurationFactor: 5,
  } ;

  viz = setup_viz(vizConfig) ; // framdeDuration computed

  viz.playerConfig = {
    sprite_loader: function() {
      var i         = imageHelper.image2canvas('./images/jesus_spritesheet.png') ;
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
      // spriteHelper.view(jumpCollisionCanvas) ;
      // console.log('player sprite loader', spriteset) ;
      return spriteset ;
    },
    orientation: 'r',
    frameDuration: viz.frameDuration,
    floatDuration: viz.dur * 20,
    hitDuration: viz.dur * 15,
    jumpDuration: viz.dur * 10,
    callback: update_player,
    restoreRest: true,
    transitionSet: {
      x: $Z.transition.rounded_linear_transition_func ( 'x', viz.frameDuration ), //function accepting an x end-value and returning a transition object
      attack: step_transition_func ( 'image', viz.dur * 10 ), // transition object creation      
      jump: function() {
        var dur1 = 10 ;
        var dur2 = 100 ;
        var dur3 = 400 ;
        var dur4 = 10 ; 
        var trans = step_transition_func('image', dur1) (viz.player.sprite.jump[0]) ;
        trans.child = step_transition_func('image', dur2) (viz.player.sprite.jump[1]) ;
        trans.child.child = step_transition_func('image', dur3) (viz.player.sprite.jump[2]) ;
        trans.child.child.child = step_transition_func('image', dur4) (viz.player.sprite.rest[0]) ;
        // trans.child = animate(viz.player.sprite.jump, step_transition_func('image', viz.player.jumpDuration), undefined, viz.player.sprite.rest[0])[0] ;
        return trans ;
      },
      y: $Z.transition.rounded_linear_transition_func ( 'y', viz.frameDuration * 3 ), // function accepting a y end-value and returning a transition object
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
      var i = imageHelper.image2canvas('./images/trump_spritesheet.png') ;
      var rowName = ['attack', 'hit', 'rest', 'walk'] ;
      var width   = [170, 170, 170, 170] ;
      var height  = [154, 154, 154, 154] ;
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

  load_viz(viz) ;

} 