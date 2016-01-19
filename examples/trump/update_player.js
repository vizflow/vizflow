  function update_player(state) { 
    // console.log ('update_player: this.callback: state', state, 'this', this) ;

    if(this.item.transition !== undefined && this.item.transition.length > 0) {
      // console.log(viz.player.item.transition)
      return ;
    }
    
    var minNstep = 1 ; // minimum number of frames to animate per user input for walking animations
    var transition ;
     switch(state) {
      case 'l' :
        this.orientation = 'l' ;
        this.sprite = this.spriteL ;
        if (this.bulletSprite !== undefined) {
          this.bulletSprite = this.bulletSpriteL ;
          if (this.bullet !== undefined) {
            this.bullet.image = this.bulletSprite.bullet[0] ;
  // viz.player.bullet     = setup_bullet (viz, viz.player, bulletConfig) ;  
          }
          if (this.jumpBullet !== undefined) {         
            // this.jumpBullet = setup_bullet (this.item.viz, this, this.jumpBullet.config) ;  
            this.jumpBullet.image = this.bulletSprite.jump[0] ;

          }
        }

        //this.sprite.rest[0]   = this.sprite.walk[0] ;
        this.loop   = animate_loop (this.loop, this.sprite.walk, this.transitionSet.image, undefined) ;
        //console.log ('update this l0', 'this', this, 'buttonpress.reset', buttonpress.reset, 'this.loop.animation[0]', this.loop.animation[0]) ;
        //console.log('this.loop.animation', this.loop.animation)
        transition = this.loop.animation ;

        var xNew        = Math.max(0, this.item.x - this.xMove) ;
        var xTransition = this.transitionSet.x(xNew) ;
        xTransition.end = buttonpress.reset ;

        transition.push(xTransition) ;

        break ;
      case 'r' :
        this.orientation   = 'r' ;
        this.sprite   = this.spriteR ;
        if (this.bulletSprite !== undefined) {
          this.bulletSprite = this.bulletSpriteR ;
          if (this.bullet !== undefined) {
            this.bullet.image = this.bulletSprite.bullet[0] ;
          }
          if (this.jumpBullet !== undefined) {
            //console.log ('this.jumpBullet.config.shiftX', this.jumpBullet.config.shiftX, 'this.jumpBullet.image.width', this.jumpBullet.image.width) ;
            // this.jumpBullet = setup_bullet (this.item.viz, this, this.jumpBullet.config) ;              
            this.jumpBullet.image = this.bulletSprite.jump[0] ;
          }
        }        
        //console.log ('update_player 27') ;
        this.loop     = animate_loop (this.loop, this.sprite.walk, this.transitionSet.image, undefined) ;
        transition = this.loop.animation ;

        var xNew        = Math.min(this.item.viz.width - this.sprite.rest[0].width, this.item.x + this.xMove) ;
        var xTransition = this.transitionSet.x(xNew) ;
        xTransition.end = buttonpress.reset ;

        transition.push(xTransition) ;

        break ;
      case 'j' :
          // console.log ('update player case j:', this.sprite.jump, this.transitionSet.image, buttonpress.reset, this.sprite.rest[0])
        this.restoreRest = false ;

        var finalFrame = this.sprite.rest[0] ;

        if(this.transitionSet.jump !== undefined) {
          var jumpTransition       = step_transition_func('image', viz.dur)(this.sprite.jump[0]) ;
          // console.log('update player 50', 'this.transitionSet', this.transitionSet) ;
          jumpTransition.child     = animate(this.sprite.jump, this.transitionSet.jump, undefined, this.sprite.rest[0])[0] ;
          transition               = [jumpTransition] ;          
          // transition = animate(this.sprite.jump, this.transitionSet.jump, undefined, finalFrame) ;
        } else {
          transition = animate(this.sprite.jump, this.transitionSet.image, undefined, finalFrame) ;
        }
        // console.log('update player 56') ;
        if (this.sprite.jumpCollision !== undefined) {
          var collisionTransition   = step_transition_func('collisionImage', transition[0].duration)(this.sprite.jumpCollision[0]) ;
          collisionTransition.child = animate (this.sprite.jumpCollision, step_transition_func('collisionImage', jumpTransition.child.duration), this.adversary.hit.remove, this.sprite.clearedFrame)[0] ; 
          // console.log('update player collisionTransition', collisionTransition) ;
          transition.push(collisionTransition) ;
          this.adversary.hit.add() ; // the player attack starts the collision detection
        }        
        
        var yNew        = this.item.y - this.yMove ;
        var yTransition = this.transitionSet.y(yNew) ;
        var _this       = this ;
        yTransition.end = function () {
        //  fire_bullet.call(_this, 'jumpBullet') ;
        } 

        // console.log('update player', 'yTransition', yTransition) ;
        yTransition.child                 = this.transitionSet.float(yNew) ; // just to take up time
        yTransition.child.child           = this.transitionSet.y(this.config.y - this.sprite.height) ;
        // yTransition.child.child.child     = this.transitionSet.image (finalFrame) ;
        yTransition.child.child.element = this ;
        yTransition.child.child.end = function () {
          // console.log('this', 'this.element', this.element) ;
          if(this.element.config.restoreRest) {            
            this.element.restoreRest = true ;
          } 
        }

        transition.push(yTransition) ;

        break ;

      case 'a' :
        //$Z.item (item.push(newBullet)) ;
        fire_bullet.call(this, 'bullet') ;
        var transitionFunc;
        if( this.transitionSet.attack === undefined ) {
          //  console.log ('this.transitionSet.image', this.transitionSet.image) ;
          transitionFunc = this.transitionSet.image ;
        } else {
          transitionFunc = this.transitionSet.attack ;
        }
        // console.log ('updateplayer 101', this.sprite.attack, transitionFunc, buttonpress.reset, this.sprite.rest[0]) ;
        var finalFrame = this.sprite.rest[0] ;
        transition                     = animate(this.sprite.attack, transitionFunc, buttonpress.reset, finalFrame) ;
        // console.log ('update player 105: ', this.sprite.attack, transitionFunc, buttonpress.reset, this.sprite.rest[0]) ;
        // console.log ('update player 109' ) ;
        if (this.sprite.attackCollision !== undefined) {
          var collision_image_transition = step_transition_func('collisionImage', transition[0].duration) ;
          var collisionTransition = animate (this.sprite.attackCollision, collision_image_transition, this.adversary.hit.remove, this.sprite.clearedFrame) ; 
          transition = transition.concat(collisionTransition) ;
        }

        // console.log ('this.callback: transition', transition) ;
        this.adversary.hit.add() ; // the player attack starts the collision detection
        break ;
    }
    if (transition.length > 0) {
      // console.log('this.callback: transition', transition)
      this.item.transition = transition ;
    } else {
      buttonpress.reset () ;
    }

  }
