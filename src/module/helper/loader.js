let audioLoader = {

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

let imageLoader = {

  loading: false,  // initialize boolean to prevent duplicate preload() calls

  cache: {} , // class variable; initialize cache dictionary object

  loadingStats: {
    total: null, 
    count: null, 
    finalCallback: null
  } , // class variable, initialize loading statistics object]1    

  load: function (url) { // class method; callback incrementor - wait until final image is loaded before executing callback
  
    if (imageLoader.cache[url] !== undefined) {
      imageLoader.callback_handler() ;
    } else {
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

    if ( imageList.length === 0 ) {
      callback() ;
      return ;
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

let loader = {

  image: imageLoader,

  audio: audioLoader,

  all: function vizflow_core_loader_all(imageList, audioList, callback) {
    document.ratio     = 2 ; // upsample images to ensure crisp edges on hidpi devices 
    imageLoader.preload ( imageList, function preload_audio() {
      // console.log('main.js: preload_audio') ;
      audioLoader.preload( 
        audioList, 
        function main_run() {
          // console.log('main.js: main_run') ;
          var div = document.getElementById('loading') ;
          if ( div !== null ) {
            div.style.visibility = 'hidden' ;
          }
          callback() ;
        } 
      ) ;
    }) ;
  },

} ;

export { loader as default }