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
	}

} ;