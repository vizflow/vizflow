var bulletHelper = {
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