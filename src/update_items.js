export default function update_items() {
	if(window.$Z.verbose) console.log('inside', this.name) ;
	return new Promise((resolve, reject) => {
    window.$Z.item().forEach((d) => {
    	d.update() ;
    }) ;
		resolve(this.name)
  }) ;
} ;