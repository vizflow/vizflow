function add_transition_end(transition, frameIndex, callback) {

	var transitionK = transition ; // initialize

	for( var kTrans = 0 ; kTrans < frameIndex ; kTrans++ ) {
		transitionK = transitionK.child ;
	}

  transitionK.end = callback ; // only restore UI functionality after the minimum number of frames has been rendered	
	
}