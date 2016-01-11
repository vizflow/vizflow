function setup_healthbar (viz, health, height) {
	var healthbar = {} ;

  healthbar.item = {
	  viz: viz, 

	  rect: {
	    viz: viz, 
	    x: 120,
	    y: 10,
	    width: health,
	    height: height,
	    color: '#600'
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