function bullet_sprite () {
  
  var bulletImageUrl    = './images/bullet.png' ;
  var bulletImage       = image2canvas (bulletImageUrl) ; 
  var jumpBulletImageUrl = './images/beam1.png' ;
  var jumpBulletImage    = image2canvas (jumpBulletImageUrl) ;

	var bulletSprite    = {
		bullet: [bulletImage], 
		jump: [jumpBulletImage],
	} ;

	bulletSprite.orientation = 'r' ;

	return bulletSprite ;

}