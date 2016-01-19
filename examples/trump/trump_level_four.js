function trump_level_four () {
  // console.log('level 4') ;
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
    floatDuration: 15 * viz.frameDuration,
    jumpDuration: 40 * viz.frameDuration,
    callback: update_player,
    restoreRest: true,
    transitionSet: {
      x: $Z.transition.rounded_linear_transition_func ( 'x', viz.frameDuration ), // function accepting an x end-value and returning a transition object
      y: $Z.transition.rounded_linear_transition_func ( 'y', viz.frameDuration * 10 ), // function accepting a y end-value and returning a transition object
    },
    xMove: 10,
    yMove: 100,
    y: 225,
  } ;

  viz.player        = setup_element(viz, playerConfig) ;

  var enemyConfig = {
    sprite_loader: trump_sprite,
    frameDuration: viz.frameDuration,
    collisionImage: 'rest', 
    x: 80,    
    y: 220,
  } ;

  var bulletSpriteSet = bullet_sprite () ;

  if(bulletSpriteSet.orientation === 'l') {

    viz.player.bulletSpriteL = bulletSpriteSet ;
    viz.player.bulletSpriteR = horizontal_flip(player.bulletSpriteL) ;

  } else {

    viz.player.bulletSpriteR = bulletSpriteSet ;
    viz.player.bulletSpriteL = horizontal_flip(viz.player.bulletSpriteR) ;

  }  

  viz.player.bulletSprite = viz.player.bulletSpriteR ;

  var bulletShiftXl     = -viz.player.bulletSprite.bullet[0].width ;
  var bulletShiftXr     = viz.player.sprite.rest[0].width + viz.player.bulletSprite.bullet[0].width - 4 ;
  var bulletShiftY      = 8 ; 
  var bulletDur         = 17 * 20 ;
  var bullet_transition = $Z.transition.rounded_linear_transition_func ( 'x', bulletDur ) ; // function accepting an x end-value and returning a transition object
  var bulletMove        = 150 ;

  var bulletConfig   = {
    move: bulletMove,
    shiftXl: bulletShiftXl,
    shiftXr: bulletShiftXr, 
    shiftY: bulletShiftY,
    image: bulletSpriteSet.bullet[0],
    transition: bullet_transition,
  } ;

  var jumpBulletConfig   = copy_object(bulletConfig) ;
  var jumpBulletDur         = 17 * 15 ;
  var jump_bullet_transition = $Z.transition.rounded_linear_transition_func ( 'x', jumpBulletDur ) ; // function accepting an x end-value and returning a transition object
  jumpBulletConfig.image = bulletSpriteSet.jump[0] ;
  jumpBulletConfig.shiftY = 0 ;
  jumpBulletConfig.transition = jump_bullet_transition ;
  jumpBulletConfig.move  = 0 ;
  jumpBulletConfig.shiftXl = -bulletSpriteSet.jump[0].width + 4 ;

  viz.player.bullet     = setup_bullet (viz, viz.player, bulletConfig) ;  
  viz.player.jumpBullet = setup_bullet (viz, viz.player, jumpBulletConfig) ;  

  viz.enemy         = setup_element(viz, enemyConfig) ;

  var wordConfig   = {
    move: -100,
    shiftX: -40, 
    shiftY: 107,
    image: word_image ('schlonged'),
    transition: $Z.transition.rounded_linear_transition_func ( 'x', viz.dur * 20 ), // sets speed of word block
  } ;
  viz.enemy.word = setup_word (viz, 'enemy', wordConfig) ;  
  console.log('enemy', viz.enemy) ;
  
  var setupEnemyHitConfig = {
    detectList: [viz.enemy.item],
    healthbarY: 10, 
    color: '#900',
  } ;
  
  viz.enemy.hit    = setup_hit(viz, viz.enemy, setupEnemyHitConfig) ;

  var setupPlayerHitConfig = {
    detectList: [viz.player.item],
    healthbarY: 25,
    color: '#009', 
  } ;
  
  viz.player.hit    = setup_hit(viz, viz.player, setupPlayerHitConfig) ;
  viz.player.hit.detect = function () {} ;

  viz.player.adversary = viz.enemy ; // decorate the player object for convenient access to the viz.enemy object 
  viz.enemy.adversary = viz.player ;

  load_game(viz) ;

}