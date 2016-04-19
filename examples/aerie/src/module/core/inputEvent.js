var inputEvent = {
  
  down: function input_event_down (event) {

    // console.log ('event down', 'this', this, 'this.viz', this.viz, 'event', event) ;    

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
  
    var prep = $Z._prep ;

    // console.log('input event: ', 'prep', prep) ;

    function run_click () {
      console.log('input event run click:', 'inputHandler', inputHandler, 'eventList', eventList) ;
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
  
    // console.log('input event: ', 'newPrep', newPrep) ;

    $Z.prep (newPrep) ;
    //console.log ('mousedown: holding', holding, 'event', event) ;
  },

  up: function input_event_up (event) {

    //console.log('input event up', 'this', this) ;

    // console.log ('input event up end', 'event', event) ;

  },

  response: {
        
    keyboard: function input_event_response_keyboard (event, viz) {

      if(viz === undefined) {
        viz = this ;
      }
      // console.log('keyboard_callback', keyboard_callback) ;
      if ( viz.keyboard_callback !== undefined ) {
        viz.keyboard_callback(event) ; 
      }

    },

    screen: function input_event_response_screen (event, viz) {

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

      imageHelper.indexed_draw( viz.ui.item, viz.ui.canvas ) ;

      var color     = viz.ui.canvas.context().getImageData( xIn, yIn, 1, 1 ).data ;
      var itemIndex = color[0] - 1 ; // color indexing used by imageHelper.to_index is 1-based

      if(itemIndex >= 0) { // user selected a user-interface item 
        viz.ui.item[itemIndex].callback() ;
      } 

    }, 


	},

} ;