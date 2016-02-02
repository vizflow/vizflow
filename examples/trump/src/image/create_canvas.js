function create_canvas(width, height) {
  var canvas = document.createElement('canvas') ;
  canvas.setAttribute('width', width) ;
  canvas.setAttribute('height', height) ;
	canvas.mozImageSmoothingEnabled = false;
	canvas.webkitImageSmoothingEnabled = false;
	canvas.msImageSmoothingEnabled = false;
	canvas.imageSmoothingEnabled = false;  
  return canvas ;
}