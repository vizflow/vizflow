function create_canvas(Nrect) {
  var canvas = document.createElement('canvas') ;
  canvas.setAttribute('width', Nrect) ;
  canvas.setAttribute('height', Nrect) ;
  canvas.style.position = 'fixed' ;
  return canvas ;
}
