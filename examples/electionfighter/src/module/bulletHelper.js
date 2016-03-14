var bulletHelper = {

  fire: function bullet_helper_fire (bulletName, element) {
    // console.log('fire bullet', 'this', this, 'bulletName', bulletName, 'this[bulletName]', this[bulletName]) ;
    // console.log('player helper update attack', 'viz.item.length', viz.item.length) ;

    if(element === undefined) {
      element = this ;
    }

    if (element[bulletName] !== undefined) { // check if element shoots bullets

      if (element[bulletName].busy === true) {
        return ; // some bullets only allow one at a time
      }

      if(element)

      if (element[bulletName].busy === false) { // i.e. only one bullet is allowed at a time
        element[bulletName].busy = true ;
      }

      var newBullet = copy_object (element[bulletName]) ;
      newBullet.original = element[bulletName] ;

      // console.log('newBullet', newBullet)

      if(element.bulletResponseConfig !== undefined) {
        newBullet.responseSet.hit = hitHelper.setup(element.item.viz, newBullet, element.bulletResponseConfig) ;
      }

      newBullet.y   = element.item.y + element[bulletName].config.shiftY ;
      // console.log ('newBullet', newBullet, 'element', element, 'bullet', element[bulletName]) ;

      newBullet.x = element.item.x + element[bulletName].config.shiftXr ;
      var xNew    = newBullet.x + element[bulletName].config.move ;

      if(newBullet['bullet' + element.level] !== undefined && bulletName[0] === 'b' ) {
        newBullet.transition = [newBullet['bullet' + element.level](xNew)] ;
      } else if (newBullet['jump_bullet_transition'] !== undefined && bulletName[0] === 'j') {
        newBullet.transition = [newBullet['jump_bullet_transition'](xNew)] ;
      } else if( newBullet.transition !== undefined ) {
        newBullet.transition(xNew) ;  // overwriting the previous value of newBullet['bullet' + element.level] with the output of the newBullet['bullet' + element.level] function call
      }

      // if (newBullet.animation !== undefined) {
      //   newBullet['bullet' + element.level].push(newBullet.animation()) ;
      // }
      // console.log('fire bullet', 'transition', newBullet['bullet' + element.level]) ;
      // console.log('fire bullet', 'newBullet', newBullet, 'xNew', xNew, 'element orientation', element.orientation) ;
      // console.log('element.adversary.item, newBullet', element.adversary.item, newBullet) ;
      // imageHelper.view(newBullet.image)

      itemHelper.add.call(newBullet) ;
      // element[bulletName].audio.play() ;

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