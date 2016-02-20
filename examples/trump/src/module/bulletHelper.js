var bulletHelper = {

  fire: function bullet_helper_fire (bulletName) {
    // console.log('fire bullet', 'this', this, 'bulletName', bulletName, 'this[bulletName]', this[bulletName]) ;

    if (this[bulletName] !== undefined) { // check if this player char shoots bullets

      var newBullet = copy_object (this[bulletName]) ;

      // console.log('newBullet', newBullet)

      if(this.bulletResponseConfig !== undefined) {
        newBullet.responseSet.hit = hitHelper.setup_response(this.item.viz, newBullet, this.bulletResponseConfig) ;
      }

      newBullet.y   = this.item.y + this[bulletName].config.shiftY ;
      // console.log ('newBullet', newBullet, 'this', this, 'bullet', this[bulletName]) ;

      if (this.orientation === 'r') {
        // console.log('this[bulletName].config.shiftXr', this[bulletName].config.shiftXr) ;

        newBullet.x = this.item.x + this[bulletName].config.shiftXr ;
        var xNew    = newBullet.x + this[bulletName].config.move ;

      } else { 
        // console.log('this[bulletName].config.shiftXl', this[bulletName].config.shiftXl) ;

        if(this === this.item.viz.player) {  // player does not fire bullets to the left in this game
          return ;
        }

        newBullet.x = this.item.x + this[bulletName].config.shiftXl ;
        var xNew    = newBullet.x - this[bulletName].config.move ;

      }

      if(newBullet.transition !== undefined) {
        newBullet.transition = [newBullet.transition(xNew)] ; // overwriting the previous value of newBullet.transition with the output of the newBullet.transition function call
      }

      // if (newBullet.animation !== undefined) {
      //   newBullet.transition.push(newBullet.animation()) ;
      // }

      if(newBullet.fade !== undefined) {
        newBullet.opacity = 0 ;
        newBullet.fade({duration: newBullet.fadeDuration, opacity: 1}) ;
      }

      // console.log('fire bullet', 'transition', newBullet.transition) ;
      // console.log('fire bullet', 'newBullet', newBullet, 'xNew', xNew, 'this orientation', this.orientation) ;
      // console.log('this.adversary.item, newBullet', this.adversary.item, newBullet) ;
      // imageHelper.view(newBullet.image)

      this.item.viz.add_item(newBullet) ;
      // this[bulletName].audio.play() ;

      // console.log ('fire_bullet end bullet if-block') ;
    } 
  },
  
	default_end: function(viz, bullet, target) {

		if(bullet === undefined) {
			bullet = this ;
		}

		var endObject = {

      target: target,

      bullet: bullet,

      run: function () {

        bullet.removeSwitch = true ;

      },

    } ;

    return endObject ; 

 	},

} ;