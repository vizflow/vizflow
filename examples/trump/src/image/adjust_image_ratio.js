function adjust_image_ratio(canvas) {
	return hidpi_adjust(get_image_data(canvas)).canvas ; 
}