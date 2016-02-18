  function update_player(state) { 
    // console.log ('update_player: this.callback: state', state, 'this', this) ;

    // if(this.item.transition !== undefined && this.item.transition.length > 0) {
    //   // console.log(viz.player.item.transition)
    //   return ;
    // }
    this.state = state ;
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
        var loop   = animate_loop (this.loop.walk, this.sprite.walk, this.transitionSet.image) ;
        this.loop.walk.position = loop.position ;
        //console.log ('update this l0', 'this', this, 'buttonpress.reset', buttonpress.reset, 'this.loop.animation[0]', this.loop.animation[0]) ;
        //console.log('this.loop.animation', this.loop.animation)
        transition = loop.animation ;

        var xNew        = Math.max(-Math.floor(this.sprite.original.walk[0].width * 0.5), this.item.x - this.xMove) ;
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
        // console.log ('update_player 27') ;
        var loop     = animate_loop (this.loop.walk, this.sprite.walk, this.transitionSet.image) ;
        // console.log('update player 57') ;
        this.loop.walk.position = loop.position ;
        transition = loop.animation ;

        var xNew        = Math.min(Math.floor(this.item.viz.width - 0.5 * this.sprite.original.rest[0].width), this.item.x + this.xMove) ;
        var xTransition = this.transitionSet.x(xNew) ;
        xTransition.end = buttonpress.reset ;

        transition.push(xTransition) ;

        break ;

      case 'j' :
        // console.log ('update player case j:', this.sprite.jump, this.transitionSet.image, buttonpress.reset, this.sprite.rest[0])

        if(transitionHelper.find('y', this.item.transition) !== -1) {
          return ; // currently in the process of jumping so do nothing
        }
        this.restoreRest = false ;

        var finalFrame = this.sprite.rest[0] ;

        if(this.transitionSet.jump !== undefined) {
          var jumpTransition       = step_transition_func('image', this.item.viz.dur)(this.sprite.jump[0]) ;
          jumpTransition.child     = animate(this.sprite.jump, this.transitionSet.jump, undefined, this.sprite.rest[0])[0] ;
          transition               = [jumpTransition] ;          
          // transition = animate(this.sprite.jump, this.transitionSet.jump, undefined, finalFrame) ;
        } else {
          transition = animate(this.sprite.jump, this.transitionSet.image, undefined, finalFrame) ;
        }
        // console.log('update player 56') ;
        
        var yNew        = this.item.y - this.yMove ;
        var yTransition = this.transitionSet.y(yNew) ;

        // console.log('update player', 'yTransition', yTransition) ;
        yTransition.child                 = this.transitionSet.float(yNew) ; // just to take up time
        yTransition.child.child           = this.transitionSet.y(this.config.y) ; // - this.sprite.jump[0].height) ;
        // yTransition.child.child.child     = this.transitionSet.image (finalFrame) ;
        yTransition.child.child.element = this ;
        yTransition.child.child.end = function () {
          // console.log('this', 'this.element', this.element) ;
          if(this.element.config.restoreRest) {            
            this.element.restoreRest = true ;
          } 
        }

        if(this.orientation === 'l') {
          var xNew = Math.max(-Math.floor(this.sprite.original.walk[0].width * 0.5), this.item.x - this.xJumpMove) ; 
        } else {
          var xNew = Math.min(Math.floor(this.item.viz.width - 0.5 * this.sprite.original.rest[0].width), this.item.x + this.xJumpMove) ;     

          // check for potential collisions and if so, trigger a zoom effect 

          var playerR = this.item.image.xNew + this.sprite.original.jump[0].width ;
          var enemyL  = this.item.viz.enemy.item.x ;

          var tol = Infinity ;
          if(enemyL - playerR < tol) {
            // console.log('update player zoom') ;
            var scale = 0.6 ;
            var duration = 6 * this.config.jumpDuration + this.config.floatDuration ;

            // console.log('update player jump zoom duration', 'duration', duration)

            var newWidth  = this.item.viz.width * scale ;
            var newHeight = this.item.viz.height * scale ;

            this.item.viz.zoom_inout({
              duration: duration, 
              x: this.item.viz.enemy.item.x - 40, 
              y: -10, 
              width:  newWidth, 
              height: newHeight,
            }) ;
          }

        }
        var xTransition = this.transitionSet.xJump(xNew) ;

        transition.push(xTransition) ;  
        transition.push(yTransition) ;

        // var panDur = yTransition.duration ; 
        // this.item.viz.panY(panDur, [-12, -12, 0]) ;

        viz.audio.jump1.play() ;

        break ;

      case 'a' :
        //$Z.item (item.push(newBullet)) ;
        // console.log('update player 116') ;
        // if (transitionHelper.find('y', this.item.transition) > -1) {
        //   break ;  // don't allow punch attacks while moving up or down
        // }  
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

        var loop = animate_loop(
          this.loop.attack,
          this.sprite.attack,
          transitionFunc,
          buttonpress.reset
        ) ;

        this.loop.attack.position = loop.position ;
        transition                = loop.animation ;
        // console.log ('update player 105: ', 'this.loop', this.loop, 'this.sprite.attack', this.sprite.attack, 'transition', transition) ; //this.sprite.attack, transitionFunc, buttonpress.reset, this.sprite.rest[0]) ;
        // console.log ('update player 109' ) ;

        // console.log ('this.callback: transition', transition) ;
        break ;

    }

    if (transition.length > 0) {
      // console.log('this.callback: transition', transition)
      //this.item.transition = transition ;
      var replacementSwitch = true ;
      transitionHelper.add.call(this.item, transition, replacementSwitch) ;
      // console.log('update player after transitionhelper', 'this.item', this.item) ;
    } else {
      buttonpress.reset () ;
    }

  }
