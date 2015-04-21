export default function perform_actions() {
	var name = 'perform_actions' ;
	if($Z.verbose) console.log('inside', name) ;
	return new Promise((resolve, reject) => {
		resolve(name)
  }) ;
} ;