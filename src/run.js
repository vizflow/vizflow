export default function run() { // main simulation loop
	if($Z.verbose) console.log('vizflow run start', '$Z.iter', $Z.iter, '$Z.task', $Z.task) ;
  $Z.currentTime = performance.now() ; // use one global timestamp per frame for all items   
	$Z.sim = $Z.pipe($Z.task) ; // store the simulation/game engine state as a Promise object
} ;