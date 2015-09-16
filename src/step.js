function run() { // one iteration of the main simulation loop
	// if($Z.verbose) console.log('inside run()', $Z.iter) ;
	$Z.sim = $Z.pipe($Z.task) ; // store the simulation/game engine state as a Promise object
} ;

export default function step() { // iterate the engine's main loop using the browser's animation timer
	$Z.iter++ ;
  window.requestAnimationFrame(run) ;
} ;