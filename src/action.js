export default function action(...args) {
  if(args.length == 0) {
    return $Z._action.map((object) => object.action()) ;
  } else {
  	$Z._action = args[0] ;
  	return $Z ;
  }
} ;