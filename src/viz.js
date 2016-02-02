export default function viz(...args) {
	
	// if($Z.verbose) console.log('inside run()', $Z.iter) ;
  
  if(args.length == 0) {
  
    return $Z._viz ;
  
  } else {

    $Z.exit() ;

  	var viz = args[0] ;

  	if( viz.item   !== undefined ) {
			$Z._item = viz.item  ; // load the user data into the visualization engine to initialize the time equals zero (t = 0) state
  	}

  	if( viz.prep   !== undefined ) {
			$Z._prep.push(viz) ; // sets the preprocessing to perform on each frame of the animation (prior to updating and rendering the elements)
  	}

  	if( viz.post   !== undefined ) {
			$Z._post.push(viz) ;
  	}

  	if( viz.detect !== undefined ) {
			$Z._detect.push(viz) ;
  	}

  	if( viz.perform !== undefined ) {
			$Z._perform.push(viz) ;
  	}

  	$Z._viz = viz ;

  	return $Z ;

  }

} ;