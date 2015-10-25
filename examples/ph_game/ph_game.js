// pH education game

function ph_game() {

  var width    = 1200 ;
  var height   = 900 ;
  var dur      = 500 ; // transition duration in milliseconds
  var yPadding = 200 ;
  var perf     = window.performance ;

  var canvas = set_canvas(width, height)
  canvas.setAttribute('id', 'vizCanvas') ;
  canvas.style.position = 'absolute' ;

  var hiddenCanvas = set_canvas(width, height) ;
  hiddenCanvas.style.display = 'none' ; // hide this canvas

  var context                         = canvas.getContext('2d') ;  
  //context.webkitImageSmoothingEnabled = false ;
  context.mozImageSmoothingEnabled    = false ;
  context.imageSmoothingEnabled       = false ;
  context.font = "36px Impact" ; 
  context.globalAlpha = 1.0 ;

  var stage = set_stage(width, height) ;
  stage.appendChild(canvas) ;
  document.body.appendChild(stage) ;  

  function rgb2hex( rgb ) {
    var c = Math.round( rgb ).toString( 16 ) ;
    if ( c.length === 1 ) c = '0' + c ; // make sure it is the right length
    return c ;
  }

  function draw_circle(ctx, circ) {
    ctx.beginPath() ;
    var x = circ.x ;
    var y = circ.y ;
    var r = circ.radius ;
    ctx.arc(x, y, r, 0, Math.PI * 2, true) ;
    ctx.fillStyle = circ.color ;
    ctx.fill() ;
    ctx.closePath() ;
  }

  var sizeScale = 20 ; // pixels per Angstrom
  var radius    = 3.4 * sizeScale ; // for user interaction

  function draw_hydrogen(ctx, x, y) {
    var r = 1.2 * sizeScale ;
    var c = '#FFFFFF' ;
    ctx.globalAlpha = 1/4;
    draw_circle(ctx, {x: x, y: y, radius: r, color: c}) ;
    ctx.globalAlpha = 1.0 ; 
  }

  function draw_oxygen(ctx, x, y, c) {
    var r = 1.52 * sizeScale ;
    draw_circle(ctx, {x: x, y: y, radius: r, color: c}) ;    
  }

  function pol2cart(radius, angle) {
    var x = radius * Math.cos(angle) ;
    var y = radius * Math.sin(angle) ;
    return [x, y] ;
  }

  var red   = '#BB3333' ;
  var green = '#336633' ;
  var blue  = '#333366' ;
  var gray  = '#333333' ;
  var black = '#000000' ;

  function draw_hydroxide(ctx, mol) {
    var bondlength = sizeScale * 0.958 ; // hydroxide O-H bond length in angstroms
    var hxy = pol2cart(bondlength, mol.spin) ; // hydrogen position
    draw_hydrogen(ctx, mol.x + hxy[0], mol.y + hxy[1]) ;    
    draw_oxygen(ctx, mol.x, mol.y, blue) ; // blue for negatively charged
  }

  function draw_water(ctx, mol) {
    var angle      = 2 * (104.5 / 360) * Math.PI ; // average angle between the hydrogens in water
    var bondlength = sizeScale * 0.96        ; // O-H bond length in H2O

    var hxy = pol2cart(bondlength, mol.spin) ; // first hydrogen
    draw_hydrogen(ctx, mol.x + hxy[0], mol.y + hxy[1]) ;

    hxy = pol2cart(bondlength, mol.spin + angle) ; // second hydrogen
    draw_hydrogen(ctx, mol.x + hxy[0], mol.y + hxy[1]) ;
    draw_oxygen(ctx, mol.x, mol.y, gray) ; // gray for neutral
  }

  function draw_hydronium(ctx, mol) {
    var angle      = 2 * Math.PI / 3 ; // average angle between the hydrogens in water
    var bondlength = sizeScale * 0.961        ; // O-H bond length in H2O

    var hxy = pol2cart(bondlength, mol.spin) ; // first hydrogen
    draw_hydrogen(ctx, mol.x + hxy[0], mol.y + hxy[1]) ;

    var hxy = pol2cart(bondlength, mol.spin + angle) ; // second hydrogen
    draw_hydrogen(ctx, mol.x + hxy[0], mol.y + hxy[1]) ;

    var hxy = pol2cart(bondlength, mol.spin + 2 * angle) ; // third hydrogen
    draw_hydrogen(ctx, mol.x + hxy[0], mol.y + hxy[1]) ;
    draw_oxygen(ctx, mol.x, mol.y, red) ; // red for positively charged
  }


  function random_angle_perturbation() {
    var scale = 0.05 ;
    return scale * 2 * Math.PI * (2 * (Math.random()  - 0.5)); // random perturbation in orientation 
  }

  function random_position_perturbation() {
    var scale = 10  ;
    return scale * (Math.random() - 0.5) ;
  }

  function boundary_conditions(mol) {
    if(mol.x < 0) mol.x = 0 ;
    if(mol.x > width) mol.x = width ;
    if(mol.y < yPadding) mol.y = yPadding ;
    if(mol.y > height) mol.y = height ;
  }

  function draw_molecule(ctx, mol) {
    mol.spin += random_angle_perturbation() ;
    mol.x    += random_position_perturbation() ;
    mol.y    += random_position_perturbation() ;
    boundary_conditions(mol) ;
    if(mol.type === 1) draw_hydroxide(ctx, mol) ; 
    if(mol.type === 2) draw_water(ctx, mol) ;
    if(mol.type === 3) draw_hydronium(ctx, mol) ;
  }

  function render() {
    return new Promise(
      (resolve, reject) => {
        draw_molecule(context, this) ;
        resolve(true) ;
      }
    ) ;
  }    

//  var x_transition = $Z.transition.linear_transition_func ( 'x',      dur ) ; // function accepting an x end-value and returning a transition object
//  var y_transition = $Z.transition.linear_transition_func ( 'y',      dur ) ; // function accepting a y end-value and returning a transition object
//    var c_transition = $Z.transition.color_transition_func  ( 'color',  dur ) ; // function accepting a color end-value and returning a transition object

  var left   = 5 * width / 100 ;
  var right  = 95 * width / 100 ;
  var middle = width / 2 ;
  var hmid   = height / 2 ;
  var hthird = height / 3 ;

  //var data = [ // array of object literals / hash-tables / structs / dictionaries defining the molecules
  //  { x: left,   y:  2 * hthird, type: 1 },
  //  { x: right,  y:  2 * hthird, type: 2 },
  //  { x: middle, y:  hthird,     type: 3 }
  //] ;

  var Nwater  = 200 ;
  var Nproton = Math.round(Nwater * 0.1) ;
  var Ndata   = Nwater + Nproton ;
  var data    = [] ;

  var Ninitial1 = Math.round(0.9 * Nproton * Math.random()) ;
  var Ninitial2 = Math.round(0.9 * Nproton * Math.random()) ;
  if(Ninitial1 > Ninitial2) 
    var Ninitial = Nproton + Ninitial1 ;
  else
    var Ninitial = Nproton - Ninitial2 ;

  for(var k = 0 ; k < Ndata ; k++) {
    d = {} ;
    d.x = left / 2 + (right - left / 2)  * Math.random() ;
    d.y = hthird + 0.8 * 2 * (hthird * Math.random()) ;
    if(k >= Ndata - Ninitial) d.type = 3 ;
    else d.type = 2 ;
    d.id     = k ;
    d.render = render ; // function that tells the visulization engine how to render the items for each frame of the visualization
    d.spin   = 2 * Math.PI * Math.random() ;
    data[k] = d ;
  }

  var scaleX     ; 
  var scaleY     ; 
  var vizScale ; 
  var windowWidth ;

  function set_scale() {     
    windowWidth = window.innerWidth ;
    scaleX      = width  / windowWidth  ;
    scaleY      = height / window.innerHeight ;
    vizScale    = Math.max(scaleX, scaleY)    ; // Math.min(scaleX, scaleY)    ;
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
  var lastResize = perf.now() ;
  var t = perf.now() ;
  setInterval(resize, throttle) ;

  var Ntarget = Nproton ; // Math.ceil(10 * Math.random()) ;
  var target  = -Math.log10(Ntarget / (Ndata - Ntarget)) ;

  function prep() {

    return new Promise(
      (resolve, reject) => {
        //context.clearRect(0, 0, canvas.width, canvas.height) ;
        var pad = 4 ; // to account for aliasing when drawing paths to canvas
        for(var k = 0 ; k < data.length ; k++) {
          var x = Math.max(0, Math.floor(data[k].x - radius) - pad) ;
          var y = Math.max(0, Math.floor(data[k].y - radius) - pad) ;
          var w = Math.min(canvas.width, Math.ceil(2 * radius) + 2 * pad) ;
          var h = Math.min(canvas.height, Math.ceil(2 * radius) + 2 * pad) ;
          context.clearRect(x, y, w, h) ;
        }
        var pH = 0 ;
        for(var k = 0 ; k < data.length ; k++) 
          if(data[k].type === 3) 
            pH++ ;
        pH /= (data.length - pH) ;
        pH = -Math.log10(pH) ;

        context.clearRect(0, 0, width, yPadding) ;
        context.fillStyle = "white" ;
        context.fillText("Current pH: " + pH.toPrecision(3), 10, 50) ;          
        context.fillText("Target pH: " + target.toPrecision(3), 10, 100) ;
        if(pH < target) var message = 'REMOVE Hydronium Ions to RAISE the pH' ;
        else if(pH > target) var message = "ADD Hydronium Ions to LOWER the pH" ;
        else {
          context.fillStyle = "yellow" ;
          var message = 'You did it. Great job!' ;
        }
        context.fillText(message, 10, 150) ;          
        resolve(true) ;
      }
    ) ;

  }

  code2node = {} ;
  for(var k = 0 ; k < data.length ; k++) {
    ccode = '' ;
    for(var kc = 0 ; kc < black.length - String(data[k].id).length ; kc++) {
      ccode += black[kc] ;
    }
    ccode += data[k].id ;
    code2node[ccode] = k ;
    data[k].code = ccode ;
  }

  function click(e) {

    set_scale() ;

    var mouseX = Math.round((e.clientX - xShift) * vizScale) ;
    var mouseY = Math.round(e.clientY * vizScale) ;

    var hiddenContext = hiddenCanvas.getContext('2d') ;
    hiddenContext.clearRect(0, 0, hiddenCanvas.width, hiddenCanvas.height) ;
    for(var k = 0 ; k < data.length ; k++) { // only need to draw hidden canvas when user clicks
      draw_circle(hiddenContext, {x: data[k].x, y: data[k].y, radius: radius, color: data[k].code}) ; // draw into hidden-canvas for color-picking (use one circle)
    }
    var col  = hiddenContext.getImageData(mouseX, mouseY, 1, 1).data ;
    var code = "#" + rgb2hex(col[0]) + rgb2hex(col[1]) + rgb2hex(col[2]) ;
    var node = code2node[code] ;

    if(node === undefined)
      return ;

    if(data[node].type === 2) data[node].type = 3 ;
    else if(data[node].type === 3) data[node].type = 2 ;

    //if(data[node].last === 1) data[node].type += 1 ;
    //if(data[node].last === 3) data[node].type -= 1 ;
    //if(data[node].type !== 2) data[node].last = data[node].type ;

    //var tx   = x_transition ( left / 2 + (right - left / 2)  * Math.random() ) ; // x transition object
    //var ty   = y_transition ( hthird / 2 + hmid * Math.random()              ) ; // y transition object

    //data[node].transition = [tx, ty] ; // set the transitions for this item, also cancels all existing transitions for this item (side-effect)

  } 

  canvas.addEventListener('click', click, false) ;

  $Z.item(data)     ; // load the user data into the visualization engine to initialize the time  equals zero (t = 0) state
  $Z.prep([prep])   ; // sets the preprocessing to perform on each frame of the animation (prior to updating and rendering the elements)
  $Z.run()          ; // run the interactive visualization (infinite loop by default)

}