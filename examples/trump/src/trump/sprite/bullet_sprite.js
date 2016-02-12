function bullet_sprite () {
  
  var bulletImageUrl    = './images/bullet.png' ;
  var bulletImage       = imageHelper.image2canvas (bulletImageUrl) ; 
  var jumpBulletImageUrl = './images/beam1.png' ;
  var jumpBulletImage    = imageHelper.image2canvas (jumpBulletImageUrl) ;

  bulletImage.sourceCollisionImage = bulletImage ;
  jumpBulletImage.sourceCollisionImage = jumpBulletImage ;

	var bulletSprite    = {
		bullet: [bulletImage], 
		jump: [jumpBulletImage],
	} ;

	bulletSprite.orientation = 'r' ;

	// bulletSprite.height = bulletImage.height ;

	return bulletSprite ;

}