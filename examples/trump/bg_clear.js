function bg_clear (bgColor, img) {

 	var Npel = img.data.length / 4 ;

	for (var k = 0 ; k < Npel ; k++) {

		var offset = k * 4 ;
		var r = img.data[offset + 0] ;
		var g = img.data[offset + 1] ;
		var b = img.data[offset + 2] ;

		if (r === bgColor[0] && g === bgColor[1] && b === bgColor[2]) {
			img.data[offset + 3] = 0 ; // clear background pixels by setting opacity to zero
		}

	}

}