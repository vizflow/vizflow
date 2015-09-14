// simple demo: three colored circles with SVG rendering

function three_circles() {
  var width  = 40 ;
  var height = 20 ;
  var svgns  = "http://www.w3.org/2000/svg" ;
  var svg    = document.createElementNS(svgns, 'svg') ;

  svg.setAttribute('viewBox', '0 0 ' + 2 * width + ' ' + 2 * height) ;
  document.body.appendChild(svg) ;

  var g = document.createElementNS(svgns, 'g') ;
  g.setAttribute('transform', 'translate(' + width + ',' + height + ')') ;

  svg.appendChild(g) ;

  function render() {
    this.viz.setAttribute('cx',   this.x     ) ;
    this.viz.setAttribute('cy',   this.y     ) ;
    this.viz.setAttribute('fill', this.color ) ;
    this.viz.setAttribute('r',    this.radius) ;
  }

  function linear_interp(t) { // attaches to transition object and handles linear interpolation of scalar values
    var newValue = (1 - t) * this.startValue + t * this.endValue ; // return a value to avoid side-effects
    return newValue ;
  }

  function color_interp(t) {
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
  }

  function random_color() {

    var r = Math.round(255 * Math.random()).toString(16) ;
    var g = Math.round(255 * Math.random()).toString(16) ;
    var b = Math.round(255 * Math.random()).toString(16) ;

    // Make sure it is always the right length
    if(r.length === 1) r += r ;
    if(g.length === 1) g += g ;
    if(b.length === 1) b += b ;

    return '#' + r + g + b ;
  }

  function linear_transition(varName, duration, endValue) {
    return {
      varName,
      duration,
      endValue,
      interpFunc: linear_interp
    }
  }

  function color_transition(varName, duration, endValue) {
    return {
      varName,
      duration,
      endValue,
      interpFunc: color_interp
    }
  }

  function click() {
    
    var dur = 500 ;
    var tx  = linear_transition( 'x',      dur, width  * (Math.random() - 0.5) ) ;
    var ty  = linear_transition( 'y',      dur, height * (Math.random() - 0.5) ) ;
    var tr  = linear_transition( 'radius', dur, 1 + (4 * Math.random())        ) ; 
    var tc  = color_transition ( 'color' , dur, random_color()                 ) ;
    var tc2 = color_transition ( 'color' , dur, this.__d__.color0              ) ;
    
    tc.child = tc2 ;

    this.__d__.transition = [tx, ty, tr, tc] ; // // set the transitions, also cancels all existing transitions
    if($Z.verbose) console.log('clicked', this, this.__d__) ;

  } ;

  var red   = '#993333' ;
  var green = '#339933' ;
  var blue  = '#333399' ;

  var data = [
    { x: -10, y:   0, radius: 2, color: red,   color0: red   },
    { x:  10, y:   0, radius: 2, color: green, color0: green },
    { x:   0, y: -10, radius: 2, color: blue,  color0: blue  }
  ] ;

  data.forEach(function (d) {

    d.transition   = []        ;
    d.update       = $Z.update ; // use default update function to handle transitions
    d.render       = render    ;

    d.viz          = document.createElementNS(svgns, 'circle') ;
    d.viz['__d__'] = d     ; // bind the data to the viz element for efficient access
    d.viz.onclick  = click ;

    d.viz.setAttribute('cx',   d.x      ) ;
    d.viz.setAttribute('cy',   d.y      ) ;
    d.viz.setAttribute('r',    d.radius ) ;
    d.viz.setAttribute('fill', d.color  ) ;

    g.appendChild(d.viz) ;

  }) ;

  $Z.item(data) ; // load the user data into the simulation to initialize the time  equals zero (t = 0) state
  $Z.run() ; // run the interactive simulation (infinite loop by default)
}