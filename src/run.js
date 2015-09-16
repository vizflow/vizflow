export default function run() { // main simulation loop
	// if($Z.verbose) console.log('inside run()', $Z.iter) ;
	$Z.sim = $Z.pipe($Z.task) ; // store the simulation/game engine state as a Promise object
} ;