function create_sequence(sprite, step_transition, callback) { 
  var Nframe = sprite.length ;
  var transitionArray = [] ;
  for(var kframe = 0 ; kframe < Nframe ; kframe++) {
    var stepTransition = step_transition( sprite[kframe] ) ;
    if(kframe === Nframe - 1) {        
      stepTransition.end = callback ;
    }
    transitionArray.push(stepTransition) ;
  }
  return transition_sequence(transitionArray) ;
}