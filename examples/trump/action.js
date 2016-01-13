var action = {
	
	perform: function action_perform () {

		//console.log ('action action this', this) ;
    this.healthbar.health -= this.healthDrop ;
    
    if (this.healthbar.health < 0) {
      alert ('game over') ;
      this.healthbar.health = 0 ;
    }

    if (this.element.item.transition === undefined) {
    	this.element.item.transition = [] ;
    }

    if (this.healthbar.item.transition === undefined) {
    	this.healthbar.item.transition = [] ;
    }
    //this.healthbar.item.width = this.healthbar.health ;
    if (this.healthbar.item.transition.length === 0) { // no transitions currently running
    	this.healthbar.item.transition = this.health_transition (this.healthbar.health) ;
    }
    //console.log ('this.healthbar.item', this.healthbar.item) ;

    if (this.element.reacting) {
      return ;
    }

    this.element.reacting = true ;

    //action.reset () ;

    this.element.item.image      = this.element.sprite.blink [1] ;
    //console.log('action action transition', this) ;

		this.element.item.transition.push (this.transition[0]) ;
		//console.log ('attack_action end') ;

  },

  set: function action_set (actionConfig) {

  	//var action_func = function () {
  		//$Z.action([this[actionConfigName]]) ; 
  	//}
  	
  	//return action_func ;

  	$Z.action([actionConfig]) ; 

  },

  reset: function action_reset () {
   $Z.detect([]) ; // turn off collision detection until after the this.element.item character finishes animating
   $Z.action([]) ; // turn off other actions
  },

} ;