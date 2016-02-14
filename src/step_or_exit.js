export default function step_or_exit() {
	
	if($Z.verbose) {
		console.log('vizflow: step or exit start') ;
	}

	if($Z.done()) {

		$Z.exit() ;
	
		return Promise.resolve(true) ;

	} else {

		$Z.step() ;
	
		return Promise.resolve(false) ;
	
	}

} ;