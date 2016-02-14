var audioLoader = {

  loading: false,  // initialize boolean to prevent duplicate preload() calls

  cache: {} , // class variable; initialize cache dictionary object

  loadingStats: { 
  	total: null, 
  	count: null, 
  	finalCallback: null 
  } , // class variable, initialize loading statistics object

  load: function (url) { // class method; callback incrementor - wait until final image is loaded before executing callback

    if (audioLoader.cache[url] !== undefined) {
      audioLoader.callback_handler() ;
    } else {

      var AudioContext = window.AudioContext // Default
        || window.webkitAudioContext // Safari and old versions of Chrome
        || false; 

      if (AudioContext) {
          // Do whatever you want using the Web Audio API
        var audio = { 
          buffer: null, 
          context: new AudioContext(), 
          play: audioHelper.play,
        } ;
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
	  			// console.log('request.response', request.response) ;
				audio.context.decodeAudioData( request.response, function(buff) { 
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

    audioLoader.loading = true ;
    audioLoader.loadingStats.total         = audioList.length ;
    audioLoader.loadingStats.count         = 0 ; // initialize 
    audioLoader.loadingStats.finalCallback = callback ;

    audioList.forEach ( function (url) {
    	audioLoader.load(url) ;
    }) ;

    return ;

  },

} ;