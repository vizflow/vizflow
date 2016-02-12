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
      var width     = [50, 80, 50, 50, 50] ;
      var height    = [48, 76, 48, 48, 48] ;
      var maxHeight = Math.max.apply(null, height) ;
      var spriteset = spriteHelper.get(i, rowName, width, height) ;

      var attackCollisionCanvas = imageHelper.clear_rect (spriteset.attack[0], { x: 0, y: 0, width: 36, height: maxHeight } ) ;
      spriteset.attack[0].sourceCollisionImage = attackCollisionCanvas ;
      spriteset.attack[1].sourceCollisionImage = attackCollisionCanvas ;
      spriteset.attack = [spriteset.attack[0], spriteset.walk[1], spriteset.attack[1], spriteset.walk[1]] ;

      var jumpCollisionCanvas = imageHelper.clear_rect ( spriteset.jump[1], { x: 0, y: 0, width: 36, height: maxHeight } ) ;
      spriteset.jump[1].sourceCollisionImage = jumpCollisionCanvas ;

      // spriteHelper.view(jumpCollisionCanvas) ;
      // console.log('player sprite loader', spriteset) ;
      return spriteset ;
    },
    orientation: 'r',
    frameDuration: viz.frameDuration,
    floatDuration: viz.dur * 20,
    callback: update_player,
    restoreRest: true,
    transitionSet: {
      x: $Z.transition.rounded_linear_transition_func ( 'x', viz.frameDuration ), //function accepting an x end-value and returning a transition object
      attack: step_transition_func ( 'image', viz.dur * 10 ), // transition object creation      
      y: $Z.transition.rounded_linear_transition_func ( 'y', viz.frameDuration * 3 ), // function accepting a y end-value and returning a transition object
    },
    xMove: 7,
    yMove: 50,
    y: 95,
    type: 'player',
    bulletSwitch: false,
  } ;

  viz.enemyConfig = {
    sprite_loader: function() {
      var i = imageHelper.image2canvas('./images/trump_spritesheet_new.png') ;
      var rowName = ['rest', 'attack'] ;
      var width   = [105, 105] ;
      var height  = [150, 150] ;
      var spriteset = spriteHelper.get(i, rowName, width, height) ;
      spriteset.hit = spriteset.attack ;
      // console.log('enemy sprite loader', spriteset) ;
      return spriteset ;
    },    
    frameDuration: viz.frameDuration * 1,
    attackDuration: 5 * viz.frameDuration,
    orientation: 'l',
    x: 100,
    y: 17,
    type: 'enemy',
  } ;

  load_viz(viz) ;

} 