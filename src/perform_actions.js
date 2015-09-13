export default function perform_actions() {
	if($Z.verbose) console.log('inside', this.name) ;
	return Promise.resolve() ;
} ;