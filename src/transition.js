var transition = { // module containing transition helper functions

  linear_interp: function linear_interp(t) { // attaches to transition object and handles linear interpolation of scalar values
    return (1 - t) * this.startValue + t * this.endValue ; // return a value to avoid side-effects
  },

  rounded_linear_interp: function rounded_linear_interp(t) { // attaches to transition object and handles linear interpolation of scalar values
    return Math.round( (1 - t) * this.startValue + t * this.endValue ) ; // return a value to avoid side-effects
  },

  color_interp: function color_interp(t) {
    var color1 = this.startValue ; // here, "this" revers to whatever context this gets bound to (not this module itself)
    var color2 = this.endValue ;   // here, "this" revers to whatever context this gets bound to (not this module itself)

    color1 = color1.slice(1) ; // take off the hash
    color2 = color2.slice(1) ; // take off the hash

    // Convert it to the right length if it uses shorthand notation
    if(color1.length === 3) color1 = color1.replace(/([0-9a-f])/ig, '$1$1');
    if(color2.length === 3) color2 = color2.replace(/([0-9a-f])/ig, '$1$1');
    
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

  linear_transition_func: function linear_transition_func(varName, duration) {
    return this.build_func(varName, duration, this.linear_interp) ;
  },

  rounded_linear_transition_func: function rounded_linear_transition_func(varName, duration) {
    return this.build_func(varName, duration, this.rounded_linear_interp) ;
  },

  color_transition_func: function color_transition_func(varName, duration) {
    return this.build_func(varName, duration, this.color_interp) ;
  }

} ;

export default transition ;