export default function update_items() {
	var name = 'update_items' ;
	if($Z.verbose) console.log('inside', name) ;
	return new Promise((resolve, reject) => {
		resolve(name)
  }) ;
} ;