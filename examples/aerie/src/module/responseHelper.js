var responseHelper = {
	type_check: function response_helper_type_check(sourceItem, response) {

    if(response === undefined) {
      response = this ;
    }

    console.log('resonseHelper type_check:', 'sourceItem', sourceItem, 'sourceItem.type', sourceItem.type)

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

    var bump = 12 ;
    var ax   = element.item.x + element.item.image.originalCanvas.width * 0.5 ;
    var ay   = element.item.y + element.item.image.originalCanvas.height * 0.5 ;    
    var bx   = response.sourceItem.x + response.sourceItem.image.originalCanvas.width * 0.5 ;
    var by   = response.sourceItem.y + response.sourceItem.image.originalCanvas.height * 0.5 ;
    var dx   = ax - bx ;
    var dy   = ay - by ;
    var d    = Math.sqrt(dx * dx + dy * dy) ; 
    if (d === 0) {
      console.log('responseHelper overlap 0 distance') ;
    }
    var nx   = dx / d ;  // normalized vector
    var ny   = dy / d ;  // normalized vector
    // var xPad  = 6 ;
    // var minX  = -element.item.image.originalCanvas.width * 0.5 - xPad ;

    if(response.collision_check() ) {
      element.item.x += bump * nx ;
      element.item.y += bump * ny ;          
    }    

  },

} ;