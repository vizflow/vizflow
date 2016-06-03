let spriteHelper = {

  foreach: function sprite_helper_foreach (spriteSet, func) {

    let key    = Object.keys(spriteSet) ;
    var newSet = {} ;

    for(let k = 0 ; k < key.length ; k++ ) {

      if ( spriteSet[ key[k] ].constructor === Array ) {
   
        newSet[ key[k] ] = spriteSet[ key[k] ].map(func) ;

      } else {
        
        newSet [ key[k] ] = spriteSet[ key[k] ] ;
      
      }

    } 

    return newSet ;

  },

  make_sheet: function sprite_helper_make_sheet (spriteSet) {

    function get_width(canvas) {
      return canvas.width ;
    }

    function get_height(canvas) {
      return canvas.height ;
    }

    widthSet = spriteHelper.foreach(spriteSet, get_width) ;
    heightSet = spriteHelper.foreach(spriteSet, get_height) ;

    var spriteCount = 0 ; // initialize
    var totalWidth = 0 ; // initialize
    var height = [] ; // initialize
    for(let key in spriteSet) {
      if( spriteSet[ key ].constructor === Array ) {
        spriteCount++ ; 
        var widthK  = widthSet[key].reduce( function(a, b) { return a + b ; } );
        var heightK = heightSet[key][0] ;
        height.push(heightK) ;
        if(widthK > totalWidth) {
          totalWidth = widthK ;
        }
      }
    }

    // console.log('widthSet', widthSet, 'totalWidth', totalWidth) ;

    var totalHeight = height.reduce( function(a, b) { return a + b ; } );

    // console.log('totalHeight', totalHeight)

    var canvas  = $Z.helper.image.create(totalWidth, totalHeight) ;
    var context = canvas.context() ;

    var offsetY = 0 ;

    for(let key in spriteSet) {
      var val = spriteSet[key] ;
      if(val.constructor === Array) {

        var offsetX = 0 ;

        for(let kcol = 0 ; kcol < val.length ; kcol++) {
          context.drawImage(val[kcol], offsetX, offsetY) ;
          offsetX += val[kcol].width ;
        }

      }
      offsetY += height.shift() ;
    }

    $Z.helper.image.view(canvas) ;

  },

  is_blank: function sprite_helper_is_blank(data) {
    // viz.player.item,
    // viz.ui.button.walkLeft,
    // viz.ui.button.walkRight,
    // viz.ui.button.attack,
    // viz.ui.button.jump,
    // viz.enemy.item.responseSet.hit.healthbar.item,
    // viz.player.item.responseSet.hit.healthbar.item,

    var isZero = true ;

    for( let k = 0 ; k < data.data.length ; k++) {
      if(data.data[k] !== 0) {
        isZero = false ;
        break ;
      }
    }

    return isZero ;

  },

  get: function sprite_helper_get (canvas, rowName, tileWidth, rowHeight, paddingSwitch) {

    // $Z.helper.image.view(canvas) ;

    if(paddingSwitch === undefined) {
      paddingSwitch = true ;
    }

    if ( rowHeight.constructor === Number ) {
      var h = rowHeight ;
      rowHeight = new Array(rowName.length) ;
      for ( let krow = 0 ; krow < rowHeight.length ; krow++ ) {
        rowHeight[krow] = h ;
      }
    }

    if ( tileWidth.constructor === Number ) {
      var w = tileWidth ;
      tileWidth = new Array(rowName.length) ;
      for ( let ktile = 0 ; ktile < tileWidth.length ; ktile++ ) {
        tileWidth[ktile] = w ;
      }
    }

    var maxHeight = Math.max.apply(null, rowHeight) ;
    var Nrow = rowName.length ;
    var spriteSet = {} ;
    var sy        = 0 ;
    for(let krow = 0 ; krow < Nrow ; krow++) { // one sprite per row
      var row     = [] ; // initialize array to store the sprite
      var Ntile   = Math.floor(canvas.width / tileWidth[krow]) ;
      // console.log('spriteHelper get:', 'rowName[krow]', rowName[krow], 'krow', krow, 'Ntile', Ntile) ;
      for(let kcol = 0 ; kcol < Ntile ; kcol++) {
        if(paddingSwitch) {
          var tile = $Z.helper.image.create(tileWidth[krow], maxHeight) ;         
        } else {
          var tile = $Z.helper.image.create(tileWidth[krow], rowHeight[krow]) ;                   
        }
        var tileCtx = tile.context() ;
        var sx      = kcol * tile.width ;
        if(paddingSwitch) {
          tileCtx.drawImage( canvas, sx, sy, tile.width, rowHeight[krow], 0, maxHeight - rowHeight[krow], tile.width, rowHeight[krow] ) ;         
        } else {
          tileCtx.drawImage( canvas, sx, sy, tile.width, rowHeight[krow], 0, 0, tile.width, rowHeight[krow] ) ;                   
        }
        // console.log('spiteHelper get:', 'sx, sy, tile.width, tile.height, 0, maxHeight - rowHeight[krow], tile.width, tile.height', sx, sy, tile.width, tile.height, 0, maxHeight - rowHeight[krow], tile.width, tile.height) ;
        var tileData = $Z.helper.image.get_data(tile) ;
        var isBlank  = spriteHelper.is_blank(tileData) ;
        // console.log('spriteHelper get:', 'rowName[krow]', rowName[krow], 'kcol', kcol, 'tileData', tileData, 'isBlank', isBlank) ;
        if(isBlank) {
          break ;
        }
        tile = $Z.helper.image.adjust_ratio(tile) ;
        // console.log('spriteHelper get', 'tileCanvas', tile) ;        
        row.push(tile) ;
      }
      // console.log('spriteHelper get:', 'krow', krow, 'row', row, 'tile.width', tile.width, 'tile.height', tile.height, 'maxHeight', maxHeight, 'rowHeight', rowHeight) ;
      spriteSet[rowName[krow]] = row ;
      sy += rowHeight[krow] ;
    }

    return spriteSet ;

  },

  get_text: function sprite_helper_get_text (url, width, height, alpha) {
    var canvas = $Z.helper.image.to_canvas(url) ;
    if ( alpha === undefined ) {
      alpha  = "0123456789abcdefghijklmnopqrstuvwxyz".split("") ;
    }
    return spriteHelper.get(canvas, alpha, width, height) ;   
  },

  horizontal_flip: function sprite_helper_horizontal_flip (spriteSet) {

    let key    = Object.keys(spriteSet) ;
    var newSet = {} ;

    for(let k = 0 ; k < key.length ; k++ ) {

      // console.log('key[k]', key[k], 'spriteSet', spriteSet)

      if ( spriteSet[ key[k] ].constructor === Array ) {

        newSet[ key[k] ] = spriteHelper.flip_sprite( spriteSet[ key[k] ] ) ;

      } else {
        newSet [ key[k] ] = spriteSet[ key[k] ] ;
      }

    } 

    return newSet ;

  },

  flip_sprite: function sprite_helper_flip_sprite (sprite) {

    var spriteFlip = new Array(sprite.length) ;

    for ( let kFrame = 0 ; kFrame < sprite.length ; kFrame++ ) {

      spriteFlip[kFrame] = $Z.helper.image.flip_image ( sprite[kFrame] ) ;

      if(sprite[kFrame].originalCanvas !== undefined) {
        spriteFlip[kFrame].originalCanvas = $Z.helper.image.flip_image( sprite[kFrame].originalCanvas ) ;
      }
            
      if(sprite[kFrame].sourceCollisionImage !== undefined) {
        spriteFlip[kFrame].sourceCollisionImage = $Z.helper.image.flip_image( sprite[kFrame].sourceCollisionImage ) ;
      }

      if(sprite[kFrame].targetCollisionImage !== undefined) {
        spriteFlip[kFrame].targetCollisionImage = $Z.helper.image.flip_image( sprite[kFrame].targetCollisionImage ) ;
      } else { // default target collision image is the same as the original
        spriteFlip[kFrame].targetCollisionImage = spriteFlip[kFrame] ;
      }

    }

    return spriteFlip ;

  },  

  animate: function sprite_helper_animate (valueList, create_transition, callback, restFrame) {
    var animation ;
    if (restFrame === undefined) {
      animation = valueList ; 
    } else {
      animation = valueList.concat (restFrame) ; 
    }
    
    var Nframe = animation.length ;
    var transitionArray = new Array(Nframe) ;
    for(var kframe = 0 ; kframe < Nframe ; kframe++) {
      var transition = create_transition( animation[kframe] ) ;
      if(kframe === Nframe - 1) {        
        transition.end = callback ;
      }
      transitionArray[kframe] = (transition) ;
    }
    return transitionHelper.sequence(transitionArray) ;
  },

  animate_loop: function sprite_helper_animate_loop (loopConfig, valueList, create_transition, callback, restFrame) {
    // loop config expects: Nstep, position, frameDur
    var loopOutput = Object.copy(loopConfig) ; // initialize output variable
    var animation ;
    if (restFrame === undefined) {
      animation = valueList ; 
    } else {
      animation = valueList.concat (restFrame) ; 
    }
    
    var Nframe = animation.length ;

    if(loopConfig.Nstep === undefined) {
      loopConfig.Nstep = 1 ;
      loopOutput.Nstep = 1 ; // run one step of the loop by default
    }

    var kPos   = loopConfig.position ; 
    kPos       = kPos % Nframe ;
    var head   = [] ;
    var body   = [] ;
    var tail   = [] ;

    // var image_transition = transitionHelper.step_func('image', loopConfig.frameDur) ;

    loopOutput.totalDur = loopOutput.Nstep * loopOutput.frameDur ;
    var Nstep = loopConfig.Nstep ;
    // var Nstep = Math.floor (loopConfig.totalDur / loopConfig.frameDur) + 1 ;
    
    if (kPos > 0) { // create head array
      var Nhead = Math.min (Nframe - kPos, Nstep) ;
      for (var kHead = 0 ; kHead < Nhead ; kHead++) {
        head.push (animation[kPos + kHead]) ;
      }

      kPos += Nhead - 1 ;
      if (kPos === Nframe - 1 && Nstep > Nhead) {
        Nstep -= Nhead ;
      } else {
        Nstep = 0 ;
      }
    }

    if (Nstep > 0) {  // need body or tail
      kPos = Nstep ;

      if (Nstep >= Nframe) { // create body array
        var Nbody = Math.floor (Nstep / Nframe) ;
        for (var kBody = 0 ; kBody < Nbody ; kBody++) {
          body = body.concat (body, animation) ;
        }
        Nstep -= Nbody * Nframe ;
      } 

    }

    if (Nstep > 0) { // need tail
      kPos = Nstep - 1 ;
      for (var kTail = 0 ; kTail < Nstep ; kTail++) {
        tail.push (animation[kTail]) ;
      }
    }

    var loop = head.concat (body.concat( tail )) ;

    // console.log('animate_loop:', 'Nframe', Nframe, 'kpos', kPos, 'loop', loop, 'body', body, 'head', head, 'tail', tail) ;
    
    loopOutput.position              = (loopOutput.position + loopConfig.Nstep) % Nframe ;
    loopOutput.animation             = animate (loop, create_transition, callback) ;
    // loopOutput.animation[0].duration = 1 ; // show first frame immediately

    return loopOutput ;
  },

} ;

export { spriteHelper as default }