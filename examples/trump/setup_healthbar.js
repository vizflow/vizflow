function setup_healthbar (viz, health, height) {
	var healthbar = {} ;

  healthbar.rect = {
    viz: viz, 
    x: 120,
    y: 10,
    width: health,
    height: height,
    color: '#600'
  } ; 

  healthbar.item = {
    viz: viz, 

    render: function draw_bar() {
    	healthbar.rect.width = this.width ;
      draw.rect (healthbar.rect, viz.context) ;
    },

    width: health
 } ;

 healthbar.initialHealth = health ;
 healthbar.health = health ;

 return healthbar ;

}