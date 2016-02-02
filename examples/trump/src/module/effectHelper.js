var effectHelper = { // effect module for creating effects i.e. compositions of transitions

	flash: function effect_flash (frameDuration, Nstep) {

		// assume that "this" corresponds to the element item object
		// console.log('effect flash', 'frameDuration', frameDuration, 'Nstep', Nstep) ;
		var create_transition = step_transition_func('render', frameDuration) ;
		// console.log('effect flash 5') ;
		var blank = function () {} ;
		var valueList = [blank, drawHelper.image] ;
		var loopConfig = {
			Nstep: Nstep,
			position: 0,
			frameDur: frameDuration,
		} ;
		// console.log('effect flash 12') ;
		var loop = animate_loop (loopConfig, valueList, create_transition) ;
		return loop ;
		// console.log('effect flash', 'loop', loop) ;

	},

	image: {

		binary_opacity_filter: function effect_image_binary_opacity_filter (canvas, threshold)	 {

			var context = canvas.getContext('2d') ;
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

		fade: function effect_image_fade(direction, fadeDuration, targetOpacity, replacementSwitch, item) {

			if(item === undefined) {
				item = this ;
			}

			if(replacementSwitch === undefined) {
				replacementSwitch = true ;
			}

			if(direction === undefined) {
				var thresh = 0.5 ;
				if(item.opacity < thresh) {
					direction = 'in' ;
				} else {
					direction = 'out' ;
				}
			}

			if(targetOpacity === undefined) {
				if(direction === 'in') {
					targetOpacity = 1 ; 
				} else {
					targetOpacity = 0 ;
				}
			}

			var defaultFadeDuration = 10 * viz.dur ;
			if(fadeDuration === undefined) {
				fadeDuration = defaultFadeDuration ;
			}

			var newTransition = $Z.transition.linear_transition_func('opacity', fadeDuration)(targetOpacity) ;

			// console.log('fade', 'newTransition', newTransition) ;

			item.add_transition(newTransition) ;

		}, // end fade

	}, // end image


} ; // end effectHelper