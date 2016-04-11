var itemHelper = {

	setup: function item_helper_setup(itemConfig, viz) {
		
		if(viz === undefined) {
		  viz = this ;
		}

		if(itemConfig.opacity === undefined) {
			itemConfig.opacity = 1 ;
		}

		if(itemConfig.inert === undefined) {
			itemConfig.inert = true ;
		}

		var item = { // configurable properties: x, y, type, element, opacity, image, inert, render, fixed, transition

  		config: itemConfig,
	    viz: itemConfig.viz || viz, 
			x: itemConfig.x,
			y: itemConfig.y,
			xOrigin: itemConfig.xOrigin || 0,
			yOrigin: itemConfig.yOrigin || 0,
			type: itemConfig.type,
			element: itemConfig.element,
			enter: itemConfig.enter,
			exit: itemConfig.exit,
		  opacity: itemConfig.opacity,
  		image: itemConfig.image,
	    inert: itemConfig.inert,
	    fixed: itemConfig.fixed,
	    uiSwitch: itemConfig.uiSwitch,
	    render: itemConfig.render || drawHelper.image, // drawHelper.image expects "this" to  be "item"
		  responseSet: {}, // add response objects separately
	    collision_image: actionHelper.collision_image, // actionHelper.collision_image() expects "this" to be "item"
	    add: itemHelper.add,
	    add_transition: transitionHelper.add, // transitionHelper.add expects "this" to be "item"
	    remove_transition: transitionHelper.remove,
	    add_end: transitionHelper.add_end,
	    fade: imageEffectHelper.fade, // imageEffectHelper.fade expects "this" to be "item"
	    flash: effectHelper.flash,
	    remove: itemHelper.remove,
  		zoom: itemHelper.zoom,

		} ;

		return item ;

	},

	zoom: function item_zoom(scale, duration, item) {

		if(item === undefined) {
			item = this ;
		}

		if(scale === undefined) {
			scale = 0.5 ;
		}

		if(duration === undefined) {
			duration = item.viz.fadeDuration ;
		}
		// console.log('item helper', 'zoom', 'this', this) ;

		item.viz.zoom({
	    duration: duration, 
	    x: item.x, 
	    y: item.y, 
	    width: item.viz.width * scale, 
	    height: item.viz.height * scale,
	  }) ;

  },

  add: function(viz, item) {

	  if(item === undefined) {
	    item = this ;
	  }

	  if(viz === undefined) {
	  	viz = this.viz ;
	  }

	  if(viz.item === undefined) {
	    viz.item = [] ;
	  }

	  if(item.constructor !== Array) {

	  	// console.log('item helper:', 'viz', viz, 'this', this)

	    viz.stagingArray.push(item) ;        
	  
	  } else {

	    for(var kitem = 0 ; kitem < item.length ; kitem++) {
	      viz.stagingArray.push(item[kitem]) ;
	    }
	  
	  }

  },

	remove: function item_helper_remove(item) {

		if(item === undefined) {
			item = this ;
		}

		item.removeSwitch = true ;

  },

} ;
