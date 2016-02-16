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

		} ;

		return item ;

	},

	remove: function item_helper_remove(item) {

		if(item === undefined) {
			item = this ;
		}

		item.removeSwitch = true ;

  },

} ;
