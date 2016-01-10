var draw = {

  image: function draw_image (frame, context) {

    if (frame === undefined) {
      frame = this ;
    } 

    if (context === undefined) {
      context = frame.viz.context ;
    }

    // console.log('draw_image', 'frame', frame, 'context', context, 'this', this) ;

    context.drawImage(frame.image, frame.x, frame.y) ;

  },
  
  rect: function draw_rect (rect, context) {

    if (rect === undefined) {
      rect = this ;
    }

    if(context === undefined) {
      context = rect.viz.context ;
    }

    context.beginPath() ;
    context.rect(rect.x, rect.y, rect.width, rect.height) ;
    context.fillStyle = rect.color ;
    context.fill() ;
    context.closePath() ;

  },

  circle: function draw_circle (circ, context) {

    if (circ === undefined) {
      circ = this ;  
    }

    if (context === undefined) {
      context = circ.viz.context ;
    }

    context.beginPath() ;
    var x = circ.x ;
    var y = circ.y ;
    var r = circ.radius ;
    context.arc(x, y, r, 0, Math.PI * 2, true) ;
    context.fillStyle = circ.color ;
    context.fill() ;
    context.closePath() ;

  },

}