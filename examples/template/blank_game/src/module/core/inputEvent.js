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

  buttonpress: {
    
    busy: false,
    
    reset: function buttonpress_reset () {
      $Z.prep ([document.viz]) ;
      this.busy = false ;
    },

    keyboard_handler: function buttonpress_keyboard_handler (event) {

      if (inputEvent.buttonpress.busy) {
        return ;  
      }

      inputEvent.buttonpress.busy = true ;
      this.keyboard_callback(event) ;

    },

    screen_handler: function buttonpress_screen_handler (e, viz) {

      if(viz === undefined) {
        viz = this ;
      }

      // console.log('screen handler', 'this', this, 'this.buttonpress', this.buttonpress) ;
    
      if (inputEvent.buttonpress.busy) {
        return ;
      }

      inputEvent.buttonpress.busy = true ;

      var position = set_canvas_position( viz.canvas ) ;

      var clickedX = Math.round( (e.clientX - position.left) / position.scale ) ;
      var clickedY = Math.round( (e.clientY - position.top)  / position.scale ) ;

      // console.log('screenhandler', 'clickedX', clickedX, 'clickedY', clickedY, 'this', this) ;

      viz.screen_callback(clickedX, clickedY) ;

    },

	},

} ;