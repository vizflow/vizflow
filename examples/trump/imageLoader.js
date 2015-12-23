var imageLoader = {

  loading: false,  // initialize boolean to prevent duplicate preload() calls

  cache: {} , // class variable; initialize cache dictionary object

  loadingStats: {total: null, count: null, finalCallback: null} , // class variable, initialize loading statistics object

  load: function (url) { // class method; callback incrementor - wait until final image is loaded before executing callback
          if (imageLoader.cache[url] !== undefined) {
            imageLoader.callback_handler() ;
          }
          else {
            var img    = new Image() ;
            img.onload = imageLoader.callback_handler ;
            img.src    = url ;
            imageLoader.cache[url] = img ;
          }
          return img ; // return image object
				},

  callback_handler: function () {
			    imageLoader.loadingStats.count++ ;
			    if (imageLoader.loadingStats.count === imageLoader.loadingStats.total) {
			      imageLoader.loadingStats.finalCallback() ; // execute the final callback
			      imageLoader.loading = false ;
			    }
			    return ;
				},

  preload: function (imageList, callback) { // class method; cache dictionary builder
          if (imageLoader.loading) {
            return ; // prevent duplicate calls
          }
          imageLoader.loading = true ;
          imageLoader.loadingStats.total         = imageList.length ;
          imageLoader.loadingStats.count         = 0 ; // initialize 
          imageLoader.loadingStats.finalCallback = callback ;
          imageList.forEach ( function (url) {
          	imageLoader.load(url) ;
          }) ;
          return ;          
        },

} ; // module for managing image assets