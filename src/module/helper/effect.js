let imageEffectHelper = {

  foreach: function image_effect_helper_foreach ( canvas, func, channel ) {

    // console.log('image effectHelper helper foreach start', canvas, func, channel) ;

    if ( channel === undefined ) {
      channel = -1 ; // r, g, b channels by default
    }

    var context = canvas.context() ;
    var image   = context.getImageData (0, 0, canvas.width, canvas.height) ;
    var data    = image.data ;
    var Npel    = data.length / 4 ;
    var offset  = 0 ;
    var opacity = new Array(Npel) ;

    for (var kpel = 0 ; kpel < Npel ; kpel++) {

      if ( channel < 3 && data[offset + 3] === 0) {
        offset += 4 ;
        continue ; // skip transparent pixels if opacity channel is not specified
      }

      if ( channel >= 0 && channel < 4 ) {
        // console.log('func(data[offset + channel])', func(data[offset + channel])) ;
        data[offset + channel] = func(data[offset + channel]) ;         
      } else if ( channel === -1 ) {

        data[offset + 0] = func(data[offset + 0]) ;         
        data[offset + 1] = func(data[offset + 1]) ;         
        data[offset + 2] = func(data[offset + 2]) ;         

      }

      offset += 4 ;

    }

    context.putImageData(image, 0, 0) ;

    // console.log('foreach: ', 'data', data, 'image', image, 'context', context) ;

    // $Z.helper.image.view(canvas) ;

  },

  opacity: function image_effect_helper_opacity ( canvas, opacity ) {
    imageEffectHelper.foreach( 
      canvas, 
      function() {
        return opacity ;
      },
      3 // opacity channel
    )
  },

  binary_opacity_filter: function image_effect_helper_binary_opacity_filter (canvas, threshold)  {

    var context = canvas.context() ;
    var image   = context.getImageData (0, 0, canvas.width, canvas.height) ;
    var data    = image.data ;
    var Npel    = data.length / 4 ;
    var offset  = 0 ;
    var opacity = new Array(Npel) ;

    for (var kpel = 0 ; kpel < Npel ; kpel++) {
      if (data[offset + 3] > 0) {
        opacity[Npel] = data[offset + 3] ;
      }
      offset += 4 ;
    }

    // console.log('opacity', opacity) ;
    if(threshold === undefined) {
      threshold = 68 ;
    }
    offset = 0 ;
    for (var kpel = 0 ; kpel < Npel ; kpel++) {
      if (data[offset + 3] < threshold) {
        data[offset + 3] = 0 ;
      } else {
        data[offset + 3] = 255 ;
      }
      offset += 4 ;
    }    

    context.putImageData(image, 0, 0) ;

  },

  color_filter: function image_effect_helper_color_filter (canvas, color, strength) {

    if ( strength === undefined ) {
      strength = 1 ;
    }

    // strength goes from 0 to 1

    if( strength > 1 ) {
      strength = 1 ;
    } 

    if ( strength < 0 ) {
      strength = 0 ;
    }

    function blend(x, y, c1) {
      var mixedVal = (1 - c1) * x + c1 * y ;
      // console.log('blend: ', 'x, y, c1, mixedVal', x, y, c1, mixedVal) ;
      return Math.round(mixedVal) ;
    }

    var filteredImage = $Z.helper.image.copy(canvas) ;

    for (let kclr = 0 ; kclr < color.length ; kclr++) {


      if(color[kclr] !== undefined) {
        // console.log('color[kclr]', color[kclr], 'strength', strength) ;
        imageEffectHelper.foreach( filteredImage, function(x) { return blend(x, color[kclr], strength) ; }, kclr ) ;
      }

    }

    return filteredImage ;

    // to test:  imageEffectHelper.color_filter ( document.viz.item[0].image, [255, 255, 0], -1 )

  },

  fade_transition: function image_effect_helper_fade_transition(fadeConfig) {

    var defaultFadeDuration = 1000 ;
    if(fadeConfig.duration === undefined) {
      fadeConfig.duration = defaultFadeDuration ;
    }

    var newTransition = $Z.helper.transition.linear_transition_func('opacity', fadeConfig.duration)(fadeConfig.opacity) ;

    if( fadeConfig.end !== undefined) {
      newTransition.end = fadeConfig.end ;
    }

    if( fadeConfig.child !== undefined) {
      newTransition.child = fadeConfig.child ;
    }

    if ( fadeConfig.pause !== undefined) {
      newTransition.pause = fadeConfig.pause ;
    }

    return newTransition ;

  },

  fade_sequence: function image_effect_helper_fade_sequence( fadeConfig ) {

    if ( fadeConfig === undefined ) {
      fadeConfig = {} ;
    }

    var valueList = fadeConfig.valueList ;
    var duration  = fadeConfig.duration || 1000 ;
    var value     = fadeConfig.value ;

    var create_fade = $Z.helper.transition.fixed_duration_linear('opacity', duration) ;    
    
    return $Z.helper.transition.new_sequence(value, create_fade) ;

  },

  explode: function effect_helper_image_explode(blocksize, duration, removeSwitch, fadeSwitch, item) {

    if(item === undefined) {
      item = this ;
    }

    if(blocksize === undefined) {
      blocksize = 24 ;
    }

    if(duration === undefined) {
      duration = 1500 ;
    }

    if(removeSwitch === undefined) {
      removeSwitch = true ;
    }

    if(fadeSwitch === undefined) {
      fadeSwitch = true ;
    }

    if(removeSwitch) {
      $Z.helper.item.remove(item) ;
    }

    // console.log('explode start') ;

    var Nrow   = Math.floor(item.image.height / blocksize) ;
    var Ncol   = Math.floor(item.image.width / blocksize) ;
    var Nblock = Nrow * Ncol ;
    var block  = new Array(Nblock) ;

    var sx, sy ;
    var sw = blocksize ;
    var sh = blocksize ;
    var dx = 0 ;
    var dy = 0 ;
    var dw = blocksize ;
    var dh = blocksize ;

    var scale = 300 ;

    for(var krow = 0 ; krow < Nrow ; krow++) {
      for(var kcol = 0 ; kcol < Ncol ; kcol++) {
        var canvas  = $Z.helper.image.create(blocksize, blocksize) ;
        var context = canvas.context() ;
        sx = Math.floor(kcol * blocksize / document.ratio) ;
        sy = Math.floor(krow * blocksize / document.ratio) ;
        context.drawImage(item.image, sx, sy, sw, sh, dx, dy, dw, dh) ;
        var k = krow * Ncol + kcol ;
        var xTrans = $Z.helper.transition.rounded_linear_transition_func('x', duration)((Math.random() - 0.5) * 2 * scale + item.x + sx) ;
        block[k] = Object.assign($Z.helper.item.setup(), { 
          viz: item.viz,
          x: item.x + sx,
          y: item.y + sy,
          image: canvas,
          opacity: 1,
          render: $Z.helper.draw.image,
          inert: true,
          transition: [
            xTrans,
            $Z.helper.transition.rounded_linear_transition_func('y', duration)((Math.random() - 0.5) * 2 * scale + item.y + sy),
          ],
        }) ;
        xTrans.end = $Z.helper.transition.remove_end(block[k]) ;
        if(fadeSwitch) {
          imageEffectHelper.fade.call(block[k], { duration: duration }) ;   
        }         
      }
    }

    $Z.helper.item.add(viz, block) ;

  },  

} ;

