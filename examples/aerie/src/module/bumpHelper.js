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
    
    // console.log('hitHelper collision_check', 'col', col) ;

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

    // console.log('bumpHelper perform', 'response.sourceItem', response.sourceItem, 'response.viz.enemy', response.viz.enemy) ;

    if(response.sourceItem !== response.sourceItem) {
      return ; // only trigger rest of bump on enemy
    }

    // response.viz.audio.bump.play() ;

    var bumpDuration   = 0 ;
    // var bumpTransition = transitionHelper.step_func('image', bumpDuration)(response.element.sprite.hit[0]) ;

    // bumpTransition.end = function() {
    //   response.element.item.image = response.element.sprite.rest[0] ;
    // }

    // var replacementSwitch = true ;
    // response.element.item.add_transition(bumpTransition, replacementSwitch) ;

    // var hit = response.element.item.responseSet.hit ;

    hit.healthbar.health -= hit.healthdrop * 0.1 ;
    transitionHelper.update_end_value.call(hit.healthbar.item, 'width', hit.healthbar.health, hit.health_transition) ;

    var Nflash = 2 ;
    var flashDuration = bumpDuration * 0.1 ;
    response.element.item.flash(Nflash, flashDuration) ;

  },
  
} ;