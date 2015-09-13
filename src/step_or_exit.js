export default function step_or_exit() {
	if($Z.done()) {
		$Z.exit() ;
		return Promise.resolve(true) ;
	} else {
		$Z.step() ;
		return Promise.resolve(false) ;
	}
} ;