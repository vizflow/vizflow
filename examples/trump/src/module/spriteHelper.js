var spriteHelper = {

	foreach: function sprite_helper_foreach (spriteSet, func) {

		var key    = Object.keys(spriteSet) ;
		var newSet = {} ;

		for(var k = 0 ; k < key.length ; k++ ) {

	    if ( spriteSet[ key[k] ].constructor === Array ) {
	 
	      newSet[ key[k] ] = spriteSet[ key[k] ].map(func) ;

	    } else {
	      
	      newSet [ key[k] ] = spriteSet[ key[k] ] ;
	    
	    }

		}	

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

		var canvas  = imageHelper.create(totalWidth, totalHeight) ;
		var context = canvas.context() ;

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

		imageHelper.view(canvas) ;

	},

	is_blank: function sprite_helper_is_blank(data) {
    // viz.player.item,
    // viz.ui.button.walkLeft,
    // viz.ui.button.walkRight,
    // viz.ui.button.attack,
    // viz.ui.button.jump,
    // viz.enemy.item.responseSet.hit.healthbar.item,
    // viz.player.item.responseSet.hit.healthbar.item,

		var isZero = true ;

		for(k = 0 ; k < data.data.length ; k++) {
			if(data.data[k] !== 0) {
				isZero = false ;
				break ;
			}
		}

		return isZero ;

	},

	get: function sprite_helper_get (canvas, rowName, tileWidth, rowHeight) {

		var maxHeight = Math.max.apply(null, rowHeight) ;
		var Nrow = rowName.length ;
		var spriteSet = {} ;
		var sy        = 0 ;
		for(var krow = 0 ; krow < Nrow ; krow++) { // one sprite per row
			var row     = [] ; // initialize array to store the sprite
			var Ntile   = Math.floor(canvas.width / tileWidth[krow]) ;
			// console.log('spriteHelper get:', 'rowName[krow]', rowName[krow], 'krow', krow, 'Ntile', Ntile) ;
			for(var kcol = 0 ; kcol < Ntile ; kcol++) {
				var tile    = imageHelper.create(tileWidth[krow], maxHeight) ;
				var tileCtx = tile.context() ;
				var sx      = kcol * tile.width ;
				tileCtx.drawImage( canvas, sx, sy, tile.width, rowHeight[krow], 0, maxHeight - rowHeight[krow], tile.width, rowHeight[krow] ) ;
				// console.log('spiteHelper get:', 'sx, sy, tile.width, tile.height, 0, maxHeight - rowHeight[krow], tile.width, tile.height', sx, sy, tile.width, tile.height, 0, maxHeight - rowHeight[krow], tile.width, tile.height) ;
				var tileData = get_image_data(tile) ;
				var isBlank  = spriteHelper.is_blank(tileData) ;
				// console.log('spriteHelper get:', 'rowName[krow]', rowName[krow], 'kcol', kcol, 'tileData', tileData, 'isBlank', isBlank) ;
				if(isBlank) {
					break ;
				}
				row.push(tile) ;
			}
			// console.log('spriteHelper get:', 'krow', krow, 'row', row, 'tile.width', tile.width, 'tile.height', tile.height, 'maxHeight', maxHeight, 'rowHeight', rowHeight) ;
			spriteSet[rowName[krow]] = row ;
			sy += rowHeight[krow] ;
		}

		return spriteSet ;

	},

	get_sprite: function sprite_helper_get_sprite (spriteConfig) { // old version

	  var tile = [] ;
	  
	  for (var t = 0 ; t < spriteConfig.count ; t++) {

	  	console.log('spriteConfig.width', spriteConfig.width, 'spriteConfig.height', spriteConfig.height) ;

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

	    var tileCanvas  = imageHelper.create(spriteConfig.width + spriteConfig.padXl + spriteConfig.padXr, spriteConfig.height) ;
	    var tileContext = tileCanvas.context() ;

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

	horizontal_flip: function sprite_helper_horizontal_flip (spriteSet) {

		var key    = Object.keys(spriteSet) ;
		var newSet = {} ;

		for(var k = 0 ; k < key.length ; k++ ) {

	    // console.log('key[k]', key[k], 'spriteSet', spriteSet)

	    if ( spriteSet[ key[k] ].constructor === Array ) {

	      newSet[ key[k] ] = spriteHelper.flip_sprite( spriteSet[ key[k] ] ) ;

	    } else {
	      newSet [ key[k] ] = spriteSet[ key[k] ] ;
	    }

		}	

	  return newSet ;

	},

	flip_sprite: function sprite_helper_flip_sprite (sprite) {

		var spriteFlip = new Array(sprite.length) ;

		for ( var kFrame = 0 ; kFrame < sprite.length ; kFrame++ ) {
			spriteFlip[kFrame] = imageHelper.flip_image ( sprite[kFrame] ) ;
	    if(sprite[kFrame].sourceCollisionImage !== undefined) {
	      spriteFlip[kFrame].sourceCollisionImage = imageHelper.flip_image( sprite[kFrame].sourceCollisionImage ) ;
	    }
	    if(sprite[kFrame].targetCollisionImage !== undefined) {
	      spriteFlip[kFrame].targetCollisionImage = imageHelper.flip_image( sprite[kFrame].targetCollisionImage ) ;
	    } else { // default target collision image is the same as the original
	      spriteFlip[kFrame].targetCollisionImage = spriteFlip[kFrame] ;
	    }
		}

	  return spriteFlip ;

	},	

} ;