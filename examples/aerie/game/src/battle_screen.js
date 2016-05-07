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

    var moveButtonWidth     = 50 ;
    var moveButtonHeight    = 75 ;
    var actionButtonWidth   = 46 ;
    var actionButtonHeight  = 44 ;
    var buttonTileCount = 2 ;
    var leftCode        = 37 ;
    var rightCode       = 39 ;
    var blockCode       = 40 ;
    //var buttonImage1 = viz.player.sprite.attack[1] ;
    // var buttonImage2    = spriteset.thrust[1] ;    
    // var healCode        =    ;
    
    leftButtonConfig = {
   
       loop: {

            push: {
                frameDur: viz.frameDuration,
                position: 0,
                Nstep: 2,
            },

        },       
        sprite_loader: function() {
            var i = imageHelper.to_canvas ('./image/left_button_spritesheet.png') ;
            var rowName = ['push'] ;
            var width = [moveButtonWidth] ;
            var height = [moveButtonHeight] ;
            var spriteset = spriteHelper.get(i, rowName, width, height) ;
            spriteset.push = [spriteset.push[0], spriteset.push[1]] ;
            
            return spriteset ;
        },

        x: 20,
        y: 140,
        type: 'leftButton', 
  
    } ;    

    rightButtonConfig = {
        sprite_loader: function() {
            var i = imageHelper.to_canvas ('./image/right_button_spritesheet.png') ;
            var rowName = ['push'] ;
            var width = [moveButtonWidth] ;
            var height = [moveButtonHeight] ;
            var spriteset = spriteHelper.get(i, rowName, width, height) ;
            spriteset.push = [spriteset.push[0], spriteset.push[1]] ;
            
            return spriteset ;
        
        },    

        x: 250,
        y: 140,
        type: 'rightButton', 

    } ;    


    thrustButtonConfig = {
                sprite_loader: function() {
            var i = imageHelper.to_canvas ('./image/thrust_button_spritesheet.png') ;
            var rowName = ['push'] ;
            var width = [actionButtonWidth] ;
            var height = [actionButtonHeight] ;
            var spriteset = spriteHelper.get(i, rowName, width, height) ;
            spriteset.push = [spriteset.push[0], spriteset.push[1]] ;
            
            return spriteset ;
        
        },    
        x: 370, // drawn offscreen
        y: 110,
    } ;

    attackButtonConfig = {
        sprite_loader: function() {
            var i = imageHelper.to_canvas ('./image/attack_button_spritesheet.png') ;
            var rowName = ['push'] ;
            var width = [actionButtonWidth] ;
            var height = [actionButtonHeight] ;
            var spriteset = spriteHelper.get(i, rowName, width, height) ;
            spriteset.push = [spriteset.push[0], spriteset.push[1]] ;
            
            return spriteset ;
        
        },    
        x: 270,
        y: 110,

    } ;    

    blockButtonConfig = {
        sprite_loader: function() {
            var i = imageHelper.to_canvas ('./image/block_button_spritesheet.png') ;
            var rowName = ['push'] ;
            var width = [actionButtonWidth] ;
            var height = [actionButtonHeight] ;
            var spriteset = spriteHelper.get(i, rowName, width, height) ;
            spriteset.push = [spriteset.push[0], spriteset.push[1]] ;
            
            return spriteset ;
        
        },    
        x: 4,
        y: 110,
    
    } ;    

    // // healButtonConfig = {
    // //     x: 270,
    // //     y: 0,
    // //     // count: 1,
    // //     //rowIndex: buttonRowIndex,
    // //     width: 58,
    // //     height: 48,
    // //     image: imageHelper.adjust_ratio (imageHelper.to_canvas ('./image/healButton.png')),
    // //     uiSwitch: true,
        
    // //     callback: function rightButton_callback() { 

    // //         var healButton = this ;
    // //         var healCode   = 84 ;

    // //         gameHelper.screen_handler(healCode) ;

    // //     },
    // // } ;    


    //     // count: 1,
    //     //rowIndex: buttonRowIndex,
    //     width: 58,
    //     height: 48,
    //     image: imageHelper.adjust_ratio (imageHelper.to_canvas ('./image/healButton.png')),
    //     uiSwitch: true,
        
    //     callback: function thrust_button_callback() { 
    //         console.log('thrust button callback start') ;

    //         var thrustButton = this ;
    //         var thrustCode   = 38 ;         

    //         viz.player.attack ('thrust') ;
    //         gameHelper.screen_handler(thrustCode) ;

    //     },
    // } ;    

    var uiCanvas = imageHelper.create(viz.width, viz.height) ;

    var uiConfig = {

        canvas:   uiCanvas,
        context:  uiCanvas.context(),

    } ;  



    viz.setup_ui (viz);
    viz.button = {
        left: setup_element (viz, leftButtonConfig),
        right: setup_element (viz, rightButtonConfig),
        attack: setup_element (viz, attackButtonConfig),
        block: setup_element (viz, blockButtonConfig),
        thrust: setup_element (viz, thrustButtonConfig),        
    } ;
    viz.button.left.item.image = viz.button.left.sprite.push[0] ;
    viz.button.left.item.uiSwitch = true ;
    viz.button.left.item.callback = function left_button_callback() {
        var leftButton = this ;
        var leftCode   = 37 ;
  
        gameHelper.screen_handler(leftCode) ;
    // viz.player.buttonpress('leftButton') ;
    } ;

    viz.button.right.item.image = viz.button.right.sprite.push[0] ;
    viz.button.right.item.uiSwitch = true ;
    viz.button.right.item.callback = function right_button_callback() {
        var rightButton = this ;
        var rightCode   = 39 ;
        //viz.rightButton.push () ;
        gameHelper.screen_handler(rightCode) ;
    } ;

    viz.button.attack.item.image = viz.button.attack.sprite.push[0] ;
    viz.button.attack.item.uiSwitch = true ;
    viz.button.attack.item.callback = function attack_button_callback() {
        var attackButton = this ;
        var attackCode   = 32 ;
        viz.player.attack('slash') ;
        gameHelper.screen_handler(attackCode) ;
    viz.button.attack.item.image = viz.button.thrust.sprite.push[0] ;

    } ;

    viz.button.block.item.image = viz.button.block.sprite.push[0] ;
    viz.button.block.item.uiSwitch = true ;
    viz.button.block.item.callback = function block_button_callback() {
        var blockButton = this ;
        var blockCode   = 40 ;
        //viz.leftButton.push () ;
        viz.player.block('shield') ;
        gameHelper.screen_handler(blockCode) ;
    } ;
    
    viz.button.thrust.item.image = viz.button.thrust.sprite.push[0] ;
    viz.button.thrust.item.uiSwitch = true ;
    viz.button.thrust.item.callback = function thrust_button_callback() {
        var thrustButton = this ;
        var thrustCode   = 40 ;
        //viz.leftButton.push () ;
        viz.player.attack('thrust') ;
        gameHelper.screen_handler(thrustCode) ;
    } ;    

    // viz.setup_item (viz.button.left.item) ;
    // viz.setup_item (viz.button.right.item) ;
    // viz.setup_item (viz.button.attack.item) ;
    // viz.setup_item (viz.button.block.item) ;
    // // viz.setup_item (healButtonConfig) ;    
    // viz.setup_item (viz.button.thrust.item) ;       
    viz.enemy  = enemyBattleHelper.setup(viz) ;
    viz.enemy.start_attack () ;
    viz.enemy.start_tail_attack () ;
    viz.enemy.start_block () ;
    viz.enemy.item.add() ;
    viz.enemy.callback  = enemyBattleHelper.update ;
    viz.player.item.add() ;
    // viz.button.item.add() ;

    viz.player.callback = playerBattleHelper.update ;    
    // viz.player.item.responseSet.bump = bumpHelper.setup(viz) ;
    // viz.player.item.responseSet.hit = playerHitHelper.setup(viz) ;

    viz.run() ;

} ;