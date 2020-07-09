document.circle_reflect = function circle_reflect( circle ) {

  if( circle === undefined ) {
    circle = this ;
  }

  var xtolR = circle.viz.width - circle.config.radius ;
  var xtolL = circle.config.radius ;

  var xOvershoot = circle.x <= xtolL || circle.x >= xtolR ;
  // var xTolerance = circle.x - circle.config.radius < tol || circle.x + circle.config.radius > circle.viz.width - tol ;

  if ( xOvershoot ) {

    circle.dx *= -1 ;

    if( circle.x < xtolL ) {
      circle.x = xtolL ; 
    } else {
      circle.x = xtolR ;
    }

  }

  var ytolT = circle.config.radius + document.styleConfig.topMargin  ;
  var ytolB = circle.viz.height - circle.config.radius ;

  var yOvershoot = circle.y < ytolT || circle.y > ytolB ;
  // var yTolerance = circle.y - circle.config.radius < document.styleConfig.topMargin + tol || circle.y + circle.config.radius > circle.viz.height - tol ;

  if ( yOvershoot ) {
    
    circle.dy *= -1 ;

    if( circle.y < ytolT ) {
      circle.y = ytolT ; 
    } else {
      circle.y = ytolB ;
    }

  }

} ;