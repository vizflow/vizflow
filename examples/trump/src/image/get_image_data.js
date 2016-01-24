function get_image_data (canvas) {
  return canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height) ;
	
}