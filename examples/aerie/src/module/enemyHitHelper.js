var enemyHitHelper = {
 

  setup: function enemy_hit_helper_setup(viz, element, responseConfig) {
    if(responseConfig === undefined) {
      responseConfig = {} ;
    }
     
    var hit = { // response object

      perform: enemyHitHelper.perform,
      confirm: hitHelper.confirm,
      healthdrop: responseConfig.healthdrop,
      transition: enemyHitHelper.transition,
      element: element || responseConfig.element,
      viz: viz,
      // audio: audio,
      sourceType: responseConfig.sourceType,
      type_check: responseHelper.type_check,
      onSwitch: true,
      performSwitch: false,
      flash: $Z.helper.effect.flash,

    } ; 

    return hit ;

  },    

 
  perform: function enemy_hit_helper_perform (response) {
    if(response === undefined) {
      response = this ;
    }

    hitHelper.perform(response) ;

  }, 

  
} ;