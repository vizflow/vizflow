function update_enemy () {
	fire_bullet.call(this, 'bullet') ;
	// console.log('update_enemy') ;
	// this.item.transition = animate(this.sprite.attack, this.transitionSet.image, undefined, this.sprite.rest[0]) ;
	var transition = this.transitionSet.image(this.sprite.attack[0]) ;
	transition.child = this.transitionSet.attack(this.sprite.rest[0]) ;
	var replacementSwitch = true ;	
	transitionHelper.add.call(this.item, transition, replacementSwitch) ;
}