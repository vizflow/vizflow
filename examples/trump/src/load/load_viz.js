function load_viz (viz) {

  if(viz === undefined) {
    viz = this ;
  }

  load_audio      (viz) ;
  load_characters (viz) ;
  viz.load_hit() ;

  document.viz = viz ; 
  document.addEventListener('mousedown', inputEvent.down, false) ;
  document.addEventListener('mouseup', inputEvent.up, false) ;

  document.addEventListener(
    'touchstart', 
    function(event) {
      //console.log('touchstart start', 'this', this) ;
      event.preventDefault() ;
      inputEvent.down.call(this, event) ;
      //console.log('touchstart end') ;
    }, 
    false
  ) ;

  document.addEventListener('touchend', inputEvent.up, false) ;
  document.addEventListener('keydown', inputEvent.down, false) ;
  document.addEventListener('keyup', inputEvent.up, false) ;

  $Z.viz(viz) ; // load the vizualization config object into the vizflow   vizualization engine

  $Z.run() ;    // run the interactive visualization (infinite loop by default)

  viz.fade({
    opacity: 1,
    duration: viz.fadeDuration,
    pause: viz.fadeDuration,
    child: imageEffectHelper.fade_transition({

      opacity: 0, 

      end: function() {
        // console.log(viz.config.backgroundImageUrl) ;
        viz.image = adjust_image_ratio(imageHelper.image2canvas(viz.config.backgroundImageUrl)) ;

        viz.add_item([ // this is the array of objects that are used by the vizflow visualization engine for the main animation loop
            viz.enemy.item,
            viz.player.item,
            viz.ui.button.walkLeft,
            viz.ui.button.walkRight,
            viz.ui.button.attack,
            viz.ui.button.jump,
            viz.enemy.item.actionSet.hit.healthbar.item,
            viz.player.item.actionSet.hit.healthbar.item,
            viz.player.score,
        ]) ;
        
      },

      child: imageEffectHelper.fade_transition({
        opacity: 1,
        end: viz_run,
      }),
    }),
  }) ;

  function viz_run() {

    var Nstep = 6 ; // 2 * Math.floor(0.5 * viz.fadeDuration / viz.frameDuration) ;

    // console.log('viz_run', 'Nstep', Nstep, 'viz', viz) ;

    viz.enemy.item.flash(viz.frameDuration, Nstep) ;
    transitionHelper.add_end.call(viz.enemy.item, 'render', Nstep - 1, function() {
      viz.enemyAttack.on = true ;
    }) ;

  }

  function viz_switch() {

    // console.log('viz_switch', 'viz', viz) ;
    var image = adjust_image_ratio(imageHelper.image2canvas(viz.config.backgroundImageUrl)) ;
    // console.log('viz', viz, 'image', image, 'viz_run', viz_run) ;
    viz.fade({
      opacity: 1,
      duration: viz.fadeDuration,
      end: viz_run,
    }) ;
    // viz.fade_switch({image: image, end: viz_run})     

  }

}