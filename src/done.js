export default function done() { // checks whether we should exit the simulation or not
	if (window.$Z._item.length == 0 || window.$Z.iter > window.$Z.maxIter) {
		return true ;
	} else {
		return false ;
	}
}