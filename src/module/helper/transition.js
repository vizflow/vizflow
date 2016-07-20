let transitionHelper = {

  interp: function transition_helper_interp(t) {

    if ( this.power === undefined ) {
      return transitionHelper.linear_interp(t) ;
    } else {
      return transitionHelper.power_interp.call(this, t) ;
    }

  },

  linear_interp: function linear_interp(t) { // attaches to transition object and handles linear interpolation of scalar values
    return (1 - t) * this.startValue + t * this.endValue ; // return a value to avoid side-effects
  },

  power_interp: function transition_helper_power_interp(t) {
    t = Math.pow(t, Math.max(0, this.power)) ;
    return transitionHelper.linear_interp.call(this, t) ;
  },

  rounded_linear_interp: function rounded_linear_interp(t) { // attaches to transition object and handles linear interpolation of scalar values
    return Math.round( transitionHelper.linear_interp(t) ) ; // return a value to avoid side-effects
  },

  rounded_interp: function rounded_interp(t) { // attaches to transition object and handles linear interpolation of scalar values
    return Math.round( transitionHelper.interp(t) ) ; // return a value to avoid side-effects
  },

  color_interp: function color_interp(t) {

    var color1 = this.startValue ; // here, "this" refers to whatever context this gets bound to (not this module itself)
    var color2 = this.endValue ;   // here, "this" refers to whatever context this gets bound to (not this module itself)

    color1 = color1.slice(1) ; // take off the hash
    color2 = color2.slice(1) ; // take off the hash

    // Convert it to the right length if it uses shorthand notation
    if(color1.length === 3) color1 = color1.replace(/([0-9a-f])/ig, '$1$1') ;
    if(color2.length === 3) color2 = color2.replace(/([0-9a-f])/ig, '$1$1') ;
    
    var color  = '#' ; // initialize
    // Split the string into its main components and convert them to RGB
    for(var i = 0 ; i < 3 ; i++) {

      let split1 = parseInt(color1.slice(i * 2, (i + 1) * 2), 16) ;
      let split2 = parseInt(color2.slice(i * 2, (i + 1) * 2), 16) ;
      let split  = Math.min(255, Math.round( (1 - t) * split1 + t * split2 )) ; // linear interpolation
      split = split.toString(16).toUpperCase() ;                 // convert it to hex
      if(split.length === 1) split = '0' + split ; // make sure it is always the right length
      color += split ;

    }

    return color ;

  },

  build_func: function build_func(varName, duration, interpFunc) {
    return function(endValue) {
      return {
        varName,
        duration,
        interpFunc,
        endValue
      } ;
    } ;
  },

  creator: function transition_helper_creator(varName, duration) {
    return this.build_func(varName, duration, this.interp) ;
  },

  linear_transition_func: function linear_transition_func(varName, duration) {
    return this.build_func(varName, duration, this.linear_interp) ;
  },

  rounded_linear_transition_func: function rounded_linear_transition_func(varName, duration) {
    return this.build_func(varName, duration, this.rounded_linear_interp) ;
  },

  color_transition_func: function color_transition_func(varName, duration) {
    return this.build_func(varName, duration, this.color_interp) ;
  },

  step_interp: function transition_helper_step_interp(t) { // represents a switch at t=0
    return this.endValue ;
  },

  step_func: function transition_helper_step_func(varName, duration) {
    return transitionHelper.build_func(varName, duration, transitionHelper.step_interp) ;
  },

  linear_func: function transition_helper_linear_func(varName, duration) {
    return transitionHelper.build_func(varName, duration, transitionHelper.linear_interp) ;
  },

  rounded_linear_func: function transition_helper_rounded_linear_func(varName, duration) {
    return transitionHelper.build_func(varName, duration, transitionHelper.rounded_linear_interp) ;
  },

  fixed_duration: function transition_helper_fixed_duration_creator(property, duration) {
    return transitionHelper.build_func(property, duration, transitionHelper.interp) ;
  },

  fixed_duration_creator: function transition_helper_fixed_duration_creator(property, duration, interpolator) {
    return transitionHelper.build_func(property, duration, interpolator) ;
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

  new: function transition_helper_new(property, value, duration, interpolator) {

    if ( interpolator === undefined ) {
      interpolator = transitionHelper.interp ;
    }

    return transitionHelper.fixed_duration_creator(property, duration, interpolator)(value) ; 
  },

  new_step: function transition_helper_new_step(property, value, duration) {
    return transitionHelper.new(property, value, duration, transitionHelper.step_interp) ;
  },

  new_linear: function transition_helper_new_linear(property, value, duration) {
    return transitionHelper.new(property, value, duration, transitionHelper.linear_interp) ;
  },

  new_power: function transition_helper_new_power(property, value, duration, power) {
    var trans = transitionHelper.new(property, value, duration, transitionHelper.power_interp) ;
    trans.power = power ;
    return trans ;
  },

  new_rounded_linear: function transition_helper_new_rounded_linear(property, value, duration) {
    return transitionHelper.new(property, value, duration, transitionHelper.rounded_linear_interp) ;
  },

  sequence: function transition_helper_sequence(transitionArray) {
    var transition = transitionArray[0] ;
    for(var k = 0 ; k < transitionArray.length - 1 ; k++) {
      transitionArray[k].child = transitionArray[k + 1] ;
    }
    return [transition] ;
  },

  new_sequence: function transition_helper_new_sequence(valueList, creator) {
    
    var trans = new Array(valueList.length) ; 

    for ( var k = 0 ; k < trans.length ; k++ ) {
      trans[k] = creator(valueList[k]) ;
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

    add_step: function transition_helper_add_step(property, value, duration, replacementSwitch, item) {

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

    add_linear: function transition_helper_add_linear(property, value, duration, replacementSwitch, item) {

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

    add_rounded_linear: function transition_helper_add_rounded_linear(property, value, duration, replacementSwitch, item) {

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

    add_power: function transition_helper_add_power(property, value, duration, power, replacementSwitch, item) {

      if ( item === undefined ) {
        item = this ;
      }

      if ( replacementSwitch === undefined ) {
        replacementSwitch = true ;
      }

      var transition = transitionHelper.new(property, value, duration) ;
      transition.power = power ;

      item.add_transition(transition, replacementSwitch) ;

      return item ;

    },

    add_sequence: function transition_helper_new_sequence(valueList, creator, item) {

      if ( item === undefined ) {
        item = this ;
      }
      
      var trans = new Array(valueList.length) ; 

      for ( var k = 0 ; k < trans.length ; k++ ) {
        trans[k] = creator(valueList[k]) ;
      }

      item.add_transition( transitionHelper.sequence(trans) ) ;

    },

    add_linear_sequence: function transition_add_linear_sequence(propertyList, valueList, durationList, item) {
      
      if ( item === undefined ) { 
        item = this ;
      }

      if ( propertyList.constructor === String ) {
      
        let p = new Array(valueList.length) ;
      
        for ( let kp = 0 ; kp < p.length ; kp++ ) {
          p[kp] = propertyList ;
        }

        propertyList = p ;
      
      }

      if ( durationList.constructor === Number ) {
      
        let d = new Array(valueList.length) ;
      
        for ( let kd = 0 ; kd < d.length ; kd++ ) {
          d[kd] = durationList ;
        }

        durationList = d ;
      
      }

      let trans = new Array(valueList.length) ;

      let interp = transitionHelper.linear_interp ;

      for ( let kval = 0 ; kval < valueList.length ; kval++ ) {
        trans[kval] = transitionHelper.new(propertyList[kval], valueList[kval], durationList[kval], interp) ;
      }

      let seq = transitionHelper.sequence(trans) ;

      item.add_transition(seq) ;

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

    add_set: function transition_helper_add_set( property, value, duration, type, power, item ) {

      if ( type === undefined ) {
        type = 'linear' ;
      }

      if ( item === undefined ) {
        item = this ;
      }

      if ( value.constructor === Number ) {
        var val = new Array(property.length) ;
        for ( let kval = 0 ; kval < val.length ; kval++ ) {
          val[kval] = value ;
        }
        value = val ;
      }

      if ( duration.constructor === Number ) {
        var dur = new Array(property.length) ;
        for ( let kdur = 0 ; kdur < dur.length ; kdur++ ) {
          dur[kdur] = duration ;
        }
        duration = dur ;
      }

      if ( power === undefined || power.constructor === Number ) {
        var pow = new Array(property.length) ;
        for ( let kpow = 0 ; kpow < pow.length ; kpow++ ) {
          pow[kpow] = power ;
        }
        power = pow ;
      }

      for ( let kprop = 0 ; kprop < property.length ; kprop++ ) {
        item['add_' + type](property[kprop], value[kprop], duration[kprop], power[kprop]) ;
      }

    },
        
    loop_trans: function transition_helper_loop_trans ( trans_func, item ) {

      if ( item === undefined ) {
        item = this ;
      }

      var trans ;
      if ( trans_func.constructor === String ) {
        trans = item[trans_func]() ;
      } else {
        trans = trans_func() ;
      }

      trans.item = item ;

      var child = transitionHelper.get_child(trans, 'last') ;

      if ( child.end !== undefined ) {

        if ( child.end.constructor === Object ) {
          child.end.run() ;
        } else {
          child.end() ;
        }

      }

      child.end = {
      
        item: item,
        transition_func: trans_func,
        run: transitionHelper.loop_end,
      
      } ;

      // console.log('loop_trans:', 'trans', trans, 'child', child) ;

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