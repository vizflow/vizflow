export default function perform(...args) {
  if(args.length == 0) {
    return $Z._perform.map( (object) => Promise.resolve( object.perform() ) ) ;
  } else {
  	$Z._perform = args[0] ;
  	return $Z ;
  }
} ;