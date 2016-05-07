var itemHelper = {

	setup: function item_helper_setup(itemConfig, viz) {

		if(viz === undefined) {
		  viz = this ;
		}

		if ( itemConfig === undefined ) {
			itemConfig = {} ;
		}

		if(itemConfig.opacity === undefined) {
			itemConfig.opacity = 1 ;
		}

		if(itemConfig.inert === undefined) {
			itemConfig.inert = true ;
		}

		var item = { // configurable properties: x, y, type, element, opacity, image, inert, render, fixed, transition

			/* default properties: */

	    add:               itemHelper.add,
	    remove:            itemHelper.remove,
  		zoom:              itemHelper.zoom,
  		scale:             itemHelper.scale,
  		loop:              itemHelper.loop,
  		default_child:     itemHelper.default_child,
      call:              itemHelper.call,
	    add_transition:    transitionHelper.add, // transitionHelper.add expects "this" to be "item"
	    remove_transition: transitionHelper.remove,
	    add_end:           transitionHelper.add_end,
		  add_linear:        transitionHelper.add_linear,
		  add_rounded_linear: transitionHelper.add_rounded_linear,
		  add_step:          transitionHelper.add_step,
		  add_sequence:      transitionHelper.add_sequence,
  		loop_trans:        transitionHelper.loop_trans,
	    collision_image:   actionHelper.collision_image, // actionHelper.collision_image() expects "this" to be "item"
	    fade:              imageEffectHelper.fade, // imageEffectHelper.fade expects "this" to be "item"
	    flash:             effectHelper.flash,
      delayCount:        0,

	    /* configurable properties: */

  		config:    itemConfig,
	    viz:       itemConfig.viz || viz, 
			x:         itemConfig.x,
			y:         itemConfig.y,
			angle:     itemConfig.angle   || 0,
			xOrigin:   itemConfig.xOrigin || 0,
			yOrigin:   itemConfig.yOrigin || 0,
			xAngle:    itemConfig.xAngle  || 0,
		  yAngle:    itemConfig.yAngle  || 0,
		  xScale:    itemConfig.xScale  || 1,
		  yScale:    itemConfig.yScale  || 1,
			type:      itemConfig.type,
			element:   itemConfig.element,
			enter:     itemConfig.enter,
			exit:      itemConfig.exit,
		  opacity:   itemConfig.opacity,
			color:     itemConfig.color,
			width:     itemConfig.width,
			height:    itemConfig.height,
  		image:     itemConfig.image,
  		child:     itemConfig.child,
      childFade: itemConfig.childFade,
	    inert:     itemConfig.inert,
	    fixed:     itemConfig.fixed,
	    uiSwitch:  itemConfig.uiSwitch || false,
  		callback:  itemConfig.callback,
	  	addSwitch: itemConfig.addSwitch || true,
	    render:    itemConfig.render || drawHelper.item, // drawHelper.image expects "this" to  be "item"
		  responseSet: {}, // add response objects separately

		} ;

		if ( item.addSwitch === true ) { 
			item.add() ;
		}

		return item ;

	},

	default_child: function item_helper_default_child (item) {

		if ( item === undefined ) {
			item = this ;
		}

		if ( item.child === undefined ) {
			item.child = [] ; // initialize
		}

		var white = imageEffectHelper.color_filter(item.image, [255, 255, 255]) ;

		item.white       = Object.copy(item) ;
		item.white.child = undefined ;

		item.white.image   = white ;
		item.white.opacity = 0 ;

		item.child.push(item.white) ;

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

  scale: function item_helper_scale ( scale0, scale1, item ) {

    if ( item === undefined ) {
      item = this ;
    }

    if ( scale1 === undefined ) {
      scale1 = scale0 ;
    }

    item.xScale = scale0 ;
    item.yScale = scale1 ;

  },

  loop: function item_helper_loop( trans_func, item ) {

    if ( item === undefined ) {
      item = this ;
    }

    item.add_transition( item.loop_trans(trans_func) ) ;              

  },

  call: function item_helper_call (callback, delay, item) {

    if ( item === undefined ) {
      item = this ;
    }

    item.delayCount++ ;

    var trans = transitionHelper.new_step('delay' + item.delayCount, undefined, delay) ;

    trans.end = function() {
      callback.call(item) ;
      item.delayCount-- ;
    } ;

    item.add_transition(trans) ;

  },

} ;
