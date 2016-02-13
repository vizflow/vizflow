function new_image_data(width, height) {
	var canvas    = create_canvas(width, height) ;
	// console.log('new image data', 'width', width, 'height', height) ;
	var imageData = canvas.context().createImageData(parseInt(width), parseInt(height));	
	return imageData ;
}