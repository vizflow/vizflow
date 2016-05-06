function battle_screen() {
  
  var vizConfig = {

    image: imageHelper.adjust_ratio (imageHelper.to_canvas ('./image/battlescreen.png')),
    frameDurationFactor: 3,
    music: undefined,
    name: 'battle',
    width: 320,
    height: 240,

} ;

    viz = vizHelper.setup(vizConfig) ;

    var tileWidth  = 200 ;
    var tileHeight = 300 ; 

    viz.playerConfig = {        

        loop: {

            walk: {
                frameDur: viz.frameDuration,
                position: 0,
                Nstep: 1,
            },

            thrust: {
                frameDur: viz.frameDuration,
                position: 0,
                Nstep: 3,
            },

            attack: {
                frameDur: viz.frameDuration,
                position: 0, 
                Nstep: 4,
            },

            block: {
                frameDur: viz.frameDuration,
                position: 0,
                Nstep: 2,
            },      

        }, 

    sprite_loader: function() {
    var i = imageHelper.to_canvas('./image/knight_battle_spritesheet.png') ;
    var rowName = ['attack', 'block', 'rest', 'thrust'] ;
    var width   = [tileWidth, tileWidth, tileWidth, tileWidth] ;
    var height  = [tileHeight, tileHeight, tileHeight, tileHeight] ;

    maxHeight = Math.max.apply(null, height) ;
    var spriteset = spriteHelper.get(i, rowName, width, height) ;
    
    var attackCollisionCanvas                = imageHelper.clear_rect (spriteset.attack[0].originalCanvas, { x: 0, y: 0, width: spriteset.attack[0].originalCanvas.width * 0.6, height: maxHeight } ) ;
    spriteset.attack[1].sourceCollisionImage = attackCollisionCanvas ;
    spriteset.thrust[1].sourceCollisionImage = attackCollisionCanvas ;
    spriteset.attack = [spriteset.attack[0], spriteset.attack[1], spriteset.attack[2], spriteset.rest[0]] ;
    spriteset.thrust = [spriteset.thrust[0], spriteset.thrust[1], spriteset.rest[0]] ;
    spriteset.block = [spriteset.block[0], spriteset.rest[0]] ;
    return spriteset ;

    },

    transitionSet: {
      x: $Z.transition.rounded_linear_transition_func ( 'x', viz.frameDuration ), //function accepting an x end-value and returning a transition object 
      y: $Z.transition.rounded_linear_transition_func ( 'y', viz.frameDuration ), // function accepting a y end-value and returning a transition object

    },

    xMove: 74,
    yMove: 74,
    x: 60,
    y: 20,
    type: 'player',

    } ;

    viz.player = playerBattleHelper.setup(viz) ;

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
            Nstep: 4,
          },


        block: {
            frameDur: viz.frameDuration,
            position: 0,
            Nstep: 2,
          },      

        },         

        sprite_loader: function() {

          var i         = imageHelper.to_canvas('./image/monster_spritesheet.png') ;
          var rowName   = ['attack', 'block', 'rest', 'tailattack'] ;
          var width     = [enemyTileWidth, enemyTileWidth, enemyTileWidth, enemyTileWidth] ;
          var height    = [enemyTileHeight, enemyTileHeight, enemyTileHeight, enemyTileHeight] ;
          var spriteset = spriteHelper.get(i, rowName, width, height) ;
          var attackCollisionCanvas                = imageHelper.clear_rect (spriteset.attack[0].originalCanvas, { x: 0, y: 0, width: spriteset.attack[0].originalCanvas.width * 0.6, height: maxHeight } ) ;
          var tailAttackCollisionCanvas            = imageHelper.clear_rect (spriteset.tailattack[0].originalCanvas, { x: 0, y: 0, width: spriteset.tailattack[0].originalCanvas.width * 0.6, height: maxHeight } ) ;
          spriteset.attack[1].sourceCollisionImage = attackCollisionCanvas ;
          spriteset.tailattack[2].sourceCollisionImage = tailAttackCollisionCanvas ;
          spriteset.block   = [spriteset.block[0], spriteset.rest[0]] ;      
          spriteset.attack = [spriteset.attack[0], spriteset.attack[1], spriteset.rest[0]] ;
          spriteset.tailattack = [spriteset.tailattack[0], spriteset.tailattack[1], spriteset.tailattack[2]] ;
          return spriteset ;

        },    

        x: 60,
        y: 30,
        type: 'enemy',

    } ;

    var buttonWidth     = 100 ;
    var buttonHeight    = 150 ;
    var buttonTileCount = 2 ;
    var leftCode        = 37 ;
    var rightCode       = 39 ;
    var blockCode       = 40 ;
    var buttonImage1 = viz.player.sprite.attack[1] ;
    // var buttonImage2    = spriteset.thrust[1] ;    
    // var healCode        =    ;
    
    leftButtonConfig = {
        x: 20,
        y: 140,
        // count: 1,
        //rowIndex: buttonRowIndex,
        width: buttonWidth,
        height: buttonHeight,
        image: imageHelper.adjust_ratio (imageHelper.to_canvas ('./image/leftButton.png')),
        uiSwitch: true,

        callback: function left_button_callback() {
            var leftButton = this ;
            var leftCode   = 37 ;
            gameHelper.screen_handler(leftCode) ;
        },
    } ;    

    rightButtonConfig = {
        x: 250,
        y: 140,
        // count: 1,
        //rowIndex: buttonRowIndex,
        width: buttonWidth,
        height: buttonHeight,
        image: imageHelper.adjust_ratio (imageHelper.to_canvas ('./image/rightButton.png')),
        uiSwitch: true,
        
        callback: function right_button_callback() { 

            var rightButton = this ;
            var rightCode   = 39 ;
            gameHelper.screen_handler(rightCode) ;                

        },
    } ;    

    attackButtonConfig = {
        x: 270,
        y: 110,
        // count: 1,
        //rowIndex: buttonRowIndex,
        width: 92,
        height: 87,
        
        image: imageHelper.adjust_ratio (imageHelper.to_canvas ('./image/attackButton.png')),
        uiSwitch: true,
        
        callback: function attack_button_callback() { 
            if (buttonImage1 === true) {

                var thrustButton = this ;
                var thrustCode   = 32 ;         
                console.log('attack button callback') ;
                viz.player.attack ('thrust') ;
                gameHelper.screen_handler(thrustCode) ;            
            } else {
                var attackButton    = this ;
                var attackCode      = 32 ;

                viz.player.attack('slash') ;

                gameHelper.screen_handler(attackCode) ;
            }
        },
    } ;    

    blockButtonConfig = {
        x: 4,
        y: 110,
        // count: 1,
        //rowIndex: buttonRowIndex,
        width: 92,
        height: 87,
        image: imageHelper.adjust_ratio (imageHelper.to_canvas ('./image/blockButton.png')),
        uiSwitch: true,
        
        callback: function block_button_callback() { 
            
            var blockButton = this ;
            var blockCode = 40 ;

            viz.player.block('shield') ;

            gameHelper.screen_handler(blockCode) ;
        },
    } ;    

    // healButtonConfig = {
    //     x: 270,
    //     y: 0,
    //     // count: 1,
    //     //rowIndex: buttonRowIndex,
    //     width: 58,
    //     height: 48,
    //     image: imageHelper.adjust_ratio (imageHelper.to_canvas ('./image/healButton.png')),
    //     uiSwitch: true,
        
    //     callback: function rightButton_callback() { 

    //         var healButton = this ;
    //         var healCode   = 84 ;

    //         gameHelper.screen_handler(healCode) ;

    //     },
    // } ;    

    thrustButtonConfig = {
        x: 270,
        y: 0,
        // count: 1,
        //rowIndex: buttonRowIndex,
        width: 58,
        height: 48,
        image: imageHelper.adjust_ratio (imageHelper.to_canvas ('./image/healButton.png')),
        uiSwitch: true,
        
        callback: function thrust_button_callback() { 
            console.log('thrust button callback start') ;

            var thrustButton = this ;
            var thrustCode   = 38 ;         

            viz.player.attack ('thrust') ;
            gameHelper.screen_handler(thrustCode) ;

        },
    } ;    

  var uiCanvas = imageHelper.create(viz.width, viz.height) ;

  var uiConfig = {

    canvas:   uiCanvas,
    context:  uiCanvas.context(),

  } ;  


    viz.setup_ui (viz);
    viz.setup_item (leftButtonConfig) ;
    viz.setup_item (rightButtonConfig) ;
    viz.setup_item (attackButtonConfig) ;
    viz.setup_item (blockButtonConfig) ;
    // viz.setup_item (healButtonConfig) ;    
    viz.setup_item (thrustButtonConfig) ;       
    viz.enemy  = enemyBattleHelper.setup(viz) ;
    viz.enemy.start_attack () ;
    viz.enemy.start_tail_attack () ;
    viz.enemy.start_block () ;
    viz.enemy.item.add() ;
    viz.enemy.callback  = enemyBattleHelper.update ;
    viz.player.item.add() ;

    viz.player.callback = playerBattleHelper.update ;    
    // viz.player.item.responseSet.bump = bumpHelper.setup(viz) ;
    // viz.player.item.responseSet.hit = playerHitHelper.setup(viz) ;

    viz.run() ;

} ;