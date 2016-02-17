var itemHelper = {

	setup: function item_helper_setup(itemConfig, viz) {

		if(itemConfig.opacity === undefined) {
			itemConfig.opacity = 1 ;
		}

		if(itemConfig.inert === undefined) {
			itemConfig.inert = true ;
		}

		var item = {

	    viz: viz, 
			x: itemConfig.x,
			y: itemConfig.y,
			type: itemConfig.type,
			element: itemConfig.element,
		  opacity: itemConfig.opacity,
  		image: itemConfig.image,
	    collision_image: actionHelper.collision_image, // actionHelper.collision_image() expects "this" to be "item"
	    render: drawHelper.image, // drawHelper.image expects "this" to  be "item"
		  actionSet: {},
	    add_transition: transitionHelper.add, // transitionHelper.add expects "this" to be "item"
	    add_end: transitionHelper.add_end,
	    fade: imageEffectHelper.fade, // imageEffectHelper.fade expects "this" to be "item"
	    flash: effectHelper.flash,
	    inert: itemConfig.inert,
	    remove: itemHelper.remove,
  		config: itemConfig,
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

		item.viz.zoom_inout({
	    duration: duration, 
	    x: item.x, 
	    y: item.y, 
	    width:  item.viz.width * scale, 
	    height: item.viz.height * scale,
	  }) ;

  },

	remove: function item_helper_remove(item) {

		if(item === undefined) {
			item = this ;
		}

		item.removeSwitch = true ;

  },

} ;
