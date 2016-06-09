var inputEvent = {
  
  down: function input_event_down (event) {

    var inputHandler ;
    var eventList ;

    switch (event.type) {

      case 'keydown': 
        inputHandler = 'keyboard_down' ;
        eventList = event ;
        break;
      case 'mousedown': 
        inputHandler = 'screen_down' ;
        eventList = event ;
        break;
      case 'touchstart':
        inputHandler = 'screen_down' ;
        eventList = event.touches ;
        break;

    }     
  
    var prep = $Z._prep ;


    function run_click () {
      if(event.type === 'touchstart') {
        for(var kEvent = 0 ; kEvent < eventList.length ; kEvent++) {
          this.viz.input.response[inputHandler].call ( this.viz, eventList[kEvent] ) ;        
        }        
      } else {
        this.viz.input.response[inputHandler].call ( this.viz, eventList ) ;        
      }

      $Z.prep(prep) ;

    }

    var runClick = { 
      prep: run_click, 
      viz: this.viz 
    } ;

    var newPrep = prep.slice(0) ;
    newPrep.push(runClick) ;
    $Z.prep (newPrep) ;
  },

  up: function input_event_up (event) {

    switch (event.type) {

      case 'keyup': 
        this.viz.input.response.keyboard_up.call(this.viz, event) ;
        break;
      case 'mouseup': 
        break;
      case 'touchend':
        break;

    }     
    audioHelper.play() ;

  },

  response: {

    keyboard_up: function input_event_response_keyboard_up (event, viz) {
      if (viz === undefined) {
        viz = this ;
      }
      if ( viz.keyboard_up_callback !== undefined ) {
        viz.keyboard_up_callback(event) ;       
      }

    },
        
    keyboard_down: function input_event_response_keyboard_down (event, viz) {

      if(viz === undefined) {
        viz = this ;
      }
      if ( viz.keyboard_down_callback !== undefined ) {
        viz.keyboard_down_callback(event) ; 
      }

    },

    screen_down: function input_event_response_screen_down (event, viz) {

      if(viz === undefined) {
        viz = this ;
      }
    
      if(viz.screen_callback === undefined) {
        inputEvent.response.screen_callback.call(viz, event) ;
      } else {
        viz.screen_callback(event) ;
      }

    },

    screen_callback: function input_event_response_screen_callback (event, viz) {
    
      if (viz === undefined) {
        viz = this ;
      }

      if ( viz.ui === undefined ) {
        return ; // nothing to do
      }

      var position = set_canvas_position( viz.canvas ) ;

      var xIn = Math.round( ( event.clientX - position.left ) / position.scale ) ;
      var yIn = Math.round( ( event.clientY - position.top  ) / position.scale ) ;

      drawHelper.indexed( viz.ui.item, viz.ui.canvas ) ;

      var color     = viz.ui.canvas.context().getImageData( xIn, yIn, 1, 1 ).data ;
      var itemIndex = color[0] - 1 ; // color indexing used by imageHelper.to_index is 1-based
      if(itemIndex >= 0) { // user selected a user-interface item 
        viz.ui.item[itemIndex].callback() ;
      } 

    }, 


	},

} ;