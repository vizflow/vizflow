function spriteset_foreach (spriteSet, func) {

	var key    = Object.keys(spriteSet) ;
	var newSet = {} ;

	for(var k = 0 ; k < key.length ; k++ ) {

    if ( spriteSet[ key[k] ].constructor === Array ) {
 
      newSet[ key[k] ] = spriteSet[ key[k] ].map(func) ;

    } else {
      
      newSet [ key[k] ] = spriteSet[ key[k] ] ;
    
    }

	}	

  newSet.height = spriteSet.height ;

  return newSet ;

}
