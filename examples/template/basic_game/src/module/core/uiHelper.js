var uiHelper = {

  setup: function ui_helper_setup (uiConfig, viz) {

    if(viz === undefined) {
      viz = this ;
    }

    var ui = {

      canvas:   uiConfig.canvas  || imageHelper.create(viz.width, viz.height),
      context:  uiConfig.context || imageHelper.create(viz.width, viz.height).context(),
      item:     uiConfig.item,
      callback: uiConfig.callback,

    } ;

    return ui ;
    
  },

} ;