var flowHelper = {

  isAllRunning: false,  // initialize boolean to prevent duplicate all() calls

  allConfig: {
    total: null, 
    count: null, 
    finalCallback: null
  } , // private variable, initialize run statistics object   

  all_handler: function () {
  
    flowHelper.allConfig.count++ ;

    if (flowHelper.allConfig.count === flowHelper.allConfig.total) {
      if(flowHelper.allConfig.finalCallback !== null && flowHelper.allConfig.finalCallback !== undefined) {
        flowHelper.allConfig.finalCallback() ; // execute the final callback
      }
      flowHelper.allConfig.finalCallback = null ;
      flowHelper.allConfig.count = null ;
      flowHelper.allConfig.total = null ;
      flowHelper.isAllRunning = false ;
    }

    return ;
	
  },

  all_iter: function(f) {
    flowHelper.seq(f, flowHelper.all_handler) ;
  },

  all: function (functionList, callback) { // class method; cache dictionary builder
  
    if (flowHelper.isAllRunning) {
      return ; // prevent duplicate calls
    }

    flowHelper.isAllRunning            = true ;
    flowHelper.allConfig.total         = functionList.length ;
    flowHelper.allConfig.count         = 0 ; // initialize 
    flowHelper.allConfig.finalCallback = callback ;

    for(var kf = 0 ; kf < functionList.length ; kf++) {
      flowHelper.all_iter(functionList[kf]) ;      
    }

    return ;          
  
  },

  seq: function (f1, f2, arg) {
    
    var a = f1(arg) ;
    if(a !== false) {
      var b = f2(a) ;
    }

    return b ;

  },

  pipeIndex: null,
  pipeList: [],
  pipeVar: null,

  pipe: function() {

    var f = flowHelper.pipeList ;

    if(flowHelper.pipeIndex === null) {
      flowHelper.pipeIndex = f.length ;
    }

    var f1 = f[f.length - flowHelper.pipeIndex] ;
    flowHelper.pipeIndex-- ;

    if(flowHelper.pipeIndex === 0) { // finished
      flowHelper.pipeIndex = null ;
      return f1(flowHelper.pipeVar) ; // execute the final pipe function call and return the final value if defined
    } else {
      flowHelper.pipeVar = flowHelper.seq(f1, flowHelper.pipe, flowHelper.pipeVar) ; // keep advancing down the pipe and propagate the I/O chain
    }

  },

} ; // module for managing execution flow control