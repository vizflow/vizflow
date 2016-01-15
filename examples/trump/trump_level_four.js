function trump_level_four () {

  var vizConfig = { // an object to configure the visualization
    backgroundImageUrl: 'trump_bg4.png',
    frameDurationFactor: 1,
  } ;

  viz           = setup_viz     (vizConfig)   ; // frameDuration is computed from frameDurationFactor using units of base vizflow framespeed (17 ms) 
  viz.ui        = setup_ui      (viz)         ;
  viz.ui.button = setup_buttons (viz, viz.ui) ; 

  var playerConfig = { 
    sprite_loader: samus_sprite, 
    orientation: 'r',
    frameDuration: viz.frameDuration,
    callback: update_player,
    restoreRest: true,
    transitionSet: {
      x: $Z.transition.rounded_linear_transition_func ( 'x', viz.frameDuration ), // function accepting an x end-value and returning a transition object
    },
    xMove: 10,
    y: 225,
  } ;

  var enemyConfig = {
    sprite_loader: trump_sprite,
    frameDuration: viz.frameDuration,
    collisionImage: 'rest', 
    x: 80,    
    y: 220,
  } ;

  var bulletShiftX      = 20 ;
  var bulletShiftY      = 8 ;
  var bulletImageUrl    = 'bullet.png' ;
  var bulletImage       = image2canvas (bulletImageUrl) ;  
  var bulletDur         = 17 * 20 ;
  var bullet_transition = $Z.transition.rounded_linear_transition_func ( 'x', bulletDur ) ; // function accepting an x end-value and returning a transition object
  var bulletMove        = 150 ;

  var bulletConfig   = {
    move: bulletMove,
    shiftX: bulletShiftX, 
    shiftY: bulletShiftY,
    image: bulletImage,
    transition: bullet_transition,
  } ;

  viz.player            = setup_element(viz, playerConfig) ;
  viz.player.bullet     = setup_bullet (viz, viz.player, bulletConfig) ;  
  viz.player.bulletList = [] ;
 
  viz.enemy = setup_element(viz, enemyConfig) ;
  
  var setupHitConfig = {
    detectList: [viz.player], 
  } ;
  
  viz.enemy.hit = setup_hit(viz, viz.enemy, setupHitConfig) ;
  viz.player.enemy = viz.enemy ; // decorate the player object for convenient access to the viz.enemy object 

  load_game(viz) ;

}