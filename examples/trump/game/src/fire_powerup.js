function fire_powerup (name) {

  // console.log('fire powerup', 'this', this, 'name', name, 'this[name]', this[name]) ;

  // if (this[name] !== undefined) { // check if this character shoots powerups

  var newPowerup = copy_object ( this[name] ) ;

  // console.log('newPowerup', newPowerup)

  if(this.powerupResponseConfig !== undefined) {
    newPowerup.actionSet.hit = hitHelper.setup(this.item.viz, newPowerup, this.powerupResponseConfig) ;
  }

  newPowerup.y = this.item.y + this[name].config.shiftY ;
  // console.log ('newPowerup', newPowerup, 'this', this, 'powerup', this[name]) ;

  if (this.orientation === 'r') {

    // console.log('this[name].config.shiftXr', this[name].config.shiftXr) ;

    newPowerup.x = this.item.x  + this[name].config.shiftXr ;
    var xNew     = newPowerup.x + this[name].config.move ;

  } else { 

    // console.log('this[name].config.shiftXl', this[name].config.shiftXl) ;

    if(this === this.item.viz.player) {  // player does not fire powerups to the left in this game
      return ;
    }

    newPowerup.x = this.item.x  + this[name].config.shiftXl ;
    var xNew     = newPowerup.x - this[name].config.move ;

  }

  if(newPowerup.transition !== undefined) {
    newPowerup.transition = [newPowerup.transition(xNew)] ; // overwriting the previous value of newPowerup.transition with the output of the newPowerup.transition function call
  }

  // if (newPowerup.animation !== undefined) {
  //   newPowerup.transition.push(newPowerup.animation()) ;
  // }

  if(newPowerup.fade !== undefined) {

    newPowerup.opacity = 0 ;
    newPowerup.fade({duration: newPowerup.fadeDuration, opacity: 1}) ;

  }

  // console.log('fire powerup', 'transition', newPowerup.transition) ;
  // console.log('fire powerup', 'newPowerup', newPowerup, 'xNew', xNew, 'this orientation', this.orientation) ;
  // console.log('this.adversary.item, newPowerup', this.adversary.item, newPowerup) ;
  // imageHelper.view(newPowerup.image)

  this.item.viz.add_item(newPowerup) ;

  // this[name].audio.play() ;
  // console.log ('fire_powerup end powerup if-block') ;

}