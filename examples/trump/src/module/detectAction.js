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

  collision: function detect_action_collision(detectList) {

    // console.log('detect_action_collision 1', 'detectList', detectList, 'this.viz.collision', this.viz.collision) ;

    if (this.viz.collision !== undefined && this.viz.collision.count > 0) { // a collision between at least two of the items in the detectList occurred
      // console.log ('detect_action: collision', this.viz.collision) ;
      for( var kItem1 = 0 ; kItem1 < detectList.length - 1 ; kItem1++ ) {
        for ( var kItem2 = kItem1 + 1 ; kItem2 < detectList.length ; kItem2++ ) {
          //console.log('this.viz.collision[detectList[kItem1]]', this.viz.collision[detectList[kItem1]], 'this.viz.collision[detectList[kItem2]]', this.viz.collision[detectList[kItem2]]) ;
          if(this.viz.collision.detect[detectList[kItem1]] !== undefined && this.viz.collision.detect[detectList[kItem1]][detectList[kItem2]] === true) {
            // console.log ('detect_action: collision perform action', this.viz.collision.detect[detectList[kItem1]][detectList[kItem2]], 'kitem1', kItem1, 'kItem2', kItem2) ;
            performAction.add.call(this) ;
            return ;
          }
        }
      }
      //performAction.set.call(this) ;
      //this.perform () ;
    }

  },

  add: function detect_action_add () {
    var detectActionList = $Z._detect ;
    var index = detectActionList.indexOf (this) ;
    if (index === -1) {
      detectActionList.push(this) ;
    } else {
      detectActionList[index] = this ;
    }    
  },

  remove: function detect_action_remove () {
    var detectActionList = $Z._detect ;
    var index = detectActionList.indexOf (this) ;
    if (index === -1) {
      return ; // nothing to do
    } else {
      detectActionList.splice(index, 1) ;
    }    
  },

  set: function detect_action_set () {
    // console.log('detect action set', 'this', this) ;
    $Z.detect([this]) ;
  },

  reset: function detect_action_reset () {
    // console.log('detect action reset', 'this', this) ;
    $Z.detect([]) ; // turn off detection
  },

} ;