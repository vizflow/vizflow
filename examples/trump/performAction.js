var performAction = {
	
	hit: function peform_action_hit () {
		// console.log ('perform action hit: this', this) ;
    this.healthbar.health -= this.healthDrop ;
    
    if (this.healthbar.health < 0) {
      alert ('game over') ;
      this.healthbar.health = 0 ;
    }

    if (this.element.item.transition === undefined) {
    	this.element.item.transition = [] ;
    }

    if (this.element.item.transition.length > 0) {
      return ;
    }    

    if (this.healthbar.item.transition === undefined) {
    	this.healthbar.item.transition = [] ;
    }
    //this.healthbar.item.width = this.healthbar.health ;
    if (this.healthbar.item.transition.length === 0) { // no transitions currently running
    	this.healthbar.item.transition = this.health_transition (this.healthbar.health) ;
    }
    //console.log ('this.healthbar.item', this.healthbar.item) ;

    //console.log('action action transition', this, 'this.element', this.element) ;

    // $Z.detect([]) ; // turn off collision detection until after the this.element.item character finishes animating
    //console.log('detection off')

    //action.reset () ;

    // this.element.item.transition = 
    // console.log('this.element.sprite', this.element.sprite) ;
    // var transitionFunc = this.element.transitionSet.image ;
    // var transition     = animate(this.element.sprite.hit, transitionFunc, undefined, this.element.sprite.rest[0]) ;
    // console.log('trans', this.transition(), 'this.element.item.transition', this.element.item.transition) ;
		this.element.item.transition.push (this.transition()[0]) ;
		// console.log ('perform action hit end', 'this.element.item.transition', this.element.item.transition) ;

  },

  set: function perform_action_set () {
    $Z.perform([this])
  },

  reset: function perform_action_reset () {
   $Z.perform([]) ; // turn off other actions
  },


} ;