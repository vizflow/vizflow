export default function detect(...args) {
  if(args.length == 0) {
    return $Z._detect.map((object) => object.detect()) ;
  } else {
  	$Z._detect = args[0] ;
  	return $Z ;
  }
} ;