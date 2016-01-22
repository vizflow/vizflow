function fire_bullet (bulletName) {
	// console.log('fire bullet', 'this', this, 'bulletName', bulletName, 'this[bulletName]', this[bulletName]) ;

  if (this[bulletName] !== undefined) { // check if this player char shoots bullets

    var newBullet = copy_object (this[bulletName]) ;
    newBullet.y   = this.item.y + this[bulletName].config.shiftY 
    // console.log ('newBullet', newBullet, 'this', this, 'bullet', this[bulletName]) ;

    if (this.orientation === 'r') {
      // console.log('this[bulletName].config.shiftXr', this[bulletName].config.shiftXr) ;

      newBullet.x          = this.item.x + this[bulletName].config.shiftXr ;
      var xNew             = newBullet.x + this[bulletName].config.move ;

    } else {
      // console.log('this[bulletName].config.shiftXl', this[bulletName].config.shiftXl) ;

      newBullet.x          = this.item.x + this[bulletName].config.shiftXl ;
      var xNew             = newBullet.x - this[bulletName].config.move ;

    }

    newBullet.transition = newBullet.transition(xNew) ; // overwriting the previous value of newBullet.transition with the output of the newBullet.transition function call

    // console.log('fire bullet', 'transition', newBullet.transition) ;
    // console.log('fire bullet', 'newBullet', newBullet, 'xNew', xNew, 'this orientation', this.orientation) ;

    //console.log ('update_player 64') ;

    this.adversary.hit.detectList.push (newBullet) ;
    // this.adversary.hit.detectList = [this.adversary.item].concat(this.bulletList) ; // optimize later to avoid garbage collection
    // console.log ('update_player 68') ;

    $Z.item().push (newBullet) ;
    this[bulletName].audio.play() ;
    this.adversary.hit.add() ; // the player attack starts the collision detection

    // console.log ('update_player end bullet if-block') ;
  }	
}