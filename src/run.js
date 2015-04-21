export default function run() { // main simulation loop
	if(window.$Z.verbose)	console.log('inside run()', window.$Z.iter) ;
	window.$Z.sim = window.$Z.pipe(window.$Z.task) ; // store the simulation/game engine state as a Promise object
} ;