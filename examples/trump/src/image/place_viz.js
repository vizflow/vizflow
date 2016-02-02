function place_viz (canvas) {

	var y = document.body.getElementsByTagName("canvas");
	for(ky = 0 ; ky < y.length ; ky++) {
		// console.log('removing', 'canvas', y[ky]) ;
		y[ky].parentNode.removeChild(y[ky]) ;
	}
	document.body.appendChild(canvas) ;
	canvas.style.position = 'fixed' ;
	canvas.parentNode.style.transformOrigin = "0 0"; //scale from top left
	// canvas.getContext('2d').scale(1, 1) ;
	
}