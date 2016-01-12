var attack = {
	
	action: function attack_action() {
		//console.log ('attack action this', this) ;
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

    //console.log('attack action transition', this, 'this.element', this.element) ;

    // $Z.detect([]) ; // turn off collision detection until after the this.element.item character finishes animating
    //console.log('detection off')

    //attack.reset () ;

    // this.element.item.transition = 
    var transition = this.create_transition() ;
		this.element.item.transition.push (transition[0]) ;
		//console.log ('attack_action end') ;

  },

  set: function attack_set () {
    $Z.action([this.attackConfig])
  },

  reset: function attack_reset () {
   $Z.action([]) ; // turn off other actions
  },


} ;