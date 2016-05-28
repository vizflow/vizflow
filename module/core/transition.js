let transitionHelper = {

  step_interp: function transition_helper_step_interp(t) { // represents a switch at t=0
    return this.endValue ;
  },

  linear_interp: function transition_helper_linear_interp(t) {
    return $Z.transition.linear_interp.call(this, t) ;
  },

  rounded_linear_interp: function transition_helper_rounded_linear_interp(t) {
    return $Z.transition.rounded_linear_interp.call(this, t) ;
  },

  step_func: function transition_helper_step_func(varName, duration) {
    return $Z.transition.build_func(varName, duration, transitionHelper.step_interp) ;
  },

  linear_func: function transition_helper_linear_func(varName, duration) {
    return $Z.transition.build_func(varName, duration, $Z.transition.linear_interp) ;
  },

  rounded_linear_func: function transition_helper_rounded_linear_func(varName, duration) {
    return $Z.transition.build_func(varName, duration, transitionHelper.rounded_linear_interp) ;
  },

  fixed_duration_creator: function transition_helper_fixed_duration_creator(property, duration, interp_func) {
    return $Z.transition.build_func(property, duration, interp_func) ;
  },

  fixed_duration_step: function transition_helper_fixed_duration_linear(property, duration) {
    return transitionHelper.fixed_duration_creator(property, duration, transitionHelper.step_interp) ;
  },

  fixed_duration_linear: function transition_helper_fixed_duration_linear(property, duration) {
    return transitionHelper.fixed_duration_creator(property, duration, transitionHelper.linear_interp) ;
  },

  fixed_duration_rounded_linear: function transition_helper_fixed_duration_linear(property, duration) {
    return transitionHelper.fixed_duration_creator(property, duration, transitionHelper.rounded_linear_interp) ;
  },

  new: function transition_helper_new(property, value, duration, interp_func) {
    return transitionHelper.fixed_duration_creator(property, duration, interp_func)(value) ; 
  },

  new_step: function transition_helper_new_step(property, value, duration) {
    return transitionHelper.new(property, value, duration, transitionHelper.step_interp) ;
  },

  new_linear: function transition_helper_new_linear(property, value, duration) {
    return transitionHelper.new(property, value, duration, $Z.transition.linear_interp) ;
  },

  new_rounded_linear: function transition_helper_new_rounded_linear(property, value, duration) {
    return transitionHelper.new(property, value, duration, $Z.transition.rounded_linear_interp) ;
  },

  sequence: function transition_helper_sequence(transitionArray) {
    var transition = transitionArray[0] ;
    for(var k = 0 ; k < transitionArray.length - 1 ; k++) {
      transitionArray[k].child = transitionArray[k + 1] ;
    }
    return [transition] ;
  },

  new_sequence: function transition_helper_new_sequence(valueList, creator_func) {
    
    var trans = new Array(valueList.length) ; 

    for ( var k = 0 ; k < trans.length ; k++ ) {
      trans[k] = creator_func(valueList[k]) ;
    }

    return transitionHelper.sequence(trans) ;

  },

  get_child: function transition_helper_get_child (transition, frameIndex) {

    if ( frameIndex === 'last') {

      while( transition.child !== undefined ) {
        transition = transition.child ;
      }
                  
    } else {

      for( var kTrans = 0 ; kTrans < frameIndex ; kTrans++ ) {
        transition = transition.child ;
      }

    }

    return transition ;    

  },

  update_end_value: function transition_helper_update_end_value (property, newEndValue, transition_creator) {
    // updates end value of matching transition if it exists otherwise do nothing 
    if (transitionList === undefined) {
      this.transition = [] ;
    }    
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

  duration: function(transition) {

    if(transition === undefined) {
      transition = this ;
    }

    var dur = transition.duration ;
    var trans = transition ;

    while(trans.child !== undefined) {
      trans = trans.child ;
      dur += trans.duration ;
    }

    return dur ;

  },

  find: function transition_helper_find (property, transitionList) {
    
    if(this.transition === undefined) {
      this.transition = [] ;
    }

    if (transitionList === undefined) {
      transitionList = this.transition ; // means function was attached to an item's context
    }

    if(transitionList.length === 0) {
      return -1 ;      
    }

    var transitionIndex = -1 ;
    
    for(var ktrans = 0 ; ktrans < transitionList.length ; ktrans++) {
      if(transitionList[ktrans].varName === property) {
        transitionIndex = ktrans ;
      }
    }

    return transitionIndex ;    
  },

  copy: function transition_helper_copy ( transition ) {

    if ( transition.constructor === Array ) {

      var trans = new Array (transition.length) ;

      for ( var kt = 0 ; kt < transition.length ; kt++ ) {
        // console.log('transition[kt]', transition[kt]) ;
        trans[kt] = transitionHelper.copy(transition[kt]) ;
      }

      return trans ;

    } else {

      var trans = Object.copy ( transition ) ;
      
      if ( trans.child !== undefined ) {
        trans.child = transitionHelper.copy( transition.child ) ;
      }

      if ( trans.end !== undefined && trans.end.constructor === Object ) {
        trans.end = Object.copy( transition.end ) ;
      }

      return trans ;

    }

  },

  loop_end: function transition_helper_loop_end( endConfig ) {

    if ( endConfig === undefined ) {
      endConfig = this ;
    }

    var item       = endConfig.item ;
    var trans_func = endConfig.transition_func ;

    item.loop(trans_func) ;
      
  },

  method: {

    add_transition: function transition_helper_method_add_transition (newTransition, replacementSwitch, item) {

      if(item === undefined) {
        item = this ;
      }

      // assume "this" corresponds to the item whose transition array we are modifying
      if (replacementSwitch === undefined) {
        replacementSwitch = true ;
      }

      var transitionList = item.transition ;
      if (transitionList === undefined) {
        item.transition = [] ;
        transitionList = item.transition ;
      }

      if (transitionList.constructor !== Array) {
        transitionList = [transitionList] ;
      }

      // console.log('transitionList', transitionList, 'item', item) ;
      if (newTransition.constructor !== Array) {
        newTransition = [newTransition] ;
      }

      for (let kNew = 0 ; kNew < newTransition.length ; kNew ++) {
        newTransition[kNew].item = item ;
        var property = newTransition[kNew].varName ;
        var transitionIndex = transitionHelper.find(property, transitionList) ;
        if (transitionIndex === -1) { // no transition with this property found
          transitionList.push(newTransition[kNew]) ;
        } else {
          if (replacementSwitch) {
            transitionList[transitionIndex] = newTransition[kNew] ;
            // console.log('item', item, 'transitionList', transitionList, 'item transition', item.transition, 'newTransition', newTransition)
          } else {
            transitionList.push(newTransition[kNew]) ;
          }// otherwise add compound transition
        }
      }    
      
    },

    add_step: function transition_helper_linear(property, value, duration, replacementSwitch, item) {

      if ( item === undefined ) {
        item = this ;
      }

      if ( replacementSwitch === undefined ) {
        replacementSwitch = true ;
      }

      var transition = transitionHelper.new_step(property, value, duration) ;

      item.add_transition(transition, replacementSwitch) ;

      return item ;

    },

    add_linear: function transition_helper_linear(property, value, duration, replacementSwitch, item) {

      if ( item === undefined ) {
        item = this ;
      }

      if ( replacementSwitch === undefined ) {
        replacementSwitch = true ;
      }

      var transition = transitionHelper.new_linear(property, value, duration) ;

      item.add_transition(transition, replacementSwitch) ;

      return item ;

    },

    add_rounded_linear: function transition_helper_linear(property, value, duration, replacementSwitch, item) {

      if ( item === undefined ) {
        item = this ;
      }

      if ( replacementSwitch === undefined ) {
        replacementSwitch = true ;
      }

      var transition = transitionHelper.new_rounded_linear(property, value, duration) ;

      item.add_transition(transition, replacementSwitch) ;

      return item ;

    },

    add_sequence: function transition_helper_new_sequence(valueList, creator_func, item) {

      if ( item === undefined ) {
        item = this ;
      }
      
      var trans = new Array(valueList.length) ; 

      for ( var k = 0 ; k < trans.length ; k++ ) {
        trans[k] = creator_func(valueList[k]) ;
      }

      item.add_transition( transitionHelper.sequence(trans) ) ;

    },

    add_child: function transition_helper_add_child(transition, newTransition, pause, frameIndex, item) {

      if (item === undefined) {
        item = this ;
      }

      if (pause === undefined) {
        pause = 0 ;
      }

      var trans = transition ;

      if (trans === undefined) { // would be nice to add this transition to the item 

        if(item !== undefined) {
          transitionHelper.add.call(item, newTransition) ;
        }
        return ;
    
      }

      if (frameIndex === undefined) {

        frameIndex = 0 ;
        while (trans.child !== undefined) { // use last frame by default
          frameIndex++ ;
          trans = trans.child ;
        }

      } else { 

        var trans = transition ;
        for( var kTrans = 0 ; kTrans < frameIndex ; kTrans++ ) {
          trans = trans.child ;
        }

      }

      trans.pause = pause ;
      trans.child = newTransition ; // only restore UI functionality after the minimum number of frames has been rendered  
      // console.log('transition helper add child end', 'transition index', transitionIndex, 'new transition', newTransition, 'transition', transition) ;
       
    },  

    add_end: function transition_helper_add_end(property, frameIndex, callback, item) {

      if (item === undefined ) {
        item = this ;
      }

      var transitionList = item.transition ;

      if ( transitionList === undefined ) {
        this.transition = [] ;
        transitionList = item.transition ;
      }

      var transitionIndex = transitionHelper.find(property, transitionList) ;    

      var transitionK = item.transition[transitionIndex] ; // initialize

      if ( frameIndex > 0 ) {
        transitionK = transitionHelper.get_child(transitionK, frameIndex) ;      
      } 
      transitionK.end = callback ; // only restore UI functionality after the minimum number of frames has been rendered  
      
    },  
        
    loop_trans: function transition_helper_loop_trans ( trans_func, item ) {

      if ( item === undefined ) {
        item = this ;
      }

      var trans = trans_func() ;

      var child = transitionHelper.get_child(trans, 'last') ;

      if ( child.end === undefined ) {

        child.end = {
        
          item: item,
          transition_func: trans_func,
          run: transitionHelper.loop_end,
        
        } ;

      } else {

        if ( child.end.constructor === Object ) {
          child.run() ;
        } else {
          child() ;
        }

      }

      return trans ;

    },

    remove_transition: function transition_helper_method_remove_transition (property, item) {

      if ( item === undefined ) {
        item = this ;
      }

      var transitionList = item.transition ;

      if (transitionList === undefined) {
        item.transition = [] ;
        transitionList = item.transition ;
      }    
      var transitionIndex = transitionHelper.find(property, transitionList) ;
      if (transitionIndex === -1) {
        return ; // nothing to do
      } else {
        transitionList.splice(transitionIndex, 1) ;
      }    
    },

    remove_end: function(item) {

      if(item === undefined) {
        item = this ;
      }

      var endObject = {

        item: item,

        run: function () {

          if(this.item.remove === undefined) {
            this.item.remove = $Z.core.item.remove ;
          }

          this.item.remove() ;

        },

      } ;

      return endObject ; 

    },

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

export { transitionHelper as default }