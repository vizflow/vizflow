var bulletHelper = {
	default_end: function(viz, bullet, target) {

		if(bullet === undefined) {
			bullet = this ;
		}

		var endObject = {

      target: target,

      bullet: bullet,

      run: function () {

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