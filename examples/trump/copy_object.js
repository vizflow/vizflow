function copy_object (object) {

	var key       = Object.keys(object) ;
	var newObject = {} ;

	for(var k = 0 ; k < key.length ; k++ ) {

      newObject[ key[k] ] = object[ key[k] ]  ;

	}	

	return newObject ;

}