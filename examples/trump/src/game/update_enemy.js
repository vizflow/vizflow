function update_enemy () {
	// console.log('update_enemy start') ;
	fire_bullet.call(this, 'bullet') ;
	// this.item.transition = animate(this.sprite.attack, this.transitionSet.image, undefined, this.sprite.rest[0]) ;
	var transition = this.transitionSet.image(this.sprite.attack[0]) ;
	transition.child = this.transitionSet.attack(this.sprite.rest[0]) ;
	var replacementSwitch = true ;	
	transitionHelper.add.call(this.item, transition, replacementSwitch) ;
	// console.log('update enemy end') ;
}