function animate_loop (loopConfig, valueList, create_transition, callback, restFrame) {
	// loop config expects: Nstep, position, frameDur
	var loopOutput = copy_object(loopConfig) ; // initialize output variable
	var animation ;
	if (restFrame === undefined) {
    animation = valueList ; 
  } else {
    animation = valueList.concat (restFrame) ; 
  }
  
  var Nframe = animation.length ;

  if(loopConfig.Nstep === undefined) {
  	loopConfig.Nstep = 1 ;
  	loopOutput.Nstep = 1 ; // run one step of the loop by default
  }

  var kPos   = loopConfig.position + 1 ; // assuming loopConfig.position between 0 and 1
  kPos       = kPos % Nframe ;
	var head   = [] ;
	var body   = [] ;
	var tail   = [] ;

	// var image_transition = step_transition_func('image', loopConfig.frameDur) ;

	loopOutput.totalDur = loopOutput.Nstep * loopOutput.frameDur ;
	var Nstep = loopConfig.Nstep ;
	// var Nstep = Math.floor (loopConfig.totalDur / loopConfig.frameDur) + 1 ;
	
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
		kPos = Nstep ;

		if (Nstep >= Nframe) { // create body array
			var Nbody = Math.floor (Nstep / Nframe) ;
			for (var kBody = 0 ; kBody < Nbody ; kBody++) {
				body = body.concat (body, animation) ;
			}
			Nstep -= Nbody * Nframe ;
		} 

	}

	if (Nstep > 0) { // need tail
		kPos = Nstep - 1 ;
		for (var kTail = 0 ; kTail < Nstep ; kTail++) {
			tail.push (animation[kTail]) ;
		}
	}

	var loop = head.concat (body.concat( tail )) ;

	//console.log('animate_loop:', 'Nframe', Nframe, 'kpos', kPos, 'loop', loop, 'body', body, 'head', head, 'tail', tail) ;
	
	loopOutput.position  = kPos % Nframe ;
	loopOutput.animation = animate (loop, create_transition, callback) ;

	return loopOutput ;
}