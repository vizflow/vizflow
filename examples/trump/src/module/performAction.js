var performAction = {
	
	hit: function peform_action_hit () {
		// console.log ('perform action hit: this', this) ;
    // if (this.element.item.transition !== undefined && this.element.item.transition.length > 0) {
    //   return ;
    // }        
    this.healthbar.health -= this.healthdrop ;
    
    if (this.healthbar.health < 0 && this.element === this.viz.enemy) {
      if(document.nextLevel === null) {
        alert('congratulations! you did it') ;
        $Z.item([]) ;
      } else {
        $Z.maxIter = 0 ; // force exit 
        document.nextLevel() ; 
        $Z.maxIter = Infinity ;
      }
      // alert ('game over') ;
      this.healthbar.health = 0 ;
    }

    if (this.healthbar.health < 0 && this.element === this.viz.player) {
      alert('game over') ;
      $Z.item([]) ;
      this.healthbar.health = 0 ;
    }

    if (this.element.item.transition === undefined) {
    	this.element.item.transition = [] ;
    }

    if (this.healthbar.item.transition === undefined) {
    	this.healthbar.item.transition = [] ;
    }
    //this.healthbar.item.width = this.healthbar.health ;
      // console.log('perform action hit 24') ;
    transitionHelper.update_end_value.call(this.healthbar.item, 'width', this.healthbar.health, this.health_transition) ;
      //console.log('PAH 25', 'this', this, 'this.healthbar.health', this.healthbar.health, 'this.healthbar.item.transition', this.healthbar.item.transition) ;
    // console.log ('this.healthbar.item', this.healthbar.item) ;

    //console.log('action action transition', this, 'this.element', this.element) ;

    // $Z.detect([]) ; // turn off collision detection until after the this.element.item character finishes animating
    //console.log('detection off')

    //action.reset () ;

    // this.element.item.transition = 
    // console.log('this.element.sprite', this.element.sprite) ;
    // var transitionFunc = this.element.transitionSet.image ;
    // var transition     = animate(this.element.sprite.hit, transitionFunc, undefined, this.element.sprite.rest[0]) ;
    // console.log('perform action hit 41', 'this.element.item.transition', this.element.item.transition) ;
    var transition = this.transition() ; // returns an array of transition objects
    var replacementSwitch = true ; // interrupt current player transitions due to hit
    for (var kTrans = 0 ; kTrans < transition.length ; kTrans++) {
      transitionHelper.add.call(this.element.item, transition[kTrans], replacementSwitch) ;
    }

    if(this.audio !== undefined && this.audio.buffer !== undefined) {
      this.audio.play() ;
    }
		// console.log ('perform action hit end', 'this.element.item.transition', this.element.item.transition) ;
    // console.log('performAction hit this end', this) ;
    performAction.reset () ; //.call(this) ;

  },

  add: function perform_action_add (action) {

    if(action === undefined) {
      action = this ;
    }

    var performActionList = $Z._perform ;
    var index = performActionList.indexOf (action) ;
    if (index === -1) {
      performActionList.push(action) ;
    } else {
      performActionList[index] = action ;
    }    
    detectAction.remove(action) ; // stop detecting this action after staging performance

  },

  remove: function perform_action_remove (action) {

    if(action === undefined) {
      action = this ;
    }

    var performActionList = $Z._perform ;
    var index = performActionList.indexOf (action) ;

    if (index === -1) {
      return ; // nothing to do
    } else {
      performActionList.splice(index, 1) ;
    }    

  },

  set: function perform_action_set (action) {

    if(action === undefined) {
      action = this ;
    }

    $Z.perform([action]) ;

  },

  reset: function perform_action_reset () {
   $Z.perform([]) ; // turn off other actions
  },

} ;