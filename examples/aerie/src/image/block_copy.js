function block_copy (sourceImageData, ratio) {

  var destImage = $Z.helper.image.create(sourceImageData.width * ratio, sourceImageData.height * ratio) ;
  var destImageContext = destImage.context() ;
  var destImageData = destImageContext.getImageData(0, 0, destImage.width, destImage.height) ;
   
  var data0 = sourceImageData.data ;
  var data1 = destImageData.data ;

  var Npel = sourceImageData.width * sourceImageData.height ;
  // console.log('block copy 41') ;

  for (var kPel = 0 ; kPel < Npel ; kPel++) {
    var kx = kPel % sourceImageData.width ;
    var ky = Math.floor(kPel / sourceImageData.width) ;
    var bx = ratio * kx ;
    var by = ratio * ky ;        
    var kOff = kPel * 4 ;
    // console.log('blockcopy 48') ;

    var r = data0[kOff + 0] ;
    var g = data0[kOff + 1] ;         
    var b = data0[kOff + 2] ;
    var a = data0[kOff + 3] ;
    // console.log('r', r, 'g', g, 'b', b) ;
    for (var bkx = 0 ; bkx < ratio ; bkx++) {
      for (var bky = 0 ; bky < ratio ; bky++) {
        var tempX = bx + bkx ;
        var tempY = by + bky ;
        var bk = tempY * destImageData.width + tempX ;
        var bkOff = bk * 4 ;
        data1[bkOff + 0] = r ;
        data1[bkOff + 1] = g ;
        data1[bkOff + 2] = b ;
        data1[bkOff + 3] = a ;  
      }
    }
  }

  destImageContext.putImageData(destImageData, 0, 0) ;
  
  var imageObject =  {
    data: destImageData,
    context: destImageContext,
    canvas: destImage,
  } ;
  return imageObject ;
  //console.log('imageObject', imageObject) ;
  // destImageData.data = data1 ;
  // console.log ('sourceImageData', sourceImageData, 'destImageData', destImageData) ;
}