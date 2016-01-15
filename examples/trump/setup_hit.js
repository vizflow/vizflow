function setup_hit(viz, element, setupHitConfig) {

  function hit_reset () {
    //console.log ('hit_reset');
    element.reacting = false ;
    detectAction.reset() ;
  }

  var initial_transition = step_transition_func('image', viz.dur) ;

  function hit_transition() {

    var hitDur              = ( viz.player.sprite.attack.length + 30 ) * viz.dur ;
    var hit                 = step_transition_func('image', hitDur) ;
    var hitTransition       = initial_transition(element.sprite.hit[0]) ;
    hitTransition.child     = hit(element.sprite.rest[0]) ;
    hitTransition.child.end = [detectAction.reset, hit_reset] ;
    hitTransition           = [hitTransition] ;

    return hitTransition ;

  }

  if(setupHitConfig === undefined) {
  	setupHitConfig = {} ;
  }

  if(setupHitConfig.elementHealth === undefined) {
  	setupHitConfig.elementHealth = 100 ;
  }

  if(setupHitConfig.healthbarHeight === undefined) {
  	setupHitConfig.healthbarHeight = 10 ;
  }
  
  if(setupHitConfig.detectList === undefined) {
    setupHitConfig.detectList = [viz.player.item, element.item] ;
  }

  var healthbar         = setup_healthbar (viz, setupHitConfig.elementHealth, setupHitConfig.healthbarHeight) ;
  var health_transition = $Z.transition.linear_transition_func ( 'width', viz.dur * 4 ) ; 
  var healthDrop        = 1 ;

  var hit = { // action config object

    set: detectAction.set,
    reset: hit_reset,
    detect: detectAction.hit,
    perform: performAction.hit,
    detectList: setupHitConfig.detectList,
    healthbar: healthbar,
    healthDrop: healthDrop,
    health_transition: health_transition,
    transition: hit_transition,
    element: element,
    viz: viz,

  } ;	

  return hit ;

}