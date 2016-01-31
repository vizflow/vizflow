var actionHelper = {

  collision_foreach: function action_helper_collision_foreach(func) {

    if (viz.collision !== undefined && viz.collision.count > 0) { // at least one collision between occurred
      // console.log ('detect_action: collision', viz.collision) ;

      for( var kCollision = 0 ; kCollision < viz.collision.list.length ; kCollision++ ) { // loop over all collisions detected globally during the initial check (phase 1)

        // each collision involves a pair of items, each one of which can be considered the "source" and the "target" with respect to some corresponding actions

        for( var kPair = 0 ; kPair < 1 ; kPair++ ) { // either item can be considered the "source" or the "target", so loop over both and perform any corresponding actions that might exist

          var targetItem = viz.item[viz.collision.list[kItem][kPair]] ;           // by convention, the target item stores the hit config object for the corresponding action
          var sourceItem = viz.item[viz.collision.list[kItem][(kPair + 1) % 2]] ; // by convention, the source item is checked by the target item for the appropriateness of its type

          for( var action in targetItem.actionSet ) {

            func(action, sourceItem) ;

          }
        }
      }
    }

  },

  detect: function action_helper_detect(viz) {

    if(viz === undefined) {
      viz = this ;
    }

    actionHelper.collision_foreach( function(action, sourceItem) {

      if( action.detectSwitch && action.detect(sourceItem) ) { // perform action after passing detailed detection check             
        action.peformSwitch = true ; // stage the action for performance
      }

    }) ;

  },

  perform: function action_helper_perform(viz) {

    if(viz === undefined) {
      viz = this ;
    }

    actionHelper.collision_foreach( function(action) {
      if(action.peformSwitch) {
        action.perform() ;
        action.performSwitch = false ;
      }
    }) ;

  },

} ;