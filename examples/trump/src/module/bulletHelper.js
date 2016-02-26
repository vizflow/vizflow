var bulletHelper = {

  fire: function bullet_helper_fire (bulletName) {
    // console.log('fire bullet', 'this', this, 'bulletName', bulletName, 'this[bulletName]', this[bulletName]) ;
    // console.log('player helper update attack', 'viz.item.length', viz.item.length) ;

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

      },

    } ;

    return endObject ; 

 	},

} ;