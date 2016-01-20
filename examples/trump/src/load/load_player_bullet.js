function load_player_bullet(viz) {
  var bulletSpriteSet = bullet_sprite () ;

  if (bulletSpriteSet.orientation === 'l') {

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
  var bulletDur         = viz.dur * 20 ;
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

  var jumpBulletConfig        = copy_object(bulletConfig) ;
  var jumpBulletDur           = viz.dur * 15 ;
  var jump_bullet_transition  = $Z.transition.rounded_linear_transition_func ( 'x', jumpBulletDur ) ; // function accepting an x end-value and returning a transition object
  jumpBulletConfig.image      = bulletSpriteSet.jump[0] ;
  jumpBulletConfig.shiftY     = 0 ;
  jumpBulletConfig.transition = jump_bullet_transition ;
  jumpBulletConfig.move       = 0 ;
  jumpBulletConfig.shiftXl    = -bulletSpriteSet.jump[0].width + 4 ;

  viz.player.bullet     = setup_bullet (viz, viz.player, bulletConfig) ;  
  viz.player.jumpBullet = setup_bullet (viz, viz.player, jumpBulletConfig) ;  
	
}