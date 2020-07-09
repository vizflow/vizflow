document.draw_graph = function () {

    var lineLength = document.svgConfig.lineLength ;
    var circleSize = document.svgConfig.circleSize ;

    var x = document.testConfig.nCircle ;

    $Z.helper.svg.setup() ;

    for ( var kx = 0 ; kx < x.length ; kx++ ) {
      document.svg.appendChild( $Z.helper.svg.draw.circ( x[ kx ], document.results.median[ kx ] ) ) ;
    }

} ;

    // var points ;

    // document.min.forEach( function ( p ) {
    //     points = [
    //         [p[0] - lineLength / 2,
    //             p[1]
    //         ],
    //         [p[0] + lineLength / 2,
    //             p[1]
    //         ]
    //     ] ;
    //     $Z.helper.svg.draw.line( points ) ;
    // } ) ;

    // document.max.forEach( function ( p ) {
    //     points = [
    //         [p[0] - lineLength / 2,
    //             p[1]
    //         ],
    //         [p[0] + lineLength / 2,
    //             p[1]
    //         ]
    //     ] ;
    //     $Z.helper.svg.draw.line( points ) ;
    // } ) ;


    // var numPoints = document.metaData.numPoints ;

    // document.drawAxes(  ) ;

    // var a1 = document.median.slice( 1, numPoints ) ;
    // var a2 = document.median.slice( 0, numPoints - 1 ) ;
    // var a3 = document.zip( a1, a2 ) ;

    // a3.forEach( function ( p ) {
    //     $Z.helper.svg.draw.line( p ) ;
    // } ) ;
