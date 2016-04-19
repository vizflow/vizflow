function camp_zone() {
	
	var vizConfig = {

		loadingImageUrl: './image/camp.png',
		paddingFactor: 4,
		frameDurationFactor: 3,
        music: undefined,
        name: 'camp',
        xShift: 400,
        yShift: 550,
        width: 240,
        height: 320,
	} ;

	viz = vizHelper.setup(vizConfig) ;

	var tileWidth  = 52 ;
    var tileHeight = 80 ; 

	viz.playerConfig = {        

    loop: {

      walk: {
        frameDur: viz.frameDuration,
        position: 0,
        Nstep: 1,
      },

    }, 


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


    transitionSet: {
      x: $Z.transition.rounded_linear_transition_func ( 'x', viz.frameDuration ), //function accepting an x end-value and returning a transition object 
      y: $Z.transition.rounded_linear_transition_func ( 'y', viz.frameDuration ), // function accepting a y end-value and returning a transition object

    },



    xMove: 20,
    yMove: 20,
    x: 100,
    y: 100,
    type: 'player',

    } ;

    playerHelper.setup(viz) ;

    viz.player.item.add() ;

    viz.player.callback = playerHelper.update ;

    viz.keyboard_callback = function keyboard_callback(event) {
   
        var transition     = [] ;
        var state ;

        switch (event.keyCode) {

          case 37: // left
            state = 'l' ;
            break;
          case 38: // up
            state = 'u' ;
            break;
          case 39: // right
            state = 'r' ;
            break;
          case 40: // down
          case 13: // enter
          case 32: // space
            state = 'd' ;
            break;

        } 
        
        this.player.state = state ;
        this.player.callback() ;

    } ;

    viz.player.callback () ;  
    viz.run() ;

} ;