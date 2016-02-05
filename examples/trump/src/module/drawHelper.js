var drawHelper = {

  image: function draw_image (frame, context, ratio) {

    if (frame === undefined) {
      frame = this ;
    } 

    if (context === undefined) {
      context = frame.viz.modelContext ;
    }

    if (ratio === undefined) {
      ratio = document.ratio ;
    }

    // console.log('frame.x', frame.x, 'width', frame.viz.displayCanvas.width) ;

    // console.log('draw_image', 'frame', frame, 'context', context, 'this', this) ;
    var xDraw = (frame.x + viz.xShift) * ratio ;
    var yDraw = (frame.y + viz.yShift) * ratio ;

    xDraw = Math.floor( xDraw ) ;
    yDraw = Math.floor( yDraw ) ;

    if(frame.opacity !== undefined) {
      // console.log('frame opacity', frame.opacity) ;
      var alpha = context.globalAlpha ;
      context.globalAlpha = frame.opacity ;
      context.drawImage(frame.image, xDraw, yDraw) ;
      context.globalAlpha = alpha ;      
    } else {
      context.drawImage(frame.image, xDraw, yDraw) ;      
    }

  },
  
  rect: function draw_rect (rect, context, ratio) {

    if (rect === undefined) {
      rect = this ;
    }

    if(context === undefined) {
      context = rect.viz.modelContext ;
    }

    if(ratio === undefined) {
      ratio = document.ratio ;
    }

    var fillStyle = context.fillStyle ;

    if(rect.color === undefined) {
      rect.color = fillStyle ;
    }

    var strokeStyle = context.strokeStyle ;

    if(rect.stroke === undefined) {
      rect.stroke = strokeStyle ;
    }

    var xNew, yNew ;
    if(rect.viz !== undefined) {
      xNew = (rect.x + rect.viz.xShift)
      yNew = (rect.y + rect.viz.yShift)
    } else {
      xNew = rect.x ;
      yNew = rect.y ;
    }
    var yNew ;
    var xDraw = xNew * ratio ;
    var yDraw = yNew * ratio ;
    xDraw = Math.floor( xDraw ) ;
    yDraw = Math.floor( yDraw ) ;
    
    context.beginPath() ;
    context.fillStyle = rect.color ;
    context.strokeStyle = rect.stroke ;

    if(rect.opacity !== undefined) {
      // console.log('frame', rect) ;
      // var alpha = context.globalAlpha ;
      context.globalAlpha = rect.opacity ;
      // context.globalAlpha = alpha ;      
    } 

    context.rect(xDraw, yDraw, Math.floor(rect.width * ratio), Math.floor(rect.height * ratio)) ;
    context.fill() ;
    context.stroke() ;
    context.closePath() ;

    context.fillStyle = fillStyle ;
    context.strokeStyle = strokeStyle ;

  },

  circle: function draw_circle (circ, context) {

    if (circ === undefined) {
      circ = this ;  
    }

    if (context === undefined) {
      context = circ.viz.displayContext ;
    }

    context.beginPath() ;
    var x = circ.x ;
    var y = circ.y ;
    x = (x + viz.width) * ratio ;
    y = (y + viz.height) * ratio ;

    x = Math.floor(x) ;
    y = Math.floor(y) ;

    var r = circ.radius ;
    context.arc(x, y, r, 0, Math.PI * 2, true) ;

    var fillStyle = context.fillStyle ;

    if(circ.color === undefined) {
      circ.color = fillStyle ;
    }

    context.fillStyle = circ.color ;
    context.fill() ;
    context.closePath() ;

    context.fillStyle = fillStyle ;

  },

}