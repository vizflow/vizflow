var bulletHelper = {

  setup: function bullet_helper_setup (viz, player, bulletConfig) {

   function bullet_transition(xNew) {
      var bulletDur         = viz.dur * 20 ;
      var transition = $Z.transition.rounded_linear_transition_func ( 'x', bulletDur )(xNew) ; // function accepting an x end-value and returning a transition object
      transition.end = bulletHelper.default_end(viz, this, viz.enemy) ;
      return transition ;
    }

    function beam_transition(xNew) {
      // viz.player.bullet.fade ({
      //   opacity: 0,
      //   duration: viz.frameDuration * viz.player.bulletSprite['bullet' + viz.player.level].length * 1.25,
      // }) ;
      this.opacity = 1 ;
      var transition = animate (viz.player.bulletSprite['bullet' + viz.player.level], step_transition_func('image', viz.frameDuration))[0] ;
      var child = transitionHelper.get_child (transition, viz.player.bulletSprite['bullet' + viz.player.level].length - 1) ;
      child.end = bulletHelper.default_end(viz, this, viz.enemy) ;
      // transitionHelper.add_end.call (this, 'image', viz.player.bulletSprite['bullet' + viz.player.level].length -1, bulletHelper.default_end(viz, this, viz.enemy)) ;    
      // console.log('bullet helper beam trnsition', 'transition', transition, 'this', this) ;  
      return transition ;
    }

    var bullet = {
      viz: viz, 
      config: bulletConfig,
      x: player.item.x + bulletConfig.shiftXr,
      y: player.item.y + bulletConfig.shiftY,
      image: bulletConfig.image,
      transition: bulletConfig.transition,
      animation: bulletConfig.animation,
      render: drawHelper.image,
      inert: false,
      type: 'player',
      singleSwitch: true,
      collision_image: actionHelper.collision_image,
      fade: imageEffectHelper.fade,
      bullet0: bullet_transition,
      bullet1: beam_transition,
      bullet2: beam_transition,
      bullet3: beam_transition,      
    } ;

    return bullet ;

  },  

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

      if(newBullet['bullet' + this.level] !== undefined) {
        newBullet.transition = [newBullet['bullet' + this.level](xNew)] ;
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