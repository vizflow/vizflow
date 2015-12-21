export default function update() { // default update function for handling animations using transition object lists using interpolation functions

	let el         = this ;
	let removeList = [] ;
	let children   = [] ;

	if(el.transition === undefined) return ;

	for(let kt = 0 ; kt < el.transition.length ; kt++) {

		let trans = el.transition[kt] ; // transition object for each state variable that is changing
		// assume these fields exist: varName, startValue, endValue, duration, startTime, interpFunc
		let elapsedTime = 0 ;

		if(trans.startTime === undefined) {
      trans.startTime = Date.now() ;
		} else {
			elapsedTime = Date.now() - trans.startTime ;
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
			removeList.push(kt) ;
			if(trans.child !== undefined) {
				children.push(trans.child) ;
			}
			if(trans.end !== undefined) {
				trans.end() ;
			}
		}
		
	}

	for(let kr = removeList.length - 1 ; kr >= 0 ; kr--) {
		if(removeList[kr] < el.transition.length - 1) { // swap with last element and then pop to avoid splice call
		  let swap = el.transition[el.transition.length - 1] ; // last transition
		  el.transition[el.transition.length - 1] = el.transition[removeList[kr]] ;
		  el.transition[removeList[kr]] = swap ;
		}
		el.transition.pop() ; // remove completed transition (will be garbage collected, may want to reuse via factory)
	}

	for(let kc = 0 ; kc < children.length ; kc++) 
		el.transition.push(children[kc]) ; // sequential transition support by appending child transitions to transition list

} ;