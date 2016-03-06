var bulletHelper = {

  fire: function bullet_helper_fire (bulletName) {
    // console.log('fire bullet', 'this', this, 'bulletName', bulletName, 'this[bulletName]', this[bulletName]) ;
    // console.log('player helper update attack', 'viz.item.length', viz.item.length) ;

    if (this[bulletName] !== undefined) { // check if this player char shoots bullets

      if (this[bulletName].busy === true) {
        return ; // some bullets only allow one at a time
      }

      if (this[bulletName].busy === false) { // i.e. only one bullet is allowed at a time
        this[bulletName].busy = true ;
      }

      var newBullet = copy_object (this[bulletName]) ;
      newBullet.original = this[bulletName] ;

      // console.log('newBullet', newBullet)

      if(this.bulletResponseConfig !== undefined) {
        newBullet.responseSet.hit = hitHelper.setup(this.item.viz, newBullet, this.bulletResponseConfig) ;
      }

      newBullet.y   = this.item.y + this[bulletName].config.shiftY ;
      // console.log ('newBullet', newBullet, 'this', this, 'bullet', this[bulletName]) ;

      newBullet.x = this.item.x + this[bulletName].config.shiftXr ;
      var xNew    = newBullet.x + this[bulletName].config.move ;

      if(newBullet['bullet' + this.level] !== undefined && bulletName[0] === 'b' ) {
        newBullet.transition = [newBullet['bullet' + this.level](xNew)] ;
      } else if (newBullet['jump_bullet_transition'] !== undefined && bulletName[0] === 'j') {
        newBullet.transition = [newBullet['jump_bullet_transition'](xNew)] ;
      } else if( newBullet.transition !== undefined ) {
        newBullet.transition(xNew) ;  // overwriting the previous value of newBullet['bullet' + this.level] with the output of the newBullet['bullet' + this.level] function call
      }

      // if (newBullet.animation !== undefined) {
      //   newBullet['bullet' + this.level].push(newBullet.animation()) ;
      // }
      // console.log('fire bullet', 'transition', newBullet['bullet' + this.level]) ;
      // console.log('fire bullet', 'newBullet', newBullet, 'xNew', xNew, 'this orientation', this.orientation) ;
      // console.log('this.adversary.item, newBullet', this.adversary.item, newBullet) ;
      // imageHelper.view(newBullet.image)

      itemHelper.add.call(newBullet) ;
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

        bullet.inert = true ;
        bullet.removeSwitch = true ;
        if(bullet.original.busy === true) {
          bullet.original.busy = false ;
        }

      },

    } ;

    return endObject ; 

 	},

} ;