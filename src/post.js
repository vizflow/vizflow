export default function post(...args) {
  if(args.length == 0) {
    return $Z._post.map((object) => Promise.resolve(object.post())) ;
  } else {
  	$Z._post = args[0] ;
  	return $Z ;
  }
} ;