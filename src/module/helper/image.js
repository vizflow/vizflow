let imageHelper = {

  upsample: function image_helper_upsample (sourceImageData) {
    // var ratio = 2 ; //(window.devicePixelRatio || 1) ;
    var newImageObject = imageHelper.block_copy (sourceImageData, document.ratio) ;
    return newImageObject ;
  },

  set_position: function image_helper_set_position(canvas) {

    if ( canvas === undefined ) { 
      canvas = this ;
    }

    if ( canvas.vCenter === undefined ) {
      canvas.vCenter = true ;
    }

    if ( canvas.hCenter === undefined ) {
      canvas.hCenter = true ;
    }

    var position     = {} ;
    var windowWidth  = window.innerWidth ;
    var widthRatio   = canvas.width / windowWidth ;
    var windowHeight = window.innerHeight ;
    var heightRatio  = canvas.height / windowHeight ;
    var scaleWidth   = true ; // toggles width or height scaling 
    var landscape    = canvas.width >= canvas.height ;
    
    if(  landscape &&  (heightRatio > widthRatio) ) scaleWidth = false ;
    if( !landscape && !(heightRatio < widthRatio) ) scaleWidth = false ;
    
    if( scaleWidth ) { // fit width to window and center vertically  
    
      if ( canvas.cover === true ) {

        position.width  = Math.min(windowWidth, canvas.maxWidth) ;
        position.height = Math.min(windowHeight, canvas.maxHeight) ;
        position.left   = 0.5 * (windowWidth  - position.width) ;
        position.top    = 0.5 * (windowHeight - position.height) ;

      } else {      
        
        position.width  = windowWidth ;
        position.height = Math.round(canvas.height / widthRatio) ;
        position.left   = 0 ;
        if ( canvas.vCenter === true ) {
          position.top = Math.round(0.5 * (windowHeight - position.height)) ;        
        } else {
          position.top = 0 ;
        }
        // position.scale  = 1 / widthRatio ;
      
      }
    
    } else { // fit height to window and center horizontally
      
      if ( canvas.cover === true ) {

        position.width  = Math.min(windowWidth, canvas.maxWidth) ;
        position.height = Math.min(windowHeight, canvas.maxHeight) ;
        position.left   = 0.5 * (windowWidth  - position.width) ;
        position.top    = 0.5 * (windowHeight - position.height) ;

      } else {

        position.height = windowHeight ;
        position.width  = Math.round(canvas.width / heightRatio) ;
        position.top    = 0 ;
        if (canvas.hCenter === true) {
          position.left = Math.round(0.5 * (windowWidth - position.width)) ;        
        } else {
          position.left = 0 ;
        }
        // position.scale  = 1 / heightRatio ;

      }

    }
    
    position.scaleX = position.width / canvas.width ;
    position.scaleY = position.height / canvas.height ;

    // console.log('rw', widthRatio, 'rh', heightRatio, 'pos', position)
    
    if(canvas.style.width !== position.width || canvas.style.height !== position.height || canvas.style.left !== position.left || canvas.style.top !== position.top) {

      canvas.style.width  = position.width + 'px' ;
      canvas.style.height = position.height + 'px' ;
      canvas.style.left   = position.left + 'px' ;
      canvas.style.top    = position.top + 'px' ;
      
    }

    return position ;

  },

  place: function viz_helper_place( canvas ) {

    if ( canvas === undefined ) { 
      canvas = this ;
    }

    var y = document.body.getElementsByTagName("canvas");
    for(let ky = 0 ; ky < y.length ; ky++) {
      // console.log('removing', 'canvas', y[ky]) ;
      y[ky].parentNode.removeChild(y[ky]) ;
    }
    document.body.appendChild(canvas) ;
    canvas.style.position = 'fixed' ;
    canvas.parentNode.style.transformOrigin = "0 0"; //scale from top left
    // canvas.context().scale(1, 1) ;
  
  },  

  get_data: function image_helper_get_data (canvas) {
    return canvas.context().getImageData(0, 0, canvas.width, canvas.height) ;   
  },

  view: function sprite_helper_view (canvas) {

    var dataURL = canvas.toDataURL("image/png") ;
    console.log('dataUrl', dataURL) ;
    var win = window.open() ;
    win.document.write('<img src="' + dataURL + '"/>') ;        

  },

  text: function image_helper_text2image(imageConfig) {

    if(imageConfig === undefined) {
      imageConfig = this ;
    }

    var text   = String(imageConfig.text) ;
    var sprite = imageConfig.sprite ;

    // console.log('imageHelper text:', 'text', text, 'sprite', sprite) ;

    var width  = sprite[text[0]][0].width  ;
    var height = sprite[text[0]][0].height ;

    if ( imageConfig.xShift === undefined ) {
      var offsetX = 0 ;     
    } else {
      var offsetX = imageConfig.xShift ;
    }

    var image  = imageHelper.create(width * text.length + ((text.length - 1) * offsetX), height) ;

    for(let kchar = 0 ; kchar < text.length ; kchar++) {

      // console.log('text sprite', 'sprite[text[kchar]', sprite[text[kchar]]);
      image.context().drawImage(sprite[text[kchar]][0], Math.floor(offsetX * kchar + width * kchar), 0) ;

    }

    return image ;

  },

  text_sprite: function image_helper_text_sprite(textConfig) {

    if ( textConfig === undefined ) {
      textConfig = {} ;
    }
    
    var font     = textConfig.font || '11px Lucida Console' ;
    var alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ?.-!@#$%^&*()[]{}/\ ".split("") ;

    var sprite   = {} ; // initialize output variable

    for ( let kchar = 0 ; kchar < alphabet.length ; kchar++ ) {

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

    $Z.helper.draw.rect (rect, imageContext) ;
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
      $Z.helper.effect.image.binary_opacity_filter(wordImage, threshold) ;
    }

    // imageHelper.view(wordImage)

    return wordImage ; 

    // finished drawing black on transparent pixels
    
  },

  clear_color: function image_helper_clear_color(bgColor, img) {

    if ( img === undefined ) {
      img = this ;
    }

    var canvas = img ;

    img = imageHelper.get_data(canvas) ;

    var Npel       = img.data.length / 4 ;
    var distCutoff = 20 ; // per color channel using city-block distance to account for interpolation artifacts (e.g. get image data on android bug?)

    for (let k = 0 ; k < Npel ; k++) {

      var offset = k * 4 ;
      var r = img.data[offset + 0] ;
      var g = img.data[offset + 1] ;
      var b = img.data[offset + 2] ;

      var dist = imageHelper.color_distance(r, g, b, bgColor) ;

      // console.log('dist', dist) ;

      if ( dist < distCutoff ) {
      // if (r === bgColor[0] && g === bgColor[1] && b === bgColor[2]) {
        img.data[offset + 0] = 0 ;
        img.data[offset + 1] = 0 ;
        img.data[offset + 2] = 0 ;
        img.data[offset + 3] = 0 ; // clear background pixels by setting opacity to zero
      }

    }

    canvas.context().putImageData(img, 0, 0) ;

  },

  color_distance: function image_helper_color_distance(r, g, b, bgColor) {
    return Math.abs(r - bgColor[0]) + Math.abs(g - bgColor[1]) + Math.abs(b - bgColor[2]) ;
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

  to_canvas: function image_helper_to_canvas(imgUrl) {

    var image     = $Z.helper.loader.image.cache[imgUrl] ; // temporary variable
    var canvas    = imageHelper.create() ;
    var context   = canvas.context() ;
    canvas.width  = image.width ;
    canvas.height = image.height ;
    context.drawImage(image, 0, 0) ;

    return canvas ;

  },

  create: function image_helper_create(width, height, color) {

    var canvas = document.createElement('canvas') ;
    canvas.setAttribute('width', width) ;
    canvas.setAttribute('height', height) ;
    canvas.mozImageSmoothingEnabled = false;
    canvas.webkitImageSmoothingEnabled = false;
    canvas.msImageSmoothingEnabled = false;
    canvas.imageSmoothingEnabled = false;  

    canvas.context      = imageHelper.context2d ;
    canvas.place        = imageHelper.place ;
    canvas.set_position = imageHelper.set_position ;
    canvas.clear_color  = imageHelper.clear_color ;

    if ( color !== undefined ) {
      for ( let kclr = 0 ; kclr < color.length ; kclr++ ) {
        var set_color = function() { return color[kclr] ; } ;
        $Z.helper.effect.image.foreach( canvas, set_color, kclr ) ;      
      }
    }

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

    var newCanvas = imageHelper.upsample(imageHelper.get_data(canvas)).canvas ;

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

    copy.originalCanvas = image.originalCanvas ;

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

    for (let kPel = 0 ; kPel < Npel ; kPel++) {
      let kx = kPel % sourceImageData.width ;
      let ky = Math.floor(kPel / sourceImageData.width) ;
      var bx = ratio * kx ;
      var by = ratio * ky ;        
      let kOff = kPel * 4 ;
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

  new_data: function image_helper_new_data(width, height) {
    var canvas    = imageHelper.create(width, height) ;
    // console.log('new image data', 'width', width, 'height', height) ;
    var imageData = canvas.context().createImageData(parseInt(width), parseInt(height));  
    return imageData ;
  },

  flip_image: function image_helper_flip_image (canvas) {

    var context   = canvas.context() ;
    var imageData = context.getImageData (0, 0, canvas.width, canvas.height) ;
    var imageFlip = imageHelper.new_data(canvas.width, canvas.height) ; // new ImageData (canvas.width, canvas.height) ;
    var Npel      = imageData.data.length / 4 ;

    for ( let kPel = 0 ; kPel < Npel ; kPel++ ) {
        
      let kFlip      = imageHelper.flip_index (kPel, canvas.width, canvas.height) ;
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
    let kFlip = i * width + jFlip ;

    return kFlip ;

  },  

  get_original: function image_helper_get_original(canvas) {

    // console.log('imageHelper.get_original', 'canvas', canvas) ;
    return canvas.originalCanvas ;

  },

  to_index: function image_helper_to_index(img0, index) {

    var img = imageHelper.new_data(img0.width, img0.height) ; // var img  = new ImageData(img0.width, img0.height) ; // duplicate original image to avoid mutating it

    var Npel = img.data.length / 4 ;

    for (let k = 0 ; k < Npel ; k++) {

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

} ;

export { imageHelper as default }