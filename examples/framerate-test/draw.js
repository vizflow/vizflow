$Z.helper.svg.draw = {} ; // initialize

$Z.helper.svg.draw.circ = function draw_circ(x, y, config) { // e.g. document.svg.appendChild( draw_circ( ... ) ) 

  if( config === undefined ) {
    config = document.svgConfig  ; 
  }

  var newCirc = document.createElementNS(document.svgNS, "circle") ; //Create a path in SVG's namespace

  newCirc.setAttribute("cx", x) ; //Set path's data
  newCirc.setAttribute("cy", y) ; //Set path's data
  newCirc.setAttribute("r", config.circleRadius) ; //Set path's data

  newCirc.style.fill        = config.circleFill ; //Set stroke colour
  newCirc.style.stroke      = config.circleBorderColor ; //Set stroke colour
  newCirc.style.strokeWidth = "3" ; //Set stroke width

  return newCirc ;

} ;

$Z.helper.svg.draw.text = function draw_text( textData, config ) { // e.g. document.svg.appendChild( draw_text( ... ) )

    if( config === undefined ) {
      config = document.svgConfig ;
    }

    var x   = textData[0][0] ;
    var y   = textData[0][1] ;
    var txt = textData[1] ;
    
    var newText = document.createElementNS(document.svgNS, "text") ; //Create a path in SVG's namespace
    
    newText.setAttribute("x", x) ; //Set path's data
    newText.setAttribute("y", y) ; //Set path's data
    newText.setAttribute("font-size", config.fontSize) ; //Set path's data
    
    newText.textContent = txt ;

    return newText ;
    
} ;

$Z.helper.svg.draw.line = function draw_line( points, config ) { // e.g. document.svg.appendChild( draw_line( ... ) )

    if( config === undefined ) {
      config = document.svgConfig ;
    }

    var newElement = document.createElementNS(document.svgNS, "path") ; //Create a path in SVG's namespace

    var pathSpec = points.map(
        function (point, key) {
            return {
                pathSegTypeAsLetter: (key === '0') ? 'M' : 'L',
                x: point[0],
                y: point[1]
            }
        }
    ) ;
    //newElement.setAttribute("d", `M${x1} ${y1} L${x2} ${y2}`) ; //Set path's data

    newElement.setAttribute('d', $Z.helper.svg.d(pathSpec)) ;

    newElement.style.stroke      = config.lineColor ; //Set stroke colour
    newElement.style.strokeWidth = config.strokeWidth ; //Set stroke width

    return newElement ;

} ;