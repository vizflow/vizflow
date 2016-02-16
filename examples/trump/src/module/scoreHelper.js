var scoreHelper = {

  setup: function score_helper_load(scoreConfig, viz) {

    if( viz === undefined ) {
      viz = this ;
    }

    if (scoreConfig === undefined) {
      scoreConfig = {
        x: 1,
        y: 12,
        image: imageHelper.word({text: '0'}),
      } ;
    }
      
    viz.player.score = itemHelper.setup(scoreConfig, viz) ;

  },
	
} ;