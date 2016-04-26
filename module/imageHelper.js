var imageHelper = {

	view: function sprite_helper_view (canvas) {

		var dataURL = canvas.toDataURL("image/png") ;
		console.log('dataUrl', dataURL) ;
		var win = window.open() ;
		win.document.write('<img src="' + dataURL + '"/>') ;	  		

	},

	text2image: function image_helper_text2image(imageConfig) {

		if(imageConfig === undefined) {
			imageConfig = this ;
		}

		var text   = String(imageConfig.text) ;
		var sprite = imageConfig.sprite ;

		// console.log('imageHelper text2image:', 'text', text, 'sprite', sprite) ;

		var width  = sprite[text[0]][0].width  ;
		var height = sprite[text[0]][0].height ;

    if ( imageConfig.xShift === undefined ) {
      var offsetX = 0 ;     
    } else {
      var offsetX = imageConfig.xShift ;
    }

    var image  = imageHelper.create(width * text.length + ((text.length - 1) * offsetX), height) ;

		for(var kchar = 0 ; kchar < text.length ; kchar++) {

			// console.log('text2image sprite', 'sprite[text[kchar]', sprite[text[kchar]]);
      image.context().drawImage(sprite[text[kchar]][0], Math.floor(offsetX * kchar + width * kchar), 0) ;

		}

		return image ;

	},

	text_sprite: function image_helper_text_sprite(textConfig) {

		if ( textConfig === undefined ) {
			textConfig = {} ;
		}
		
		var font     = textConfig.font || '11px Lucida Console' ;
		var alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("") ;

		var sprite   = {} ; // initialize output variable

		for ( kchar = 0 ; kchar < alphabet.length ; kchar++ ) {

			var letter = imageHelper.word({

				font:  textConfig.font  || 'Lucida',
				px:    textConfig.px    || 72,
				color: textConfig.color || '#FFFF30',
				text:  alphabet[kchar],

			}) ;

			sprite[alphabet[kchar]] = [letter] ;
		
		}

		return sprite ;

	},

	word_block: function image_helper_word_block(wordConfig) {

		var wordImage = imageHelper.word(wordConfig) ;

		// imageHelper.view(wordImage) ;

    var offsetX = 10 ;
    var offsetY = 2 ;

    var image        = imageHelper.create(wordImage.width + 2 * offsetX, wordImage.height + 2 * offsetY) ;
    var imageContext = image.context() ;
    
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

    image = imageHelper.adjust_ratio(image) ;

    return image ;

	},

	word: function image_helper_word (wordConfig) {

		var Npx;

		if(wordConfig.binarySwitch === undefined) {
		  wordConfig.binarySwitch = true ; 
		} 

		if(wordConfig.px === undefined) {
		  Npx = 12 ; 
		} else {
			Npx = wordConfig.px ;
		}

		var fontName ;

		if(wordConfig.font === undefined) {
			fontName = 'Courier' ;
		} else {
			fontName = wordConfig.font ;
		}

		// console.log('word image', 'fontName', fontName) ;

	  var wordImage    = imageHelper.create() ;
	  var wordContext  = wordImage.context() ;
	  wordContext.font = Npx + 'px ' + fontName ;
	  var wordMeasure  = wordContext.measureText(wordConfig.text) ;

	  // console.log('fontName', fontName, 'wordConfig', wordConfig, 'wordMeasure', wordMeasure, 'wordMeasure.width', wordMeasure.width) ;

	  var wordWidth  = Math.ceil(wordMeasure.width) ;
	  var wordHeight = Npx ;

	  wordImage.width  = wordWidth ;
	  wordImage.height = wordHeight ;

	  wordContext.font         = Npx + 'px ' + fontName ;
	  wordContext.textBaseline ='bottom' ;

	  if(wordConfig.color === undefined) {
	  	wordConfig.color = 'rgba(0, 0, 0, 1)' ;
	  }

    wordContext.fillStyle = wordConfig.color ;
	  wordContext.fillText(wordConfig.text, 0, Npx) ;

	  if ( wordConfig.binarySwitch === true ) { 
		  var threshold = 50 ;
		  imageEffectHelper.binary_opacity_filter(wordImage, threshold) ;
	  }

	  // imageHelper.view(wordImage)

	  return wordImage ; 

	  // finished drawing black on transparent pixels
		
	},

	clear_rect: function image_helper_clear_rect(canvas, rect) {

		var newCanvas  = imageHelper.create (canvas.width, canvas.height)  ;
		var newContext = newCanvas.context() ;

		newContext.drawImage (canvas, 0, 0) ;
		newContext.clearRect (rect.x, rect.y, rect.width, rect.height) ;

		return newCanvas ;

	},

	keep_rect: function image_helper_keep_rect(canvas, rect) {

		var newCanvas  = imageHelper.create (canvas.width, canvas.height)  ;
		var newContext = newCanvas.context() ;

		newContext.drawImage (canvas, rect.x, rect.y, rect.width, rect.height, rect.x, rect.y, rect.width, rect.height) ;

		return newCanvas; 

	},

	image2canvas: function image_helper_image2canvas(imgUrl) {

	  var image     = imageLoader.cache[imgUrl] ; // temporary variable
	  var canvas    = imageHelper.create() ;
	  var context   = canvas.context() ;
	  canvas.width  = image.width ;
	  canvas.height = image.height ;
	  context.drawImage(image, 0, 0) ;

	  return canvas ;

	},

	create: function image_helper_create(width, height) {

	  var canvas = document.createElement('canvas') ;
	  canvas.setAttribute('width', width) ;
	  canvas.setAttribute('height', height) ;
		canvas.mozImageSmoothingEnabled = false;
		canvas.webkitImageSmoothingEnabled = false;
		canvas.msImageSmoothingEnabled = false;
		canvas.imageSmoothingEnabled = false;  

		canvas.context = imageHelper.context2d ;

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
		context.imageSmoothingEnabled       = false ;  	

		return context ;

	},

	adjust_ratio: function image_helper_adjust_ratio(canvas) {

		var newCanvas = hidpi_adjust(get_image_data(canvas)).canvas ;

		if( canvas.sourceCollisionImage !== undefined ) {
			newCanvas.sourceCollisionImage = canvas.sourceCollisionImage ; // propagate collision image without magnification since collision detection occurs on the model canvas
		}

		if( canvas.targetCollisionImage !== undefined ) {
			newCanvas.targetCollisionImage = canvas.targetCollisionImage ; // propagate collision image without magnification since collision detection occurs on the model canvas
		} else { // use the original image as default target collision image 
			newCanvas.targetCollisionImage = canvas ;
		}

		newCanvas.originalCanvas = canvas ;
		
		return newCanvas ;

	},

	copy: function image_helper_copy (image) {

		var copy    = imageHelper.create(image.width, image.height) ;
		var context = copy.context() ;
		
		context.drawImage(image, 0, 0) ;

		return copy ;

	},

	block_copy: function image_helper_block_copy (sourceImageData, ratio) {

	  var destImage = imageHelper.create(sourceImageData.width * ratio, sourceImageData.height * ratio) ;
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
	},

	flip_image: function image_helper_flip_image (canvas) {

	  var context   = canvas.context() ;
	  var imageData = context.getImageData (0, 0, canvas.width, canvas.height) ;
	  var imageFlip = new_image_data(canvas.width, canvas.height) ; // new ImageData (canvas.width, canvas.height) ;
	  var Npel      = imageData.data.length / 4 ;

	  for ( var kPel = 0 ; kPel < Npel ; kPel++ ) {
	      
	    var kFlip      = imageHelper.flip_index (kPel, canvas.width, canvas.height) ;
	    var offset     = 4 * kPel ;
	    var offsetFlip = 4 * kFlip ;

	    imageFlip.data[offsetFlip + 0] = imageData.data[offset + 0] ;
	    imageFlip.data[offsetFlip + 1] = imageData.data[offset + 1] ;
	    imageFlip.data[offsetFlip + 2] = imageData.data[offset + 2] ;
	    imageFlip.data[offsetFlip + 3] = imageData.data[offset + 3] ;

	  }

	  var canvasFlip  = imageHelper.create(canvas.width, canvas.height) ;
	  canvasFlip.context().putImageData(imageFlip, 0, 0) ;
	  return canvasFlip ;

	}, 

	flip_index: function image_helper_flip_index (kPel, width, height) {

		var i     = Math.floor (kPel / width) ;
		var j     = kPel % width ;
		var jFlip = width - j - 1 ;
	  var kFlip = i * width + jFlip ;

	  return kFlip ;

	},	

	get_original: function image_helper_get_original(canvas) {

		// console.log('imageHelper.get_original', 'canvas', canvas) ;
		return canvas.originalCanvas ;

	},

  to_index: function image_helper_to_index(img0, index) {

	  var img = new_image_data(img0.width, img0.height) ; // var img  = new ImageData(img0.width, img0.height) ; // duplicate original image to avoid mutating it

	  var Npel = img.data.length / 4 ;

	  for (var k = 0 ; k < Npel ; k++) {

	    var offset = k * 4 ;
	    var a = img0.data[offset + 3] ; // alpha channel encodes opacity value

	    if (a > 0) { // means this pixel is not transparent

	      img.data[offset + 0] = index + 1 ; // recolor by index (avoid black)
	      img.data[offset + 1] = 0 ;         // not using g channel 
	      img.data[offset + 2] = 0 ;         // not using b channel
	      img.data[offset + 3] = 255 ;       // nonzero alpha channel

	    }

	  }  

	  return img ;

	},

	indexed_draw: function image_helper_indexed_draw(item, canvas, width, height) { // takes an array of items and draws them using indexed colors

	  if(canvas === undefined) { 
	  	var canvas  = imageHelper.create (width, height) ;
	  } else {
	  	canvas.width = canvas.width // resets the canvas simiar to clearRect
	  }

	  var context = canvas.context() ;

	  for(var kItem = 0 ; kItem < item.length ; kItem++) {

	  	var imageDataK = item[kItem]
	  		.image
	  		.originalCanvas
	  		.context()
	  		.getImageData(0, 0, item[kItem].image.width, item[kItem].image.height) ;

	    var imageK     = imageHelper.to_index(imageDataK, kItem) ; // ImageData object
	    var tempCanvas = imageHelper.create(item[kItem].image.width, item[kItem].image.height) ;

	    tempCanvas
	      .context()
	      .clearRect(0, 0, tempCanvas.width, tempCanvas.height) ;
	    tempCanvas
	      .context()
	      .putImageData(imageK, 0, 0) ;

	    context.drawImage(tempCanvas, item[kItem].x, item[kItem].y) ; // draw color-indexed button for color picking

	  }

	  // console.log('indexed draw: ', 'item', item)

	  return canvas ;	

	},

} ;