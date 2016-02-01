function adjust_image_ratio(canvas) {
	var newCanvas = hidpi_adjust(get_image_data(canvas)).canvas ;
	if( canvas.sourceCollisionImage !== undefined ) {
		newCanvas.sourceCollisionImage = canvas.sourceCollisionImage ; // propagate collision image without magnification since collision detection occurs on the model canvas
	}
	if( canvas.targetCollisionImage !== undefined ) {
		newCanvas.targetCollisionImage = canvas.targetCollisionImage ; // propagate collision image without magnification since collision detection occurs on the model canvas
	} else { // use the original image as default target collision image 
		newCanvas.targetCollisionImage = canvas ;
	}
	return newCanvas ; 
}