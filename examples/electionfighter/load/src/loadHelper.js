var loadHelper = {

  selectDur: 150,

  loadState: 'jesus', // starting character state

  loadList: ['jesus', 'rastan', 'megyn'],

  loadCallback: {
    jesus: city_level,
    rastan: fantasy_level,
    megyn: space_level,
  },

  fadeOut: function(viz) {
    viz.audio.menu.play() ;
    viz.audio.music.volume = 0 ;
    viz.audio.music.fade() ;
    viz.fade({
      opacity: 0,
      duration: viz.fadeDuration,
      end: function() {
        viz.audio.wolf.play() ; 
        loadHelper.loadCallback[loadHelper.loadState]() ;
      },
    }) ;    

    viz.remove_transition('viewportX') ;
    viz.remove_transition('viewportY') ;
    
    viz.zoom({
      duration: viz.fadeDuration,
      x: viz.width * 0.25,
      y: viz[loadHelper.loadState].select.y,
      width: viz.width * 0.5,
      height: viz.height * 0.5, 
    })

    // viz[loadHelper.loadState].select.zoom({
    //  duration: viz.fadeDuration,
    // }) ;

  },

  setup: function load_helper_menu () {
    
    // console.log('player_select start') ;

    var selectInput = Object.copy(inputEvent) ;
    // selectInput.up = null ;

    var vizConfig = {

      // loadingImageUrl: './image/titlescreen.png',
      backgroundImageUrl: './image/background.png',
      run: loadHelper.run,
      inputEvent: selectInput,
      screen_callback: loadHelper.screen_callback,
      keyboard_callback: loadHelper.keyboard_callback,
      music: './audio/inspector.wav',
      width: 180,
      height: 240,
      paddingFactor: 4/3,
      opacity: 0,

    } ;

    var viz = vizHelper.setup(vizConfig) ; // frameDuration computed

    // console.log('loadHelper setup', 'viz', viz, 'viz.opacity', viz.opacity) ;

    viz.selectorConfig = {

      sprite_loader: function() {

        var i = imageHelper.image2canvas('./image/select_spritesheet.png') ;

        var rowName = [
          'jesus', 
          'rastan', 
          'megyn', 
          'choose', 
          'select',
        ] ;

        var width = [
          168, 
          168, 
          168, 
          172, 
          172,
        ] ;

        var height = [
          49, 
          49, 
          49, 
          28, 
          55,
        ] ;

        var maxHeight  = Math.max.apply(null, height) ;
        var spriteset = spriteHelper.get(i, rowName, width, height) ;

        // imageHelper.view(jumpCollisionCanvas) ;
        // console.log('player sprite loader', spriteset) ;

        return spriteset ;

      },

      orientation: 'r',
      callback: undefined,
      y: 123,

    } ;

    return viz ;

    // console.log ('player_select 36') ;

  },

  run: function load_helper_run(viz) {

    if(viz === undefined) {
      viz = this ;
    }

    gameHelper.load_audio(viz) ;

    viz.loading = true ; // to prevent UI from activating until menu page finishes loading

    function title_sprite() {

      var i = imageHelper.image2canvas('./image/title_sprite.png') ;

      var rowName = [
        'stars', 
        'elect', 
        'fight', 
      ] ;

      var width = [
        180, 
        180, 
        180, 
      ] ;

      var height = [
        240, 
        20, 
        30, 
      ] ;

      var maxHeight  = Math.max.apply(null, height) ;
      var spriteset = spriteHelper.get(i, rowName, width, height) ;

      // imageHelper.view() ;

      return spriteset ;

    }

    var sprite = title_sprite() ;

    var stars = itemHelper.setup({
      x: 0,
      y: 0,
      image: sprite.stars[0],
      opacity: 1,
      inert: true,
      viz: viz,
    }) ;

    // console.log('gameHelper title_animation:', 'stars', stars, 'stars.viz', stars.viz)

    stars.add() ;

    var vizflowImage = imageHelper.adjust_ratio(imageHelper.image2canvas('./image/vizflow.png')) ;

    var vizflow = itemHelper.setup({ 
      x: (viz.width - vizflowImage.originalCanvas.width) * 0.5,
      y: 226,
      image: vizflowImage,
      opacity: 0,
      inert: true,
      viz: viz,
    }) ;

    vizflow.add() ;

    viz.fade({
      duration: viz.fadeDuration,
    }) ;

    var electX =   -1 ;
    var electY = -150 ;
    var elect = itemHelper.setup({
      x: viz.width,
      y: electY,
      image: sprite.elect[0],
      opacity: 0,
      inert: true,
      viz: viz,
    }) ;

    var fight = itemHelper.setup({
      x: 0,
      y: electY + 48,
      image: sprite.fight[0],
      opacity: 0,
      inert: true,
      viz: viz,
    }) ;

    elect.add() ;
    fight.add() ;

    var electFactor = 25 ;
    var electDur    = viz.frameDuration * electFactor ;

    var xTrans = $Z.transition.rounded_linear_transition_func('x', viz.fadeDuration * 1.5)(electX) ;

    var fade = 4 ;
    var delay = .25 ;
    viz.audio.elect.play(delay) ;
    viz.audio.elect.gain.gain.value = 0 ;
    viz.audio.elect.volume = 0.75 ;
    viz.audio.elect.fade(fade) ;

    // xTrans.end = function() {
    //  viz.shake() ;
    // }

    // console.log('gameHelper title', 'sprite', sprite) ;

    var animation = animate(sprite.elect, step_transition_func('image', electDur))[0] ;

    animation.child.child.end = function() {

      var delay = 0 ;
      viz.audio.fight.play(delay) ;
      
      fight.fade({
        duration: viz.fadeDuration, 
        end: function() { 
          vizflow.fade({
            duration: viz.fadeDuration * 2,
            end: function() {
              viz.fade({
                opacity: 0,
                duration: viz.fadeDuration * 2,
                end: function() {
                  viz.item = [] ;
                  loadHelper.menu(viz) ;
                }
              }) ;
            },
          }) ;
          viz.clearSwitch = true ;
          viz.shake() ;
          viz.audio.thud.play() ;

          viz.audio.music.loop   = true ;
          var delay              = 1.5 ;
          viz.audio.music.volume = 0.5 ;

          viz.audio.music.play(delay) ;

          // viz.zoom_inout({
          //  duration: viz.fadeDuration * 2,
          //  shakeSwitch: true,
          //  width: 150,
          //  height: 200,
          //  x: (viz.width - 150) / (2 * document.ratio),
          //  y: (viz.height - 200) / (2 * document.ratio),
          // }) ;
        }
      }) ;

    } ;

    elect.add_transition(xTrans) ;

    elect.fade({

      duration: viz.fadeDuration,
      child: animation,
      pause: electDur,

    }) ;

    vizHelper.run(viz) ;

    // stars.fade() ;

    // var elect = itemHelper.setup({
    //  image: sprite.elect,
    // }) ;

  },  

  menu: function load_helper_menu(viz) {

    if(viz === undefined) {
      viz = this ;
    }

    viz.image = imageHelper.adjust_ratio(imageHelper.image2canvas(viz.config.backgroundImageUrl)) ; 

    viz.fade({
      duration: viz.fadeDuration * 0.5,
      opacity: 1,

      end: function() {

        loadHelper.menu_select(viz) ;

        itemHelper.add(viz, [ // this is the array of objects that are used by the vizflow visualization engine for the main animation loop
          
           viz.choose,
           viz.jesus,
           viz.rastan,
           viz.megyn,
           viz.jesus.select,
           viz.rastan.select,
           viz.megyn.select,

        ]) ;

        viz.choose.fade({

          end: function () {

            var xDur = 500 ;
            var x_trans_creator = $Z.transition.rounded_linear_transition_func('x', xDur) ;
            var xTrans = x_trans_creator(viz.jesus.x - viz.sprite.jesus[0].width) ;

            xTrans.end = function() {

              viz.shake() ;
              viz.audio.thud.play() ;
              var xTrans = x_trans_creator(viz.rastan.x + viz.sprite.rastan[0].width) ;

              xTrans.end = function() {

                viz.shake() ;
                viz.audio.thud.play() ;
                var xTrans = x_trans_creator(viz.megyn.x - viz.sprite.megyn[0].width) ;

                xTrans.end = function() {

                  viz.audio.thud.play() ;
                  viz.shake() ;
                  viz[loadHelper.loadState].select.fade({ 
                    duration: loadHelper.selectDur,
                    end: function() {

                      viz.loading = false ;

                    },
                  }) ;
                }
                
                viz.megyn.add_transition(xTrans) ;

              }

              viz.rastan.add_transition(xTrans) ;

            }

            viz.jesus.add_transition (xTrans) ;

          },

        }) ;
                  
          // console.log('fighter helper load') ;

      }, // end end: function() ...

    }) ;  // end fade child 

  },  

  menu_select: function load_helper_menu_select (viz) {

    if(viz === undefined) {
      viz = this ;
    }

    viz.sprite = viz.selectorConfig.sprite_loader() ;
    
    gameHelper.load_audio(viz) ;

    viz.choose = viz.setup_item ({
      x: 4,
      y: -20,
      image: viz.sprite.choose[0],
      opacity: 0, 
    }) ;    

    viz.jesus = viz.setup_item ({
      x: 13 + viz.sprite.jesus[0].width,
      y: 40,
      image: viz.sprite.jesus[0], 
    }) ;    

    viz.rastan = viz.setup_item ({
      x: - viz.sprite.rastan[0].width,
      y: 100,
      image: viz.sprite.rastan[0], 
    }) ;    

    viz.megyn = viz.setup_item ({
      x: 13 + viz.sprite.megyn[0].width,
      y: 160,
      image: viz.sprite.megyn[0],   
    }) ;    

    viz.jesus.select = viz.setup_item ({
      x: 11,
      y: 42,
      image: viz.sprite.select[0], 
      opacity: 0,
    }) ;    

    viz.rastan.select = viz.setup_item ({
      x: 0,
      y: 102,
      image: imageHelper.flip_image(viz.sprite.select[0]), 
      opacity: 0,
    }) ; 

    viz.megyn.select = viz.setup_item ({
      x: 11,
      y: 162,
      image: viz.sprite.select[0], 
      opacity: 0,
    }) ;      

  },  

  keyboard_callback: function(event, viz) {

      if(viz === undefined) {
        viz = this ;
      }

      if(viz.loading) {
        return ; // wait until viz finishes loading to activate ui controls
      }

      var transition = [] ;
      var state ;

      var newState ; 
      switch (event.keyCode) {

        case 37: // left
        case 38: // up
          state    = 'u' ;
          var newIndex ;
          var index = loadHelper.loadList.indexOf( loadHelper.loadState ) ;
          // console.log('fighterHelper.keyboard_callback', 'u', 'index', index, 'loadHelper.loadState', loadHelper.loadState)
          if(index > 0) {
            newIndex = --index ;
          } else {
            newIndex = loadHelper.loadList.length - 1 ;
          }
          newState = loadHelper.loadList[newIndex] ;
          // console.log('fighterHelper keyboard_callback', 'index', index, 'newIndex', newIndex, 'newState', newState) ;
          break;
        case 39: // right
        case 40: // down
          state    = 'd' ;
          newState = loadHelper.loadList[(loadHelper.loadList.indexOf(loadHelper.loadState) + 1 ) % loadHelper.loadList.length] ;
          break;
        case 13: // enter
        case 32: // space
          state = 'x' ; // run some effects and then execute the game code
          loadHelper.fadeOut(viz) ;
          return ;
      } 

      //console.log ('state', state) ;
      
      if (state !== undefined) {  // user hit arrow key

        viz.loading = true ;

        viz.audio.menu.play() ;
        viz[loadHelper.loadState].select.fade({
          opacity: 0,
          duration: loadHelper.selectDur,
        }) ;

        // console.log('fighterHelper keyboard callback', 'state', state, 'newState', newState)

        viz[newState].select.fade({
          opacity: 1,
          duration: loadHelper.selectDur,
          end: function() {
            viz.loading = false ;
          },
        }) ;

        loadHelper.loadState = newState ;       
      
      }

  },

  screen_callback: function(event, viz) {

    if(viz === undefined) {
      viz = this ;
    }

    // console.log('loadHelper.screen_callback', 'viz.loading', viz.loading) ;

    if(viz.loading) {
      return ;
    }

    var position = set_canvas_position( viz.canvas ) ;

    var x = Math.round( ( event.clientX - position.left ) / position.scale ) ;
    var y = Math.round( ( event.clientY - position.top  ) / position.scale ) ;

    if (    ( y > viz.jesus.y && y <= viz.jesus.y + viz.jesus.image.originalCanvas.height )
         && ( x > 0 && x < viz.width )  
    ) { // user selected the city level

      viz.jesus.select.fade({ duration: loadHelper.selectDur }) ;

      loadHelper.loadState = 'jesus' ;
      loadHelper.fadeOut(viz) ;

    }

    if (    ( y > viz.rastan.y && y <= viz.rastan.y + viz.rastan.image.originalCanvas.height) 
         && ( x > 0 && x < viz.width)
    ) { // user selected the fantasy level

      loadHelper.loadState = 'rastan' ;

      viz.rastan.select.fade({
        duration: loadHelper.selectDur,
        end: function() {
          loadHelper.fadeOut(viz) ;
        },
      }) ;

      viz.jesus.select.fade({ 
        duration: loadHelper.selectDur,
      }) ;

    }

    if (    ( y > viz.megyn.y && y <= viz.megyn.y + viz.megyn.image.originalCanvas.height )  
         && ( x > 0 && x < viz.width ) 
    ) { // user selected the space level


      loadHelper.loadState = 'megyn' ;

      viz.megyn.select.fade({

        duration: loadHelper.selectDur,
        end: function() {
          loadHelper.fadeOut(viz) ;
        },
      }) ;

      viz.jesus.select.fade({
       duration: loadHelper.selectDur,
      }) ;

    }

  },  

} ;