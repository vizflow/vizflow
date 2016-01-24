function hidpi_adjust (sourceImageData) {
	// var ratio = 2 ; //(window.devicePixelRatio || 1) ;
	var newImageObject = block_copy (sourceImageData, document.ratio) ;
	return newImageObject ;
}