var bulletHelper = {

  fire: function bullet_helper_fire (bulletName, element) {

    // console.log('fire bullet', 'this', this, 'bulletName', bulletName, 'this[bulletName]', this[bulletName]) ;
    // console.log('player helper update attack', 'viz.item.length', viz.item.length) ;

    if(element === undefined) {
      element = this ;
    }

    if (element[bulletName] !== undefined) { // check if element shoots bullets
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