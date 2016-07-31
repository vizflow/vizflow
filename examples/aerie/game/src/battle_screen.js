function battle_screen() {
  
    var vizConfig = {

        frameDurationFactor: 3,
        music: './audio/bgm1.wav',
        name: 'battle',
        width: 320,
        height: 240,    

    } ;
    
    viz = $Z.helper.viz.setup(vizConfig) ;

    viz.game_over = gameHelper.game_over ;
    viz.win       = gameHelper.you_win ; 

    var backgroundConfig = {
        image: $Z.helper.image.adjust_ratio ($Z.helper.image.to_canvas ('./image/battlescreen_background.png')),
        width: 320,
        height: 240,
        x: 0,
        y: 0,
    } ;

    viz.setup_item(backgroundConfig) ;

    viz.keyboard_callback = function viz_keyboard_callback(event) {
        viz.player.callback(event) ;
    } ;

    viz.audio = {

        music: $Z.helper.loader.audio.cache[vizConfig.music],
        slash: $Z.helper.loader.audio.cache['./audio/slash.wav'],
        shield: $Z.helper.loader.audio.cache['./audio/shield.wav'],
        thrust: $Z.helper.loader.audio.cache['./audio/thrust.wav'],
        growl1: $Z.helper.loader.audio.cache['./audio/growl1.wav'],   
        // growl2: $Z.helper.loader.audio.cache['./audio/growl2.wav'],           
        finisher: $Z.helper.loader.audio.cache['./audio/finisher.wav'],
        // blocked: $Z.helper.loader.audio.cache['./audio/blocked.wav'],

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
        image: $Z.helper.image.adjust_ratio ($Z.helper.image.to_canvas('./image/battlescreen_clouds.png')),
        x: 330,
        y: -30,
    } ;

    viz.clouds = viz.setup_item(cloudsConfig) ;  
    viz.clouds.add_linear ('x', 0, scaleDur * 20 ) ;

    var tileWidth  = 200 ;
    var tileHeight = 300 ; 

    viz.playerConfig = {        

        loop: {

            attack: {
                frameDur: viz.frameDuration,
                position: 0, 
                Nstep: 5,
            },

            block: {
                frameDur: viz.frameDuration,
                position: 0,
                Nstep: 3,
            }, 

            finisher: {
                frameDur: viz.frameDuration,
                position: 0,
                Nstep: 9,
            },

            hit: {
                frameDur: viz.frameDuration,
                position: 0,
                Nstep: 2,
            }, 

            rest: {
                frameDur: viz.frameDuration,
                position: 0,
                Nstep: 1,
            },

            thrust: {
                frameDur: viz.frameDuration,
                position: 0,
                Nstep: 3,
            },

        }, 

        sprite_loader: function() {
        var i = $Z.helper.image.to_canvas('./image/knight_battle_spritesheet.png') ;
        var rowName = ['attack', 'block', 'finisher', 'hit', 'rest', 'thrust'] ;
        var width   = [tileWidth, tileWidth, tileWidth, tileWidth, tileWidth, tileWidth] ;
        var height  = [tileHeight, tileHeight, tileHeight, tileHeight, tileHeight, tileHeight] ;

        maxHeight = Math.max.apply(null, height) ;
        var spriteset = $Z.helper.sprite.get(i, rowName, width, height) ;

        var attackCollisionCanvas                = $Z.helper.image.clear_rect (spriteset.attack[0].originalCanvas, { x: 0, y: 0, width: spriteset.attack[0].originalCanvas.width * 0.1, height: maxHeight } ) ;
        var thrustCollisionCanvas                = $Z.helper.image.clear_rect (spriteset.thrust[1].originalCanvas, { x: 0, y: 0, width: spriteset.thrust[1].originalCanvas.width * 0.1, height: maxHeight } ) ;
        var finisherCollisionCanvas              = $Z.helper.image.clear_rect (spriteset.finisher[1].originalCanvas, { x: 0, y: 0, width: spriteset.finisher[1].originalCanvas.width * 0.1, height: maxHeight } ) ;
        
        spriteset.attack[1].sourceCollisionImage = attackCollisionCanvas ;
        spriteset.thrust[1].sourceCollisionImage = thrustCollisionCanvas ;
        spriteset.finisher[1].sourceCollisionImage = finisherCollisionCanvas ;
        spriteset.finisher[2].sourceCollisionImage = finisherCollisionCanvas ;
        spriteset.finisher[3].sourceCollisionImage = finisherCollisionCanvas ;
        spriteset.finisher[4].sourceCollisionImage = finisherCollisionCanvas ;    


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

          var i         = $Z.helper.image.to_canvas('./image/monster_spritesheet.png') ;
          var rowName   = ['attack', 'block', 'hindattack', 'hit', 'rest', 'snortattack', 'tailattack'] ;
          var width     = [enemyTileWidth, enemyTileWidth, enemyTileWidth, enemyTileWidth, enemyTileWidth, enemyTileWidth, enemyTileWidth] ;
          var height    = [enemyTileHeight, enemyTileHeight, enemyTileHeight, enemyTileHeight, enemyTileHeight, enemyTileHeight, enemyTileHeight] ;
          maxHeight = Math.max.apply(null, height) ;

          var spriteset = $Z.helper.sprite.get(i, rowName, width, height) ;

          var attackCollisionCanvas = $Z.helper.image.clear_rect (
            spriteset.attack[1].originalCanvas, 
            { x: 100, y: 0, width: spriteset.attack[1].originalCanvas.width * 0.5, height: maxHeight } 
          ) ;

          var tailAttackCollisionCanvas = $Z.helper.image.clear_rect (
            spriteset.tailattack[2].originalCanvas, 
            { x: 0, y: 0, width: spriteset.tailattack[0].originalCanvas.width * 0.1, height: maxHeight } 
          ) ;

          // var hindAttackCollisionCanvas = $Z.helper.image.clear_rect (
          //   spriteset.hindattack[2].originalCanvas, 
          //   { x: 0, y: 0, width: spriteset.hindattack[2].originalCanvas.width * 0.5, height: maxHeight } 
          // ) ;

          // var snortAttackCollisionCanvas = $Z.helper.image.clear_rect (
          //   spriteset.snortattack[1].originalCanvas, 
          //   { x: 70, y: 0, width: spriteset.snortattack[1].originalCanvas.width * 0.8, height: maxHeight } 
          // ) ;
          
          spriteset.attack[1].sourceCollisionImage      = attackCollisionCanvas ;
          // spriteset.snortattack[1].sourceCollisionImage = snortAttackCollisionCanvas ;
          spriteset.tailattack[2].sourceCollisionImage  = tailAttackCollisionCanvas ;
          // spriteset.hindattack[2].sourceCollisionImage  = hindAttackCollisionCanvas ;

          // make an additional white overlay for the hit frame:

          var white = $Z.helper.effect.image.color_filter(spriteset.hit[1], [255, 255, 255]) ;
          // item.white.childFade = true ;
          spriteset.hitOverlay = white ;

          return spriteset ;

        },    

        x: 50,
        y: 50,
        xOrigin: -5,
        yOrigin: 60,
        xScale: 0.05,
        yScale: 0.05,        
        type: 'enemy',

    } ;

    // viz.moon = viz.setup_item(moonConfig) ;
    // viz.moon.add_linear ('y', 100, scaleDur * 19.5) ;
    viz.enemy  = enemyBattleHelper.setup(viz) ;

    viz.player = playerBattleHelper.setup(viz) ;

    var heroHealthConfig = {
        image:  $Z.helper.image.adjust_ratio ($Z.helper.image.to_canvas('./image/hero.png')),
        x: 12,
        y: 28,
    } ;

    var monsterHealthConfig = {
        image:  $Z.helper.image.adjust_ratio ($Z.helper.image.to_canvas('./image/monster.png')),
        x: 10,
        y: 8,
    } ;

    viz.heroHealth = viz.setup_item(heroHealthConfig) ;
    viz.monsterHealth = viz.setup_item(monsterHealthConfig) ;

    var moveButtonWidth     = 50 ;
    var moveButtonHeight    = 75 ;
    var actionButtonWidth   = 46 ;
    var actionButtonHeight  = 60 ;
    var buttonTileCount = 2 ;
    // var blockCode       = 40 ;
    // var slashCode      = 32 ;
    // var thrustCode   = 32 ;
    // var finisherCode = 32 ;

    leftButtonConfig = {
        
        sprite_loader: function() {
            var i = $Z.helper.image.to_canvas ('./image/left_button_spritesheet.png') ;
            var rowName = ['push'] ;
            var width = [moveButtonWidth] ;
            var height = [moveButtonHeight] ;
            var spriteset = $Z.helper.sprite.get(i, rowName, width, height) ;
           // console.log('spriteloader left button') 
            return spriteset ;
        },

        x: 5,
        y: 160,
      
    } ;    

    rightButtonConfig = {
        sprite_loader: function() {
            var i = $Z.helper.image.to_canvas ('./image/right_button_spritesheet.png') ;
            var rowName = ['push'] ;
            var width = [moveButtonWidth] ;
            var height = [moveButtonHeight] ;
            var spriteset = $Z.helper.sprite.get(i, rowName, width, height) ;
            
            return spriteset ;     
        },    

        x: 265,
        y: 160,     
    } ;    

    thrustButtonConfig = {
            sprite_loader: function() {
            var i = $Z.helper.image.to_canvas ('./image/thrust_button_spritesheet.png') ;
            var rowName = ['push'] ;
            var width = [actionButtonWidth] ;
            var height = [actionButtonHeight] ;
            var spriteset = $Z.helper.sprite.get(i, rowName, width, height) ;
            
            return spriteset ; 
        },    
        x: -50, // drawn offscreen
        y: 60,
        opacity: 0.7,
    } ;

    finisherButtonConfig = {
        sprite_loader: function() {
            var i = $Z.helper.image.to_canvas ('./image/finisher_button_spritesheet.png') ;
            var rowName = ['push'] ;
            var width = [actionButtonWidth] ;
            var height = [actionButtonHeight] ;
            var spriteset = $Z.helper.sprite.get(i, rowName, width, height) ;
            
            return spriteset ;
        },    
        x: 320, // drawn offscreen
        y: 60,
        opacity: 0,
    } ;    

    slashButtonConfig = {
        sprite_loader: function() {
            var i = $Z.helper.image.to_canvas ('./image/slash_button_spritesheet.png') ;
            var rowName = ['push'] ;
            var width = [actionButtonWidth] ;
            var height = [actionButtonHeight] ;
            var spriteset = $Z.helper.sprite.get(i, rowName, width, height) ;
            
            return spriteset ;       
        },    
        x: 270,
        y: 110,
    } ;    

    blockButtonConfig = {
        sprite_loader: function() {
            var i = $Z.helper.image.to_canvas ('./image/block_button_spritesheet.png') ;
            var rowName = ['push'] ;
            var width = 46 ;
            var height = 44;
            var spriteset = $Z.helper.sprite.get(i, rowName, width, height) ;
            
            return spriteset ;        
        },    
        x: 4,
        y: 110,    
    } ;    

    var uiCanvas = $Z.helper.image.create(viz.width, viz.height) ;
    var uiConfig = {

        canvas:   uiCanvas,
        context:  uiCanvas.context(),

    } ;  

    viz.setup_ui (viz);
    viz.button = {
        left: setup_element (viz, leftButtonConfig),
        right: setup_element (viz, rightButtonConfig),
        slash: setup_element (viz, slashButtonConfig),
        block: setup_element (viz, blockButtonConfig),
        thrust: setup_element (viz, thrustButtonConfig), 
        finisher: setup_element (viz, finisherButtonConfig),                  
    } ;

    viz.button.left.item.image = viz.button.left.sprite.push[0] ;
    viz.button.left.item.uiSwitch = true ;
    viz.button.left.code = 37 ;
    viz.button.left.item.callback = function left_button_callback() {
        
        var dur1 = 100 ;
        var dur2 = 100 ;
        var trans1 = $Z.helper.transition.new_step('image', viz.button.left.sprite.push[1], dur1) ;
        var trans2 = $Z.helper.transition.new_step('image', viz.button.left.sprite.push[0], dur2) ;

        trans1.child = trans2 ;

        viz.button.left.item.add_transition(trans1) ;  
        var event = { keyCode: viz.button.left.code } ;
        viz.player.callback(event) ;
 
   } ;

    viz.button.right.item.image = viz.button.right.sprite.push[0] ;
    viz.button.right.item.uiSwitch = true ;
    viz.button.right.code = 39 ;
    viz.button.right.item.callback = function right_button_callback() {

        var dur1 = 100 ;
        var dur2 = 100 ;

        var trans1 = $Z.helper.transition.new_step('image', viz.button.right.sprite.push[1], dur1) ;
        var trans2 = $Z.helper.transition.new_step('image', viz.button.right.sprite.push[0], dur2) ;
        
        trans1.child = trans2 ;

        viz.button.right.item.add_transition(trans1) ;  

        var event = { keyCode: viz.button.right.code } ;
        viz.player.callback(event) ;

    } ;

    viz.button.thrust.item.image = viz.button.thrust.sprite.push[0] ;
 
    viz.button.thrust.item.uiSwitch = true ;
    viz.button.thrust.code = 65 ;    
    viz.button.thrust.item.callback = function thrust_button_callback() {

    viz.player.attack('thrust') ;
    viz.button.thrust.item.add_linear('x', -50, scaleDur * 0.1) ;

    // viz.button.thrust.item.flash(1);
    viz.button.thrust.item.fade({
        opacity: 0.7,
        duration: 0.3 * viz.fadeDuration,
    }) ;
        var dur1 = 300 ;
        var dur2 = 100 ;

        var trans1 = $Z.helper.transition.new_step('image', viz.button.thrust.sprite.push[1], dur1) ;
        var trans2 = $Z.helper.transition.new_step('image', viz.button.thrust.sprite.push[0], dur2) ;
        viz.button.thrust.item.uiSwitch = false ;
        
        trans1.child = trans2 ;
        trans2.end = function() {
            viz.audio.thrust.play() ;
        }  
        viz.button.thrust.item.add_transition(trans1) ; 

        var event = { keyCode: viz.button.thrust.code } ;
        viz.player.callback(event) ;

    } ;    
    
    viz.button.slash.item.image = viz.button.slash.sprite.push[0] ;
    viz.button.slash.code = 68 ;

    viz.button.slash.item.uiSwitch = true ;
    viz.button.slash.item.callback = function slash_button_callback() {
      
    viz.player.attack('slash') ;
  
        var dur1 = 300 ;
        var dur2 = 100 ;

        var trans1 = $Z.helper.transition.new_step('image', viz.button.slash.sprite.push[1], dur1) ;
        var trans2 = $Z.helper.transition.new_step('image', viz.button.slash.sprite.push[0], dur2) ;

        trans1.child = trans2 ;
        trans1.end = function() {
            viz.audio.slash.play() ;
          
        }  
        viz.button.slash.item.add_transition(trans1) ; 

     
        viz.button.slash.item.uiSwitch = false ; 
        viz.button.finisher.item.uiSwitch = true ;
        viz.button.finisher.item.add_linear('x', 270, 0.1 * scaleDur ) ;
        viz.button.finisher.item.fade({
            opacity: 1,
            duration: 0.3 * viz.fadeDuration,
        }) ; 
        viz.button.slash.item.add_linear('x', 320, 0.1 * scaleDur ) ;
        viz.button.slash.item.fade({
            opacity: 0,
            duration: 0.3 * viz.fadeDuration,
        }) ;         
        var event = { keyCode: viz.button.slash.code } ;
        viz.player.callback(event) ;           

        }

    viz.button.finisher.item.image = viz.button.finisher.sprite.push[0] ;
    viz.button.finisher.code = 70 ;    
    viz.button.finisher.item.uiSwitch = true ;
    viz.button.finisher.item.callback = function finisher_button_callback() {
    viz.player.attack('finisher') ;
     
        var dur1 = 300 ;
        var dur2 = 100 ;

        var trans1 = $Z.helper.transition.new_step('image', viz.button.finisher.sprite.push[1], dur1) ;
        var trans2 = $Z.helper.transition.new_step('image', viz.button.finisher.sprite.push[0], dur2) ;
        
        trans1.child = trans2 ;

        trans1.end = function() {
            viz.audio.finisher.play() ;
        }

        viz.button.finisher.item.add_transition(trans1) ;

        var event = { keyCode: viz.button.finisher.code } ;
        viz.player.callback(event) ;        

            
        viz.button.slash.item.uiSwitch = true; 
        viz.button.finisher.item.add_linear('x', 320, 0.1 * scaleDur ) ;
         
        viz.button.finisher.item.fade({
            opacity: 0,
            duration: 0.3 * viz.fadeDuration,
        }) ;   
        viz.button.slash.item.add_linear('x', 270, 0.1 * scaleDur ) ;
        viz.button.slash.item.fade({
            opacity: 1,
            duration: 0.3 * viz.fadeDuration,
        }) ; 
        viz.button.finisher.item.uiSwitch = false ;
 
    } ;            

        // viz.button.attack.index++ ;
        // viz.button.attack.index = viz.button.attack.index % viz.button.attack.sprite.combo.length ; // tells us how many images there are modded by the images in the sprite
        // viz.button.attack.item.image = viz.button.attack.sprite.combo[viz.button.attack.index] ;
              
     

    viz.button.block.item.image = viz.button.block.sprite.push[0] ;
    viz.button.block.item.uiSwitch = true ;
    viz.button.block.code = 83 ;

    viz.button.block.item.callback = function block_button_callback() {
        viz.player.block('shield') ;
        // viz.audio.shield.play() ; 
        var dur1 = 300 ;
        var dur2 = 100 ;

        var trans1 = $Z.helper.transition.new_step('image', viz.button.block.sprite.push[1], dur1) ;
        var trans2 = $Z.helper.transition.new_step('image', viz.button.block.sprite.push[0], dur2) ;
        viz.button.thrust.item.uiSwitch = true ;
        
        trans1.child = trans2 ;
        trans1.end = function() {
            viz.audio.shield.play() ;
        }   
        viz.button.block.item.add_transition(trans1) ;

        var event = { keyCode: viz.button.block.code } ;
        viz.player.callback(event) ;

        viz.button.thrust.item.add_linear('x', 4, scaleDur * 0.1) ;
        viz.button.thrust.item.fade({
            opacity: 1,
            duration: 0.3 * viz.fadeDuration,
        }) ;        

    } ;

    viz.player.item.add() ;
    
    viz.start_attack = function viz_start_attack (viz) {
        if (viz === undefined) {
            viz = this ;
        }

       // viz.enemy.start_hind_attack () ; 
        viz.enemy.start_attack () ;
        viz.enemy.start_tail_attack () ;
        // viz.enemy.start_block () ;
        viz.enemy.start_rest() ;
        // viz.enemy.start_snort_attack() ;

        viz.enemy.callback  = enemyBattleHelper.update ;        
   }
    viz.enemy.item.add_linear ('xScale', 1, scaleDur) ;
    viz.enemy.item.add_linear ('yScale', 1, scaleDur) ;
    viz.enemy.item.add_linear ('y', 100, scaleDur) ;
    viz.call ('start_attack', .2 * scaleDur) ;
    viz.player.callback = playerBattleHelper.update ;    
    // viz.player.item.responseSet.bump = bumpHelper.setup(viz) ;
    // viz.player.item.responseSet.hit = playerHitHelper.setup(viz) ;
    viz.run() ;

} ;