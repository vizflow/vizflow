var bumpHelper = {

  setup: function bump_helper_setup (viz, bumpResponseConfig) {

  	if(bumpResponseConfig === undefined) {
  		bumpResponseConfig = {} ;
  	}
 
    var bumpResponse = { // action config object

      perform: bumpHelper.perform,
      // transition: bumpHelper.deliver, 
      element: viz.player,
      viz: viz,
      // audio: audio,
      sourceType: bumpResponseConfig.sourceType || 'enemy',
      type_check: responseHelper.type_check,
      responseSwitch: true,
      performSwitch: false,

    } ; 

    return bumpResponse ;
    
  },

  collision_check: function bump_helper_collision_check(response) { 

  	if(response === undefined) {
  		response = this ;
  	}

    var col = {
      item: [response.element.item, response.viz.enemy.item],
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

    var xBump = viz.player.config.xMove + 1 ;

    while(bumpHelper.collision_check(response)) {
      response.viz.player.item.x -= xBump ;          
    }

    response.viz.audio.bump.play() ;

    if(response.viz.player.state === 'j' || response.viz.player.state === 'r') {
      response.viz.player.item.remove_transition('x') ;          
    }

    response.viz.player.item.remove_transition('image') ;

    var bumpDuration = 75 ;
    var bumpTransition = step_transition_func('image', bumpDuration)(response.viz.player.sprite.hit[0]) ;
    bumpTransition.end = function() {
      response.viz.player.item.image = response.viz.player.sprite.rest[0] ;
    }

    response.viz.player.item.add_transition(bumpTransition) ;

    var hit = response.viz.player.item.responseSet.hit ;

    hit.healthbar.health -= hit.healthdrop * 0.25 ;
    transitionHelper.update_end_value.call(hit.healthbar.item, 'width', hit.healthbar.health, hit.health_transition) ;
    // } else if(response.viz.player.state === 'r') {
    //   response.viz.player.state = 'l' ;
    //   response.viz.player.callback() ;
    // }

	},
	
} ;