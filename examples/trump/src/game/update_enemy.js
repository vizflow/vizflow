function update_enemy () {
	// console.log('update_enemy start') ;
	// this.item.transition = animate(this.sprite.attack, this.transitionSet.image) ;
	// this.item.image = this.sprite.attack[0] ; // this.transitionSet.image(this.sprite.attack[0]) ;
  var transition = animate(this.sprite.attack, step_transition_func('image', this.config.attackDuration), undefined, this.sprite.rest[0])[0] ;
	// var transition = this.transitionSet.attack(this.sprite.rest[0]) ;
	// var transition = this.transitionSet.attack(this.sprite.rest[0]) ;
	// this.item.transition = transition ;
	var replacementSwitch = true ;	
	
	this.item.add_transition(transition, replacementSwitch) ;

	this.item.add_end('image', 1, {
		element: this,
		run: function() {
			// console.log('enemy bullet run')
			fire_bullet.call(this.element, 'bullet') ;
		}
	}) ;		

	// console.log('update enemy end') ;

}