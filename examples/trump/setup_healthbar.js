function setup_healthbar (viz, health, height, y, color) {
	var healthbar = {} ;

  healthbar.item = {
	  viz: viz, 

	  rect: {
	    viz: viz, 
	    x: 120,
	    y: y,
	    width: health,
	    height: height,
	    color: color,
  	},

    render: function draw_bar() {
    	this.rect.width = this.width ;
      draw.rect (this.rect, viz.context) ;
    },

    width: health,
 } ;

 healthbar.initialHealth = health ;
 healthbar.health = health ;

 return healthbar ;

}