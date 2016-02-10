function setup_healthbar (viz, health, height, x, y, color) {
	var healthbar = {} ;

  healthbar.item = {
	  viz: viz, 

	  rect: {
	    viz: viz, 
	    x: x,
	    y: y,
	    width: health,
	    height: height,
	    color: color,
	    inert: true,
  	},

    render: function draw_bar() {
    	this.rect.width = this.width ;
      drawHelper.rect (this.rect, viz.fullContext) ;
    },

    width: health,
 } ;

 healthbar.initialHealth = health ;
 healthbar.health = health ;

 return healthbar ;

}