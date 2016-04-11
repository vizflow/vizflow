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
      } ;
    }
      
    viz.player.score          = itemHelper.setup(scoreConfig, viz) ;
    viz.player.score.value    = scoreConfig.initialValue || 0 ;
    viz.player.score.hit      = scoreConfig.score[0] || 100 ;
    viz.player.score.counter  = scoreConfig.score[1] || 200 ;

    var rowName = [
      '0', 
      '1', 
      '2', 
      '3', 
      '4', 
      '5', 
      '6', 
      '7', 
      '8', 
      '9'
    ] ;

    var canvas    = imageHelper.image2canvas('./image/0-9.png') ;
    
    var tileWidth = [
      , 
      , 
      , 
      , 
      , 
      , 
      , 
      , 
      , 
      ,
    ] ;

    var rowHeight = [
      , 
      , 
      , 
      , 
      , 
      , 
      , 
      , 
      , 
      ,
    ] ;

    var scoreSprite = spriteHelper.foreach(spriteHelper.get(canvas, rowName, tileWidth, rowHeight), imageHelper.get_original) ;

    viz.player.score.config = {

      color: 'rgba(200, 200, 0, 0.8)',
      text: viz.player.score.value,
      image: imageHelper.text2image,
      sprite: scoreSprite,

    } ;

    viz.player.score.set = function() {

      this.config.text = this.value ;
      this.image       = this.config.image() ;

    } ;

    viz.player.score.increase = function(type) {

      this.value += this[type] ;
      this.set() ;

    } ;

    viz.player.score.set() ;

    // imageHelper.view(viz.player.score.image) ;
  
  },
	
} ;