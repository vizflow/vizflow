export default function item(...args) {
  if(args.length == 0) {
    return window.$Z._item ;
  } else {
  	$Z._item = args[0] ;
  	return window.$Z ;
  }
} ;