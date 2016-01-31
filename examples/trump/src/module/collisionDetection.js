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

    // console.log('collision_detect', 'item', item) ;

    for ( var kItem = 0 ; kItem < Nitem ; kItem++ ) {

      // collision.detect[item[kItem]] = {} ; // initialize

      if (item[kItem].inert === undefined || item[kItem].inert) {
        continue ;
      }
      
      // console.log('collision_detection', 'item[kItem].image', item[kItem].image) ;

      var imageK = item[kItem]
        .image
        .getContext('2d')
        .getImageData(0, 0, item[kItem].image.width, item[kItem].image.height) ;

      var initialPelIndex =  item[kItem].y * width                      +  item[kItem].x  ;
      var finalPelIndex   = (item[kItem].y + imageK.height - 1) * width + (item[kItem].x + imageK.width - 1) ;

      for ( var i = item[kItem].y ; i < item[kItem].y + imageK.height ; i++ ) {
        for ( var j = item[kItem].x ; j < item[kItem].x + imageK.width ; j++ ) {

          // var i = Math.floor (kPel / width) ;
          // var j = kPel % width ;

          var kPel = i * width + j ;

          if 
          (    
               ( i < item[kItem].y ) 
            || ( i > item[kItem].y + item[kItem].image.height - 1 )
            || ( j < item[kItem].x )
            || ( j > item[kItem].x + item[kItem].image.width - 1 ) 
          ) 
          {
            continue ;
          }
          
          var offset   = kPel * Nchannel ;
          var iItem    = i - item[kItem].y ;
          var jItem    = j - item[kItem].x ;
          var kPelItem = iItem * item[kItem].image.width + jItem ;

          var a = imageK.data[4 * kPelItem + 3] ; // use alpha channel to test for presence of nonempty pixel

          if (a > 0) {

            for ( var kChannel = 0 ; kChannel < Nchannel - 1 ; kChannel++ ) {

              if (img[offset + kChannel] !== undefined) { // this means that two objects are occupying the same pixel i.e. a collision occurred

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

    // console.log('collision_detect', 'collision.detect', collision.detect) ;

    viz.collision = collision ; // update the collision output object

  },

} ;