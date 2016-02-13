export default function run() { // main simulation loop
	$Z.sim = $Z.pipe($Z.task) ; // store the simulation/game engine state as a Promise object
	// if($Z.verbose) console.log('inside run()', '$Z.iter', $Z.iter) ;
} ;