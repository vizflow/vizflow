function update_enemy () {
	// console.log('update_enemy start') ;
	fire_bullet.call(this, 'bullet') ;
	// this.item.transition = animate(this.sprite.attack, this.transitionSet.image) ;
	this.item.image = this.sprite.attack[0] ; // this.transitionSet.image(this.sprite.attack[0]) ;
	// var transition = this.transitionSet.attack(this.sprite.rest[0]) ;
	var transition = this.transitionSet.attack(this.sprite.rest[0]) ;
	// this.item.transition = transition ;
	var replacementSwitch = true ;	
	this.item.add_transition(transition, replacementSwitch) ;
	// console.log('update enemy end') ;
}