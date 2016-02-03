var effectHelper = { // effect module for creating effects i.e. compositions of transitions

	flash: function effect_flash (frameDuration, Nstep, inertSwitch, item) {

		if(item === undefined) { // assume that "this" corresponds to the element item object
			item = this ;
		}

		if(inertSwitch === true || inertSwitch === 'inert' || inertSwitch === 'on') {
			var inertSwitch = true ;
		} else {
			inertSwitch = false ;
		}

		if(inertSwitch) {
			item.inert = true ;
		}

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

		if(inertSwitch) {
			var callback = function() {
				item.inert = false ;
			} ;
		} else {
			var callback = undefined ;
		}

		var loop = animate_loop (loopConfig, valueList, create_transition, callback) ;

		item.add_transition(loop.animation[0]) ;

		// console.log('effect flash', 'loop', loop) ;

		return loop ;

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

		fade: function effect_image_fade(fadeConfig, item) {			

			if(item === undefined) {
				item = this ;
			}

			if(fadeConfig.replacementSwitch === undefined) {
				fadeConfig.replacementSwitch = true ;
			}

			if(fadeConfig.direction === undefined) {
				var thresh = 0.5 ;
				if(item.opacity < thresh) {
					fadeConfig.direction = 'in' ;
				} else {
					fadeConfig.direction = 'out' ;
				}
			}

			if(fadeConfig.targetOpacity === undefined) {
				if(fadeConfig.direction === 'in') {
					fadeConfig.targetOpacity = 1 ; 
				} else {
					fadeConfig.targetOpacity = 0 ;
				}
			}

			var defaultFadeDuration = 1000 ;
			if(fadeConfig.fadeDuration === undefined) {
				fadeConfig.fadeDuration = defaultFadeDuration ;
			}

			var newTransition = $Z.transition.linear_transition_func('opacity', fadeConfig.fadeDuration)(fadeConfig.targetOpacity) ;

			if( fadeConfig.end !== undefined) {
				newTransition.end = fadeConfig.end ;
			}

			// console.log('fade', 'newTransition', newTransition) ;

			item.add_transition(newTransition) ;

		}, // end fade

		fade_switch: function effect_image_fade_switch(fadeConfig, item) {

			if(item === undefined) {
				item = this ;
			}

			var defaultFadeDuration = 1000 ;
			if(fadeConfig.fadeDuration === undefined) {
				fadeConfig.fadeDuration = defaultFadeDuration ;
			}

			var fade1  = $Z.transition.linear_transition_func('opacity', fadeConfig.fadeDuration)(0) ;
			var fade2  = $Z.transition.linear_transition_func('opacity', fadeConfig.fadeDuration)(1) ;

			// fade1.end = function() {
			// 	console.log('fade1 end start') ;
			// 	console.log('item config', item, fadeConfig) ;
			// 	item.image = fadeConfig.image ;
			// }

			// if( fadeConfig.end !== undefined) {
			// 	fade2.end = fadeConfig.end ;
			// }

			// fade1.child = fade2 ;

			console.log('fade', 'fade1', fade1, 'item', item, 'item.transition', item.transition) ;

			var replacementSwitch = true ;
			item.add_transition(fade1, replacementSwitch) ;

		},

	}, // end image


} ; // end effectHelper