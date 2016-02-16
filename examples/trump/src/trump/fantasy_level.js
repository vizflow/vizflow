function fantasy_level () {

  document.nextLevel = space_level ;

  var vizConfig = { // an object to configure the visualization
    backgroundImageUrl: './images/trump_bg3.png',
    loadingImageUrl: './images/rastan_intro.png',
    frameDurationFactor: 5,
  } ;

  viz = setup_viz (vizConfig) ; // frameDuration is computed from frameDurationFactor using units of base vizflow framespeed (17 ms) 

  viz.playerConfig = { 
    sprite_loader: function() {
      var i         = imageHelper.image2canvas('./images/rastan_spritesheet.png') ;
      var rowName   = ['attack', 'hit', 'jump', 'rest', 'walk'] ;
      var width     = [100, 100, 100, 100, 100] ;
      var height    = [75, 75, 75, 75, 75] ;
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

/*      spriteset.hit.push(spriteset.hit[2]) ;
      spriteset.hit.push(spriteset.hit[2]) ;
      spriteset.hit.push(spriteset.hit[1]) ;
      spriteset.hit.push(spriteset.hit[1]) ;
      spriteset.hit.push(spriteset.hit[1]) ;
      spriteset.hit.push(spriteset.hit[0]) ;
      spriteset.hit.push(spriteset.hit[0]) ;
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
    callback: update_player,
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
    y: 98,
    type: 'player',
    bulletSwitch: false,
  } ;

  viz.enemyConfig = {
    sprite_loader: function() {
      var i = imageHelper.image2canvas('./images/trump_spritesheet.png') ;
      var rowName = ['attack', 'hit', 'rest', 'walk'] ;
      var width   = [170, 170, 170, 170] ;
      var height  = [154, 154, 154, 154] ;
      var spriteset = spriteHelper.get(i, rowName, width, height) ;
      // console.log('enemy sprite loader', spriteset) ;
      return spriteset ;
    },    
    frameDuration: viz.frameDuration,
    hitDuration: viz.frameDuration * 5,
    attackDuration: 2 * viz.frameDuration,
    orientation: 'l',
    x: 50, 
    y: 20,
    type: 'enemy',
  } ;

  load_viz(viz) ;

}