function fire_bullet (bulletName) {
	console.log('fire bullet', 'this', this, 'bulletName', bulletName) ;
  var _this = this ; // to be removed later by upgrading transitions in vizflow

  if (this[bulletName] !== undefined) { // check if this player char shoots bullets

    var newBullet = copy_object (this[bulletName]) ;
    newBullet.y   = this.item.y + this[bulletName].config.shiftY 

    if (this.orientation === 'r') {
      //console.log ('newBullet', newBullet, 'this', this, 'bullet', this[bulletName]) ;

      newBullet.x          = this.item.x + this[bulletName].config.shiftX ;
      var xNew             = newBullet.x + this[bulletName].config.move ;
      newBullet.transition = this[bulletName].transition(xNew) ;

    } else {

      newBullet.x          = this.item.x - this[bulletName].config.shiftX ;
      var xNew             = newBullet.x - this[bulletName].config.move ;
      newBullet.transition = this[bulletName].transition(xNew) ;

    }

    //console.log ('update_player 64') ;

    this.enemy.hit.detectList.push (newBullet) ;
    // this.enemy.hit.detectList = [this.enemy.item].concat(this.bulletList) ; // optimize later to avoid garbage collection
    // console.log ('update_player 68') ;

    newBullet.transition.end = function () {
      // console.log ('bulletend', _this.bulletList) ;

        var index = _this.enemy.hit.detectList.indexOf (newBullet) ;
        _this.enemy.hit.detectList.splice (index, 1) ; // remove this[bulletName] from vizflow itemlist
        // _this.enemy.hit.detectList = [_this.enemy.item].concat(_this.bulletList) ;  // optimize later to avoid garbage collection

        if (_this.enemy.hit.detectList.length === 1) { // only the player is on the detect list
          detectAction.reset () ;
        }

    //  if (newBullet.x < 0 || newBullet > viz.width - 1) {  // this[bulletName] offscreen
        index = $Z.item().indexOf (newBullet) ;
        $Z.item().splice (index, 1) ; // remove this[bulletName] from vizflow itemlist  
     // } else {  // add more transitions to this[bulletName]
       // create_bullet_transition () ;
     // }
     // console.log ('bulletend', 'end')
    }

    $Z.item().push (newBullet) ;
    this.enemy.hit.set() ; // the player attack starts the collision detection

    //console.log ('update_player end bullet if-block') ;
  }	
}