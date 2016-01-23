function setup_hit(viz, element, setupHitConfig) {

  function hit_reset () {
    //console.log ('hit_reset');
    element.item.invincible = false ;
    detectAction.remove() ;
  }

  var initial_transition = step_transition_func('image', viz.dur * 12) ;

  function hit_transition() {

    element.item.invincible = true ;

    var hitDur              = ( element.adversary.sprite.attack.length + 30 ) * viz.dur ;
    // console.log ('hit transition', 'element', element, 'hitDur', hitDur) ;
    var hit                 = step_transition_func('image', hitDur) ;
    var hitTransition       = initial_transition(element.sprite.hit[0]) ;
    hitTransition.child     = hit(element.sprite.rest[0]) ;
    // hitTransition.child.end = [detectAction.reset, hit_reset] ;
    hitTransition           = [hitTransition] ;

    var reset = step_transition_func ('dummy', hitDur) (0) ;
    reset.end = [detectAction.reset, hit_reset] ;
    hitTransition.push(reset) ;

    var frameDuration = hitDur * .1 ;
    var Nstep = 2 * (Math.floor(0.5 * hitDur / frameDuration)) ;
    var flash = effect.flash.call(element, frameDuration, Nstep) ;
    //console.log('setup hit', 'flash', flash) ;
    hitTransition.push(flash.animation[0]) ;
    return hitTransition ;

  }

  if(setupHitConfig === undefined) {
  	setupHitConfig = {} ;
  }

  if(setupHitConfig.elementHealth === undefined) {
  	setupHitConfig.elementHealth = 100 ;
  }

  if(setupHitConfig.healthbarHeight === undefined) {
  	setupHitConfig.healthbarHeight = 7 ;
  }
  
  if(setupHitConfig.detectList === undefined) {
    setupHitConfig.detectList = [element.adversary.item, element.item] ;
  }

  if(setupHitConfig.audio === undefined) {
    setupHitConfig.audio = viz.audio.hit1 ;
  }

  var audio = setupHitConfig.audio ;

  var healthbar = setup_healthbar (
    viz, 
    setupHitConfig.elementHealth, 
    setupHitConfig.healthbarHeight, 
    setupHitConfig.healthbarY, 
    setupHitConfig.color
  ) ;

  var health_transition = $Z.transition.linear_transition_func ( 'width', viz.dur * 4 ) ; 
  var healthDrop        = 10 ;

  var hit = { // action config object

    add: detectAction.add,
    remove: hit_reset,
    detect: detectAction.hit,
    perform: performAction.hit,
    detectList: [setupHitConfig.detectList],
    healthbar: healthbar,
    healthDrop: healthDrop,
    health_transition: health_transition,
    transition: hit_transition,
    element: element,
    viz: viz,
    audio: audio,

  } ;	

  return hit ;

}