export default function acquire_input() {
	if($Z.verbose) console.log('inside', this.name) ;
	return new Promise((resolve, reject) => {
		resolve(this.name)
  }) ;
} ;	