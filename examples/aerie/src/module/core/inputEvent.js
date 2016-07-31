var inputEvent = {
  
  down: function input_event_down (event, doc) {

    if ( doc === undefined ) {
      doc = this ; 
    }

    // console.log ('event down', 'this', this, 'doc.viz', doc.viz, 'event', event) ;    

    var inputHandler ;
    var eventList ;

    switch (event.type) {

      case 'keydown': 
        inputHandler = 'keyboard' ;
        eventList = event ;
        break;
      case 'mousedown': 
        inputHandler = 'screen' ;
        eventList = event ;
        break;
      case 'touchstart':
        inputHandler = 'screen' ;
        eventList = event.touches ;
        break;

    }     

    function run_click () {
      // console.log('input event run click:', 'inputHandler', inputHandler) ;
      if(event.type === 'touchstart') {
        for(var kEvent = 0 ; kEvent < eventList.length ; kEvent++) {
          doc.viz.input.response[inputHandler].call ( doc.viz, eventList[kEvent] ) ;        
        }        
      } else {
        doc.viz.input.response[inputHandler].call ( doc.viz, eventList ) ;        
      }

    }

    var runClick = { 
      prep: run_click, 
      viz: doc.viz 
    } ;

    $Z._prep.push(runClick) ;

  },

  up: function input_event_up (event, doc) {

    if ( doc === undefined ) {
      doc = this ;
    }

    $Z.prep([doc.viz]) ;

  },

  response: {
        
    keyboard: function input_event_response_keyboard (event, viz) {

      if(viz === undefined) {
        viz = this ;
      }

      if ( viz.keyboard_callback !== undefined ) {
        viz.keyboard_callback(event) ; 
      } else { 
        inputEvent.response.keyboard_callback(event, viz) ;
      }

    },

    screen: function input_event_response_screen (event, viz) {

      if(viz === undefined) {
        viz = this ;
      }
    
      if(viz.screen_callback === undefined) {
        inputEvent.response.screen_callback(event, viz) ;
      } else {
        viz.screen_callback(event) ;
      }

    },

    keyboard_callback: function input_event_keyboard_callback (event, viz) {

      if (viz === undefined) {
        viz = this ;
      } 

      if ( viz.keyboard_callback === undefined ) {
        return ;
      }

      viz.keyboard_callback(event) ;   

    },

    screen_callback: function input_event_response_screen_callback (event, viz) {

    
      if (viz === undefined) {
        viz = this ;
      }

      if ( viz.ui === undefined ) {
        return ; // nothing to do
      }

      $Z.helper.draw.indexed( viz.ui.item, viz.ui.canvas ) ;

      var position = viz.screenCanvas.set_position() ;

      viz.viewportScaleX = viz.viewportWidth  / viz.screenCanvas.width ;      
      viz.viewportScaleY = viz.viewportHeight / viz.screenCanvas.height ;      

      var xIn = Math.round( viz.viewportX + viz.viewportScaleX * ( event.clientX - position.left ) / position.scaleX ) ;
      var yIn = Math.round( viz.viewportY + viz.viewportScaleY * ( event.clientY - position.top  ) / position.scaleY ) ;

      var color     = viz.ui.canvas.context().getImageData( xIn, yIn, 1, 1 ).data ;
      var itemIndex = color[0] - 1 ; // color indexing used by imageHelper.to_index is 1-based

      if(itemIndex >= 0) { // user selected a user-interface item 
        viz.ui.item[itemIndex].callback() ;
      } 

    
      // if (viz === undefined) {
      //   viz = this ;
      // }

      // if ( viz.ui === undefined ) {
      //   return ; // nothing to do
      // }

      // var position = viz.screenCanvas.set_position() ;

      // var xIn = Math.round( ( event.clientX - position.left ) / position.scale ) ;
      // var yIn = Math.round( ( event.clientY - position.top  ) / position.scale ) ;

      // $Z.helper.draw.indexed( viz.ui.item, viz.ui.canvas ) ;

      // var color     = viz.ui.canvas.context().getImageData( xIn, yIn, 1, 1 ).data ;
      // var itemIndex = color[0] - 1 ; // color indexing used by $Z.helper.image.to_index is 1-based

      // if(itemIndex >= 0) { // user selected a user-interface item 
      //   viz.ui.item[itemIndex].callback() ;
      // } 

    }, 

	},

} ;