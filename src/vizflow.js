// vizflow: application-agnostic interactive vizualization engine
// by Daniel Korenblum 4/20/2015
// http://github.com/dannyko/vizflow

// import the helper functions and wrappers attached to the $Z object:

import step            from './step'       ;
import item            from './item'       ;
import prep            from './prep'       ;
import post            from './post'       ;
import detect          from './detect'     ;
import perform         from './perform'    ;
import pipe            from './pipe'       ;
import done            from './done'       ;
import exit            from './exit'       ;
import run             from './run'        ;
import viz             from './viz'        ;
import update          from './update'     ;
import transition      from './transition' ;

// import the functions defining the asynchronous tasks comprising the main simulation or game loop, stored in an array called "tasks": 

import preprocess      from './preprocess'      ;
import update_items    from './update_items'    ;
import detect_actions  from './detect_actions'  ;
import perform_actions from './perform_actions' ;
import render_image    from './render_image'    ;
import step_or_exit    from './step_or_exit'    ;
import postprocess     from './postprocess'     ;

// define the vizflow object ($Z): 

window.$Z = { // define the "bling Z" object for running interactive vizualizations

	requestAnimFrame: (
		window.requestAnimationFrame       || 
	  window.webkitRequestAnimationFrame || 
	  window.mozRequestAnimationFrame    || 
	  window.oRequestAnimationFrame      || 
	  window.msRequestAnimationFrame     || 
	  function(callback, element){
	  	window.setTimeout(callback, 17) ;
	  }
	),

	task: [    			   // array of functions defining the sequence of asynchronous (non-blocking) tasks to perform for each step/frame/iteration of the visualization
	  perform_actions, // perform any actions e.g. item updates that are necessary for the simulation to continue
	  preprocess,      // process user inputs and translate them into actionable changes to the data item attributes
	  update_items,    // apply changes to the data item attributes as determined by current data item and user input states 
	  render_image,    // draw the data items to the screen somehow (render-agnostic)
	  postprocess,     // e.g. draw all rendered images to the display element
	  detect_actions,  // apply simulation or game logic e.g. collision detection etc. to determine what actions need to be performed
	  step_or_exit,    // decides whether to generate another frame or to stop the simulation/game
	],

  verbose: false,    // toggles console log statements
	iter:    0,        // initialize loop iteration index (simulation step counter)
	maxIter: Infinity, // default maximum iteration count allowed (max # of frames

	_item:    [], // default data item array (internal use only as marked by underscore)
	_prep:    [], // array of preprocessing tasks to perform (internal use only as marked by underscore)
	_post:    [], // array of postprocessing tasks to perform
	_detect:  [], // array of detectors (internal use only as marked by underscore)
	_perform: [], // array of actions (internal use only as marked by underscore)
	_viz:     {}, // optional global visualization configuration object
	
	transition, // module comtaining transition helpers
	item,       // getter/setter function for interfacing with the item/data array
	prep,       // getter/setter function for interfacing with the _prep array
	update,     // default update function for items using arrays of transition objects containing interpolation functions
	post,       // getter/setter function for interfacing with the _prep array
	detect,     // getter/setter function for interfacing with the _detect array
	perform,    // getter/setter function for interfacing with the _perform array
	pipe,       // function for dynamically chaining promises using a for-loop
	step,       // function that executes one complete step (frame) of the interactive visualization / simulation / game
	done,       // function to check for the end of the simulation or game, returns true if the simulation or game has ended
	exit,       // function to execute after the simulation or game has ended to trigger the exit sequence
	run,        // function that executes each of the asynchronous tasks sequentially using Promise.then() chaining
	viz,        // function that load the visualization configuration object (viz)

} ;

export default {}