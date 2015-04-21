export default function detect_actions() {
	if($Z.verbose) console.log('inside', this.name) ;
	return new Promise((resolve, reject) => {
		resolve(this.name)
  }) ;
} ;	