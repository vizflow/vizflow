var bumpHelper = {

  setup: function bump_helper_setup (viz, bumpResponseConfig) {

    if(bumpResponseConfig === undefined) {
      bumpResponseConfig = {} ;
    }
 
    var bumpResponse = { // action config object

      perform: bumpHelper.perform,
      element: viz.player,
      viz: viz,
      sourceType: bumpResponseConfig.sourceType || 'enemy',
      type_check: responseHelper.type_check,
      onSwitch: true,
      performSwitch: false,
      remove_overlap: responseHelper.remove_overlap,
      collision_check: bumpHelper.collision_check,

    } ; 

    return bumpResponse ;
    
  },

  collision_check: function bump_helper_collision_check(response) { 

    if(response === undefined) {
      response = this ;
    }

    var col = {
      item: [response.element.item, response.sourceItem],
      width: response.viz.width,
      height: response.viz.height,
    } ;

    collisionDetect.pixelwise(col) ;
    
    return col.collision.count > 0 ;

  },

  perform: function bump_helper_player_bump(response) {

    if(response === undefined) {
      response = this ;
    }

    response.remove_overlap() ;

    if(response.element.item.image.sourceCollisionImage !== undefined) { // player is in an attack frame
      return ;
    }

    if(response.sourceItem !== response.sourceItem) {
      return ; // only trigger rest of bump on enemy
    }

    var bumpDuration   = 0 ;

    hit.healthbar.health -= hit.healthdrop * 0.1 ;
    transitionHelper.update_end_value.call(hit.healthbar.item, 'width', hit.healthbar.health, hit.health_transition) ;

    var Nflash = 2 ;
    var flashDuration = bumpDuration * 0.1 ;
    response.element.item.flash(Nflash, flashDuration) ;

  },
  
} ;