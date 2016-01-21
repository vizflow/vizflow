var effect = {

	flash: function effect_flash (frameDuration, Nstep) {

		// assume that "this" corresponds to the element item object
		// console.log('effect flash', 'frameDuration', frameDuration, 'Nstep', Nstep) ;
		var create_transition = step_transition_func('render', frameDuration) ;
		// console.log('effect flash 5') ;
		var blank = function () {} ;
		var valueList = [blank, draw.image] ;
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

		binary_filter: function effect_image_binary_filter (canvas, threshold)	 {

			var context = canvas.getContext('2d') ;
			var image   = context.getImageData (0, 0, canvas.width, canvas.height) ;
			var data    = image.data ;
			var Npel    = data.length / 4 ;
			var offset  = 0 ;
			var opacity = [] ;

			for (var kpel = 0 ; kpel < Npel ; kpel++) {
			  if (data[offset + 3] > 0) {
			    opacity.push(data[offset + 3]) ;
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

	}, 


} ;