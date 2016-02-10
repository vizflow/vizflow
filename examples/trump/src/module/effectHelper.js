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

	shake: function effect_shake(item, xKey, yKey) {

		if(item === undefined) {
			item = this ;
		}

		if(xKey === undefined) {
			xKey = 'x' ;
		}

		if(yKey === undefined) {
			yKey = 'y' ;
		}

		var xShakeMove = [1, -1, -1, 1] ; 
		var yShakeMove = [1, -1, 1, -1] ; 

		var damping = 5 ;
		var dampingFactor = 1 ;
		var Nstep = 9 ;

		xTransition = new Array(Nstep) ;
		yTransition = new Array(Nstep) ;

		for (kstep = 0 ; kstep < Nstep - 1 ; kstep++) {
			xTransition[kstep] = item.transitionSet[xKey](Math.round(Math.random() * xShakeMove[(kstep + $Z.iter) % xShakeMove.length] * damping)) ;
			yTransition[kstep] = item.transitionSet[yKey](Math.round(Math.random() * yShakeMove[(kstep + $Z.iter * 3) % xShakeMove.length] * damping)) ;
			damping *= dampingFactor ;
		}

		xTransition[kstep] = item.transitionSet[xKey](0) ;
		yTransition[kstep] = item.transitionSet[yKey](0) ;

		xTransition = transition_sequence(xTransition)[0] ;
		yTransition = transition_sequence(yTransition)[0] ;

		// console.log('xTransition', xTransition, 'yTransition', yTransition) ;

		var replacementSwitch = true ;
		item.add_transition([xTransition, yTransition]) ;

	},

	zoom_inout: function effect_zoom_inout(viz, zoomDur, shakeSwitch) {
    var viewDelta = -2 * Math.floor(viz.displayCanvas.width * 0.04) ;
    var newWidth  = viz.displayCanvas.width  + viewDelta ;
    var newHeight = viz.displayCanvas.height + viewDelta ;

    var xNew = Math.floor(viz.viewportX - 0.25 * viewDelta) ;
    var yNew = Math.floor(viz.viewportY - 0.25 * viewDelta) ;

    var zoomDur   = 0.25 * zoomDur ;
    var widthIn   = $Z.transition.rounded_linear_transition_func('viewportWidth', zoomDur)(newWidth) ;
    var heightIn  = $Z.transition.rounded_linear_transition_func('viewportHeight', zoomDur)(newHeight) ;
    var xIn       = $Z.transition.rounded_linear_transition_func('viewportX', zoomDur)(xNew) ;
    var yIn       = $Z.transition.rounded_linear_transition_func('viewportY', zoomDur)(yNew) ;
    var widthOut  = $Z.transition.rounded_linear_transition_func('viewportWidth', zoomDur)(viz.viewportWidth) ;
    var heightOut = $Z.transition.rounded_linear_transition_func('viewportHeight', zoomDur)(viz.viewportHeight) ;
    var xOut      = $Z.transition.rounded_linear_transition_func('viewportX', zoomDur)(viz.viewportX) ;
    var yOut      = $Z.transition.rounded_linear_transition_func('viewportY', zoomDur)(viz.viewportY) ;

    widthIn.child  = widthOut ;
    heightIn.child = heightOut ;
    xIn.child = xOut ;
    yIn.child = yOut ;

    widthIn.pause = 0.45 * zoomDur ;
    heightIn.pause = 0.45 * zoomDur ;
    xIn.pause = 0.45 * zoomDur ;
    yIn.pause = 0.45 * zoomDur ;

    if(shakeSwitch) {
	    widthIn.end = function() {
	      viz.shake() ;
	    }    
    }

    viz.add_transition(widthIn) ;
    viz.add_transition(heightIn) ;
    viz.add_transition(xIn) ;
    viz.add_transition(yIn) ;

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

			if(fadeConfig.opacity === undefined) {
				var thresh = 0.5 ;
				if(item.opacity < thresh) {
					fadeConfig.opacity = 0 ;
				} else {
					fadeConfig.opacity = 1 ;
				}
			}

			var newTransition = effectHelper.image.fade_transition(fadeConfig) ;

			// console.log('fade', 'newTransition', newTransition) ;

			item.add_transition(newTransition) ;

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

		explode: function effect_helper_image_explode(blocksize, duration, inertSwitch, removeSwitch, item) {

			if(blocksize === undefined) {
				blocksize = 20 ;
			}

			if(duration === undefined) {
				duration = 1000 ;
			}

			if(item === undefined) {
				item = this ;
			}

			if(inertSwitch === undefined) {
				inertSwitch = true ;
			}

			if(removeSwitch === undefined) {
				removeSwitch = true ;
			}

			if(inertSwitch) {
				item.inert = true ;
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
					var canvas  = create_canvas(blocksize, blocksize) ;
					var context = canvas.getContext('2d') ;
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
						render: drawHelper.image,
						inert: true,
						transition: [
							xTrans,
							$Z.transition.rounded_linear_transition_func('y', duration)(offset + (Math.random() - 0.5) * 2 * scale + item.y + krow * blocksize),
						],
					} ;
					xTrans.end = transitionHelper.remove_end(block[k]) ;
				}
			}

			viz.item = viz.item.concat(block) ;
			$Z.item(viz.item) ;

		},

	}, // end image


} ; // end effectHelper