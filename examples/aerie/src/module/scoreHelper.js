var scoreHelper = {

  setup: function score_helper_load(scoreConfig, viz) {

    if( viz === undefined ) {
      viz = this ;
    }

    if (scoreConfig === undefined) {
      scoreConfig = {
        x: 2,
        y: 2,
        inert: true,
        fixed: true,
        sprite: {

        },
      } ;
    }

    viz.score        = viz.setup_item(scoreConfig) ;
    viz.score.value  = scoreConfig.initialValue || 0 ;
    viz.score.change = scoreConfig.change       || [100] ;
    viz.score.level  = scoreConfig.level        || 0 ;

    // var scoreSprite = $Z.helper.sprite.foreach($Z.helper.sprite.get(canvas, rowName, tileWidth, rowHeight), $Z.helper.image.get_original) ;

    viz.score.config = {

      text: viz.score.value,
      image: $Z.helper.image.text2image,
      sprite: $Z.helper.image.text_sprite(scoreConfig.sprite),

    } ;

    viz.score.set = function() {

      this.config.text = this.value ;
      this.image       = this.config.image() ;

    } ;

    viz.score.increase = function() {

      this.value += this.change[this.level] ;
      this.set() ;

    } ;

    viz.score.set() ;
    viz.score.add() ; // add item

    // $Z.helper.image.view(viz.player.score.image) ;
  
  },
	
} ;