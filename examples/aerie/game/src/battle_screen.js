function battle_screen() {
  
    var vizConfig = {

        image: imageHelper.adjust_ratio (imageHelper.to_canvas ('./image/battlescreen_background.png')),
        frameDurationFactor: 3,
        music:'./audio/bgm1.wav',

        name: 'battle',
        width: 320,
        height: 240,

    } ;
    
    viz = vizHelper.setup(vizConfig) ;
// console.log('vizConfig', vizConfig) ;

    viz.audio = {
        music: audioLoader.cache[vizConfig.music],
        slash: audioLoader.cache['./audio/slash.wav'],
        shield: audioLoader.cache['./audio/shield.wav'],
        thrust: audioLoader.cache['./audio/thrust.wav'],
        growl1: audioLoader.cache['./audio/growl1.wav'],   
        growl2: audioLoader.cache['./audio/growl2.wav'],           
        finisher: audioLoader.cache['./audio/finisher.wav'],
        blocked: audioLoader.cache['./audio/blocked.wav'],
    } ;
      
    var fade = 4 ;
    viz.audio.music.loop   = true ;
    viz.audio.music.play() ;
    viz.audio.music.gain.gain.value = 0 ;
    viz.audio.music.volume          = 1/3 ;
    viz.audio.music.fade(fade) ;

    Object.assign (viz, $Z.helper.item.method) ;
    Object.assign (viz, $Z.helper.transition.method) ;
    
    var scaleDur = 2000 ;

    var cloudsConfig = {
        image: imageHelper.adjust_ratio (imageHelper.to_canvas('./image/battlescreen_clouds.png')),
        x: 330,
        y: -30,
    } ;
    var moonConfig = {
        image: imageHelper.adjust_ratio (imageHelper.to_canvas('./image/battlescreen_moon.png')),
        x: 70,
        y: 50,   
     } ;

    viz.clouds = viz.setup_item(cloudsConfig) ;  
    viz.clouds.add_linear ('x', 0, scaleDur * 20 ) ;
    // viz.clouds.x = viz.cloudsConfig.x ;
    // viz.clouds.add_linear ('x', 0, scaleDur * 5 ) ;

    // viz.clouds.call(function() {
    //     this.add_linear('y', -200,scaleDur) ;
    // }, scaleDur * 10) ;

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
                Nstep: 5,
            },

            block: {
                frameDur: viz.frameDuration,
                position: 0,
                Nstep: 2,
            },   

            hit: {
                frameDur: viz.frameDuration,
                position: 0,
                Nstep: 1,
            },   

        }, 

        sprite_loader: function() {
        var i = imageHelper.to_canvas('./image/knight_battle_spritesheet.png') ;
        var rowName = ['attack', 'block', 'finisher', 'hit', 'rest', 'thrust'] ;
        var width   = [tileWidth, tileWidth, tileWidth, tileWidth, tileWidth, tileWidth] ;
        var height  = [tileHeight, tileHeight, tileHeight, tileHeight, tileHeight, tileHeight] ;

        maxHeight = Math.max.apply(null, height) ;
        var spriteset = spriteHelper.get(i, rowName, width, height) ;

        var attackCollisionCanvas                = imageHelper.clear_rect (spriteset.attack[0].originalCanvas, { x: 0, y: 0, width: spriteset.attack[0].originalCanvas.width * 0.1, height: maxHeight } ) ;
        var thrustCollisionCanvas                = imageHelper.clear_rect (spriteset.thrust[1].originalCanvas, { x: 0, y: 0, width: spriteset.thrust[1].originalCanvas.width * 0.1, height: maxHeight } ) ;
        var finisherCollisionCanvas                = imageHelper.clear_rect (spriteset.finisher[1].originalCanvas, { x: 0, y: 0, width: spriteset.finisher[1].originalCanvas.width * 0.1, height: maxHeight } ) ;
        
        spriteset.attack[1].sourceCollisionImage = attackCollisionCanvas ;
        spriteset.thrust[1].sourceCollisionImage = thrustCollisionCanvas ;
        spriteset.finisher[1].sourceCollisionImage = finisherCollisionCanvas ;
        spriteset.finisher[2].sourceCollisionImage = finisherCollisionCanvas ;
        spriteset.finisher[3].sourceCollisionImage = finisherCollisionCanvas ;
        spriteset.finisher[4].sourceCollisionImage = finisherCollisionCanvas ;    

 // imageHelper.view(spriteset.finisher[4].sourceCollisionImage ) ;

        return spriteset ;

        },

        transitionSet: {
          x: $Z.helper.transition.rounded_linear_transition_func ( 'x', viz.frameDuration ), //function accepting an x end-value and returning a transition object 
          y: $Z.helper.transition.rounded_linear_transition_func ( 'y', viz.frameDuration ), // function accepting a y end-value and returning a transition object

        },

        xMove: 79,
        yMove: 74,
        x: 60,
        y: 5,
        type: 'player',

    } ;

    var enemyTileHeight = 240 ;
    var enemyTileWidth  = 200 ;

    viz.enemyConfig = {

        loop: {

        attack: {
            frameDur: viz.frameDuration * 10,
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
            Nstep: 4,
          },      

        hindattack: {
            frameDur: viz.frameDuration * 10,
            position: 0,
            Nstep: 4,
        },  

        rest: {
            frameDur: viz.frameDuration * 10,
            position: 0,
            Nstep: 4
        },

        hit: {
            frameDur: viz.frameDuration,
            position: 0,
            Nstep: 2,
        },   
        snortattack: {
            frameDur: viz.frameDuration * 10,
            position: 0,
            Nstep: 3,
          },

    },         

        sprite_loader: function() {

          var i         = imageHelper.to_canvas('./image/monster_spritesheet.png') ;
          var rowName   = ['attack', 'block', 'hindattack', 'hit', 'rest', 'snortattack', 'tailattack'] ;
          var width     = [enemyTileWidth, enemyTileWidth, enemyTileWidth, enemyTileWidth, enemyTileWidth, enemyTileWidth, enemyTileWidth] ;
          var height    = [enemyTileHeight, enemyTileHeight, enemyTileHeight, enemyTileHeight, enemyTileHeight, enemyTileHeight, enemyTileHeight] ;
          maxHeight = Math.max.apply(null, height) ;

          var spriteset = spriteHelper.get(i, rowName, width, height) ;
          var attackCollisionCanvas                = imageHelper.clear_rect (spriteset.attack[1].originalCanvas, { x: 100, y: 0, width: spriteset.attack[1].originalCanvas.width * 0.5, height: maxHeight } ) ;
          var tailAttackCollisionCanvas            = imageHelper.clear_rect (spriteset.tailattack[2].originalCanvas, { x: 0, y: 0, width: spriteset.tailattack[0].originalCanvas.width * 0.1, height: maxHeight } ) ;
          var hindAttackCollisionCanvas            = imageHelper.clear_rect (spriteset.hindattack[2].originalCanvas, { x: 0, y: 0, width: spriteset.hindattack[2].originalCanvas.width * 0.5, height: maxHeight } ) ;
          var snortAttackCollisionCanvas           = imageHelper.clear_rect (spriteset.snortattack[1].originalCanvas, { x: 70, y: 0, width: spriteset.snortattack[1].originalCanvas.width * 0.8, height: maxHeight } ) ;
          
          spriteset.attack[1].sourceCollisionImage = attackCollisionCanvas ;
          spriteset.snortattack[1].sourceCollisionImage = snortAttackCollisionCanvas ;
          spriteset.tailattack[2].sourceCollisionImage = tailAttackCollisionCanvas ;
          // spriteset.hindattack[1].sourceCollisionImage = hindAttackCollisionCanvas ;
          spriteset.hindattack[2].sourceCollisionImage = hindAttackCollisionCanvas ;


 // imageHelper.view(hindAttackCollisionCanvas) ;
          return spriteset ;

        },    

        x: 50,
        y: 50,
        // xOrigin: -5,
        // yOrigin: 60,
        // xScale: 0.05,
        // yScale: 0.05,        
        type: 'enemy',

    } ;

    // viz.moon = viz.setup_item(moonConfig) ;
    // viz.moon.add_linear ('y', 100, scaleDur * 19.5) ;
    viz.enemy  = enemyBattleHelper.setup(viz) ;

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



    var moveButtonWidth     = 50 ;
    var moveButtonHeight    = 75 ;
    var actionButtonWidth   = 46 ;
    var actionButtonHeight  = 44 ;
    var buttonTileCount = 2 ;
    var leftCode        = 37 ;
    var rightCode       = 39 ;
    var blockCode       = 40 ;
    var slashCode      = 32 ;
    var thrustCode   = 32 ;
    var finisherCode = 32 ;

    leftButtonConfig = {
   
       loop: {

            push: {
                frameDur: viz.frameDuration,
                position: 0,
                Nstep: 3,
            },

        },       
        sprite_loader: function() {
            var i = imageHelper.to_canvas ('./image/left_button_spritesheet.png') ;
            var rowName = ['push'] ;
            var width = [moveButtonWidth] ;
            var height = [moveButtonHeight] ;
            var spriteset = spriteHelper.get(i, rowName, width, height) ;
           // console.log('spriteloader left button') 
            return spriteset ;
        },

        x: 5,
        y: 160,
      
    } ;    

    rightButtonConfig = {
        sprite_loader: function() {
            var i = imageHelper.to_canvas ('./image/right_button_spritesheet.png') ;
            var rowName = ['push'] ;
            var width = [moveButtonWidth] ;
            var height = [moveButtonHeight] ;
            var spriteset = spriteHelper.get(i, rowName, width, height) ;
            
            return spriteset ;     
        },    

        x: 265,
        y: 160,     
    } ;    

    thrustButtonConfig = {
                sprite_loader: function() {
            var i = imageHelper.to_canvas ('./image/thrust_button_spritesheet.png') ;
            var rowName = ['push'] ;
            var width = [actionButtonWidth] ;
            var height = [actionButtonHeight] ;
            var spriteset = spriteHelper.get(i, rowName, width, height) ;
            
            return spriteset ; 
        },    
        x: 370, // drawn offscreen
        y: 110,
    } ;

    finisherButtonConfig = {
        sprite_loader: function() {
            var i = imageHelper.to_canvas ('./image/finisher_button_spritesheet.png') ;
            var rowName = ['push'] ;
            var width = [actionButtonWidth] ;
            var height = [actionButtonHeight] ;
            var spriteset = spriteHelper.get(i, rowName, width, height) ;
            
            return spriteset ;
        },    
        x: 370, // drawn offscreen
        y: 110,
    } ;    

    attackButtonConfig = {
        sprite_loader: function() {
            var i = imageHelper.to_canvas ('./image/attack_button_spritesheet.png') ;
            var rowName = ['slash', 'thrust', 'combo'] ;
            var width = [actionButtonWidth, actionButtonWidth, actionButtonWidth] ;
            var height = [actionButtonHeight, actionButtonHeight, actionButtonHeight] ;
            var spriteset = spriteHelper.get(i, rowName, width, height) ;
            
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
            
            return spriteset ;        
        },    
        x: 4,
        y: 110,    
    } ;    

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
        finisher: setup_element (viz, finisherButtonConfig),                  
    } ;

    viz.button.left.item.image = viz.button.left.sprite.push[0] ;
    viz.button.left.item.uiSwitch = true ;
    viz.button.left.item.callback = function left_button_callback() {
        
        var dur1 = 100 ;
        var dur2 = 100 ;
        var trans1 = transitionHelper.new_step('image', viz.button.left.sprite.push[1], dur1) ;
        var trans2 = transitionHelper.new_step('image', viz.button.left.sprite.push[0], dur2) ;

        trans1.child = trans2 ;

        viz.button.left.item.add_transition(trans1) ;        
        gameHelper.screen_handler(leftCode) ;
   } ;

    viz.button.right.item.image = viz.button.right.sprite.push[0] ;
    viz.button.right.item.uiSwitch = true ;
    viz.button.right.item.callback = function right_button_callback() {

        var dur1 = 100 ;
        var dur2 = 100 ;

        var trans1 = transitionHelper.new_step('image', viz.button.right.sprite.push[1], dur1) ;
        var trans2 = transitionHelper.new_step('image', viz.button.right.sprite.push[0], dur2) ;
        
        trans1.child = trans2 ;

        viz.button.right.item.add_transition(trans1) ;            
        
        gameHelper.screen_handler(rightCode) ;
    } ;

    viz.button.thrust.item.image = viz.button.attack.sprite.thrust[0] ;
    viz.button.thrust.item.uiSwitch = true ;
    viz.button.thrust.item.callback = function thrust_button_callback() {
    viz.player.attack('thrust') ;

    } ;    

    viz.button.finisher.item.image = viz.button.finisher.sprite.push[0] ;
    viz.button.finisher.item.uiSwitch = true ;
    viz.button.finisher.item.callback = function finisher_button_callback() {
    viz.player.attack('finisher') ;
 
    } ;    
    
    viz.button.attack.index = 0 ;
    viz.button.attack.item.image = viz.button.attack.sprite.slash[0] ;
    viz.button.attack.item.uiSwitch = true ;
    viz.button.attack.item.callback = function attack_button_callback() {
   
        switch (viz.button.attack.index) {

            case 0:
                viz.audio.slash.play() ;                

                viz.player.attack('slash') ;                
                viz.button.attack.item.image = viz.button.attack.sprite.thrust[0] ;
                viz.button.attack.item.uiSwitch = true ;
                gameHelper.screen_handler(slashCode) ;
          
                break ;

            case 1:
                var delay = 0.5 ;
                viz.audio.thrust.play(delay) ;  
                viz.player.attack('thrust') ;
                viz.button.attack.item.image = viz.button.finisher.sprite.push[0] ;
                viz.button.attack.item.uiSwitch = true ; 
                gameHelper.screen_handler(thrustCode) ;
 
                break ;

            case 2:
                viz.audio.finisher.play() ;   
                viz.player.attack('finisher') ;                
                viz.button.attack.item.image = viz.button.attack.sprite.slash[0] ;
                viz.button.attack.item.uiSwitch = true ;   
                gameHelper.screen_handler(finisherCode) ;
      
                break ;
        }

        viz.button.attack.index++ ;
        viz.button.attack.index = viz.button.attack.index % viz.button.attack.sprite.combo.length ; // tells us how many images there are modded by the images in the sprite
        viz.button.attack.item.image = viz.button.attack.sprite.combo[viz.button.attack.index] ;
              
    } ;

    viz.button.block.item.image = viz.button.block.sprite.push[0] ;
    viz.button.block.item.uiSwitch = true ;

    viz.button.block.item.callback = function block_button_callback() {
        viz.player.block('shield') ;
        viz.audio.shield.play() ; 
        var dur1 = 100 ;
        var dur2 = 100 ;

        var trans1 = transitionHelper.new_step('image', viz.button.block.sprite.push[1], dur1) ;
        var trans2 = transitionHelper.new_step('image', viz.button.block.sprite.push[0], dur2) ;
        
        trans1.child = trans2 ;
 
        viz.button.block.item.add_transition(trans1) ;
      
   
    } ;

    viz.player.item.add() ;
    viz.start_attack = function viz_start_attack (viz) {
        if (viz === undefined) {
            viz = this ;
        }

        viz.enemy.start_hind_attack () ; 
        viz.enemy.start_attack () ;
        viz.enemy.start_tail_attack () ;
        viz.enemy.start_block () ;
        viz.enemy.start_rest() ;
        viz.enemy.start_snort_attack() ;

        viz.enemy.callback  = enemyBattleHelper.update ;        
   }
    
   
 



    // viz.enemy.item.add_linear ('xScale', 1, scaleDur) ;
    // viz.enemy.item.add_linear ('yScale', 1, scaleDur) ;
    // viz.enemy.item.add_linear ('y', 100, scaleDur) ;

    viz.call ('start_attack', .2 * scaleDur) ;
    viz.player.callback = playerBattleHelper.update ;    
    // viz.player.item.responseSet.bump = bumpHelper.setup(viz) ;
    // viz.player.item.responseSet.hit = playerHitHelper.setup(viz) ;
    viz.run() ;

} ;