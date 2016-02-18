function space_level () {

  document.nextLevel = null ;

  var vizConfig = { // an object to configure the visualization
    backgroundImageUrl: './images/trump_bg4.png',
    loadingImageUrl: './images/megyn_title.png',
    frameDurationFactor: 2,
  } ;

  viz = vizHelper.setup(vizConfig) ; // frameDuration is computed from frameDurationFactor using units of base vizflow framespeed (17 ms) 

  viz.playerConfig = { 

    sprite_loader: function() {
      var i         = imageHelper.image2canvas('./images/megyn_spritesheet.png') ;
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
    callback: update_player,
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
      var i       = imageHelper.image2canvas('./images/trump_spritesheet.png') ;
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

  // var trumpAttackConfig = {
  //   varName: 'image', 
  //   duration: 2000,
  //   startValue: 0,
  //   endValue: 0,
  //   interpFunc: function(t) {}, 
  //   end: function () {
  //     // fire_bullet.call(viz.enemy, 'word') ;
  //     update_enemy.call (viz.enemy) ;
  //     viz.enemy.item.transition = [copy_object (trumpAttackConfig)] ;
  //     console.log('trump attack config end', 'trumpAttackConfig', trumpAttackConfig) ;
  //   },
  // } ;

  // trumpAttackConfig.end =  ;

  // viz.enemy.item.transition = [copy_object (trumpAttackConfig)] ;