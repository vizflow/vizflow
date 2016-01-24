function setup_healthbar (viz, health, height, y, color) {
	var healthbar = {} ;
	var xPad = 10 ;

  healthbar.item = {
	  viz: viz, 

	  rect: {
	    viz: viz, 
	    x: viz.width - (health + xPad) * document.ratio,
	    y: y * document.ratio,
	    width: health *document.ratio,
	    height: height * document.ratio,
	    color: color,
  	},

    render: function draw_bar() {
    	this.rect.width = this.width ;
      draw.rect (this.rect, viz.context) ;
    },

    width: health * document.ratio,
 } ;

 healthbar.initialHealth = health ;
 healthbar.health = health ;

 return healthbar ;

}