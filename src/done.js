export default function done() { // checks whether we should exit the simulation or not
	if ($Z.iter > $Z.maxIter) {
		return true ;
	} else {
		return false ;
	}
}