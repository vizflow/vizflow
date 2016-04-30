var uiHelper = {

  setup: function ui_helper_setup (uiConfig, viz) {

    if(viz === undefined) {
      viz = this ;
    }

    if ( uiConfig === undefined ) {
      uiConfig = {} ;
    }

    var ui = {

      canvas:   uiConfig.canvas  || imageHelper.create(viz.width, viz.height),
      context:  uiConfig.context || imageHelper.create(viz.width, viz.height).context(),
      item:     uiConfig.item    || [],
      // callback: uiConfig.callback,

    } ;

    viz.ui = ui ;

    return viz ;
    
  },

} ;