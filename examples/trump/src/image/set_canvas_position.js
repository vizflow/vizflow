function set_canvas_position(canvas) {     
  var position = {} ;
  var windowWidth  = window.innerWidth ;
  var widthRatio   = canvas.width / windowWidth ;
  var windowHeight = window.innerHeight ;
  var heightRatio  = canvas.height / windowHeight ;
  var scaleWidth   = true ; // toggles width or height scaling (height by default)
  var landscape    = canvas.width >= canvas.height ;
  if(  landscape &&  (heightRatio > widthRatio) ) scaleWidth = false ;
  if( !landscape && !(heightRatio < widthRatio) ) scaleWidth = false ;
  if(scaleWidth) { // fit width to window and center vertically  
    position.width  = windowWidth ;
    position.height = Math.round(canvas.height / widthRatio) ;
    position.left   = 0 ;
    position.top    = Math.round(0.5 * (windowHeight - position.height)) ;
    position.scale  = 1 / widthRatio ;
  } else { // fit height to window and center horizontally
    position.height = windowHeight ;
    position.width  = Math.round(canvas.width / heightRatio) ;
    position.top    = 0 ;
    position.left   = Math.round(0.5 * (windowWidth - position.width)) ;
    position.scale  = 1 / heightRatio ;
  }
  // console.log('rw', widthRatio, 'rh', heightRatio, 'pos', position)
  if(canvas.style.width !== position.width || canvas.style.height !== position.height) {

    canvas.style.width  = position.width ;
    canvas.style.height = position.height ;
    canvas.style.left   = position.left ;
    canvas.style.top    = position.top ;
    
  }
  return position ;
}
