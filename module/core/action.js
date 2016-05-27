export default {

  lastCollision: 0,

  lastAction: 0,

  collision_foreach: function action_helper_collision_foreach(viz, func) {

    // console.log('action helper collision foreach', 'viz.collision', viz.collision) ;

    if (viz.collision !== undefined && viz.collision !== null && viz.collision.count > 0) { // at least one collision between occurred

      for( var kCollision = 0 ; kCollision < viz.collision.list.length ; kCollision++ ) { // loop over all collisions detected globally during the initial check (phase 1)

        // each collision involves a pair of items, each one of which can be considered the "source" and the "target" with respect to some corresponding actions

        for( var kPair = 0 ; kPair < 2 ; kPair++ ) { // either item can be considered the "source" or the "target", so loop over both and perform any corresponding actions that might exist

          var targetItem = viz.item[viz.collision.list[kCollision][kPair]] ;           // by convention, the target item stores the response config object for the corresponding response
          var sourceItem = viz.item[viz.collision.list[kCollision][(kPair + 1) % 2]] ; // by convention, the source item is checked by the target item for the appropriateness of its type

          // console.log('collision_foreach', 'viz collision list', viz.collision.list, 'index1', viz.collision.list[kCollision][0], 'index2', viz.collision.list[kCollision][1], 'viz.item.length', viz.item.length) ;

          for( var response in targetItem.responseSet ) {

            // console.log('collision for each response set', 'response', response, 'func', func, 'sourceItem', sourceItem);

            func(targetItem.responseSet[response], sourceItem) ;

          }
        }
      }
    }

  },

  detect: function action_helper_detect(viz) {

    // console.log('action helper detect') ;

    if(viz === undefined) {
      viz = this ;
    }

    // console.log('action helper detect:', 'viz.item.length', viz.item.length) ;

    if ( ( $Z.iter - actionHelper.lastCollision ) >= viz.config.frameDurationFactor ) { // throttle collision detection if needed
      // this.collision_detect() ;
      // console.log('action helper detect', '$Z.iter', $Z.iter) ;
      viz.collision_detect() ;
      // console.log('action helper detect', 'viz.collision', viz.collision) ;

      actionHelper.collision_foreach( viz, function(response, sourceItem) {

        // console.log('action helper detect collision for each', 'response', response, 'sourceItem', sourceItem) ;

        if( response.onSwitch ) { // perform response after passing detailed detection check 
          // console.log('initial detection passed', 'sourceItem.x', sourceItem.y, 'response element x', response.element.y)
          response.performSwitch = true ; // flag for performance by the visualization/animation engine loop
          response.sourceItem    = sourceItem ;
        } 

      }) ;

      actionHelper.lastCollision = $Z.iter ;

    }    

  },

  perform: function action_helper_perform(viz) {

    // console.log('actionHelper perform start') ;

    if(viz === undefined) {
      viz = this ;
    }

    if ( ( $Z.iter - actionHelper.lastAction ) >= viz.config.frameDurationFactor ) { // throttle collision detection if needed

      // console.log('actionHelper perform:', 'viz.item.length', viz.item.length) ;

      actionHelper.collision_foreach( viz, function(response) {
        // console.log('action helper perform collision foreach callback start', 'response', response) ;
        if( response.performSwitch ) {
          response.performSwitch = false ;
          // console.log('action helper perform collision foreach callback', 'response', response) ;
          response.perform() ;
        }
      }) ;

      actionHelper.lastAction = $Z.iter ;

    }

  },

} ;