function battle_screen() {
  
  var vizConfig = {

    loadingImageUrl: './image/battlescreen.png',
    paddingFactor: 4,
    frameDurationFactor: 3,
        music: undefined,
        name: 'battle',
        xShift: 400,
        yShift: 550,
        width: 240,
        height: 320,

  } ;

  viz = vizHelper.setup(vizConfig) ;

    var tileWidth  = 104 ;
    var tileHeight = 300 ; 

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

    block: {
        frameDur: viz.frameDuration,
        position: 0,
        Nstep: 2,
      },      

    }, 

    sprite_loader: function() {
    // console.log('spriteloader') ;
    var i = imageHelper.image2canvas('./image/knight_battle_spritesheet.png') ;
    var rowName = ['attack', 'block', 'rest'] ;
    var width   = [tileWidth, tileWidth, tileWidth] ;
    var height  = [tileHeight, tileHeight, tileHeight] ;

    maxHeight = Math.max.apply(null, height) ;
    var spriteset = spriteHelper.get(i, rowName, width, height) ;
    
    var attackCollisionCanvas                = imageHelper.clear_rect (spriteset.attack[0].originalCanvas, { x: 0, y: 0, width: spriteset.attack[0].originalCanvas.width * 0.6, height: maxHeight } ) ;
    spriteset.attack[0].sourceCollisionImage = attackCollisionCanvas ;
    spriteset.attack = [spriteset.attack[0], spriteset.rest[0]] ;
    spriteset.block = [spriteset.block[0], spriteset.block[0], spriteset.rest[0], spriteset.rest[0]] ;

    return spriteset ;

    },

    transitionSet: {
      x: $Z.transition.rounded_linear_transition_func ( 'x', viz.frameDuration ), //function accepting an x end-value and returning a transition object 
      y: $Z.transition.rounded_linear_transition_func ( 'y', viz.frameDuration ), // function accepting a y end-value and returning a transition object

    },

    orientation: 'l',
    frameDuration: viz.frameDuration * 0.5,    
    attackDuration: 3 * viz.frameDuration,    
    blockDuration: 100 * viz.frameDuration,
    restoreRest: true,

    xMove: 40,
    yMove: 40,
    x: 100,
    y: 160,
    type: 'player',
    healthdrop: 5, 

    } ;

    viz.player = playerBattleHelper.setup(viz) ;
    // playerBattleHelper.setup_healthbar() ;

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

    viz.player.item.add() ;

    viz.player.callback = playerBattleHelper.update ;
  
    var enemyTileHeight = 240 ;
    var enemyTileWidth  = 160 ;

    viz.enemyConfig = {

        loop: {

        attack: {
            frameDur: viz.frameDuration,
            position: 0,
            Nstep: 2,
          },

        block: {
            frameDur: viz.frameDuration,
            position: 0,
            Nstep: 2,
          },      

        },         

        sprite_loader: function() {

          // console.log('enemy sprite loader', spriteset) ;
          var i         = imageHelper.image2canvas('./image/monster_spritesheet.png') ;
          var rowName   = ['attack', 'rest'] ;
          var width     = [enemyTileWidth, enemyTileWidth] ;
          var height    = [enemyTileHeight, enemyTileHeight] ;
          var spriteset = spriteHelper.get(i, rowName, width, height) ;
          // spriteset.rest.push(spriteset.rest[0]) ;
          var attackCollisionCanvas                = imageHelper.clear_rect (spriteset.attack[0].originalCanvas, { x: 0, y: 0, width: spriteset.attack[0].originalCanvas.width * 0.6, height: maxHeight } ) ;
          spriteset.attack[0].sourceCollisionImage = attackCollisionCanvas ;
          spriteset.attack = [spriteset.attack[0], spriteset.rest[0]] ;
          return spriteset ;

        },    

        frameDuration: viz.frameDuration * 1,
        attackDuration: 6 * viz.frameDuration,
        // hitDuration: viz.dur * 10,
        // orientation: 'r',
        x: 0,
        y: 100,
        type: 'enemy',
        // opacity: 0,

    } ;

    viz.enemy  = enemyBattleHelper.setup(viz) ;
    viz.enemy.start_attack () ;
    // viz.enemy  = setup_element(viz, viz.enemyConfig) ;
    viz.enemy.item.add() ;
    viz.enemy.callback  = enemyBattleHelper.update ;
    // // viz.player.adversary = viz.enemy ; // decorate the player object for convenient access to the viz.enemy object 
    // // viz.enemy.adversary  = viz.player ; 
    // viz.player.item.responseSet.bump = bumpHelper.setup(viz) ;
    // viz.player.item.responseSet.hit = playerHitHelper.setup(viz) ;

    viz.run() ;

} ;