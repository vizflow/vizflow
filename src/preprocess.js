export default function preprocess() { // useful if the simulation requires all inputs to be grouped together, just a stub for now
	// if($Z.verbose) console.log('inside', this.name) ;
	return Promise.all($Z.prep()) ;
	// return Promise.all($Z.prep().map((p) => Promise.resolve(p()))) ;
} ;	