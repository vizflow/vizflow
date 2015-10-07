// three colored circles with Canvas rendering, a simple demo of vizflow's transition features

function three_circles_canvas() {

  var width  = 1200 ;
  var height = 900 ;

  //var scaleToCover = Math.max(scaleX, scaleY);
   
  var stage = document.createElement('div') ;
  stage.style['width']        = width ;
  stage.style['height']       = height ;
  stage.style.position        = 'relative' ;
  stage.style.margin          = 0 ;
  stage.style.transformOrigin = "0 0"; // scale from top left

  var canvas = document.createElement('canvas') ;
  canvas.setAttribute('id', 'vizCanvas') ;
  canvas.setAttribute('width', width) ;
  canvas.setAttribute('height', height) ;
  canvas.style.position = 'absolute' ;


  var hiddenCanvas = document.createElement('canvas') ; // for color-picking e.g. see https://bocoup.com/weblog/2d-picking-in-canvas/
  hiddenCanvas.setAttribute('width', width) ;
  hiddenCanvas.setAttribute('height', height) ;
  hiddenCanvas.style.display = 'none' ; // hide this canvas

  var context                         = canvas.getContext('2d') ;  
  context.webkitImageSmoothingEnabled = false ;
  context.mozImageSmoothingEnabled    = false ;
  context.imageSmoothingEnabled       = false ;

  stage.appendChild(canvas) ;
  document.body.appendChild(stage) ;

  function rgb2hex( rgb ) {
    var c = Math.round( rgb ).toString( 16 ) ;
    if ( c.length === 1 ) c += c ; // make sure it is the right length
    return c ;
  }

  function random_color() {
    return '#' 
      + rgb2hex( 255 * Math.random() )   // r
      + rgb2hex( 255 * Math.random() )   // g
      + rgb2hex( 255 * Math.random() ) ; // b
  }

  function draw_circle(ctx, circ) {
    ctx.beginPath() ;
    ctx.arc(circ.x, circ.y, circ.radius, 0, Math.PI * 2, true) ;
    ctx.fillStyle = circ.color ;
    ctx.fill() ;
  }

  function render() {
    return new Promise(
      (resolve, reject) => {
        draw_circle(context, this) ;
        resolve(true) ;
      }
    ) ;
  }    

  var dur          = 500 ; // transition duration in milliseconds

  var x_transition = $Z.transition.linear_transition_func ( 'x',      dur ) ; // function accepting an x end-value and returning a transition object
  var y_transition = $Z.transition.linear_transition_func ( 'y',      dur ) ; // function accepting a y end-value and returning a transition object
  var r_transition = $Z.transition.linear_transition_func ( 'radius', dur ) ; // function accepting a y end-value and returning a transition object
  var c_transition = $Z.transition.color_transition_func  ( 'color',  dur ) ; // function accepting a color end-value and returning a transition object

  var red   = '#993333' ;
  var green = '#339933' ;
  var blue  = '#333399' ;

  var left   = width / 4 ;
  var right  = 3 * width / 4 ;
  var middle = width / 2 ;
  var hmid   = height / 2 ;
  var hthird = height / 3 ;

  var data = [ // array of object literals defining the three circles
    { x: left,   y:  2 * hthird, radius: hmid / 10, color: red,   color0: red   },
    { x: right,  y:  2 * hthird, radius: hmid / 10, color: green, color0: green },
    { x: middle, y:  hthird, radius: hmid / 10, color: blue,  color0: blue  }
  ] ;

  data.forEach(function (d) { d.render = render } ) ; // function that tells the visulization engine how to render the items for each frame of the visualization

  var scaleX     ; 
  var scaleY     ; 
  var vizScale ; 
  var windowWidth ;

  function set_scale() {     
    windowWidth = window.innerWidth ;
    scaleX     = width  / windowWidth  ;
    scaleY     = height / window.innerHeight ;
    vizScale   = Math.max(scaleX, scaleY)    ; // Math.min(scaleX, scaleY)    ;
  }

  var xShift = 0 ; // initialize

  function resize() {
    set_scale() ;
    var transform = '' ;
    transform += "scale(" + 1 / vizScale + ")" ;
    var newWidth = width / vizScale ;
    if(windowWidth > newWidth) {
      xShift = 0.5 * (windowWidth - newWidth) ;
      transform += "translate(" + vizScale * xShift + "px, 0)" ;
    } else {
      xShift = 0 ;
    }
    stage.style.transform = transform ;
  }

  resize() ;
  var throttle = 333 ; // how often to check for window resize events
  var lastResize = Date.now() ;

  function prep() {
    var t = Date.now() ;
    if(t - lastResize >= throttle) {
      resize() ;
      lastResize = t ;
    }
    return new Promise(
      (resolve, reject) => {
        context.clearRect(0, 0, canvas.width, canvas.height) ;
        resolve(true) ;
      }
    ) ;
  }

  code2node = {} ;
  for(var k = 0 ; k < data.length ; k++) {
    code2node[data[k].color0] = k ; // lookup table for color-picking
  }

  function click(e) {

    set_scale() ;

    var mouseX = Math.round((e.clientX - xShift) * vizScale) ;
    var mouseY = Math.round(e.clientY * vizScale) ;

    var hiddenContext = hiddenCanvas.getContext('2d') ;
    hiddenContext.clearRect(0, 0, hiddenCanvas.width, hiddenCanvas.height) ;
    for(var k = 0 ; k < data.length ; k++) { // only need to draw hidden canvas when user clicks
      draw_circle(hiddenContext, {x: data[k].x, y: data[k].y, radius: data[k].radius, color: data[k].color0}) ; // draw into hidden-canvas for color-picking
    }
    var col    = hiddenContext.getImageData(mouseX, mouseY, 1, 1).data ;
    var code   = "#" + rgb2hex(col[0]) + rgb2hex(col[1]) + rgb2hex(col[2]) ;
    var node   = code2node[code] ;

    if(node === undefined)
      return ;

    var tx   = x_transition ( left / 2 + (right - left / 2)  * Math.random() ) ; // x transition object
    var ty   = y_transition ( hthird / 2 + hmid * Math.random()              ) ; // y transition object
    var tr   = r_transition ( hmid / 10 + (2 * hmid / 10 * Math.random())    ) ; // radius transition object
    var tc   = c_transition ( random_color()                                 ) ; // transient color transition object
    var tc2  = c_transition ( data[node].color0                              ) ; // final color transition object (return back to starting color)

    tc.child = tc2 ; // ** example of the vizflow transition-chaining syntax

    data[node].transition = [tx, ty, tr, tc] ; // set the transitions for this item, also cancels all existing transitions for this item (side-effect)

  } 

  canvas.addEventListener('click', click, false) ;

  $Z.item(data)     ; // load the user data into the visualization engine to initialize the time  equals zero (t = 0) state
  $Z.action([prep]) ; // set the action to perform on each frame of the animation prior to rendering the elements 
  $Z.run()          ; // run the interactive visualization (infinite loop by default)

}