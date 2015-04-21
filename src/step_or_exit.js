export default function step_or_exit() {
	return new Promise((resolve, reject) => {
		if(window.$Z.done()) {
			window.$Z.exit() ;
			resolve(true) ;
		} else {
			window.$Z.step() ;
			resolve(false) ;
		}
  }) ;
} ;	