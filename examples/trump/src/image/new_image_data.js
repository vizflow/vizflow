function new_image_data(width, height) {
	var canvas    = document.createElement('canvas');
	// console.log('new image data', 'width', width, 'height', height) ;
	var imageData = canvas.getContext('2d').createImageData(parseInt(width), parseInt(height));	
	return imageData ;
}