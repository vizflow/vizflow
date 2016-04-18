export default function update() { // default update function for handling animations using transition object lists using interpolation functions

	let el         = this ;
	let removeList = [] ;
	let child   = [] ;

	if ( el.child !== undefined ) {
		for( let kc = 0 ; kc < el.child.length ; kc++ ) {
			let d = el.child[kc] ;
			d.update ? d.update() : $Z.update.call(d) ;
		}
	}

	if(el.transition === undefined) return ;

	if (el.transition.constructor !== Array) {
		el.transition = [el.transition] ;
	}

	for(let kt = 0 ; kt < el.transition.length ; kt++) {

		let trans = el.transition[kt] ; // transition object for each state variable that is changing
		// assume these fields exist: varName, startValue, endValue, duration, startTime, interpFunc
		let elapsedTime = 0 ;

		if(trans.startTime === undefined) {
      trans.startTime = $Z.currentTime ;
		} else {
			elapsedTime = $Z.currentTime - trans.startTime ;
		}

		let remainingTime = trans.duration - elapsedTime ;

		if(elapsedTime == 0) {
			trans.startValue = el[trans.varName] ; // initialize starting value for the transition with the current value
		} else if(remainingTime > 0) {
		  let normalizedTime = 1 - (remainingTime / trans.duration) ; // parameter in [0, 1] representing the transition's progress or completion amount
      // * update the element's state:
		  el[trans.varName] = trans.interpFunc(normalizedTime) ; 
		} else { // transition has run out of time so finish and remove
      // * update the element's state:
			el[trans.varName] = trans.endValue ; 

			if(trans.pause === undefined || -remainingTime > trans.pause) {

				removeList.push(kt) ;
				if(trans.child !== undefined) {
					child.push(trans.child) ;
				}
			}
		}
		
	}

	for(let kr = removeList.length - 1 ; kr >= 0 ; kr--) {

		if(removeList[kr] < el.transition.length - 1) { // swap with last element and then pop to avoid splice call
		  let swap = el.transition[el.transition.length - 1] ; // last transition
		  el.transition[el.transition.length - 1] = el.transition[removeList[kr]] ;
		  el.transition[removeList[kr]] = swap ;
		}

		let trans = el.transition.pop() ; // remove completed transition (will be garbage collected, may want to reuse via factory)

		if(trans.end !== undefined) {
			if ( trans.end.constructor === Array ) { // is an array 
				for( var kEnd = 0 ; kEnd < trans.end.length ; kEnd++ ) {
					if (typeof trans.end[kEnd] == 'function') {
						trans.end[kEnd]() ;
					} else {
						trans.end[kend].run() ;
					}
				}
			} else { 
				if (typeof trans.end == 'function') {
 					trans.end() ;
 				} else {
 					trans.end.run() ;
 				}
			}
		}

	}

	for(let kc = 0 ; kc < child.length ; kc++) 
		el.transition.push(child[kc]) ; // sequential transition support by appending child transitions to transition list

} ;