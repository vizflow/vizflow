// three colored circles with SVG rendering, a simple demo of vizflow's transition features

function outer_product() {
  var width  = 16 ;
  var height = 9 ;
  var svgns  = "http://www.w3.org/2000/svg" ;
  var svg    = document.createElementNS(svgns, 'svg') ;

  svg.setAttribute( 'viewBox', '0 0 ' + 2 * width + ' ' + 2 * height) ;
  document.body.appendChild(svg) ;

  var g = document.createElementNS(svgns, 'g') ;
  g.setAttribute('transform', 'translate(' + width + ',' + height + ')' ) ;

  svg.appendChild(g) ;

  function render() {
    this.viz.setAttribute( 'cx',   this.x      ) ;
    this.viz.setAttribute( 'cy',   this.y      ) ;
    this.viz.setAttribute( 'fill', this.color  ) ;
    this.viz.setAttribute( 'r',    this.radius ) ;
  }

  function random_color() {

    var r = Math.round( 255 * Math.random() ).toString( 16 ) ;
    var g = Math.round( 255 * Math.random() ).toString( 16 ) ;
    var b = Math.round( 255 * Math.random() ).toString( 16 ) ;

    // make sure they are the right length
    if ( r.length === 1 ) r += r ;
    if ( g.length === 1 ) g += g ;
    if ( b.length === 1 ) b += b ;

    return '#' + r + g + b ;
  }

  var dur          = 500 ; // transition duration in milliseconds

  var x_transition = $Z.transition.linear_transition_func ( 'x',      dur ) ; // function accepting an x end-value and returning a transition object
  var y_transition = $Z.transition.linear_transition_func ( 'y',      dur ) ; // function accepting a y end-value and returning a transition object
  var r_transition = $Z.transition.linear_transition_func ( 'radius', dur ) ; // function accepting a y end-value and returning a transition object
  var c_transition = $Z.transition.color_transition_func  ( 'color',  dur ) ; // function accepting a color end-value and returning a transition object

  var red   = '#993333' ;
  var green = '#339933' ;
  var blue  = '#333399' ;

  var data = [ // array of object literals defining the three circles
    { x: -10, y:   0, radius: 2, color: red,   color0: red   },
    { x:  10, y:   0, radius: 2, color: green, color0: green },
    { x:   0, y: -10, radius: 2, color: blue,  color0: blue  }
  ] ;

  data.forEach(function (d) {

    d.render       = render ; // function that tells the visulization engine how to render the items for each frame of the visualization

    d.viz          = document.createElementNS(svgns, 'circle') ;
    d.viz['__d__'] = d     ; // bind the data to the viz element for efficient access
    d.viz.onclick  = click ;

    d.viz.setAttribute( 'cx',   d.x      ) ;
    d.viz.setAttribute( 'cy',   d.y      ) ;
    d.viz.setAttribute( 'r',    d.radius ) ;
    d.viz.setAttribute( 'fill', d.color  ) ;

    g.appendChild(d.viz) ;

  }) ;

  function click() {
    
    var tx   = x_transition ( width  * (Math.random() - 0.5) ) ; // x transition object
    var ty   = y_transition ( height * (Math.random() - 0.5) ) ; // y transition object
    var tr   = r_transition ( 1 + (4 * Math.random())        ) ; // radius transition object
    var tc   = c_transition ( random_color()                 ) ; // transient color transition object
    var tc2  = c_transition ( this.__d__.color0              ) ; // final color transition object (return back to starting color)

    tc.child = tc2 ; // ** example of the vizflow transition-chaining syntax

    this.__d__.transition = [tx, ty, tr, tc] ; // set the transitions for this item, also cancels all existing transitions for this item (side-effect)

  } 

  $Z.item(data) ; // load the user data into the visualization engine to initialize the time  equals zero (t = 0) state
  $Z.run()      ; // run the interactive visualization (infinite loop by default)

}