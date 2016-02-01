function word_image (text) {

  Npx = 11 ; 
  var pad = -3 ;
  var wordWidth = Math.round(text.length * (Npx + pad)) ;
  var wordHeight = 16 ;
  var wordImage = create_canvas(wordWidth, wordHeight) ;

  var wordContext = create_context(wordImage) ;
  wordContext.font = Npx + 'px Courier' ;
  var wordOffsetX = 3 ;
  var wordOffsetY = 11 ;
  wordContext.fillText(text, wordOffsetX, wordOffsetY) ;
  var threshold = 60 ;
  effectHelper.image.binary_opacity_filter(wordImage, threshold) ;

  // finished drawing black on transparent pixels

  var image = create_canvas(wordWidth, wordHeight) ;
  var imageContext = create_context(image) ;
  var rect = {
  	x: 0,
  	y: 0,
  	width: wordWidth,
  	height: wordHeight, 
  	color: '#FFF',
    stroke: 'rgba(0, 0, 0, 0)',
  }
  drawHelper.rect (rect, imageContext) ;
  imageContext.drawImage (wordImage, 0, 0) ;

  imageContext.lineWidth = 1; 
  imageContext.strokeStyle = 'rgba(0, 0, 0, 255)' ;
  imageContext.rect(0, 0, wordWidth, wordHeight) ;
  imageContext.stroke () ;    

  return image ;
	
}