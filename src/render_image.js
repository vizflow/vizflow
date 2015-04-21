export default function render_image() {
	if(window.$Z.verbose) console.log('inside', this.name) ;
	return new Promise((resolve, reject) => {
    window.$Z.item().forEach((d) => {
    	d.render() ;
    }) ;
		resolve(this.name)
  }) ;
} ;