function bg_clear (bgColor, img) {

 	var Npel       = img.data.length / 4 ;
 	var distCutoff = 20 ; // per color channel using city-block distance to account for interpolation artifacts (e.g. get image data on android bug?)

	for (var k = 0 ; k < Npel ; k++) {

		var offset = k * 4 ;
		var r = img.data[offset + 0] ;
		var g = img.data[offset + 1] ;
		var b = img.data[offset + 2] ;

		var dist = color_distance(r, g, b, bgColor) ;

		// console.log('dist', dist) ;

		if ( dist < distCutoff ) {
		// if (r === bgColor[0] && g === bgColor[1] && b === bgColor[2]) {
			img.data[offset + 0] = 0 ;
			img.data[offset + 1] = 0 ;
			img.data[offset + 2] = 0 ;
			img.data[offset + 3] = 0 ; // clear background pixels by setting opacity to zero
		}

	}

}

function color_distance(r, g, b, bgColor) {

	return Math.abs(r - bgColor[0]) + Math.abs(g - bgColor[1]) + Math.abs(b - bgColor[2]) ;

}