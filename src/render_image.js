export default function render_image() {
	// if($Z.verbose) console.log('inside', this.name) ;
  return Promise.all($Z.item().map((d) => Promise.resolve(d.render()))) ;
} ;