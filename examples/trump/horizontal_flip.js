function horizontal_flip (spriteSet) {

	var key    = Object.keys(spriteSet) ;
	var newSet = {} ;

	for(var k = 0 ; k < key.length ; k++ ) {

    if ( spriteSet[ key[k] ].length !== undefined ) {
 
      newSet[ key[k] ] = flip_sprite( spriteSet[ key[k] ] ) ;

    }

	}	

  newSet.height = spriteSet.height ;

  return newSet ;

}

function flip_sprite (sprite) {

	var spriteFlip = [] ;

	for ( var kFrame = 0 ; kFrame < sprite.length ; kFrame++ ) {
		spriteFlip.push ( flip_image ( sprite[kFrame] ) ) ;
	}

  return spriteFlip ;

}


function flip_image (canvas) {

  var context   = canvas.getContext ('2d') ;
  var imageData = context.getImageData (0, 0, canvas.width, canvas.height) ;
  var imageFlip = new ImageData (canvas.width, canvas.height) ;
  var Npel      = imageData.data.length / 4 ;

  for ( var kPel = 0 ; kPel < Npel ; kPel++ ) {

    var kFlip      = flip_index (kPel, canvas.width, canvas.height) ;
    var offset     = 4 * kPel ;
    var offsetFlip = 4 * kFlip ;

    imageFlip.data[offsetFlip + 0] = imageData.data[offset + 0] ;
    imageFlip.data[offsetFlip + 1] = imageData.data[offset + 1] ;
    imageFlip.data[offsetFlip + 2] = imageData.data[offset + 2] ;
    imageFlip.data[offsetFlip + 3] = imageData.data[offset + 3] ;

  }

  var canvasFlip  = create_canvas(canvas.width, canvas.height) ;
  canvasFlip.getContext('2d').putImageData(imageFlip, 0, 0) ;
  return canvasFlip ;

}

function flip_index (kPel, width, height) {

	var i     = Math.floor (kPel / width) ;
	var j     = kPel % width ;
	var jFlip = width - j - 1 ;
  var kFlip = i * width + jFlip ;

  return kFlip ;

}