var effectHelper = { // effect module for creating effects i.e. compositions of transitions

	flash: function effect_flash (Nflash, flashDuration, item) {

		if(item === undefined) { // assume that "this" corresponds to the element item object
			item = this ;
		}

		if(Nflash === undefined) {
			Nflash = 5 ;
		}

		if(flashDuration === undefined) {
			flashDuration = 100 ;
		}

		// console.log('effect flash', 'frameDuration', frameDuration, 'Nstep', Nstep) ;
		var create_transition = step_transition_func('render', flashDuration) ;
		// console.log('effect flash 5') ;
		var blank = function () {} ;
		var valueList = [blank, drawHelper.image] ;

		var flash     = new Array(2 * Nflash) ;
		
		for(var kflash = 0 ; kflash < 2 * Nflash ; kflash++) {
			flash[kflash] = create_transition(valueList[kflash % valueList.length]) ;
		}

		flash = transition_sequence(flash) ;

		// var loopConfig = {
		// 	Nstep: Nstep,
		// 	position: 0,
		// 	frameDur: frameDuration,
		// } ;
		// // console.log('effect flash 12') ;

		// var loop = animate_loop (loopConfig, valueList, create_transition) ;

		item.add_transition(flash) ;

		// console.log('effect flash', 'loop', loop) ;

		return flash ;

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

		var xShakeMove = [1, -1, -1,  1] ; 
		var yShakeMove = [1, -1,  1, -1] ; 

		var damping = 1.5 * document.ratio ;
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

	zoom_inout: function effect_zoom_inout(zoomConfig, viz) {

		if(viz === undefined) {
			viz = this ;
		}

    var viewDelta = -2 * Math.floor(viz.displayCanvas.width * 0.04) ;
		if(zoomConfig.width === undefined) {
	    var newWidth  = viz.displayCanvas.width  + viewDelta ;
		} else {
	    newWidth  = zoomConfig.width * document.ratio ;
		}

		if(zoomConfig.height === undefined) {
	    var newHeight = viz.displayCanvas.height + viewDelta ;			
		} else {
	    newHeight = zoomConfig.height * document.ratio ;						
		}

		if(zoomConfig.x === undefined) {
	    var xNew = Math.floor(viz.viewportX - 0.25 * viewDelta) ;
		} else {			
	    var xNew = zoomConfig.x * document.ratio ;
		}

		if(zoomConfig.y === undefined) {
	    var yNew = Math.floor(viz.viewportY - 0.25 * viewDelta) ;
		} else {			
	    var yNew = zoomConfig.y * document.ratio ;
		}

		if(zoomConfig.duration === undefined) {
    	var zoomDur = viz.fadeDuration ;						
		} else {
			var zoomDur = zoomConfig.duration ;
		}
  
  	var zoomDur = 0.25 * zoomDur ; // for now

		if(zoomConfig.shakeSwitch === undefined) {
			var shakeSwitch = false ;
		} else {
			var shakeSwitch = zoomConfig.shakeSwitch ;
		}

		xNew = Math.max(0, Math.min(viz.width  * document.ratio, xNew)) ;
		yNew = Math.max(0, Math.min(viz.height * document.ratio, yNew)) ;
		
		// console.log('zoom in out:', 'newWidth', newWidth, 'newHeight', newHeight, 'xNew', xNew, 'yNew', yNew) ;

    var widthIn   = $Z.transition.rounded_linear_transition_func('viewportWidth', zoomDur)(newWidth) ;
    var heightIn  = $Z.transition.rounded_linear_transition_func('viewportHeight', zoomDur)(newHeight) ;
    var xIn       = $Z.transition.rounded_linear_transition_func('viewportX', zoomDur)(xNew) ;
    var yIn       = $Z.transition.rounded_linear_transition_func('viewportY', zoomDur)(yNew) ;
    var widthOut  = $Z.transition.rounded_linear_transition_func('viewportWidth', zoomDur)(viz.displayCanvas.width) ;
    var heightOut = $Z.transition.rounded_linear_transition_func('viewportHeight', zoomDur)(viz.displayCanvas.height) ;
    var xOut      = $Z.transition.rounded_linear_transition_func('viewportX', zoomDur)(0) ;
    var yOut      = $Z.transition.rounded_linear_transition_func('viewportY', zoomDur)(0) ;

    widthIn.child  = widthOut ;
    heightIn.child = heightOut ;
    xIn.child      = xOut ;
    yIn.child      = yOut ;

    widthIn.pause  = 0.45 * zoomDur ;
    heightIn.pause = 0.45 * zoomDur ;
    xIn.pause      = 0.45 * zoomDur ;
    yIn.pause      = 0.45 * zoomDur ;

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

	zoom: function effect_helper_zoom(zoomConfig, viz) {

		if(viz === undefined) {
			viz = this ;
		}

		viz.add_transition(effectHelper.zoom_transition(zoomConfig)) ;
	},

	zoom_transition: function effect_helper_zoom_transition(zoomConfig) {

		if(zoomConfig.duration === undefined) {
			zoomConfig.duration = 1000 ;
		}

    var zoomDur = zoomConfig.duration ;
    var width   = $Z.transition.rounded_linear_transition_func('viewportWidth', zoomDur)(zoomConfig.width) ;
    var height  = $Z.transition.rounded_linear_transition_func('viewportHeight', zoomDur)(zoomConfig.height) ;
    var x       = $Z.transition.rounded_linear_transition_func('viewportX', zoomDur)(zoomConfig.x) ;
    var y       = $Z.transition.rounded_linear_transition_func('viewportY', zoomDur)(zoomConfig.y) ;

    return [width, height, x, y] ;

	}

} ; // end effectHelper