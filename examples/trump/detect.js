var detect = {
	
  attack: function detect_attack() {

    // var detectList = [ player.item, enemy.item ] ;
    //console.log('detect_attack', 'detectList', detectList)
    var collision  = collision_detect( this.detectList, this.viz.width, this.viz.height ) ;

    if (collision.list.length > 0) { // a collision between player.item and enemy.item occurred
      //console.log ('detect_attack: collision', collision) ;
      action.set.bind(this) ;
    }

  },

  set: function detect_set () {
    $Z.detect([this.detectConfig]) ;
  },

  reset: function detect_reset () {
   $Z.detect([]) ; // turn off detection
  },

} ;