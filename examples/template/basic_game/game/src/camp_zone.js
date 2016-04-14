function camp_zone() {
	
	var vizConfig = {

		loadingImageUrl: './image/camp.png',
		paddingFactor: 5,
		frameDurationFactor: 3,
    music: undefined,
    name: 'camp',
    xShift: 140,
    yShift: 180,
    width: 192,
    height: 256,

	} ;

	viz = vizHelper.setup(vizConfig) ;
 
  // console.log ('viz.run') ;

	var tileWidth  = 52 ;
  var tileHeight = 80 ; 

  	viz.playerConfig = {

  	
	  sprite_loader: function() {
    console.log('spriteloader') ;
    var i = imageHelper.image2canvas('./image/knight_spritesheet.png') ;

    var rowName = ['rest'] ;

    var width   = [tileWidth] ;

    var height  = [tileHeight] ;

    maxHeight = Math.max.apply(null, height) ;
    var spriteset = spriteHelper.get(i, rowName, width, height) ;

    return spriteset ;

  	},

    x: 140,
    y: 180,
    opacity: 1,

  } ;

   viz.run() ;

} ;