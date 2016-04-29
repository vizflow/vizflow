function battle_screen() {
  
  var vizConfig = {

    loadingImageUrl: './image/battlescreen.png',
    paddingFactor: 4,
    frameDurationFactor: 3,
        music: undefined,
        name: 'battle',
        xShift: 460,
        yShift: 720,
        width: 320,
        height: 240,

    } ;

    viz = vizHelper.setup(vizConfig) ;

    var tileWidth  = 104 ;
    var tileHeight = 300 ; 

 

    rightButtonConfig = {

    } ;

    attackButtonConfig = {

    } ;

    blockButtonConfig = {

    } ;

    utilityButtonConfig = {

    } ;

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
    // console.log('battlescreen spriteloader', spriteset.block[2] === spriteset.rest[0]) ;
    return spriteset ;

    },

    transitionSet: {
      x: $Z.transition.rounded_linear_transition_func ( 'x', viz.frameDuration ), //function accepting an x end-value and returning a transition object 
      y: $Z.transition.rounded_linear_transition_func ( 'y', viz.frameDuration ), // function accepting a y end-value and returning a transition object

    },

    // orientation: 'l',
    frameDuration: viz.frameDuration * 0.5,    
    attackDuration: 3 * viz.frameDuration,    
    blockDuration: 100 * viz.frameDuration,
    restoreRest: true,

    xMove: 40,
    yMove: 40,
    x: 100,
    y: 100,
    type: 'player',

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

        viz.player.state = viz.player.state.filter(function (d) {
            d !== event.keyCode ;
        }) ;     

    } ;

    viz.player.item.add() ;

    viz.player.callback = playerBattleHelper.update ;
  
    var enemyTileHeight = 240 ;
    var enemyTileWidth  = 200 ;

    viz.enemyConfig = {

        loop: {

        attack: {
            frameDur: viz.frameDuration,
            position: 0,
            Nstep: 2,
          },

        tailattack: {
            frameDur: viz.frameDuration * 10,
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
          var rowName   = ['attack', 'rest', 'tailattack'] ;
          var width     = [enemyTileWidth, enemyTileWidth, enemyTileWidth] ;
          var height    = [enemyTileHeight, enemyTileHeight, enemyTileHeight] ;
          var spriteset = spriteHelper.get(i, rowName, width, height) ;
          // spriteset.rest.push(spriteset.rest[0]) ;
          var attackCollisionCanvas                = imageHelper.clear_rect (spriteset.attack[0].originalCanvas, { x: 0, y: 0, width: spriteset.attack[0].originalCanvas.width * 0.6, height: maxHeight } ) ;
          var tailAttackCollisionCanvas            = imageHelper.clear_rect (spriteset.tailattack[0].originalCanvas, { x: 0, y: 0, width: spriteset.tailattack[0].originalCanvas.width * 0.6, height: maxHeight } ) ;
          spriteset.attack[0].sourceCollisionImage = attackCollisionCanvas ;
          spriteset.tailattack[0].sourceCollisionImage = tailAttackCollisionCanvas ;          
          spriteset.attack = [spriteset.attack[0], spriteset.rest[0]] ;
          spriteset.tailattack = [spriteset.tailattack[0], spriteset.rest[0]] ;
          return spriteset ;

        },    

        // frameDuration: viz.frameDuration * 20,
        // attackDuration: 6 * viz.frameDuration,
        // tailattackDuration: 100 * viz.frameDuration,
        // hitDuration: viz.dur * 10,
        // orientation: 'r',
        x: 60,
        y: 30,
        type: 'enemy',
        // opacity: 0,

    } ;

    itemConfig = {
        x: 60,
        y: 60,
        // context: buttonCanvas.context(),
        // count: 1,
        //rowIndex: buttonRowIndex,
        width: 31,
        height: 58,
        // offsetX: buttonOffsetX,
        // offsetY: buttonOffsetY,
        // padX: buttonPadX,
        // bgColor: undefined,
        // padXl: 0,
        // padXr: 0,        
        image: imageHelper.to_canvas ('./image/leftButton.png'),

        uiSwitch: true,

        callback: function leftButton_callback() {

            var leftButton = this ;

            if ( leftButton.clicked === true ) {
              return ;
            }

            leftButton.clicked = true ;



      },
    } ;    

    viz.setup_ui (viz);
    viz.setup_item (itemConfig) ;
    viz.enemy  = enemyBattleHelper.setup(viz) ;
    viz.enemy.start_attack () ;
    viz.enemy.start_tail_attack () ;
    // viz.enemy  = setup_element(viz, viz.enemyConfig) ;
    viz.enemy.item.add() ;
    viz.enemy.callback  = enemyBattleHelper.update ;
    // // viz.player.adversary = viz.enemy ; // decorate the player object for convenient access to the viz.enemy object 
    // // viz.enemy.adversary  = viz.player ; 
    // viz.player.item.responseSet.bump = bumpHelper.setup(viz) ;
    // viz.player.item.responseSet.hit = playerHitHelper.setup(viz) ;

    viz.run() ;

} ;