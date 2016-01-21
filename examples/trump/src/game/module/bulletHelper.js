var bulletHelper = {
	default_end: function(viz, bullet) {

		if(bullet === undefined) {
			bullet = this ;
		}

		var endObject = {

      element: viz.player,

      bullet: bullet,

      run: function () {
        // console.log ('bulletend start', 'this', this) ;

        var index = this.element.adversary.hit.detectList.indexOf (this.bullet) ;
        this.element.adversary.hit.detectList.splice (index, 1) ; // remove bullet[bulletName] from vizflow itemlist
        // this.element.adversary.hit.detectList = [this.element.adversary.item].concat(this.element.bulletList) ;  // optimize later to avoid garbage collection

        if (this.element.adversary.hit.detectList.length === 1) { // only the player is on the detect list
          detectAction.reset () ;
        }

        // if (newBullet.x < 0 || newBullet > viz.width - 1) {  // bullet[bulletName] offscreen
        index = $Z.item().indexOf (this.bullet) ;
        $Z.item().splice (index, 1) ; // remove bullet[bulletName] from vizflow itemlist  
        // } else {  // add more transitions to bullet[bulletName]
         // create_bullet_transition () ;
        // }
        //console.log ('bulletend', 'end') ;
      },

    } ;

    return endObject ; 

 	},
} ;