let effectHelper = { // effectHelper module for creating effects i.e. compositions of transitions

  image: imageEffectHelper,

  zoom_inout: function effect_zoom_inout(zoomConfig, viz) {

    if(viz === undefined) {
      viz = this ;
    }

    if ( zoomConfig === undefined ) {
      zoomConfig = {} ;
    }

    var viewDelta = -2 * Math.floor(viz.screenCanvas.width * 0.04) ;
    if(zoomConfig.width === undefined) {
      var newWidth  = viz.screenCanvas.width  + viewDelta ;
    } else {
      newWidth  = zoomConfig.width * document.ratio ;
    }

    if(zoomConfig.height === undefined) {
      var newHeight = viz.screenCanvas.height + viewDelta ;     
    } else {
      newHeight = zoomConfig.height * document.ratio ;            
    }

    if(zoomConfig.x === undefined) {
      var xNew = Math.floor(viz.viewportX - 0.25 * viewDelta) ;
    } else {      
      var xNew = zoomConfig.x * document.ratio ;
    }

    if(zoomConfig.y === undefined) {
      var yNew = Math.floor(viz.viewportY - 0.25 * viewDelta) ;
    } else {      
      var yNew = zoomConfig.y * document.ratio ;
    }

    if(zoomConfig.duration === undefined) {
      var zoomDur = viz.fadeDuration ;            
    } else {
      var zoomDur = zoomConfig.duration ;
    }
  
    var zoomDur = 0.25 * zoomDur ; // for now

    if(zoomConfig.shakeSwitch === undefined) {
      var shakeSwitch = false ;
    } else {
      var shakeSwitch = zoomConfig.shakeSwitch ;
    }

    xNew = Math.max(0, Math.min(viz.width  * document.ratio, xNew)) ;
    yNew = Math.max(0, Math.min(viz.height * document.ratio, yNew)) ;
    
    // console.log('zoom in out:', 'newWidth', newWidth, 'newHeight', newHeight, 'xNew', xNew, 'yNew', yNew) ;

    var widthIn   = $Z.helper.transition.rounded_linear_transition_func('viewportWidth', zoomDur)(newWidth) ;
    var heightIn  = $Z.helper.transition.rounded_linear_transition_func('viewportHeight', zoomDur)(newHeight) ;
    var xIn       = $Z.helper.transition.rounded_linear_transition_func('viewportX', zoomDur)(xNew) ;
    var yIn       = $Z.helper.transition.rounded_linear_transition_func('viewportY', zoomDur)(yNew) ;
    var widthOut  = $Z.helper.transition.rounded_linear_transition_func('viewportWidth', zoomDur)(viz.screenCanvas.width) ;
    var heightOut = $Z.helper.transition.rounded_linear_transition_func('viewportHeight', zoomDur)(viz.screenCanvas.height) ;
    var xOut      = $Z.helper.transition.rounded_linear_transition_func('viewportX', zoomDur)(0) ;
    var yOut      = $Z.helper.transition.rounded_linear_transition_func('viewportY', zoomDur)(0) ;

    widthIn.child  = widthOut ;
    heightIn.child = heightOut ;
    xIn.child      = xOut ;
    yIn.child      = yOut ;

    widthIn.pause  = 0.45 * zoomDur ;
    heightIn.pause = 0.45 * zoomDur ;
    xIn.pause      = 0.45 * zoomDur ;
    yIn.pause      = 0.45 * zoomDur ;

    if(shakeSwitch) {
      widthIn.end = function() {
        viz.shake() ;
      }    
    }

    viz.add_transition(widthIn) ;
    viz.add_transition(heightIn) ;
    viz.add_transition(xIn) ;
    viz.add_transition(yIn) ;

  },

  zoom: function effect_helper_zoom(zoomConfig, viz) {

    if(viz === undefined) {
      viz = this ;
    }

    viz.add_transition(effectHelper.zoom_transition(zoomConfig)) ;
  },

  zoom_transition: function effect_helper_zoom_transition(zoomConfig) {

    if(zoomConfig.duration === undefined) {
      zoomConfig.duration = 1000 ;
    }

    var zoomDur = zoomConfig.duration ;
    var width   = $Z.helper.transition.rounded_linear_transition_func('viewportWidth', zoomDur)(zoomConfig.width) ;
    var height  = $Z.helper.transition.rounded_linear_transition_func('viewportHeight', zoomDur)(zoomConfig.height) ;
    var x       = $Z.helper.transition.rounded_linear_transition_func('viewportX', zoomDur)(zoomConfig.x) ;
    var y       = $Z.helper.transition.rounded_linear_transition_func('viewportY', zoomDur)(zoomConfig.y) ;

    return [width, height, x, y] ;

  },

  method: {

    flash: function effect_flash (Nflash, flashDuration, item) {

      if ( item === undefined ) { // assume that "this" corresponds to the element item object
        item = this ;
      }

      if ( Nflash === undefined ) {
        Nflash = 5 ;
      }

      if ( flashDuration === undefined ) {
        flashDuration = 100 ;
      }

      // console.log('effectHelper flash', 'frameDuration', frameDuration, 'Nstep', Nstep) ;
      // console.log('effectHelper flash 5') ;
      var blank = function () {} ;
      var valueList = [blank, $Z.helper.draw.item] ;

      var flash     = new Array(2 * Nflash) ;
      
      for(var kflash = 0 ; kflash < 2 * Nflash ; kflash++) {
        flash[kflash] = $Z.helper.transition.new_step('render', valueList[kflash % valueList.length], flashDuration) ;
      }

      flash = $Z.helper.transition.sequence(flash) ;

      // var loopConfig = {
      //  Nstep: Nstep,
      //  position: 0,
      //  frameDur: frameDuration,
      // } ;
      // // console.log('effectHelper flash 12') ;

      // var loop = animate_loop (loopConfig, valueList, create_transition) ;

      item.add_transition(flash) ;

      // console.log('effectHelper flash', 'flash', flash) ;

      return flash ;

    },

    shake: function effect_shake(xKey, yKey, item) {

      if(item === undefined) {
        item = this ;
      }

      if(xKey === undefined) {
        xKey = 'x' ;
      }

      if(yKey === undefined) {
        yKey = 'y' ;
      }

      var xShakeMove = [1, -1, -1,  1] ; 
      var yShakeMove = [1, -1,  1, -1] ; 

      var damping = 1.5 * document.ratio ;
      var dampingFactor = 1 ;
      var Nstep = 9 ;

      xTransition = new Array(Nstep) ;
      yTransition = new Array(Nstep) ;

      for (let kstep = 0 ; kstep < Nstep - 1 ; kstep++) {
        xTransition[kstep] = item.transitionSet[xKey](Math.round(Math.random() * xShakeMove[(kstep + $Z.iter)     % xShakeMove.length] * damping)) ;
        yTransition[kstep] = item.transitionSet[yKey](Math.round(Math.random() * yShakeMove[(kstep + $Z.iter * 3) % xShakeMove.length] * damping)) ;
        damping *= dampingFactor ;
      }

      xTransition[kstep] = item.transitionSet[xKey](0) ;
      yTransition[kstep] = item.transitionSet[yKey](0) ;

      xTransition = $Z.helper.transition.sequence(xTransition)[0] ;
      yTransition = $Z.helper.transition.sequence(yTransition)[0] ;

      // console.log('xTransition', xTransition, 'yTransition', yTransition) ;

      var replacementSwitch = true ;
      item.add_transition([xTransition, yTransition]) ;

    },    

  },

} ; // end effectHelper

export { effectHelper as default }