var bulletHelper = {
	default_end: function(viz, bullet, target) {

		if(bullet === undefined) {
			bullet = this ;
		}

		var endObject = {

      target: target,

      bullet: bullet,

      run: function () {
        // console.log ('bulletend start', 'this', this, 'this.target.hit.detectList', this.target.hit.detectList) ;

        if(this.target.hit.detectList[0] !== undefined && this.target.hit.detectList[0].constructor === Array) {

          // console.log('bulletend mid 1') ;

          for( var kList = this.target.hit.detectList.length - 1 ; kList >= 0 ; kList--) { // iterate backwards to allow safe splicing 

            var index = this.target.hit.detectList[kList].indexOf (this.bullet) ;
            this.target.hit.detectList[kList].splice (index, 1) ; 
            
            if (this.target.hit.detectList[kList].length < 2) { // fewer than two items on the detect list
              this.target.hit.detectList.splice(kList, 1) ;
            }

          }

          if (this.target.hit.detectList.length === 0) { // only the player is on the detect list
            detectAction.reset () ;
          }

        } else {        

          // console.log('bulletend mid 2', 'this.target.hit.detectList', this.target.hit.detectList) ;

          var index = this.target.hit.detectList.indexOf (this.bullet) ;
          this.target.hit.detectList.splice (index, 1) ; 

          if (this.target.hit.detectList.length < 2) { // only the player is on the detect list
            detectAction.reset () ;
          }
        }


        // this.target.hit.detectList = [this.target.item].concat(this.element.bulletList) ;  // optimize later to avoid garbage collection

        // if (newBullet.x < 0 || newBullet > viz.width - 1) {  // bullet[bulletName] offscreen
        var index = $Z.item().indexOf (this.bullet) ;
        $Z.item().splice (index, 1) ; // remove bullet[bulletName] from vizflow itemlist  
        // } else {  // add more transitions to bullet[bulletName]
         // create_bullet_transition () ;
        // }
        // console.log ('bulletend', 'end') ;
      },

    } ;

    return endObject ; 

 	},
} ;