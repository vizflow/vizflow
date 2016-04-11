var inputEvent = {
  
  down: function input_event_down (event) {

    // console.log ('event down', 'this', this, 'this.viz', this.viz, 'event', event) ;    

    var inputHandler ;
    var eventList ;

    switch (event.type) {

      case 'keydown': 
        inputHandler = 'keyboard_handler' ;
        eventList = event ;
        break;
      case 'mousedown': 
        inputHandler = 'screen_handler' ;
        eventList = event ;
        break;
      case 'touchstart':
        inputHandler = 'screen_handler' ;
        eventList = event.touches ;
        break;

    }     
  
    function run_click () {
      // console.log('input event run click:', 'inputHandler', inputHandler) ;
      if(event.type === 'touchstart') {
        for(var kEvent = 0 ; kEvent < eventList.length ; kEvent++) {
          this.viz.buttonpress[inputHandler].call (this.viz, eventList[kEvent]) ;        
        }        
      } else {
        this.viz.buttonpress[inputHandler].call (this.viz, eventList) ;        
      }
    }

    var runClick = { 
      prep: run_click, 
      viz: this.viz 
    } ;
   
    $Z.prep ([this.viz, runClick]) ;
    //console.log ('mousedown: holding', holding, 'event', event) ;
  },

  up: function input_event_up (event) {

    // console.log('input event up', 'this', this) ;

    // console.log ('input event up end', 'event', event) ;

  },

  response: {
        
    keyboard: function buttonpress_keyboard_handler (event, viz) {

      if(viz === undefined) {
        viz = this ;
      }

      viz.keyboard_callback(event) ;

    },

    screen: function buttonpress_screen_handler (event, viz) {

      if(viz === undefined) {
        viz = this ;
      }
    
      if(viz.screen_callback === undefined) {
        inputEvent.response.screen_callback(event) ;
      } else {
        viz.screen_callback(event) ;
      }

    },

    screen_callback: function input_event_response_screen_callback (event, viz) {
    
      if (viz === undefined) {
        viz = this ;
      }

      var position = set_canvas_position( viz.canvas ) ;

      var xIn = Math.round( ( event.clientX - position.left ) / position.scale ) ;
      var yIn = Math.round( ( event.clientY - position.top  ) / position.scale ) ;

      imageHelper.indexed_draw( viz.ui.item, viz.ui.canvas ) ;

      var color     = viz.ui.canvas.context().getImageData( xIn, yIn, 1, 1 ).data ;
      var itemIndex = color[0] - 1 ; // color indexing used by image2index is 1-based

      if(itemIndex >= 0) { // user selected a user-interface item 
        viz.ui.item[itemIndex].callback() ;''
      } 

    }, 


	},

} ;