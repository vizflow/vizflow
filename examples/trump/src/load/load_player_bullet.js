function load_player_bullet(viz) {
  //var bulletSpriteSet0     = bullet_sprite () ;
  var i         = imageHelper.image2canvas('./game/image/beam_spritesheet.png') ;
  var rowName   = ['jump', 'bullet', 'hyper', 'super', 'superfull'] ;
  var width     = [186, 5, 235, 191, 191] ;
  var height    = [38, 5, 249, 84, 84] ;
  var maxHeight = Math.max.apply(null, height) ;
  var spriteset = spriteHelper.get(i, rowName, width, height) ;

  function set_collision (canvas) {
    canvas.sourceCollisionImage = canvas ;
  }
  spriteHelper.foreach(spriteset, set_collision) ;

  // spriteset.bullet[0].sourceCollisionImage = spriteset.bullet[0] ;

  // console.log('spriteset', spriteset) ;
  // imageHelper.view(i) ;
  
  bulletSpriteSet          = spriteHelper.foreach(spriteset, imageHelper.adjust_ratio) ;
  bulletSpriteSet.original = spriteset ;
 
  if (bulletSpriteSet.orientation === 'l') {

    viz.player.bulletSpriteL = bulletSpriteSet ;
    viz.player.bulletSpriteR = spriteHelper.horizontal_flip(player.bulletSpriteL) ;

  } else {

    viz.player.bulletSpriteR = bulletSpriteSet ;
    viz.player.bulletSpriteL = spriteHelper.horizontal_flip(viz.player.bulletSpriteR) ;

  }  

  viz.player.bulletSprite = viz.player.bulletSpriteR ;

  var bulletShiftXl     = -viz.player.bulletSprite.original.bullet[0].width ;
  var bulletShiftXr     = viz.player.sprite.original.rest[0].width + viz.player.bulletSprite.original.bullet[0].width - 16 ;
  var bulletShiftY      = 17 - maxHeight ; 
  var bulletDur         = viz.dur * 20 ;
  var bulletMove        = 150 ;

  function bullet_transition(xNew) {
    var transition = $Z.transition.rounded_linear_transition_func ( 'x', bulletDur )(xNew) ; // function accepting an x end-value and returning a transition object
    transition.end = bulletHelper.default_end(viz, this, viz.enemy) ;
    return transition ;
  }

  function bullet_animation(xNew) {
    return animate (viz.player.bulletSprite.jump, step_transition_func('image', viz.frameDuration))[0] ;
  }

  var bulletConfig   = {
    move: bulletMove,
    shiftXl: bulletShiftXl,
    shiftXr: bulletShiftXr, 
    shiftY: bulletShiftY,
    image: bulletSpriteSet.bullet[0],
    transition: bullet_transition,
    // animation: undefined,
  } ;

  var jumpBulletConfig        = copy_object(bulletConfig) ;
  var jumpBulletDur           = viz.dur * 10 ;

  function jump_bullet_transition(xNew) {
    var transition = step_transition_func ( 'dummy', jumpBulletDur )(xNew) ; // function accepting an x end-value and returning a transition object
    // console.log('jump_bullet_transition', transition) ;
    transition.end = bulletHelper.default_end(viz, this, viz.enemy) ;
    return transition ;
  }

  jumpBulletConfig.image      = bulletSpriteSet.jump[0] ;
  jumpBulletConfig.shiftY     = 39 - maxHeight ;
  jumpBulletConfig.transition = jump_bullet_transition ;
  jumpBulletConfig.move       = 0 ;
  jumpBulletConfig.shiftXl    = -bulletSpriteSet.jump[0].width + 20 ;
  jumpBulletConfig.shiftXr    = viz.player.sprite.original.rest[0].width + viz.player.bulletSprite.original.bullet[0].width - 20 ;


  viz.player.bullet     = setup_bullet (viz, viz.player, bulletConfig) ;  
  viz.player.jumpBullet = setup_bullet (viz, viz.player, jumpBulletConfig) ;  
 
  viz.player.bullet.audio = viz.audio.bullet ;
  viz.player.jumpBullet.audio = viz.audio.bullet ;
	
}