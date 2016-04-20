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
      x: $Z.transition.rounded_linear_transition_func ( 'x', viz.frameDuration ), //function accepting an x end-value and returning a transition object 
      y: $Z.transition.rounded_linear_transition_func ( 'y', viz.frameDuration ), // function accepting a y end-value and returning a transition object

    },
    orientation: 'l',
    frameDuration: viz.frameDuration * 0.5,    
    attackDuration: 3 * viz.frameDuration,    

    restoreRest: true,

    xMove: 10,
    yMove: 10,
    x: 100,
    y: 100,
    type: 'player',

    } ;

    playerHelper.setup(viz) ;

    viz.player.item.add() ;

    viz.player.callback = playerHelper.update ;


    // function attack0() {
    //     var dur1 = frameDuration ;
    //     var dur2 = frameDuration ;
    //     var dur3 = frameDuration ; 
    //     var dur4 = frameDuration ;
    //     var trans = step_transition_func('image', dur1) (viz.player.sprite.attack0[0]) ;
    //     trans.child = step_transition_func('image', dur2) (viz.player.sprite.attack0[1]) ;
    //     trans.child.child = step_transition_func('image', dur3) (viz.player.sprite.rest[0]) ;
    //     trans.child.child.child = step_transition_func('image', dur4) (viz.player.sprite.rest[0]) ;
    //     // trans.child = animate(viz.player.sprite.jump0, step_transition_func('image', viz.player.jumpDuration), undefined, viz.player.sprite.rest[0])[0] ;
    //     return [trans] ;
    // }
   
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

    var enemyTileHeight = 120 ;
    var enemyTileWidth  = 160 ;

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

    viz.enemy  = setup_element(viz, viz.enemyConfig) ;
    viz.enemy.item.add() ;
    // viz.player.adversary = viz.enemy ; // decorate the player object for convenient access to the viz.enemy object 
    // viz.enemy.adversary  = viz.player ; 
    viz.player.item.responseSet.bump = bumpHelper.setup(viz) ;

    viz.run() ;

} ;