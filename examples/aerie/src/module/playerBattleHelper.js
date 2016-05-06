var playerBattleHelper = {

  health_bar: function (player) {
    if (player === undefined) {
      player = this ;
    }

    var healthbarConfig = { 

      color:  '#FF0000',
      height: 3,
      width:  player.health,
      angle:  0,
      x:      0,
      y:      0,

    } ;

    var healthbarImage  = imageHelper.create(healthbarConfig.width, healthbarConfig.height) ;

    drawHelper.rect(healthbarConfig, healthbarImage.context() ) ; // draw the non-upsampled healthbar to a canvas

    healthbarImage  = imageHelper.adjust_ratio( healthbarImage ) ;

    return healthbarImage ;

  },

  setup: function player_battle_helper_setup(viz) {

    var player                  = setup_element(viz, viz.playerConfig) ;
    player.level                = 0 ;
    player.update               = playerBattleHelper.update_player ;
    player.levelup              = playerBattleHelper.levelup ;
    player.paused               = false ;
    player.state                = [] ;
    player.item.responseSet.hit = playerHitHelper.setup(viz, player) ;
    player.health               = 60 ;
    player.health_bar           = playerBattleHelper.health_bar ;
    player.attack               = playerBattleHelper.attack ;
    player.block                = playerBattleHelper.block ;

    player.healthbar = viz.setup_item ({
      image: player.health_bar(),
      x: 16,
      y: 20,
    }) ;

    player.healthbar.add() ;

    return player ;
  },

  attack: function player_battle_helper_attack (attackType, player) {
    if (player === undefined) {
      player = this ;
    }
      switch (attackType) {

        case 'slash':
          var dur1 = 100 ;
          var dur2 = 200 ;
          var dur3 = 400 ;
          var dur4 = 300 ;
          var trans1 = transitionHelper.new_step('image', player.sprite.attack[0], dur1) ;
          var trans2 = transitionHelper.new_step('image', player.sprite.attack[1], dur2) ;
          var trans3 = transitionHelper.new_step('image', player.sprite.attack[2], dur3) ;          
          var trans4 = transitionHelper.new_step('image', player.sprite.rest[0], dur4) ;

          trans1.child = trans2 ;
          trans1.child.child = trans3 ;
          trans1.child.child.child = trans4 ;

          player.item.add_transition(trans1) ;          
          
          break;

        case 'thrust':
          var dur1 = 700 ;
          var dur2 = 500 ;
          var dur3 = 500 ;
          var trans1 = transitionHelper.new_step('image', player.sprite.thrust[0], dur1) ;
          var trans2 = transitionHelper.new_step('image', player.sprite.thrust[1], dur2) ;
          var trans3 = transitionHelper.new_step('image', player.sprite.rest[0], dur3) ;
          
          trans1.child = trans2 ;
          trans1.child.child = trans3 ;
          // console.log ('player battle helper attack', 'trans1', trans1, 'trans2', trans2, 'player', player) ;
          player.item.add_transition(trans1) ;
          break;

        // case 'smash':
        //   // do stuff
        //   break ;
        
        }     
  },

  block: function player_battle_helper_block (blockType, player) {
    if(player === undefined) {
      player = this ;
    }
      switch (blockType) {

        case 'shield':  
          var dur1 = 2000 ;
          var dur2 = 500 ;
          var trans1 = transitionHelper.new_step('image', player.sprite.block[0], dur1) ;
          var trans2 = transitionHelper.new_step('image', player.sprite.rest[0], dur2) ;

          trans1.child = trans2 ;
          player.item.add_transition(trans1) ;
          break ;
      }
  },
  
  update: function player_helper_update(player) {

    if( player === undefined ) {
      player = this ;
    }

    if( player.paused === true ) {
      return ;
    }

    var transition ;

    for (var kState = 0 ; kState < player.state.length ; kState++) {
      var keyCode = player.state[kState] ;
      var state ;

        switch (keyCode) {

          case 37: // left
            state = 'l' ;
            break;
          case 38: // up
            state = 't' ;
            break;
          case 39: // right
            state = 'r' ;
            break;
          case 40: // down
          // case 13: // enter
          // case 32: // space
            state = 'd' ;
            break;
          case 32: // space
            state = 'a' ;
            break ;

        } 

      switch(state) {

        case 'l' :

          var xMin        = -Math.floor(player.sprite.rest[0].originalCanvas.width * 0.1 - 20 ) ;
          var x           = player.item.x - player.xMove ;
          var xNew        = Math.max(xMin, x) ;
          var xTransition = player.transitionSet.x(xNew) ;      
          player.item.add_transition(xTransition) ;

          var viewXmin = -20 ;
          var viz = player.item.viz ;

          var viewTol = -150 ;
          var center = player.item.image.originalCanvas.width * 0.5 + player.item.x ;
          var dist = center - viz.viewportX - viewTol ;

          if(dist < 0 && viz.viewportX > viewXmin) {
            var viewXnew = Math.max(viewXmin, viz.viewportX + dist) ;
            var replacementSwitch = true ;
            viz.add_transition(viz.transitionSet.x(viewXnew), replacementSwitch) ;
          } 

          break ;

        case 'r' :

          var xMax        = Math.floor(player.sprite.rest[0].originalCanvas.width * 0.7 - 10) ;
          var x           = player.item.x + player.xMove ;
          var xNew        = Math.min(xMax, x) ;
          var xTransition = player.transitionSet.x(xNew) ;      
          player.item.add_transition(xTransition) ;      

          var viewXmax = 0 ;
          var viz = player.item.viz ;
          var viewTol = 10 ;
          var center = player.item.image.originalCanvas.width * 0.5 + player.item.x ;
          var dist = (viz.viewportX + viz.width) - center ;
  
          if( dist < viewTol && viz.viewportX < viewXmax ) {
            var viewXnew = Math.min(viewXmax, viz.viewportX + (viewTol - dist)) ;
            var replacementSwitch = true ;
            viz.add_transition(viz.transitionSet.x(viewXnew), replacementSwitch) ;
          }

          break ;
       
        case 'd' :

          if( transitionHelper.find('image', player.item.transition) > -1 ) {
            return ; // don't interrupt the current attack animation 
          }

          var transitionFunc ;

          if( player.transitionSet.block === undefined ) {
            transitionFunc = player.transitionSet.image ;
          } else {
            transitionFunc = player.transitionSet.block ;
          }

          var loop = animate_loop(
            player.loop.block,
            player.sprite.block,
            transitionFunc,
            function() {} // buttonpress.reset
          ) ;

          player.loop.block.position  = loop.position ;
          transition                  = loop.animation ;

          var replacementSwitch = true ;
          player.item.add_transition(transition, replacementSwitch) ;
    
            break ;

        // case 'u' :

        // element.health += 30 ;  
          
          break ;  

        case 'a' :
         
          if( transitionHelper.find('image', player.item.transition) > -1 ) {
            return ; // don't interrupt the current attack animation 
          }

          var transitionFunc ;

          if( player.transitionSet.attack === undefined ) {
            transitionFunc = player.transitionSet.image ;
          } else {
            transitionFunc = player.transitionSet.attack ;
          }

          var loop = animate_loop(
            player.loop.attack,
            player.sprite.attack,
            transitionFunc,
            function() {} // buttonpress.reset

          ) ;

          player.loop.attack.position = loop.position ;
          transition                  = loop.animation ;
          // console.log('player battle helper update attack case', 'transition', transition) ;
          var replacementSwitch = true ;
          var finalFrame ; // = player.sprite.rest[0] ;

            if (player.restoreRest === true) {
              finalFrame = player.sprite.rest[0] ;  
            }

          player.item.add_transition(transition, replacementSwitch) ;

          break ;

        case 't' :
         
          if( transitionHelper.find('image', player.item.transition) > -1 ) {
            return ; // don't interrupt the current attack animation 
          }

          var transitionFunc ;

          if( player.transitionSet.thrust === undefined ) {
            transitionFunc = player.transitionSet.image ;
          } else {
            transitionFunc = player.transitionSet.thrust ;
          }

          var loop = animate_loop(
            player.loop.thrust,
            player.sprite.thrust,
            transitionFunc,
            function() {} // buttonpress.reset

          ) ;

          player.loop.thrust.position = loop.position ;
          transition                  = loop.animation ;
          // console.log('player battle helper update attack case', 'transition', transition) ;
          var replacementSwitch = true ;
          var finalFrame ; // = player.sprite.rest[0] ;

            if (player.restoreRest === true) {
              finalFrame = player.sprite.rest[0] ;  
            }

          player.item.add_transition(transition, replacementSwitch) ;

          break ;          
                  
      }

    }
        
  },
      
} ;