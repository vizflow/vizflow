function update_enemy () {
	fire_bullet.call(this, 'word') ;
	// console.log('update_enemy') ;
	// this.item.transition = animate(this.sprite.attack, this.transitionSet.image, undefined, this.sprite.rest[0]) ;
	this.item.transition = this.transitionSet.image(this.sprite.attack[0]) ;
	this.item.transition.child = this.transitionSet.attack(this.sprite.rest[0]) ;
}