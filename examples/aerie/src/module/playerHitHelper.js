var playerHitHelper = {

  setup: function player_hit_helper_setup(viz, element, responseConfig) {
    if(responseConfig === undefined) {
      responseConfig = {} ;
    }
     
    var hit = { // response object

      perform: playerHitHelper.perform,
      confirm: hitHelper.confirm,
      healthdrop: responseConfig.healthdrop,
      element: element || responseConfig.element,
      viz: viz,
      // audio: audio,
      sourceType: responseConfig.sourceType,
      type_check: responseHelper.type_check,
      onSwitch: true,
      performSwitch: false,

    } ; 

    return hit ;

  },    

  perform: function player_hit_helper_perform (response) {
    if(response === undefined) {
      response = this ;
    }

    hitHelper.perform(response) ;
  }, 
  
} ;