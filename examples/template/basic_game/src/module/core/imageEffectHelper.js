var imageEffectHelper = {

	  foreach: function image_effect_helper_foreach ( canvas, func, channel ) {

	  	if ( channel === undefined ) {
	  		channel = -1 ; // r, g, b channels by default
	  	}

			var context = canvas.context() ;
			var image   = context.getImageData (0, 0, canvas.width, canvas.height) ;
			var data    = image.data ;
			var Npel    = data.length / 4 ;
			var offset  = 0 ;
			var opacity = new Array(Npel) ;

			for (var kpel = 0 ; kpel < Npel ; kpel++) {

				if ( channel < 3 && data[offset + 3] === 0) {
					continue ; // skip transparent pixels if opacity channel is not specified
				}

				if ( channel >= 0 && channel < 4 ) {
			  	data[offset + channel] = func(data[offset + channel]) ;					
				} else if ( channel === -1 ) {

			  	data[offset + 0] = func(data[offset + 0]) ;					
			  	data[offset + 1] = func(data[offset + 1]) ;					
			  	data[offset + 2] = func(data[offset + 2]) ;					

				}

			  offset += 4 ;

			}

			context.putImageData(image, 0, 0) ;

			// console.log('foreach: ', 'data', data, 'image', image, 'context', context) ;

			// imageHelper.view(canvas) ;

	  },

	  opacity: function image_effect_helper_opacity ( canvas, opacity ) {
	  	imageEffectHelper.foreach( 
	  		canvas, 
	  		function() {
	  		  return opacity ;
	  	  },
	  	  3 // opacity channel
	  	)
	  },

		binary_opacity_filter: function image_effect_helper_binary_opacity_filter (canvas, threshold)	 {

			var context = canvas.context() ;
			var image   = context.getImageData (0, 0, canvas.width, canvas.height) ;
			var data    = image.data ;
			var Npel    = data.length / 4 ;
			var offset  = 0 ;
			var opacity = new Array(Npel) ;

			for (var kpel = 0 ; kpel < Npel ; kpel++) {
			  if (data[offset + 3] > 0) {
			    opacity[Npel] = data[offset + 3] ;
			  }
			  offset += 4 ;
			}

			// console.log('opacity', opacity) ;
			if(threshold === undefined) {
				threshold = 68 ;
			}
			offset = 0 ;
			for (var kpel = 0 ; kpel < Npel ; kpel++) {
			  if (data[offset + 3] < threshold) {
			    data[offset + 3] = 0 ;
			  } else {
			    data[offset + 3] = 255 ;
			  }
			  offset += 4 ;
			}    

			context.putImageData(image, 0, 0) ;

		},

		color_filter: function image_effect_helper_color_filter (canvas, color, strength) {

			if ( strength === undefined ) {
				strength = 1 ;
			}

			// strength goes from 0 to 1

			if( strength > 1 ) {
				strength = 1 ;
			} 

			if ( strength < 0 ) {
				strength = 0 ;
			}

			function blend(x, y, c1) {
				var mixedVal = (1 - c1) * x + c1 * y ;
				// console.log('blend: ', 'x, y, c1, mixedVal', x, y, c1, mixedVal) ;
				return Math.round(mixedVal) ;
			}

			var filteredImage = imageHelper.copy(canvas) ;

			for (kclr = 0 ; kclr < color.length ; kclr++) {


				if(color[kclr] !== undefined) {
					// console.log('color[kclr]', color[kclr], 'strength', strength) ;
					imageEffectHelper.foreach( filteredImage, function(x) { return blend(x, color[kclr], strength) ; }, kclr ) ;
				}

			}

			return filteredImage ;

			// to test:  imageEffectHelper.color_filter ( document.viz.item[0].image, [255, 255, 0], -1 )

		},

		fade: function effect_image_fade(fadeConfig, item) {			

			if(item === undefined) {
				item = this ;
			}

			if(fadeConfig === undefined) {
				fadeConfig = {} ;
			}

			if(fadeConfig.opacity === undefined) {
			// console.log('fadeConfig', fadeConfig, 'item.opacity', item.opacity)

				var thresh = 0.5 ;
				if(item.opacity < thresh) {
					fadeConfig.opacity = 1 ;
				} else {
					fadeConfig.opacity = 0 ;
				}
			}

			var newTransition = imageEffectHelper.fade_transition(fadeConfig) ;

			// console.log('fade', 'newTransition', newTransition, 'item', item, 'fadeConfig', fadeConfig) ;

			var replacementSwitch = fadeConfig.replacementSwitch || true ;

			item.add_transition(newTransition, replacementSwitch) ;

		}, // end fade

		fade_transition: function effect_helper_image_fade_transition(fadeConfig) {

			var defaultFadeDuration = 1000 ;
			if(fadeConfig.duration === undefined) {
				fadeConfig.duration = defaultFadeDuration ;
			}

			var newTransition = $Z.transition.linear_transition_func('opacity', fadeConfig.duration)(fadeConfig.opacity) ;

			if( fadeConfig.end !== undefined) {
				newTransition.end = fadeConfig.end ;
			}

			if( fadeConfig.child !== undefined) {
				newTransition.child = fadeConfig.child ;
			}

			if ( fadeConfig.pause !== undefined) {
				newTransition.pause = fadeConfig.pause ;
			}

			return newTransition ;

		},

		explode: function effect_helper_image_explode(blocksize, duration, removeSwitch, fadeSwitch, item) {

			if(item === undefined) {
				item = this ;
			}

			if(blocksize === undefined) {
				blocksize = 24 ;
			}

			if(duration === undefined) {
				duration = 1500 ;
			}

			if(removeSwitch === undefined) {
				removeSwitch = true ;
			}

			if(fadeSwitch === undefined) {
				fadeSwitch = true ;
			}

			if(removeSwitch) {
				itemHelper.remove(item) ;
			}

			// console.log('explode start') ;

			var Nrow   = Math.floor(item.image.height / blocksize) ;
			var Ncol   = Math.floor(item.image.width / blocksize) ;
			var Nblock = Nrow * Ncol ;
			var block  = new Array(Nblock) ;

			var sx, sy ;
			var sw = blocksize ;
			var sh = blocksize ;
			var dx = 0 ;
			var dy = 0 ;
			var dw = blocksize ;
			var dh = blocksize ;

			var scale = 300 ;

			for(var krow = 0 ; krow < Nrow ; krow++) {
				for(var kcol = 0 ; kcol < Ncol ; kcol++) {
					var canvas  = imageHelper.create(blocksize, blocksize) ;
					var context = canvas.context() ;
					sx = Math.floor(kcol * blocksize / document.ratio) ;
					sy = Math.floor(krow * blocksize / document.ratio) ;
					context.drawImage(item.image, sx, sy, sw, sh, dx, dy, dw, dh) ;
					var k = krow * Ncol + kcol ;
					var xTrans = $Z.transition.rounded_linear_transition_func('x', duration)((Math.random() - 0.5) * 2 * scale + item.x + sx) ;
					block[k] = { 
						viz: item.viz,
						x: item.x + sx,
						y: item.y + sy,
						image: canvas,
						opacity: 1,
						render: drawHelper.image,
						inert: true,
						transition: [
							xTrans,
							$Z.transition.rounded_linear_transition_func('y', duration)((Math.random() - 0.5) * 2 * scale + item.y + sy),
						],
					} ;
					xTrans.end = transitionHelper.remove_end(block[k]) ;
					if(fadeSwitch) {
						imageEffectHelper.fade.call(block[k], { duration: duration }) ;		
					}					
				}
			}

			itemHelper.add(viz, block) ;

		},	
} ;