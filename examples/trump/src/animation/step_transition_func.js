function step_transition_func(varName, duration) {
  return $Z.transition.build_func(varName, duration, step_interp) ;
}

function step_interp(t) { // represents a switch at t=0
  return this.endValue ;
}