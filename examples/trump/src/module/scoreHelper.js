var scoreHelper = {

  setup: function score_helper_load(scoreConfig, viz) {

    if( viz === undefined ) {
      viz = this ;
    }

    if (scoreConfig === undefined) {
      scoreConfig = {
        x: 2,
        y: 10,
        inert: true,
      } ;
    }
      
    viz.player.score = itemHelper.setup(scoreConfig, viz) ;

    viz.player.score.value = 0 ;
    viz.player.score.enemyHit = 200 ;
    viz.player.score.counter  = 100 ;

    viz.player.score.config = {
      color: 'rgba(200, 200, 0, 0.8)',
      text: viz.player.score.value,
      px: 24,
    } ;

    viz.player.score.set = function() {
      this.config.text = this.value ;
      this.image = imageHelper.word(this.config) ;
    }

    viz.player.score.increase = function(type) {
      this.value += this[type] ;
      this.set() ;
    }

    viz.player.score.set() ;

    // console.log('viz.player.score', viz.player.score) ;
    // imageHelper.view(viz.player.score.image) ;
  
  },
	
} ;