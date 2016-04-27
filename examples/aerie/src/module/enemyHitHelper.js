var enemyHitHelper = {
 

  setup: function enemy_hit_helper_setup(viz, element, responseConfig) {
    if(responseConfig === undefined) {
      responseConfig = {} ;
    }
     
    var hit = { // response object

      perform: enemyHitHelper.perform,
      confirm: hitHelper.confirm,
      // healthbar: healthbar,
      healthdrop: responseConfig.healthdrop,
      // health_transition: health_transition,
      transition: enemyHitHelper.transition,
      element: element || responseConfig.element,
      viz: viz,
      // audio: audio,
      sourceType: responseConfig.sourceType,
      type_check: responseHelper.type_check,
      onSwitch: true,
      performSwitch: false,

    } ; 

    // console.log('enemy hit helper setup', 'hit', hit) ;
    return hit ;

  },    

 

  perform: function enemy_hit_helper_perform (response) {
    // console.log ('enemy hit helper perform start: this', this) ;
    if(response === undefined) {
      response = this ;
    }

    hitHelper.perform(response) ;

  }, 

  
} ;