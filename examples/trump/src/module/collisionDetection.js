var collisionDetection = {

  Nval: null,

  image: null,

  pixelwise: function collision_detection_run(viz) {

    if(viz === undefined) {
      viz = this ;
    }

    var item     = viz.item ;
    var width    = viz.width ;
    var height   = viz.height ;
    var Nitem    = item.length ;
    var Npel     = width * height ;
    var Nchannel = 2 ; // max 2 items per collision pixel
    var Nval     = Npel * Nchannel ;

    if(collisionDetection.Nval !== Nval) {

      collisionDetection.image = new Array(Nval) ; 

    } else {

      for(var kPel = 0 ; kPel < collisionDetection.image.length ; kPel++) {
        collisionDetection.image[kPel] = undefined ; // initialize
      }

    }

    var img = collisionDetection.image ;

    var collision = {} ; // initialize output object

    collision.index = {} ;
    // for ( var kVal = 0 ; kVal < Nval ; kVal++ ) {
    //      img.push(initialValue) ; // initialize
    // }

    // collision.detect = {} ; // initialize

    // console.log('collision_detect', 'item', item, 'width', width, 'height', height) ;

    // var canvas = create_canvas(width, height) ;
    // var context = canvas.getContext('2d') ;
    // context.globalAlpha = 0.5 ;

    for ( var kItem = 0 ; kItem < Nitem ; kItem++ ) {

      // collision.detect[item[kItem]] = {} ; // initialize

      // console.log('collisionDetection pixelwise', 'kItem', kItem) ;

      if (item[kItem].inert !== undefined && item[kItem].inert) {
        continue ;
      }

      if (item[kItem].image === undefined) { // need a canvas image to do pixelwise collision detection
        continue ;
      }
      
      if(item[kItem].image.originalCanvas === undefined) {
        var image = item[kItem].image ;
        var imageK = get_image_data(image) ;
      } else {
        var image = item[kItem].image.originalCanvas ;
        var imageK = get_image_data(item[kItem].image.originalCanvas) ;
      }

      // context.drawImage(image, item[kItem].x, item[kItem].y) ;

      // console.log('collision detection pixelwise', 'image', image, 'imageK', imageK) ;

      // var initialPelIndex =  item[kItem].y * width                      +  item[kItem].x  ;
      // var finalPelIndex   = (item[kItem].y + imageK.height - 1) * width + (item[kItem].x + imageK.width - 1) ;

      var iStart = Math.max(0, Math.min(height, item[kItem].y)) ;
      var iEnd   = Math.max(0, Math.min(height, item[kItem].y + imageK.height)) ;
      var jStart = Math.max(0, Math.min(width, item[kItem].x)) ;
      var jEnd   = Math.max(0, Math.min(width, item[kItem].x + imageK.width)) ;

      // console.log('collision detection', 'kItem', kItem, 'iStart', iStart, 'iEnd', iEnd, 'jStart', jStart, 'jEnd', jEnd, 'item', item) ;

      for ( var i = iStart ; i < iEnd ; i++ ) {
        for ( var j = jStart ; j < jEnd ; j++ ) {

          // var i = Math.floor (kPel / width) ;
          // var j = kPel % width ;

          var kPel = i * width + j ;
          
          var offset   = kPel * Nchannel ;
          var iItem    = i - iStart ;
          var jItem    = j - jStart ;
          if(item[kItem].y < 0){
            iItem += -item[kItem].y ;
          }
          if(item[kItem].x < 0) {
            jItem += -item[kItem].x ;
          }
          var kPelItem = Math.floor(iItem * image.width + jItem) ;

          var a = imageK.data[4 * kPelItem + 3] ; // use alpha channel to test for presence of nonempty pixel

          if (a > 0) {

            // if(item.length === 2 && kItem === 0) {
            //   console.log('collision detection', 'kItem', kItem, 'kPel', kPel, 'kPelItem', kPelItem, 'iItem', iItem, 'jItem', jItem, 'a', a) ;
            //   // break ;
            // }

            for ( var kChannel = 0 ; kChannel < Nchannel - 1 ; kChannel++ ) {

              if (img[offset + kChannel] !== undefined) { // this means that two objects are occupying the same pixel i.e. a collision occurred

                // console.log('collision occurred', 'kItem', kItem, 'item[kItem]', item[kItem], 'item[img[offset + kChannel]]', item[img[offset + kChannel]]) ;

                img[offset + kChannel + 1] = kItem ; // store the collision data
                collision.index[img[offset + kChannel] * Nitem + kItem] = true ; // use a single integer index to encode both of the integer indices for the two items that have collided
                
              } else if (kChannel == 0) {

                img[offset] = kItem ; // initial item index

              }

            }

          }

        }

      }

    }

    // console.log('collision detection', 'img', img, 'collision', collision, 'item', item) ;

    var key = Object.keys(collision.index) ;

    collision.count = 0 ;

    collision.list = new Array(key.length) ;

    for (var kKey = 0 ; kKey < key.length ; kKey++) {
      var i = Math.floor(key[kKey] / Nitem) ;
      var j = key[kKey] % Nitem ;

      collision.list[kKey] = [i, j] ;

      // collision.detect[item[i]][item[j]] = true ;
      // collision.detect[item[j]][item[i]] = true ;
      collision.count++ ;

    }

    // console.log('collision_detect', 'collision', collision) ;

    viz.collision = collision ; // update the collision output object

    // if(item.length === 2) {
    //   var dataURL = canvas.toDataURL("image/png") ;
    //   var win = window.open() ;
    //   win.document.write('<img src="' + dataURL + '"/>') ;            
    // }

  },

} ;