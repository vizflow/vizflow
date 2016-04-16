var drawHelper = {

  item: function draw_helper_element ( item, context, ratio ) { // render item and its child items

    if ( item === undefined ) {
      item = this ;
    }

    drawHelper.image(item) ;
    if( item.child !== undefined ) {
      for ( var kOver = 0 ; kOver < item.child.length ; kOver++ ) {
        item.child[kOver].x = item.x ;
        item.child[kOver].y = item.y ;
        item.child[kOver].angle = item.angle ;
        // console.log('item.child[kOver]', item.child[kOver], 'item.child[kOver].x', item.child[kOver].x) ;
        drawHelper.image(item.child[kOver]) ;
      }      
    }
  },

  image: function draw_helper_image (item, context, ratio) {

    if (item === undefined) {
      item = this ;
    } 

    if (context === undefined) {
      context = item.viz.fullContext ;
    }

    if (ratio === undefined) {
      ratio = document.ratio ;
    }

    // console.log('item.x', item.x, 'width', item.viz.displayCanvas.width) ;

    // console.log('draw_image', 'item', item, 'context', context, 'this', this) ;

    var viewX, viewY ;

    if(item.fixed === true) {

      viewX = item.viz.viewportX ;
      viewY = item.viz.viewportY ;

    } else {

      viewX = 0 ;
      viewY = 0 ;

    }

    var originX = item.originX || 0 ;
    var originY = item.originY || 0 ;

    var xDraw = (item.x + item.viz.xShift + viewX - originX) * ratio ;
    var yDraw = (item.y + item.viz.yShift + viewY - originY) * ratio ;

    xDraw = Math.floor( xDraw ) ;
    yDraw = Math.floor( yDraw ) ;

    if(item.opacity !== undefined) {

      // console.log('item opacity', item.opacity) ;
      var alpha = context.globalAlpha ;
      context.globalAlpha = item.opacity ;
      var xShift = Math.floor(ratio * (item.x + item.xAngle)) ;
      var yShift = Math.floor(ratio * (item.y + item.yAngle)) ;
      context.translate(xShift, yShift) ;
      context.rotate(item.angle) ;
      context.translate(-xShift, -yShift) ;
      context.drawImage(item.image, xDraw, yDraw) ;
      context.setTransform(1, 0, 0, 1, 0, 0) ;
      context.globalAlpha = alpha ;      

    } else {
      context.drawImage(item.image, xDraw, yDraw) ;      
    }

  },
  
  rect: function draw_helper_rect (rect, context, ratio) {

    if (rect === undefined) {
      rect = this ;
    }

    if(context === undefined) {
      context = rect.viz.fullContext ;
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

      var viewX, viewY ;

      if(rect.fixed === true) {

        viewX = rect.viz.viewportX ;
        viewY = rect.viz.viewportY ;

      } else {

        viewX = 0 ;
        viewY = 0 ;

      }

      xNew = (rect.x + rect.viz.xShift + viewX) ;
      yNew = (rect.y + rect.viz.yShift + viewY) ;

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
      // console.log('item', rect) ;
      // var alpha = context.globalAlpha ;
      context.globalAlpha = rect.opacity ;
      // context.globalAlpha = alpha ;      
    } 

    // console.log('draw rect: ', 'xDraw, yDraw, Math.floor(rect.width * ratio), Math.floor(rect.height * ratio)', xDraw, yDraw, Math.floor(rect.width * ratio), Math.floor(rect.height * ratio)) ;

    var xShift = Math.floor(ratio * (rect.x + rect.xAngle)) ;
    var yShift = Math.floor(ratio * (rect.y + rect.yAngle)) ;
    context.translate(xShift, yShift) ;
    context.rotate(rect.angle) ;
    context.translate(-xShift, -yShift) ;

    context.rect(xDraw, yDraw, Math.floor(rect.width * ratio), Math.floor(rect.height * ratio)) ;
    context.fill() ;
    context.stroke() ;
    context.closePath() ;

    context.setTransform(1, 0, 0, 1, 0, 0) ;

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