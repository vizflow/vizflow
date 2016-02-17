var imageEffectHelper = {

		binary_opacity_filter: function effect_image_binary_opacity_filter (canvas, threshold)	 {

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

		fade: function effect_image_fade(fadeConfig, item) {			

			if(item === undefined) {
				item = this ;
			}

			if(fadeConfig === undefined) {
				fadeConfig = {} ;
			}

			if(fadeConfig.opacity === undefined) {
				var thresh = 0.5 ;
				if(item.opacity < thresh) {
					fadeConfig.opacity = 1 ;
				} else {
					fadeConfig.opacity = 0 ;
				}
			}

			// console.log('fadeConfig', fadeConfig, 'item.opacity', item.opacity)

			var newTransition = imageEffectHelper.fade_transition(fadeConfig) ;

			newTransition.pause = fadeConfig.pause ;

			// console.log('fade', 'newTransition', newTransition) ;

			transitionHelper.add.call(item, newTransition) ;

		}, // end fade

		fade_transition: function effect_helper_image_fade_transition(fadeConfig) {

			if(fadeConfig.replacementSwitch === undefined) {
				fadeConfig.replacementSwitch = true ;
			}

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

			return newTransition ;

		},

		explode: function effect_helper_image_explode(blocksize, duration, removeSwitch, fadeSwitch, item) {

			if(item === undefined) {
				item = this ;
			}

			if(blocksize === undefined) {
				blocksize = 20 ;
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

			var scale = 200 ;
			offset = 50 ;

			for(var krow = 0 ; krow < Nrow ; krow++) {
				for(var kcol = 0 ; kcol < Ncol ; kcol++) {
					var canvas  = imageHelper.create(blocksize, blocksize) ;
					var context = canvas.context() ;
					sx = Math.floor(kcol * blocksize) ;
					sy = Math.floor(krow * blocksize) ;
					context.drawImage(item.image, sx, sy, sw, sh, dx, dy, dw, dh) ;
					var k = krow * Ncol + kcol ;
					var xTrans = $Z.transition.rounded_linear_transition_func('x', duration)(offset + (Math.random() - 0.5) * 2 * scale + item.x + kcol * blocksize) ;
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
							$Z.transition.rounded_linear_transition_func('y', duration)(offset + (Math.random() - 0.5) * 2 * scale + item.y + krow * blocksize),
						],
					} ;
					xTrans.end = transitionHelper.remove_end(block[k]) ;
					if(fadeSwitch) {
						imageEffectHelper.fade.call(block[k], { duration: duration }) ;		
					}					
				}
			}

			viz.item = viz.item.concat(block) ;
			viz.add_item(viz.item) ;

		},	
} ;