var imageHelper = {

	view: function sprite_helper_view (canvas) {

		var dataURL = canvas.toDataURL("image/png") ;
		console.log('dataUrl', dataURL) ;
		var win = window.open() ;
		win.document.write('<img src="' + dataURL + '"/>') ;	  		

	},

	word_block: function image_helper_word_block(wordConfig) {

		var wordImage = imageHelper.word(wordConfig) ;

    var offsetX = 2 ;
    var offsetY = 3 ;

    var image        = create_canvas(wordImage.width + 2 * offsetX, wordImage.height + 2 * offsetY) ;
    var imageContext = create_context(image) ;
    
    var rect = {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height, 
      color: '#FFF',
      stroke: 'rgba(0, 0, 0, 0)',
      opacity: 1,
    } ;

    drawHelper.rect (rect, imageContext) ;
    imageContext.drawImage (wordImage, offsetX, offsetY) ;

    imageContext.lineWidth = 1 ; 
    imageContext.strokeStyle = 'rgba(0, 0, 0, 1)' ;
    imageContext.rect(0, 0, image.width, image.height) ;
    imageContext.stroke () ;    

    return image ;

	},

	word: function image_helper_word (wordConfig) {

		var Npx;

		if(wordConfig.px === undefined) {
		  Npx = 11 ; 
		} else {
			Npx = wordConfig.px ;
		}

		var fontName ;

		if(wordConfig.font === undefined) {
			fontName = 'Courier' ;
		} else {
			fontName = wordConfig.font ;
		}

	  var wordImage    = create_canvas(2 * Npx * wordConfig.text.length, 2 * Npx * wordConfig.text.length) ;
	  var wordContext  = create_context(wordImage) ;
	  wordContext.font = Npx + 'px ' + fontName ;

	  var wordMeasure = wordContext.measureText(wordConfig.text) ;

	  var wordWidth  = Math.ceil(wordMeasure.width) ;
	  var wordHeight = Npx ;

	  wordImage.width  = wordWidth ;
	  wordImage.height = wordHeight ;

	  wordContext.fillText(wordConfig.text, 0, 0) ;

	  return wordImage ; 

	  // var threshold = 60 ;
	  // imageEffectHelper.binary_opacity_filter(wordImage, threshold) ;

	  // finished drawing black on transparent pixels
		
	},

	clear_rect: function image_helper_clear_rect(canvas, rect) {

		var newCanvas  = create_canvas (canvas.width, canvas.height)  ;
		var newContext = newCanvas.context() ;

		newContext.drawImage (canvas, 0, 0) ;
		newContext.clearRect (rect.x, rect.y, rect.width, rect.height) ;

		return newCanvas ;

	},

	keep_rect: function image_helper_keep_rect(canvas, rect) {

		var newCanvas  = create_canvas (canvas.width, canvas.height)  ;
		var newContext = newCanvas.context() ;

		newContext.drawImage (canvas, rect.x, rect.y, rect.width, rect.height, rect.x, rect.y, rect.width, rect.height) ;

		return newCanvas; 

	},

	image2canvas: function image_helper_image2canvas(imgUrl) {

	  var image     = imageLoader.cache[imgUrl] ; // temporary variable
	  var canvas    = create_canvas() ;
	  var context   = create_context(canvas) ;
	  canvas.width  = image.width ;
	  canvas.height = image.height ;
	  context.drawImage(image, 0, 0) ;
	  return canvas ;

	},

	context2d: function image_helper_context(canvas) {

		if(canvas === undefined) {
			canvas = this ;
		}

		var context = canvas.getContext('2d') ;

		context.mozImageSmoothingEnabled    = false ;
		context.webkitImageSmoothingEnabled = false ;
		context.msImageSmoothingEnabled     = false ;
		context.imageSmoothingEnabled       = false 			;  	

		return context ;

	},

} ;