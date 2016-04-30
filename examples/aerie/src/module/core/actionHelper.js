var actionHelper = {

  lastCollision: 0,

  lastAction: 0,

  collision_foreach: function action_helper_collision_foreach(viz, func) {

    if (viz.collision !== undefined && viz.collision !== null && viz.collision.count > 0) { // at least one collision between occurred

      for( var kCollision = 0 ; kCollision < viz.collision.list.length ; kCollision++ ) { // loop over all collisions detected globally during the initial check (phase 1)

        for( var kPair = 0 ; kPair < 2 ; kPair++ ) { // either item can be considered the "source" or the "target", so loop over both and perform any corresponding actions that might exist

          var targetItem = viz.item[viz.collision.list[kCollision][kPair]] ;           // by convention, the target item stores the response config object for the corresponding response
          var sourceItem = viz.item[viz.collision.list[kCollision][(kPair + 1) % 2]] ; // by convention, the source item is checked by the target item for the appropriateness of its type

          for( var response in targetItem.responseSet ) {

            func(targetItem.responseSet[response], sourceItem) ;

          }
        }
      }
    }

  },

  detect: function action_helper_detect(viz) {

    if(viz === undefined) {
      viz = this ;
    }

    if ( ( $Z.iter - actionHelper.lastCollision ) >= viz.config.frameDurationFactor ) { // throttle collision detection if needed

      viz.collision_detect() ;

      actionHelper.collision_foreach( viz, function(response, sourceItem) {

        if( response.onSwitch ) { // perform response after passing detailed detection check 
          response.performSwitch = true ; // flag for performance by the visualization/animation engine loop
          response.sourceItem    = sourceItem ;
        } 

      }) ;

      actionHelper.lastCollision = $Z.iter ;

    }    

  },

  perform: function action_helper_perform(viz) {

    if(viz === undefined) {
      viz = this ;
    }

    if ( ( $Z.iter - actionHelper.lastAction ) >= viz.config.frameDurationFactor ) { // throttle collision detection if needed

      actionHelper.collision_foreach( viz, function(response) {
        if( response.performSwitch ) {
          response.performSwitch = false ;
          response.perform() ;
        }
      }) ;

      actionHelper.lastAction = $Z.iter ;

    }

  },

  collision_image: function action_helper_collision_image(actionType, item) { // actionType is either 'source' or 'target'
    
    if(item === undefined) {
      item = this ;
    }

    var property = actionType + 'CollisionImage' ;

    if(item.image[property] === undefined || item.image[property] === null) {
      return undefined ;
    } else {      
      var collisionImage = item.image[property] ;
      return collisionImage ;
    }

  },

} ;