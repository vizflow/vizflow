var transitionHelper = {

  find: function transition_helper_find (property, transitionList) {
    if (transitionList === undefined) {
      transitionList = this.transition ; // means function was attached to an item's context
    }
    var transitionIndex = -1 ;
    for(var ktrans = 0 ; ktrans < transitionList.length ; ktrans++) {
      if(transitionList[ktrans].varName === property) {
        transitionIndex = ktrans ;
      }
    }
    return transitionIndex ;    
  },
	
  add: function transition_helper_add (newTransition, replacementSwitch, item) {

    if(item === undefined) {
      item = this ;
    }

    // assume "this" corresponds to the item whose transition array we are modifying
    if (replacementSwitch === undefined) {
      replacementSwitch = false ;
    }

    var transitionList = item.transition ;
    if (transitionList === undefined) {
      item.transition = [] ;
      transitionList = item.transition ;
    }

    // console.log('transitionList', transitionList, 'item', item) ;
    if (newTransition.constructor !== Array) {
      newTransition = [newTransition] ;
    }

    for (kNew = 0 ; kNew < newTransition.length ; kNew ++) {
      var property = newTransition[kNew].varName ;
      var transitionIndex = transitionHelper.find(property, transitionList) ;
      if (transitionIndex === -1) { // no transition with this property found
        transitionList.push(newTransition[kNew]) ;
      } else {
        if (replacementSwitch) {
          transitionList[transitionIndex] = newTransition[kNew] ;
          console.log('transitionList', transitionList, 'item transition', item.transition)
        } // otherwise do nothing
      }
    }    
    
  },

  remove: function transition_helper_remove (property) {
    var transitionList = this.transition ;
    if (transitionList === undefined) {
      this.transition = [] ;
      transitionList = this.transition ;
    }    
    var transitionIndex = transitionHelper.find(property, transitionList) ;
    if (transitionIndex === -1) {
      return ; // nothing to do
    } else {
      transitionList.splice(transitionIndex, 1) ;
    }    
  },

  add_child: function transition_helper_add_child(property, newTransition, frameIndex) {

    if(frameIndex === undefined) {
      frameIndex = 0 ;
    }

    var transitionList = this.transition ;
    if (transitionList === undefined) {
      this.transition = [] ;
      transitionList = this.transition ;
    }    
    var transitionIndex = transitionHelper.find(property, transitionList) ;
    if (transitionIndex === -1) {
      this.transition.push(newTransition) ;
    } else {
      var transitionK = this.transition[transitionIndex] ; // initialize

      for( var kTrans = 0 ; kTrans < frameIndex ; kTrans++ ) {
        transitionK = transitionK.child ;
      }

      transitionK.child = newTransition ; // only restore UI functionality after the minimum number of frames has been rendered  
      // console.log('transition helper add child end', 'transition index', transitionIndex, 'new transition', newTransition, 'transitionk', transitionK) ;
    }
    
  },  

  add_end: function transition_helper_add_end(property, frameIndex, callback) {

    var transitionIndex = transitionHelper.find(property, transitionList) ;    

    var transitionK = this.transition[transitionIndex] ; // initialize

    for( var kTrans = 0 ; kTrans < frameIndex ; kTrans++ ) {
      transitionK = transitionK.child ;
    }

    transitionK.end = callback ; // only restore UI functionality after the minimum number of frames has been rendered  
    
  },  

  update_end_value: function transition_helper_update_end_value (property, newEndValue, transition_creator) {
    // updates end value of matching transition if it exists otherwise do nothing 
    var transitionList  = this.transition ;
    var transitionIndex = transitionHelper.find(property, transitionList) ;
    if (transitionIndex > -1) {
      transitionList[transitionIndex].endValue = newEndValue ;
    } else {
      transitionList.push(transition_creator(newEndValue)) ;
    }
  },

  check_end_value: function transition_helper_check_end_value (property, endValue) {
    // returns true or false if there is a transition object for this property with this end value
    // returns undefined if there is no transition with this property
    var output = {
      check: undefined,
      index: -1,
    } ;
    var transitionList = this.transition ;
    if (transitionList === undefined) {
      this.transition = [] ;
      transitionList = this.transition ;
    }    
    var transitionIndex = transitionHelper.find(property, transitionList) ;
    if (transitionIndex === -1) {
      return output; // return default output
    } else {
      output.index = transitionIndex ;
      if (transitionList[transitionIndex].endValue === endValue) {
        output.check = true ;
      } else {
        output.check = false ;
      }
      return output ;
    }    
  },

  // set: function transition_helper_set () {
  //   // console.log('detect action set', 'this', this) ;
  //   $Z.detect([this]) ;
  // },

  // reset: function transition_helper_reset () {
  //   // console.log('detect action reset', 'this', this) ;
  //   $Z.detect([]) ; // turn off detection
  // },

} ;