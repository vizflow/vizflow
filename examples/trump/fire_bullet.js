function fire_bullet (bulletName) {
	// console.log('fire bullet', 'this', this, 'bulletName', bulletName, 'this[bulletName]', this[bulletName]) ;
  var _this = this ; // to be removed later by upgrading transitions in vizflow

  if (this[bulletName] !== undefined) { // check if this player char shoots bullets

    var newBullet = copy_object (this[bulletName]) ;
    newBullet.y   = this.item.y + this[bulletName].config.shiftY 
    console.log ('newBullet', newBullet, 'this', this, 'bullet', this[bulletName], 'shiftX', this[bulletName].config.shiftX) ;

    if (this.orientation === 'r') {

      newBullet.x          = this.item.x + this[bulletName].config.shiftXr ;
      var xNew             = newBullet.x + this[bulletName].config.move ;
      newBullet.transition = this[bulletName].transition(xNew) ;

    } else {

      newBullet.x          = this.item.x + this[bulletName].config.shiftXl ;
      var xNew             = newBullet.x - this[bulletName].config.move ;
      newBullet.transition = this[bulletName].transition(xNew) ;

    }
    // console.log('fire bullet', 'newBullet', newBullet, 'xNew', xNew, 'this orientation', this.orientation) ;

    //console.log ('update_player 64') ;

    this.adversary.hit.detectList.push (newBullet) ;
    // this.adversary.hit.detectList = [this.adversary.item].concat(this.bulletList) ; // optimize later to avoid garbage collection
    // console.log ('update_player 68') ;

    newBullet.transition.end = function () {
      // console.log ('bulletend', _this.bulletList) ;

        var index = _this.adversary.hit.detectList.indexOf (newBullet) ;
        _this.adversary.hit.detectList.splice (index, 1) ; // remove this[bulletName] from vizflow itemlist
        // _this.adversary.hit.detectList = [_this.adversary.item].concat(_this.bulletList) ;  // optimize later to avoid garbage collection

        if (_this.adversary.hit.detectList.length === 1) { // only the player is on the detect list
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
    this.adversary.hit.add() ; // the player attack starts the collision detection

    console.log ('update_player end bullet if-block') ;
  }	
}