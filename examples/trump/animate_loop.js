function animate_loop (loopConfig, sprite, create_transition, callback, restFrame) {
	var loopOutput = {} ; // initialize output variable
	loopOutput.frameDur = loopConfig.frameDur;
	loopOutput.totalDur = loopConfig.totalDur ;
	loopOutput.position = loopConfig.position ;
	var animation ;
	if (restFrame === undefined) {
    animation = sprite ; 
  } else {
    animation = sprite.concat (restFrame) ; 
  }
  
  var Nframe = animation.length ;
  var kPos   = Math.round (loopConfig.position * Nframe ) % Nframe ; // assuming loopConfig.position between 0 and 1
	var head   = [] ;
	var body   = [] ;
	var tail   = [] ;

	var image_transition = step_transition_func('image', loopConfig.frameDur) ;

	var Nstep = Math.floor (loopConfig.totalDur / loopConfig.frameDur) + 1 ;
	
	if (kPos > 0) { // create head array
		var Nhead = Math.min (Nframe - kPos, Nstep) ;
		for (var kHead = 0 ; kHead < Nhead ; kHead++) {
			head.push (animation[kPos + kHead]) ;
		}

		kPos += Nhead - 1 ;
		if (kPos === Nframe - 1 && Nstep > Nhead) {
			Nstep -= Nhead ;
		} else {
			Nstep = 0 ;
		}
	}

	if (Nstep > 0) {  // need body or tail
		if (Nstep >= Nframe) { // create body array
			var Nbody = Math.floor (Nstep / Nframe) ;
			for (var kBody = 0 ; kBody < Nbody ; kBody++) {
				body = body.concat (body, animation) ;
			}
			Nstep -= Nbody * Nframe ;
		} 

		kPos = Nframe - 1 ;

	}

	if (Nstep > 0) { // need tail
		for (var kTail = 0 ; kTail < Nstep ; kTail++) {
			tail.push (animation[kTail]) ;
		}

		kPos = kTail - 1 ;

	}

	var loop = head.concat (body.concat( tail )) ;

	// console.log('animate_loop: loop', loop, 'body', body, 'head', head, 'tail', tail) ;
	
	loopOutput.position = kPos / Nframe ;
	loopOutput.animation = animate (loop, create_transition, callback) ;

	return loopOutput ;
}