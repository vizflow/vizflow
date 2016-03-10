var responseHelper = {
	type_check: function response_helper_type_check(sourceItem, response) {

    if(response === undefined) {
      response = this ;
    }

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

    var xBump = 4 ;
    var minX  = -element.item.image.originalCanvas.width * 0.5 ;

    if(bumpHelper.collision_check(response) && element.item.x > minX) {
      element.item.x -= xBump ;          
    }    

  },

} ;