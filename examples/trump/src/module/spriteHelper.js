var spriteHelper = {

	foreach: function spriteset_foreach (spriteSet, func) {

		var key    = Object.keys(spriteSet) ;
		var newSet = {} ;

		for(var k = 0 ; k < key.length ; k++ ) {

	    if ( spriteSet[ key[k] ].constructor === Array ) {
	 
	      newSet[ key[k] ] = spriteSet[ key[k] ].map(func) ;

	    } else {
	      
	      newSet [ key[k] ] = spriteSet[ key[k] ] ;
	    
	    }

		}	

	  newSet.height = spriteSet.height ;

	  return newSet ;

	},

	make_sheet: function sprite_helper_make_sheet (spriteSet) {

		function get_width(canvas) {
			return canvas.width ;
		}

		function get_height(canvas) {
			return canvas.height ;
		}

		widthSet = spriteHelper.foreach(spriteSet, get_width) ;
		heightSet = spriteHelper.foreach(spriteSet, get_height) ;

		var spriteCount = 0 ; // initialize
		var totalWidth = 0 ; // initialize
		var height = [] ; // initialize
		for(var key in spriteSet) {
			if( spriteSet[ key ].constructor === Array ) {
				spriteCount++ ; 
				var widthK  = widthSet[key].reduce( function(a, b) { return a + b ; } );
				var heightK = heightSet[key][0] ;
				height.push(heightK) ;
				if(widthK > totalWidth) {
					totalWidth = widthK ;
				}
			}
		}

		// console.log('widthSet', widthSet, 'totalWidth', totalWidth) ;

		var totalHeight = height.reduce( function(a, b) { return a + b ; } );

		// console.log('totalHeight', totalHeight)

		var canvas  = create_canvas(totalWidth, totalHeight) ;
		var context = canvas.getContext('2d') ;

		var offsetY = 0 ;

		for(var key in spriteSet) {
			var val = spriteSet[key] ;
			if(val.constructor === Array) {

				var offsetX = 0 ;

				for(var kcol = 0 ; kcol < val.length ; kcol++) {
					context.drawImage(val[kcol], offsetX, offsetY) ;
					offsetX += val[kcol].width ;
				}

			}
			offsetY += height.shift() ;
		}

		var dataURL = canvas.toDataURL("image/png") ;
		console.log('dataUrl', dataURL) ;
		var win = window.open() ;
		win.document.write('<img src="' + dataURL + '"/>') ;	  

	},

	get_sprite: function sprite_helper_get_sprite (spriteConfig) {

	  var tile = [] ;
	  
	  for (var t = 0 ; t < spriteConfig.count ; t++) {

	  	var image = spriteConfig.context.getImageData (
	      Math.floor(t * spriteConfig.width + spriteConfig.offsetX + spriteConfig.padX * t),
	      Math.floor(spriteConfig.rowIndex * spriteConfig.height + spriteConfig.offsetY), 
	      spriteConfig.width, 
	      spriteConfig.height
	    )	 ;

	    // console.log ('dd_sprite get_sprite:', 'image', image.data, 'spriteConfig.bgColor', spriteConfig.bgColor) ;

	    if(spriteConfig.bgColor !== undefined) { // clear the background color
	    	bg_clear(spriteConfig.bgColor, image) ;
	    }

	    if (spriteConfig.padXl === undefined) {
	      spriteConfig.padXl = 0 ;
	    }

	    if (spriteConfig.padXr === undefined) {
	      spriteConfig.padXr = 0 ;
	    }

	    var tileCanvas  = create_canvas(spriteConfig.width + spriteConfig.padXl + spriteConfig.padXr, spriteConfig.height) ;
	    var tileContext = tileCanvas.getContext('2d') ;

	    // var data = image.data ;

	    // if(data.length === 64) {

	      // console.log('data 1', data) ;

	      // for(var kd = 0 ; kd < data.length  / 4 ; kd++) {
	      //   var r = data[kd * 4 + 0] ;
	      //   var g = data[kd * 4 + 1] ;
	      //   var b = data[kd * 4 + 2] ;
	      //   var a = data[kd * 4 + 3] ;
	      //   console.log('get_sprite pre k', kd, 'r', r, 'g', g, 'b', b, 'a', a) ;
	      // }    

	    // }

	    // console.log('spriteConfig.padXl', spriteConfig.padXl, 'tileCanvas', tileCanvas) ;

	    tileContext.putImageData(image, spriteConfig.padXl, 0);

	    // var data2 = tileContext.getImageData(0, 0, tileCanvas.width, tileCanvas.height).data ;

	    // if(data2.length === 64) {

	    //   console.log('data 2', data2) ;

	    //   // for(var kd = 0 ; kd < data.length  / 4 ; kd++) {
	    //   //   var r = data[kd * 4 + 0] ;
	    //   //   var g = data[kd * 4 + 1] ;
	    //   //   var b = data[kd * 4 + 2] ;
	    //   //   var a = data[kd * 4 + 3] ;
	    //   //   console.log('get_sprite post k', kd, 'r', r, 'g', g, 'b', b, 'a', a) ;
	    //   // }    

	    // }

	    // var img = tileContext.createImageData (spriteConfig.tileWidth, spriteConfig.tileHeight) ;
	    // console.log (img.data) ;
	    //bg_clear([1, 2, 3], tileContext) ;
	    tile[t] = tileCanvas ;

	  }

	  return tile ;

	},

} ;