function battle_screen() {
  
  var vizConfig = {

    image: './image/battlescreen.png',
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
    var i = imageHelper.to_canvas('./image/knight_battle_spritesheet.png') ;
    var rowName = ['attack', 'block', 'rest'] ;1
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

          var i         = imageHelper.to_canvas('./image/monster_spritesheet.png') ;
          var rowName   = ['attack', 'rest', 'tailattack'] ;
          var width     = [enemyTileWidth, enemyTileWidth, enemyTileWidth] ;
          var height    = [enemyTileHeight, enemyTileHeight, enemyTileHeight] ;
          var spriteset = spriteHelper.get(i, rowName, width, height) ;
          var attackCollisionCanvas                = imageHelper.clear_rect (spriteset.attack[0].originalCanvas, { x: 0, y: 0, width: spriteset.attack[0].originalCanvas.width * 0.6, height: maxHeight } ) ;
          var tailAttackCollisionCanvas            = imageHelper.clear_rect (spriteset.tailattack[0].originalCanvas, { x: 0, y: 0, width: spriteset.tailattack[0].originalCanvas.width * 0.6, height: maxHeight } ) ;
          spriteset.attack[0].sourceCollisionImage = attackCollisionCanvas ;
          spriteset.tailattack[0].sourceCollisionImage = tailAttackCollisionCanvas ;          
          spriteset.attack = [spriteset.attack[0], spriteset.rest[0]] ;
          spriteset.tailattack = [spriteset.tailattack[0], spriteset.rest[0]] ;
          return spriteset ;

        },    

        x: 60,
        y: 30,
        type: 'enemy',

    } ;

        var buttonWidth     = 100 ;
        var buttonHeight    = 150 ;
        var buttonTileCount = 2 ;

        leftButtonConfig = {
            x: 0,
            y: 160,
            // count: 1,
            //rowIndex: buttonRowIndex,
            width: buttonWidth,
            height: buttonHeight,
            image: imageHelper.to_canvas ('./image/leftButton.png'),
            uiSwitch: true,

            callback: function leftButton_callback() {
                console.log('left button callback start') ;
                var leftButton = this ;

                if ( leftButton.clicked === true ) {
                  return ;
                }

                leftButton.clicked = true ;

            },
        } ;    

        rightButtonConfig = {
            x: 270,
            y: 160,
            // count: 1,
            //rowIndex: buttonRowIndex,
            width: buttonWidth,
            height: buttonHeight,
            image: imageHelper.to_canvas ('./image/rightButton.png'),
            uiSwitch: true,
            
            callback: function rightButton_callback() { 

                var rightButton = this ;

                if ( rightButton.clicked === true ) {
                  return ;
                }

                rightButton.clicked = true ;

                        if ( item.image ===  './image/rightButton.png' ) {

          item.viz.flashing = true ;

          item.viz.score.increase() ;

          var fadeDur = 300 ;   

          item.white.fade({

            opacity: 1,
            duration: fadeDur,
            pause: 3 * fadeDur,

            end: function() {

              item.viz.flashing = false ;
              item.viz.green_flash() ;
              item.white.fade({
                opacity: 0,
                duration: fadeDur,
                end: function() {
                  item.clicked = false ;
                },
              }) ;

            },

          }) ;

        } else {
          item.clicked = false ;
        }

            },
        } ;    

        attackButtonConfig = {
            x: 270,
            y: 120,
            // count: 1,
            //rowIndex: buttonRowIndex,
            width: 92,
            height: 87,
            image: imageHelper.to_canvas ('./image/attackButton.png'),
            uiSwitch: true,
            
            callback: function attackButton_callback() { 

                var attackButton = this ;

                if ( attackButton.clicked === true ) {
                  return ;
                }

                attackButton.clicked = true ;

            },
        } ;    

        blockButtonConfig = {
            x: 0,
            y: 120,
            // count: 1,
            //rowIndex: buttonRowIndex,
            width: 92,
            height: 87,
            image: imageHelper.to_canvas ('./image/blockButton.png'),
            uiSwitch: true,
            
            callback: function blockButton_callback() { 

                var blockButton = this ;

                if ( blockButton.clicked === true ) {
                  return ;
                }

                blockButton.clicked = true ;

            },
        } ;    

        healButtonConfig = {
            x: 270,
            y: 70,
            // count: 1,
            //rowIndex: buttonRowIndex,
            width: 58,
            height: 48,
            image: imageHelper.to_canvas ('./image/healButton.png'),
            uiSwitch: true,
            
            callback: function rightButton_callback() { 

                var healButton = this ;

                if ( healButton.clicked === true ) {
                  return ;
                }

                healButton.clicked = true ;

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
    viz.setup_item (healButtonConfig) ;    
    viz.enemy  = enemyBattleHelper.setup(viz) ;
    viz.enemy.start_attack () ;
    viz.enemy.start_tail_attack () ;
    viz.enemy.item.add() ;
    viz.enemy.callback  = enemyBattleHelper.update ;
    // viz.player.item.responseSet.bump = bumpHelper.setup(viz) ;
    // viz.player.item.responseSet.hit = playerHitHelper.setup(viz) ;

    viz.run() ;

} ;