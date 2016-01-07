function animate (sprite, create_transition, callback, restFrame) {
  var animation ;
  if (restFrame === undefined) {
    animation = sprite ; 
  } else {
    animation = sprite.concat (restFrame) ; 
  }
  
  var Nframe = animation.length ;
  var transitionArray = [] ;
  for(var kframe = 0 ; kframe < Nframe ; kframe++) {
    var transition = create_transition( animation[kframe] ) ;
    if(kframe === Nframe - 1) {        
      transition.end = callback ;
    }
    transitionArray.push(transition) ;
  }
  return transition_sequence(transitionArray) ;
}