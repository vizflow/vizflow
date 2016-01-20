function step_transition_func(varName, duration) {
  return $Z.transition.build_func(varName, duration, step_interp) ;
}

function step_interp(t) {
  if(t < 1) {
    return this.startValue ;
  } else {
    return this.endValue ;
  }
}