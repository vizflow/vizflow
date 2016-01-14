var detectAction = {
	
  hit: function detect_action_hit () { // here "this" means the "hit config object" used to set up the "hit" action

    // var detectList = [ player.item, enemy.item ] ;
    // console.log('detect_action_hit 0', 'this.detectList', this.detectList, 'this.viz', this.viz)
    var collision  = collision_detect( this.detectList, this.viz.width, this.viz.height ) ;
    // console.log('detect_action_hit 1') ;

    if (collision.list.length > 0) { // a collision between player.item and enemy.item occurred
      // console.log ('detect_attack: collision', collision) ;
      this.perform() ;
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