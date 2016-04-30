var responseHelper = {
	type_check: function response_helper_type_check(sourceItem, response) {

    if(response === undefined) {
      response = this ;
    }

    // console.log('resonseHelper type_check:', 'sourceItem', sourceItem, 'sourceItem.type', sourceItem.type)

    if(sourceItem.type === response.sourceType) {
      return true ;
    } else {
      return false ;
    }

  },	

  remove_overlap: function response_helper_remove_overlap(element, response) {

    if(response === undefined) {
      response = this ;
    }

    if(element === undefined) {
      element = response.element ;
    }

    // console.log('responseHelper remove overlap:')

    var xBump = 12 ;
    var xPad  = 6 ;
    var minX  = -element.item.image.originalCanvas.width * 0.5 - xPad ;

    if(response.collision_check() && element.item.x > minX) {
      element.item.x -= xBump ;          

      var viewXmin = -20 ;
      var viewTol = 5 ;

      var center = element.item.image.originalCanvas.width * 0.5 + element.item.x ;

      var viz = element.item.viz ;

      var dist = center - viz.viewportX - viewTol ;

      if(dist < 0 && viz.viewportX > viewXmin) {
        var viewXnew = viz.viewportX + dist ;
        viewXnew = Math.max(viewXmin, viewXnew) ;
        var replacementSwitch = true ;
        viz.add_transition(viz.transitionSet.x(viewXnew), replacementSwitch) ;
      } 

    }    

  },

} ;