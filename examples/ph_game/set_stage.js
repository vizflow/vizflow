function set_stage(width, height) {
	var stage = document.createElement('div') ;
	stage.style['width']        = width ;
	stage.style['height']       = height ;
	stage.style.position        = 'relative' ;
	stage.style.margin          = 0 ;
	stage.style.transformOrigin = "0 0"; // scale from top left
	return stage ;
}