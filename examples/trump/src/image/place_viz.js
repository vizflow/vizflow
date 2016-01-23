function place_viz (canvas) {

	var y = document.body.getElementsByTagName("canvas");
	for(ky = 0 ; ky < y.length ; ky++) {
		console.log('removing', 'canvas', y[ky]) ;
		y[ky].parentNode.removeChild(y[ky]) ;
	}
	document.body.appendChild(canvas) ;
	
}