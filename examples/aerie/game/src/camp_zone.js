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

	var tileWidth  = 150 ;
    var tileHeight = 80 ; 

	viz.playerConfig = {        

    loop: {

      walk: {
        frameDur: viz.frameDuration,
        position: 0,
        Nstep: 1,
      },

    attack: {
        frameDur: viz.frameDuration,
        position: 0,
        Nstep: 2,
      },

    }, 


    sprite_loader: function() {
    // console.log('spriteloader') ;
    var i = imageHelper.image2canvas('./image/knight_spritesheet.png') ;
    var rowName = ['attack', 'rest'] ;
    var width   = [tileWidth, tileWidth] ;
    var height  = [tileHeight, tileHeight] ;

    maxHeight = Math.max.apply(null, height) ;
    var spriteset = spriteHelper.get(i, rowName, width, height) ;
    
    var attackCollisionCanvas                = imageHelper.clear_rect (spriteset.attack[0].originalCanvas, { x: 0, y: 0, width: spriteset.attack[0].originalCanvas.width * 0.6, height: maxHeight } ) ;
    spriteset.attack[0].sourceCollisionImage = attackCollisionCanvas ;
    spriteset.attack = [spriteset.attack[0], spriteset.rest[0]] ;

    return spriteset ;

  	},

    transitionSet: {
      x: $Z.helper.transition.rounded_linear_transition_func ( 'x', viz.frameDuration ), //function accepting an x end-value and returning a transition object 
      y: $Z.helper.transition.rounded_linear_transition_func ( 'y', viz.frameDuration ), // function accepting a y end-value and returning a transition object

    },
    orientation: 'l',
    frameDuration: viz.frameDuration * 0.5,    
    attackDuration: 3 * viz.frameDuration,    

    restoreRest: true,

    xMove: 30,
    yMove: 30,
    x: 100,
    y: 100,
    type: 'player',

    } ;

    playerHelper.setup(viz) ;

    viz.player.item.add() ;

    viz.player.callback = playerHelper.update ;

    // load_powerup: function load_powerup(viz, powerupConfig) {

    // if( viz === undefined ) {
    //   viz = this ;
    // }

    // if ( powerupConfig === undefined ) {

    //   powerupConfig = {

    //     x: 100,
    //     y: 100,
    //     inert: false,
    //     type: 'powerup',

    //   } ;

    // }

    // var rowName = ['cell'] ;
    // var canvas  = imageHelper.image2canvas('./image/powerup.png') ;
    // var width   = [] ;
    // var height  = [] ;

    // var powerup     = viz.setup_item(powerupConfig) ;
    // powerup.sprite  = spriteHelper.get(canvas, rowName, width, height) ;
    // // console.log('vizplayerpowerupsprite', viz.player.powerup.sprite) ;
    // powerup.image   = powerup.sprite.cell[0] ;


    // var levelName = viz.config.name ;

    // } ;

 
    viz.keyboard_down_callback = function keyboard_down_callback(event) {
   
        var transition     = [] ;
        
        if (viz.player.state.indexOf(event.keyCode) == -1) {
            this.player.state.push(event.keyCode) ;
        }

        this.player.callback() ;

    } ;

    viz.keyboard_up_callback = function keyboard_up_callback(event) {
        
        if(viz.player.state.length === 0) {
            return ;
        }

        var index = viz.player.state.indexOf(event.keyCode) ;   
    
        if (index === -1 ) {

            return ;

        } else {
            viz.player.state.splice(index, 1) ;
        }     

    } ;

    var enemyTileHeight = 240 ;
    var enemyTileWidth  = 160 ;
    var enemy2TileHeight = 120 ;
    var enemy2TileWidth  = 160 ;

    viz.enemyConfig = {

        sprite_loader: function() {

          // console.log('enemy sprite loader', spriteset) ;
          var i         = imageHelper.image2canvas('./image/monster.png') ;
          var rowName   = ['rest'] ;
          var width     = [enemyTileWidth] ;
          var height    = [enemyTileHeight] ;
          var spriteset = spriteHelper.get(i, rowName, width, height) ;
          // spriteset.rest.push(spriteset.rest[0]) ;
          return spriteset ;

        },    

        frameDuration: viz.frameDuration * 1,
        attackDuration: 6 * viz.frameDuration,
        // hitDuration: viz.dur * 10,
        orientation: 'r',
        x: 100,
        y: 300,
        type: 'enemy',
        // opacity: 0,

    } ;

    viz.enemy2Config = {

        sprite_loader: function() {

          // console.log('enemy sprite loader', spriteset) ;
          var i         = imageHelper.image2canvas('./image/monster.png') ;
          var rowName   = ['rest'] ;
          var width     = [enemyTileWidth] ;
          var height    = [enemyTileHeight] ;
          var spriteset = spriteHelper.get(i, rowName, width, height) ;
          // spriteset.rest.push(spriteset.rest[0]) ;
          return spriteset ;

        },    

        frameDuration: viz.frameDuration * 1,
        attackDuration: 6 * viz.frameDuration,
        // hitDuration: viz.dur * 10,
        orientation: 'l',
        x: -50,
        y: -200,
        type: 'enemy',
        // opacity: 0,

    } ;

    viz.enemy2 = setup_element(viz, viz.enemy2Config) ;
    viz.enemy  = setup_element(viz, viz.enemyConfig) ;
    viz.enemy.item.add() ;
    viz.enemy2.item.add() ;

    // viz.player.adversary = viz.enemy ; // decorate the player object for convenient access to the viz.enemy object 
    // viz.enemy.adversary  = viz.player ; 
    viz.player.item.responseSet.bump = bumpHelper.setup(viz) ;
    viz.player.item.responseSet.hit = playerHitHelper.setup(viz) ;

    viz.run() ;

} ;