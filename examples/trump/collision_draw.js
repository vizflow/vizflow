function collision_draw(item, width, height) {
	
  var Npel         = width * height ;
  var Nchannel     = 2 ; // max 2 items per collision pixel
  var Nval         = Npel * Nchannel ;
  var Nitem        = item.length ;
  var img          = [] ;
  var initialValue = -1 ;

  var collision   = {} ; // initialize output object
  collision.index = {} ;
  for ( var kVal = 0 ; kVal < Nval ; kVal++ ) {
   	img.push(initialValue) ; // initialize
  }

  for ( var kItem = 0 ; kItem < Nitem ; kItem++ ) {

    var imageK = item[kItem]
    	.image
    	.getContext('2d')
    	.getImageData(0, 0, item[kItem].image.width, item[kItem].image.height) ;

	  for ( var kPel = 0 ; kPel < Npel ; kPel++ ) {

	  	var i = Math.floor (kPel / width) ;
	  	var j = kPel % width ;

	  	if (    ( i < item[kItem].y ) 
	  		   || ( i > item[kItem].y + item[kItem].image.height - 1 )
	  		   || ( j < item[kItem].x )
	  		   || ( j > item[kItem].x + item[kItem].image.width - 1 ) 
	  		 ) {
	  		continue ;
	  	}
      
      var offset = kPel * Nchannel ;

      var iItem    = i - item[kItem].y ;
      var jItem    = j - item[kItem].x ;
      var kPelItem = iItem * item[kItem].image.width + jItem ;

      var a = imageK.data[4 * kPelItem + 3] ; // use alpha channel to test for presence of color

      if (a > 0) {

      	for ( var kChannel = 0 ; kChannel < Nchannel - 1 ; kChannel++ ) {

			  	if (img[offset + kChannel] > initialValue) { // collision!

			  		img[offset + kChannel + 1] = kItem ; // store the collision data
			  		collision.index[img[offset + kChannel] * Nitem + kItem] = true ;
		        
			  	} else if (kChannel == 0) {

			  		img[offset] = kItem ; // initial item index

			  	}

		    }

      }

	  }

  }

  var key = Object.keys(collision.index) ;

  collision.list = [] ;

  for (var kKey = 0 ; kKey < key.length ; kKey++) {
  	var i = Math.floor(key[kKey] / Nitem) ;
  	var j = key[kKey] % Nitem ;

  	collision.list.push([i, j]) ;

  }

  return collision ;

}