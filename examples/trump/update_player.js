  function update_player(state) { 
    // console.log ('update_player: this.callback: state', state, 'this', this) ;

    if(this.item.transition !== undefined && this.item.transition.length > 0) {
      // console.log(viz.player.item.transition)
      return ;
    }

    var _this = this ; // to be removed later by upgrading transitions in vizflow
    
    var minNstep = 1 ; // minimum number of frames to animate per user input for walking animations
    var transition ;
     switch(state) {
      case 'l' :
        this.orientation = 'l' ;
        this.sprite = this.spriteL ;
        //this.sprite.rest[0]   = this.sprite.walk[0] ;
        this.loop   = animate_loop (this.loop, this.sprite.walk, this.transitionSet.image, undefined) ;
        //console.log ('update this l0', 'this', this, 'buttonpress.reset', buttonpress.reset, 'this.loop.animation[0]', this.loop.animation[0]) ;
        //console.log('this.loop.animation', this.loop.animation)
        transition = this.loop.animation ;

        var xNew   = Math.max(0, this.item.x - this.xMove) ;
        var xTransition = this.transitionSet.x(xNew) ;
        xTransition.end = buttonpress.reset ;

        transition.push(xTransition) ;

        break ;
      case 'r' :
        this.orientation   = 'r' ;
        this.sprite   = this.spriteR ;
        //console.log ('update_player 27') ;
        this.loop     = animate_loop (this.loop, this.sprite.walk, this.transitionSet.image, undefined) ;
        transition = this.loop.animation ;

        var xNew        = Math.min(this.item.viz.width - this.sprite.rest[0].width, this.item.x + this.xMove) ;
        var xTransition = this.transitionSet.x(xNew) ;
        xTransition.end = buttonpress.reset ;

        transition.push(xTransition) ;

        break ;
      case 'j' :
        transition = animate(this.sprite.jump, this.transitionSet.image, buttonpress.reset, this.sprite.rest[0]) ;
        break ;
      case 'a' :

        if (this.bulletList !== undefined) {

          var newBullet = copy_object (this.bullet) ;

            if (this.orientation === 'r') {
              //console.log ('newBullet', newBullet, 'this', this, 'bullet', this.bullet) ;

              newBullet.x          = this.item.x + this.bullet.config.shiftX ;
              var xNew             = newBullet.x + this.bullet.config.move ;
              newBullet.transition = this.bullet.transition(xNew) ;

            } else {
              newBullet.x          = this.item.x - this.bullet.config.shiftX ;
              var xNew             = newBullet.x - this.bullet.config.move ;
              newBullet.transition = this.bullet.transition(xNew) ;
            }

          //console.log ('update_player 64') ;

          this.bulletList.push (newBullet) ;
          //console.log ('update_player 68') ;

          newBullet.transition.end = function () {
           //console.log ('bulletend', _this.bulletList) ;

              var index = _this.bulletList.indexOf (newBullet) ;
              _this.bulletList.splice (index, 1) ; // remove this.bullet from vizflow itemlist  

              if (_this.bulletList.length === 0) {
                detectAction.reset () ;
              }

          //  if (newBullet.x < 0 || newBullet > viz.width - 1) {  // this.bullet offscreen
              index = $Z.item().indexOf (newBullet) ;
              $Z.item().splice (index, 1) ; // remove this.bullet from vizflow itemlist  
           // } else {  // add more transitions to this.bullet
             // create_bullet_transition () ;
           // }
           // console.log ('bulletend', 'end')
          }

          $Z.item().push (newBullet) ;
          //console.log ('update_player end') ;
        }
        //$Z.item (item.push(newBullet)) ;

        var transitionFunc;
        if( this.transitionSet.attack === undefined ) {
          transitionFunc = this.transitionSet.image ;
        } else {
          transitionFunc = this.transitionSet.attack ;
        }
        transition                     = animate(this.sprite.attack, transitionFunc, buttonpress.reset, this.sprite.rest[0]) ;
        var collision_image_transition = step_transition_func('collisionImage', transition[0].duration) ;
        var collisionTransition = animate (this.sprite.attackCollision, collision_image_transition, this.enemy.hit.reset, this.sprite.clearedFrame) ; 
        transition = transition.concat(collisionTransition) ;
        // console.log ('this.callback: transition', transition) ;
        this.enemy.hit.set() ; // the player attack starts the collision detection
        break ;
    }
    if (transition.length > 0) {
      // console.log('this.callback: transition', transition)
      this.item.transition = transition ;
    } else {
      buttonpress.reset () ;
    }

  }
