function word_image (text) {

  var wordWidth = 100 ;
  var wordHeight = 20 ;
  var wordImage = create_canvas(wordWidth,wordHeight) ;
  var context = create_context(wordImage) ;
  context.font = '14px Courier' ;
  var wordOffsetX = 13 ;
  var wordOffsetY = 14 ;
  context.fillText(text, wordOffsetX, wordOffsetY) ;
  //context.rect(0, 0, wordWidth, wordHeight) ;
  context.stroke () ;    
  var image = context.getImageData (0, 0, wordWidth, wordHeight) ;
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
  context.putImageData(image, 0, 0) ;
  // finished drawing black on transparent pixels

  var image = create_canvas(wordWidth,wordHeight) ;
  var imageContext = create_context(image) ;
  var rect = {
  	x: 0,
  	y: 0,
  	width: wordImage.width,
  	height: wordImage.height, 
  	color: '#FFF',
  }
  draw.rect (rect, imageContext) ;  
  imageContext.drawImage (wordImage, 0, 0) ;

  return image ;
	
}