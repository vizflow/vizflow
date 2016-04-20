var audioLoader = {

  loading: false,  // initialize boolean to prevent duplicate preload() calls

  cache: {} , // class variable; initialize cache dictionary object

  loadingStats: { 

  	total: null, 
  	count: null, 
  	finalCallback: null 

  } , // local variable, initialize loading statistics object

  load: function (url) { // class method; callback incrementor - wait until final image is loaded before executing callback

    // console.log('audioLoader load start')

    if (audioLoader.cache[url] !== undefined) {
      audioLoader.callback_handler() ;
    } else {

      if (AudioContext) {
          // Do whatever you want using the Web Audio API
        // console.log('AudioContext', AudioContext, 'audioHelper', audioHelper)
        var audio = Object.copy(audioHelper) ; // shallow copy, maintains a single AudioContext container for all source files loaded
          // ...
      } else {
          // Web Audio API is not supported
          // Alert the user
          alert("Web Audio API is not supported by your browser.");
          return undefined ;
      }

			var request = new XMLHttpRequest() ;
			request.open('get', url, true) ;
			request.responseType = 'arraybuffer' ;
			request.onload = function () {
	  			// console.log('request.response', request.response, 'audioHelper.context', audioHelper.context, 'AudioContext', AudioContext) ;
				audioHelper.context.decodeAudioData( request.response, function(buff) { 
					audio.buffer = buff ;
			    audioLoader.cache[url] = audio ;
					audioLoader.callback_handler() ;
				}) ;
			}

			request.send() ;

    }

    return audio ; // return audio object

	},

  callback_handler: function () {

    audioLoader.loadingStats.count++ ;

    if (audioLoader.loadingStats.count === audioLoader.loadingStats.total) {
      audioLoader.loadingStats.finalCallback() ; // execute the final callback
      audioLoader.loading = false ;
    }

    return ;

	},

  preload: function (audioList, callback) { // class method; cache dictionary builder

    if (audioLoader.loading) {
      return false ; // prevent duplicate calls
    }

    if (audioList.length === 0) {
      callback() ;
      return ;
    }

    audioLoader.loading = true ;
    audioLoader.loadingStats.total         = audioList.length ;
    audioLoader.loadingStats.count         = 0 ; // initialize 
    audioLoader.loadingStats.finalCallback = callback ;
    // console.log ('audio loader preload', 'audioList', audioList) ;
    audioList.forEach ( function (url) {
    	audioLoader.load(url) ;
    }) ;

    return ;

  },

} ;