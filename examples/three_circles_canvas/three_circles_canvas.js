// three colored circles with SVG rendering, a simple demo of vizflow's transition features

function three_circles_canvas() {

  var width  = 400 ;
  var height = 300 ;

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
  hiddenCanvas.style.display  = 'none' ; // hide this canvas

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

  var dur          = 500 ; // transition duration in milliseconds

  var x_transition = $Z.transition.linear_transition_func ( 'x',      dur ) ; // function accepting an x end-value and returning a transition object
  var y_transition = $Z.transition.linear_transition_func ( 'y',      dur ) ; // function accepting a y end-value and returning a transition object
  var r_transition = $Z.transition.linear_transition_func ( 'radius', dur ) ; // function accepting a y end-value and returning a transition object
  var c_transition = $Z.transition.color_transition_func  ( 'color',  dur ) ; // function accepting a color end-value and returning a transition object

  var red   = '#993333' ;
  var green = '#339933' ;
  var blue  = '#333399' ;

  var data = [ // array of object literals defining the three circles
    { x: 100, y:  150, radius: 15, color: red,   color0: red   },
    { x: 300, y:  150, radius: 15, color: green, color0: green },
    { x: 200, y:   50, radius: 15, color: blue,  color0: blue  }
  ] ;

  data.forEach(function (d) d.render = render) ; // function that tells the visulization engine how to render the items for each frame of the visualization

  function prep() {

    return new Promise(
      (resolve, reject) => {

        var scaleX     = width  / window.innerWidth  ;
        var scaleY     = height / window.innerHeight ;
        var scaleToFit = Math.min(scaleX, scaleY)    ;

        stage.style.transform = "scale(" + 1 / scaleToFit + ")" ;

        context.clearRect(0, 0, canvas.width, canvas.height) ;

        resolve(true) ;

      }
    ) ;
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

  code2node = {} ;
  for(var k = 0 ; k < data.length ; k++) {
    code2node[data[k].color0] = k ; // lookup table for color-picking
  }

  function click(e) {

    var mouseX = e.layerX ;
    var mouseY = e.layerY ;

    var hiddenContext = hiddenCanvas.getContext('2d') ;
    for(var k = 0 ; k < data.length ; k++) { // only need to draw hidden canvas when user clicks
      draw_circle(hiddenContext, {x: data[k].x, y: data[k].y, radius: data[k].radius, color: data[k].color0}) ; // draw into hidden-canvas for color-picking
    }
    var col    = hiddenContext.getImageData(mouseX, mouseY, 1, 1).data ;
    var code   = "#" + rgb2hex(col[0]) + rgb2hex(col[1]) + rgb2hex(col[2]) ;
    var node   = code2node[code] ;

    if(node === undefined)
      return ;

    var tx   = x_transition ( 50 + 250  * Math.random() ) ; // x transition object
    var ty   = y_transition ( 50 + 150 * Math.random() ) ; // y transition object
    var tr   = r_transition ( 15 + (30 * Math.random())        ) ; // radius transition object
    var tc   = c_transition ( random_color()                 ) ; // transient color transition object
    var tc2  = c_transition ( data[node].color0              ) ; // final color transition object (return back to starting color)

    tc.child = tc2 ; // ** example of the vizflow transition-chaining syntax

    data[node].transition = [tx, ty, tr, tc] ; // set the transitions for this item, also cancels all existing transitions for this item (side-effect)

  } 

  canvas.addEventListener('click', click, false) ;

  $Z.item(data)     ; // load the user data into the visualization engine to initialize the time  equals zero (t = 0) state
  $Z.action([prep]) ; // set the action to perform on each frame of the animation prior to rendering the elements 
  $Z.run()          ; // run the interactive visualization (infinite loop by default)

}