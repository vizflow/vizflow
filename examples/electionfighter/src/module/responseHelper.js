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
} ;