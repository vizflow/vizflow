export default function update_items() {
	// if($Z.verbose) console.log('inside', this.name) ;
	return Promise.all($Z.item().map((d) =>  Promise.resolve( ( d.update ? d.update() : $Z.update.call(d) ) ) ) )
		.then( Promise.resolve( $Z._viz.update ? $Z._viz.update() : $Z.update.call($Z._viz) ) ) ;
} ;