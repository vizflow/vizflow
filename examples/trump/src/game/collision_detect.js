function collision_detect(viz) {

  var item   = $Z.item() ;
  var width  = viz.width ;
  var height = viz.height ;
	
  var Npel         = width * height ;
  var Nchannel     = 2 ; // max 2 items per collision pixel
  var Nval         = Npel * Nchannel ;

  var Nitem        = item.length ;
  var img          = [] ;
//  img.fill.call({ length: Nval }, 4);  ;
  var initialValue = -1 ;

  var collision   = {} ; // initialize output object

  collision.index = {} ;
  // for ( var kVal = 0 ; kVal < Nval ; kVal++ ) {
  //  	  img.push(initialValue) ; // initialize
  // }

  collision.detect = {} ; // initialize

  // console.log('collision_detect', 'item', item) ;

  for ( var kItem = 0 ; kItem < Nitem ; kItem++ ) {

    collision.detect[item[kItem]] = {} ; // initialize

    if (item[kItem].inert === undefined || item[kItem].inert) {
      continue ;
    }

    console.log('collision_detection', 'item[kItem].collisionImage', item[kItem].collisionImage) ;

    var imageK = item[kItem]
    	.collisionImage
    	.getContext('2d')
    	.getImageData(0, 0, item[kItem].collisionImage.width, item[kItem].collisionImage.height) ;

	  for ( var kPel = 0 ; kPel < Npel ; kPel++ ) {

	  	var i = Math.floor (kPel / width) ;
	  	var j = kPel % width ;

	  	if (    
           ( i < item[kItem].y ) 
	  		   || ( i > item[kItem].y + item[kItem].collisionImage.height - 1 )
	  		   || ( j < item[kItem].x )
	  		   || ( j > item[kItem].x + item[kItem].collisionImage.width - 1 ) 
	  	) {
	  		continue ;
	  	}
      
      var offset   = kPel * Nchannel ;
      var iItem    = i - item[kItem].y ;
      var jItem    = j - item[kItem].x ;
      var kPelItem = iItem * item[kItem].collisionImage.width + jItem ;

      var a = imageK.data[4 * kPelItem + 3] ; // use alpha channel to test for presence of nonempty pixel

      if (a > 0) {

      	for ( var kChannel = 0 ; kChannel < Nchannel - 1 ; kChannel++ ) {

			  	// if (img[offset + kChannel] > initialValue) { // collision!
          if (img[offset + kChannel] !== undefined) { // collision!

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

  collision.count = 0 ;

  // collision.list = [] ;

  for (var kKey = 0 ; kKey < key.length ; kKey++) {
  	var i = Math.floor(key[kKey] / Nitem) ;
  	var j = key[kKey] % Nitem ;

  	// collision.list.push([i, j]) ;

    collision.detect[item[i]][item[j]] = true ;
    collision.detect[item[j]][item[i]] = true ;
    collision.count++ ;

  }

  // console.log('collision_detect', 'collision.detect', collision.detect) ;
  return collision ;

}