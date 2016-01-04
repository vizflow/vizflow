function image2index(img0, index) {

  var img  = new ImageData(img0.width, img0.height) ; // duplicate original image to avoid mutating it

  var Npel = img.data.length / 4 ;

  for (var k = 0 ; k < Npel ; k++) {

    var offset = k * 4 ;
    var a = img0.data[offset + 3] ; // alpha channel encodes opacity value

    // console.log('image2index a', a) ;

    if (a > 0) { // means this pixel is not transparent

      //console.log('inside image2index: index', index) ;

      img.data[offset + 0] = index + 1 ; // recolor by index (avoid black)
      img.data[offset + 1] = 0 ; // not using g channel 
      img.data[offset + 2] = 0 ; // not using b channel
      img.data[offset + 3] = 255 ; // nonzero alpha channel

    }

  }  

  return img ;

}