export default function engine() { // main simulation loop
	if(window.$Z.verbose)	console.log('inside engine()', window.$Z.iter) ;
	window.$Z.sim = window.$Z.pipe(window.$Z.task) ; // store the simulation/game engine state as a Promise object
} ;