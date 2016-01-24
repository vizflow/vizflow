function setup_healthbar (viz, health, height, y, color) {
	var healthbar = {} ;
	var xPad = 10 ;

  healthbar.item = {
	  viz: viz, 

	  rect: {
	    viz: viz, 
	    x: viz.width - (health + xPad),
	    y: y,
	    width: health,
	    height: height,
	    color: color,
  	},

    render: function draw_bar() {
    	this.rect.width = this.width ;
      draw.rect (this.rect) ;
    },

    width: health,
 } ;

 healthbar.initialHealth = health ;
 healthbar.health = health ;

 return healthbar ;

}