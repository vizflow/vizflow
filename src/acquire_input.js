export default function acquire_input() { // useful if the simulation requires all inputs to be grouped together, just a stub for now
	if($Z.verbose) console.log('inside', this.name) ;
	return new Promise((resolve, reject) => {
		resolve(this.name)
  }) ;
} ;	