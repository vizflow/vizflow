function transition_sequence(transitionArray) {
  var transition = transitionArray[0] ;
  for(var k = 0 ; k < transitionArray.length - 1 ; k++) {
    transitionArray[k].child = transitionArray[k + 1] ;
  }
  return transition ;
}