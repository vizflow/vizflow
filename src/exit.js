export default function exit() { // stop the simulation engine and execute the return callback
	if(window.$Z.verbose)	console.log('$Z.engine exiting') ;
  return false ;
}