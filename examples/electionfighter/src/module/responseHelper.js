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

    var xBump = 2 ;

    while(bumpHelper.collision_check(response)) {
      element.item.x -= xBump ;          
    }    

  },

} ;