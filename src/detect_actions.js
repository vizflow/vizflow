export default function detect_actions() {
	var name = 'detect_actions' ;
	if($Z.verbose) console.log('inside', name) ;
	return new Promise((resolve, reject) => {
		resolve(name)
  }) ;
} ;	