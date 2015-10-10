export default function prep(...args) {
  if(args.length == 0) {
    return $Z._prep.map((p) => p()) ;
  } else {
  	$Z._prep = args[0] ;
  	return $Z ;
  }
} ;