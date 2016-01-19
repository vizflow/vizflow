function setup_hit(viz, element, setupHitConfig) {

  function hit_reset () {
    //console.log ('hit_reset');
    element.reacting = false ;
    detectAction.remove() ;
  }

  var initial_transition = step_transition_func('image', viz.dur * 12) ;

  function hit_transition() {

    var hitDur              = ( element.adversary.sprite.attack.length + 30 ) * viz.dur ;
    // console.log ('hit transition', 'element', element, 'hitDur', hitDur) ;
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
    setupHitConfig.detectList = [element.adversary.item, element.item] ;
  }

  var healthbar = setup_healthbar (
    viz, 
    setupHitConfig.elementHealth, 
    setupHitConfig.healthbarHeight, 
    setupHitConfig.healthbarY, 
    setupHitConfig.color
  ) ;

  var health_transition = $Z.transition.linear_transition_func ( 'width', viz.dur * 4 ) ; 
  var healthDrop        = 1 ;

  var hit = { // action config object

    add: detectAction.add,
    remove: hit_reset,
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