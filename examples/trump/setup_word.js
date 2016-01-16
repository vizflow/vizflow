function setup_word () {

  var text = 'schlonged' ;
  var wordWidth = 100 ;
  var wordHeight = 20 ;
  var word = create_canvas(wordWidth,wordHeight) ;
  var ctx = create_context(word) ;
  ctx.font = '14px Courier' ;
  var wordOffsetX = 13 ;
  var wordOffsetY = 14 ;
  ctx.fillText(text, wordOffsetX, wordOffsetY) ;
  ctx.rect(0, 0, wordWidth, wordHeight) ;
  ctx.stroke () ;    
  var image = ctx.getImageData (0, 0, wordWidth, wordHeight) ;
  var data = image.data ;
  var Npel = data.length / 4 ;
  var offset = 0 ;
  var opacity = [] ;
  for (var kpel = 0 ; kpel < Npel ; kpel++) {
    if (data[offset + 3] > 0) {
      opacity.push(data[offset + 3]) ;
    }
    offset += 4 ;
  }
  // console.log('opacity', opacity) ;
  var tol1 = 75 ;
  offset = 0 ;
  for (var kpel = 0 ; kpel < Npel ; kpel++) {
    if (data[offset + 3] < tol1) {
      data[offset + 3] = 0 ;
    } else {
      data[offset + 3] = 255 ;
    }
    offset += 4 ;
  }    
  ctx.putImageData(image, 0, 0) ;
  return word ;
  
}