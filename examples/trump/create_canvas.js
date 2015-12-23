function create_canvas(width, height) {
  var canvas = document.createElement('canvas') ;
  canvas.setAttribute('width', width) ;
  canvas.setAttribute('height', height) ;
  canvas.style.position = 'fixed' ;
  return canvas ;
}
