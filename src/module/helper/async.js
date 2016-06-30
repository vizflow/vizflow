let asyncHelper = {

  promisify: function async_helper_promisify(async_func) { // async_func should only accept one or two arguments (resolve and reject, see Promise API for details)

    var p = new Promise(function(resolve) {
      async_func(resolve) ;
    }) ;

    return p ;

  },

  promise: function setup_promisify(async) { // function that creates functions that return promises that wrap our async functions 

    function setup_async_promise() {
      return asyncHelper.promisify(async) ;
    }

    return setup_async_promise ;

  },

} ;

export { asyncHelper as default }