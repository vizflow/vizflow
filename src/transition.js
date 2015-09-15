var transition = { // module containing transition helper functions
  linear_interp: function linear_interp(t) { // attaches to transition object and handles linear interpolation of scalar values
    var newValue = (1 - t) * this.startValue + t * this.endValue ; // return a value to avoid side-effects
    return newValue ;
  },

  color_interp: function color_interp(t) {
    var color1 = this.startValue ;
    var color2 = this.endValue ; 
    var split1 = [] ;
    var split2 = [] ;
    var split  = [] ;

    color1 = color1.slice(1) ; // take off the hash
    color2 = color2.slice(1) ; // take off the hash

    // Convert it to the right length if it is the shorthand
    if(color1.length === 3) color1 = color1.replace(/([0-9a-f])/ig, '$1$1');
    if(color2.length === 3) color2 = color2.replace(/([0-9a-f])/ig, '$1$1');
    
    // Split the string into its main components and convert them to RGB
    for(var i = 0 ; i < 3 ; i++) {
      split1.push(parseInt(color1.slice(i * 2, (i + 1) * 2), 16)) ;
      split2.push(parseInt(color2.slice(i * 2, (i + 1) * 2), 16)) ;
    }

    for(var i = 0 ; i < 3 ; i++) {
      split[i] = Math.round((1 - t) * split1[i] + t * split2[i]) ;
    }

    var color  = [] ;

    for(i = 0; i < 3; i++) {
      // Convert it to hex
      color[i] = split[i].toString(16).toUpperCase();
      
      // Make sure it is always the right length
      if(color[i].length === 1) color[i] = color[i] + color[i] ;

    }

    var newValue = '#' + color.join('') ;
    return newValue ;
  },

  random_color: function random_color() {

    var r = Math.round(255 * Math.random()).toString(16) ;
    var g = Math.round(255 * Math.random()).toString(16) ;
    var b = Math.round(255 * Math.random()).toString(16) ;

    // Make sure it is always the right length
    if(r.length === 1) r += r ;
    if(g.length === 1) g += g ;
    if(b.length === 1) b += b ;

    return '#' + r + g + b ;
  },

  linear_transition_func: function linear_transition_func(varName, duration) {
    return function(endValue) {
      return {
        varName: varName,
        duration: duration,
        endValue: endValue,
        interpFunc: $Z.transition.linear_interp
      } ;
    } ;
  },

  color_transition_func: function color_transition_func(varName, duration) {
    return function(endValue) {
      return {
        varName: varName,
        duration: duration,
        endValue: endValue,
        interpFunc: $Z.transition.color_interp
      }
    } ;
  }

} ;

export default transition ;