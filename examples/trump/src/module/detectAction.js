var detectAction = {
	
  hit: function detect_action_hit () { // here "this" means the "hit config object" used to set up the "hit" action

    // console.log('detectAction hit', 'this', this)
      // console.log('this', this, 'detectList', this.detectList)

    if(this.detectList[0] !== undefined && this.detectList[0].constructor !== Array) {
      // console.log('detectaction.hit', 'this, this.detectList', this, this.detectList) ;
      detectAction.collision.call(this, this.detectList) ;
    } else {      
      for (var kList = 0 ; kList < this.detectList.length ; kList++ ) {
        if(this.detectList[kList].length > 0) {
          detectAction.collision.call(this, this.detectList[kList]) ;
        }
      }
    }

    // var detectList = [ player.item, enemy.item ] ;
    // console.log('detect_action_hit 0', 'this.detectList', this.detectList, 'this.viz', this.viz)

  },

  itemPair: [null, null], // temporary variable used by collision()

  collisionConfig: { // temporary variable used by collision()
    width: null, 
    height: null, 
    item: null, 
  },

  source: {  // temporary variable used by collision()
    x: null,
    y: null, 
    image: null,
  },

  target: { // temporary variable used by collision()
    x: null,
    y: null, 
    image: null,
  },

  collision: function detect_action_collision(viz) {

    if(viz === undefined) {
      viz = this ;
    }

    // console.log('detect_action_collision 1', 'detectList', detectList, 'viz.collision', viz.collision) ;

    if (viz.collision !== undefined && viz.collision.count > 0) { // a collision between at least two of the items in the detectList occurred
      // console.log ('detect_action: collision', viz.collision) ;
      collisionConfig.width  = viz.width ; // setup temporary variable used later for detailed collision detection (if necessary)
      collisionConfig.height = viz.height ; 
      for( var kCollision = 0 ; kCollision < viz.collision.list.length ; kCollision++ ) { // loop over all collisions detected globally during the initial check (phase 1)
        // each collision involves a pair of items, each one of which can be considered the "source" and the "target" with respect to some corresponding actions
        detectAction.itemPair[0] = viz.item[viz.collision.list[kItem][0]] ; // copy the 1st of the pair into temporary variable
        detectAction.itemPair[1] = viz.item[viz.collision.list[kItem][1]] ; // copy the 2nd of the pair into temporary variable
        for(var kPair = 0 ; kPair < 1 ; kPair++) { // either item can be considered the "source" or the "target", so loop over both and perform any corresponding actions that might exist
          var targetItem = detectAction.itemPair[kPair] ; // by convention, the target item stores the hit config object for the corresponding action
          var sourceItem = detectAction.itemPair[(kPair + 1) % 2] ; // by convention, the source item is checked by the target item for the appropriateness of its type
          if(targetItem.hit !== undefined && targetItem.hit !== null) { // perform any remaining checks to verify that the pair of items constitutes a valid collision:
            // 1. check the type of source item hitting the target item to see if it is a valid hit: 
            var typeCheck = targetItem.hit.type_check(sourceItem) ; // boolean variable storing the resuls of the type-validity check function contained in the target item's hit config object
            if(typeCheck) { // the target item type matches the source item, so we can perform a detailed collision check for collision image overlap (phase 2)

              var targetCollisionImage  = targetItem.hit.targetCollisionImage[targetItem.image] ; // use the item's current display image as the key for the collision image lookup table 
              var sourceCollisionImage  = sourceItem.hit.sourceCollisionImage[sourceItem.image] ; // use the item's current display image as the key for the collision image lookup table 

              detectAction.source.image = sourceCollisionImage ; // copy into temporary object used by collision detection function
              detectAction.source.x     = sourceItem.x ; 
              detectAction.source.y     = sourceItem.y ; 

              detectAction.target.image = targetCollisionimage ; 
              detectAction.target.x     = targetItem.x ; 
              detectAction.target.y     = targetItem.y ; 

              detectAction.itemPair[0] = detectAction.target ;
              detectAction.itemPair[1] = detectAction.source ;

              detectAction.collisionConfig.item = detectAction.itemPair ;

              var collision = collision_detect(detectAction.collisionConfig) ;

              if( collision.list.length > 0 ) { // this means that the displayed images are overlapping (will optimize computational efficiency later #todo)
              // console.log ('detect_action: collision perform action', viz.collision.detect[detectList[kItem1]][detectList[kItem2]], 'kitem1', kItem1, 'kItem2', kItem2) ;
                performAction.add(targetItem.hit) ; // all checks passed, stage the action for execution
              }

            }

          }

        }

      }
      //performAction.set.call(this) ;
      //this.perform () ;
    }

  },

  add: function detect_action_add (action) {

    if(action === undefined) {
      action = this ;
    }

    var detectActionList = $Z._detect ;
    var index = detectActionList.indexOf (this) ;
    if (index === -1) {
      detectActionList.push(this) ;
    } else {
      detectActionList[index] = this ;
    }    

  },

  remove: function detect_action_remove (action) {

    if(action === undefined) {
      action = this ;
    }
    var detectActionList = $Z._detect ;
    var index = detectActionList.indexOf(action) ;
    if (index === -1) {
      return ; // nothing to do
    } else {
      detectActionList.splice(index, 1) ;
    }    

  },

  set: function detect_action_set (action) {

    if(action === undefined) {
      action = this ;
    }
    // console.log('detect action set', 'this', this) ;
    $Z.detect([action]) ;

  },

  reset: function detect_action_reset () {

    // console.log('detect action reset', 'this', this) ;
    $Z.detect([]) ; // turn off detection

  },

} ;