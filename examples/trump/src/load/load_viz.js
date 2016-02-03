function load_viz (viz) {

  if(viz === undefined) {
    viz = this ;
  }

  load_audio      (viz) ;
  load_characters (viz) ;
  load_hit        (viz) ;

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

  viz.item = [] ;

  viz.fade({
    direction: 'in',
    duration: viz.fadeDuration,
    end: viz_switch,
  })

  function viz_run() {

    var Nstep = 6 ; // 2 * Math.floor(0.5 * viz.fadeDuration / viz.frameDuration) ;

    console.log('viz_run', 'Nstep', Nstep) ;


    viz.item = [ // this is the array of objects that are used by the vizflow visualization engine for the main animation loop
      viz.enemy.item,
      viz.player.item,
      viz.ui.button.walkLeft,
      viz.ui.button.walkRight,
      viz.ui.button.attack,
      viz.ui.button.jump,
      viz.enemy.item.actionSet.hit.healthbar.item,
      viz.player.item.actionSet.hit.healthbar.item,
    ] ;

    viz.enemy.item.flash(viz.frameDuration, Nstep, 'inert') ;

    viz.fade({
      direction: 'in', 
      duration: viz.fadeDuration,
      end: function () {

        viz.trumpAttack.on = true ;

      }
    })

  }

  function viz_switch() {

    console.log('viz_switch', 'viz', viz) ;
    var image = adjust_image_ratio(image2canvas(viz.config.backgroundImageUrl)) ;
    console.log('viz_switch', 'image', image, 'viz_run', viz_run) ;
    viz.fade_switch({image: image, end: viz_run})     

  }

}