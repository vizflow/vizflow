export default function render_image() {
	var name = 'render_image' ;
	if($Z.verbose) console.log('inside', name) ;
	return new Promise((resolve, reject) => {
		resolve(name)
  }) ;
} ;