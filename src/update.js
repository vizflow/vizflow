export default function update() { // default update function for handling animations using transition object lists using interpolation functions
	let el         = this ;
	let removeList = [] ;
	for(let kt = 0 ; kt < el.transition.length ; el++) {
		let trans = el.transition[kt] ; // transition object for each state variable that is changing
		// assume these fields exist: stateName, startValue, endValue, duration, startTime, interpFunc
		if(trans.startTime === undefined) {
			trans.startTime = Date.now() ;
			let elapsedTime = 0 ;
			continue ;
		else { 
		  let elapsedTime = Date.now() - trans.startTime ;
		}
		let remainingTime = trans.duration - elapsedTime ;
		if(remainingTime > 0) {
		  let normalizedTime = 1 - (remainingTime / duration) ; // a number from 0 to 1 representing where we are along the transition
		  el[trans.stateName] = trans.interpFunc(el, normalizedTime) ;
		} else { // transition has run out of time so finish and remove
			el[trans.stateName] = trans.interpFunc(el, 1) ;
			removeList.push(kt) ;
		}
	}
	for(let kr = removeList.length - 1 ; kr >= 0 ; kr--) {
		el.transition.splice(removeList[kr], 1) ; // remove completed transition (will be garbage collected, may want to reuse via factory)
	}
} ;