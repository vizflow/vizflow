export default function step() { // iterate the engine's main loop using the browser's animation timer
	$Z.iter++ ;
  window.requestAnimationFrame($Z.run) ;
  $Z.step() ;
} ;