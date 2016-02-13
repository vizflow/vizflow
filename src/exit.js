export default function exit() { // stop the simulation engine and execute the return callback
	if($Z.verbose)	console.log('$Z exiting') ;
  $Z._item    = []       ; // initialize the array of items (change to an object pool later to reduce garbage collection)
  $Z._prep    = []       ; // array of actions to perform before rendering the items on each frame (e.g. collision detection, background clearing)
  $Z._post    = []       ; // array of actions to perform before rendering the items on each frame (e.g. collision detection, background clearing)
  $Z._detect  = []       ; // array of detectors to perform before rendering the items on each frame (e.g. collision detection, background clearing)
  $Z._perform = []       ; // array of actions to perform before rendering the items on each frame (e.g. collision detection, background clearing)
  $Z._viz     = {}       ; // optional global vizualization configuration object
  // $Z.iter     = 0        ; // default initial iteration count
  return false ;
}