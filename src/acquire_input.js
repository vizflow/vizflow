export default function acquire_input() {
	var name = 'acquire_input' ;
	if($Z.verbose) console.log('inside', name) ;
	return new Promise((resolve, reject) => {
		resolve(name)
  }) ;
} ;	