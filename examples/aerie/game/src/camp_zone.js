function camp_zone() {
	
	var vizConfig = {

		loadingImageUrl: './image/camp.png',
		paddingFactor: 5,
		frameDurationFactor: 3,
    music: undefined,
    name: 'camp',
    xShift: 400,
    yShift: 550,
    width: 192,
    height: 256,

	} ;

	viz = vizHelper.setup(vizConfig) ;

	var tileWidth  = 52 ;
  var tileHeight = 80 ; 

	viz.playerConfig = {

	  sprite_loader: function() {
    // console.log('spriteloader') ;
    var i = imageHelper.image2canvas('./image/knight_spritesheet.png') ;
    var rowName = ['rest'] ;
    var width   = [tileWidth] ;
    var height  = [tileHeight] ;

    maxHeight = Math.max.apply(null, height) ;
    var spriteset = spriteHelper.get(i, rowName, width, height) ;
    // console.log('spriteset', spriteset) ;
    // imageHelper.view(spriteset.rest[0]) ;
    // spriteset.rest = spriteset.rest0 ;
    return spriteset ;

  	},

    // xMove: 7,
    // yMove: 60,
    x: 0,
    y: 0,
    // type: 'player',


  } ;

  playerHelper.setup(viz) ;

   viz.run() ;

} ;