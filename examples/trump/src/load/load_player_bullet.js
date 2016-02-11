function load_player_bullet(viz) {
  var bulletSpriteSet0     = bullet_sprite () ;
  bulletSpriteSet          = spriteHelper.foreach(bulletSpriteSet0, adjust_image_ratio) ;
  bulletSpriteSet.original = bulletSpriteSet0 ;
 
  if (bulletSpriteSet.orientation === 'l') {

    viz.player.bulletSpriteL = bulletSpriteSet ;
    viz.player.bulletSpriteR = horizontal_flip(player.bulletSpriteL) ;

  } else {

    viz.player.bulletSpriteR = bulletSpriteSet ;
    viz.player.bulletSpriteL = horizontal_flip(viz.player.bulletSpriteR) ;

  }  

  viz.player.bulletSprite = viz.player.bulletSpriteR ;

  var bulletShiftXl     = -viz.player.bulletSprite.original.bullet[0].width ;
  var bulletShiftXr     = viz.player.sprite.original.rest[0].width + viz.player.bulletSprite.original.bullet[0].width - 4 ;
  var bulletShiftY      = 8 ; 
  var bulletDur         = viz.dur * 20 ;
  var bulletMove        = 150 ;

  function bullet_transition(xNew) {
    var transition = $Z.transition.rounded_linear_transition_func ( 'x', bulletDur )(xNew) ; // function accepting an x end-value and returning a transition object
    transition.end = bulletHelper.default_end(viz, this, viz.enemy) ;
    return transition ;
  }

  var bulletConfig   = {
    move: bulletMove,
    shiftXl: bulletShiftXl,
    shiftXr: bulletShiftXr, 
    shiftY: bulletShiftY,
    image: bulletSpriteSet.bullet[0],
    transition: bullet_transition,
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
  jumpBulletConfig.shiftY     = 0 ;
  jumpBulletConfig.transition = jump_bullet_transition ;
  jumpBulletConfig.move       = 0 ;
  jumpBulletConfig.shiftXl    = -bulletSpriteSet.jump[0].width + 4 ;

  viz.player.bullet     = setup_bullet (viz, viz.player, bulletConfig) ;  
  viz.player.jumpBullet = setup_bullet (viz, viz.player, jumpBulletConfig) ;  
 
  viz.player.bullet.audio = viz.audio.bullet1 ;
  viz.player.jumpBullet.audio = viz.audio.bullet1 ;
	
}