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
      newBullet.transition = this[bulletName].transition(xNew) ;

    } else {
      // console.log('this[bulletName].config.shiftXl', this[bulletName].config.shiftXl) ;

      newBullet.x          = this.item.x + this[bulletName].config.shiftXl ;
      var xNew             = newBullet.x - this[bulletName].config.move ;
      newBullet.transition = this[bulletName].transition(xNew) ;

    }
    // console.log('fire bullet', 'newBullet', newBullet, 'xNew', xNew, 'this orientation', this.orientation) ;

    //console.log ('update_player 64') ;

    this.adversary.hit.detectList.push (newBullet) ;
    // this.adversary.hit.detectList = [this.adversary.item].concat(this.bulletList) ; // optimize later to avoid garbage collection
    // console.log ('update_player 68') ;

    newBullet.transition.end = {

      element: this,

      run: function () {
        // console.log ('bulletend', this.element.bulletList) ;

          var index = this.element.adversary.hit.detectList.indexOf (newBullet) ;
          this.element.adversary.hit.detectList.splice (index, 1) ; // remove this[bulletName] from vizflow itemlist
          // this.element.adversary.hit.detectList = [this.element.adversary.item].concat(this.element.bulletList) ;  // optimize later to avoid garbage collection

          if (this.element.adversary.hit.detectList.length === 1) { // only the player is on the detect list
            detectAction.reset () ;
          }

      //  if (newBullet.x < 0 || newBullet > viz.width - 1) {  // this[bulletName] offscreen
          index = $Z.item().indexOf (newBullet) ;
          $Z.item().splice (index, 1) ; // remove this[bulletName] from vizflow itemlist  
       // } else {  // add more transitions to this[bulletName]
         // create_bullet_transition () ;
       // }
       // console.log ('bulletend', 'end')
      },

    } ;

    $Z.item().push (newBullet) ;
    this.adversary.hit.add() ; // the player attack starts the collision detection

    // console.log ('update_player end bullet if-block') ;
  }	
}