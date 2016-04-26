function get_image_data (canvas) {
  return canvas.context().getImageData(0, 0, canvas.width, canvas.height) ;
	
}