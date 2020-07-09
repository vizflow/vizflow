document.showplot = function showplot() {

  // console.log('showplot start') ;  

  var testEndFade = document.viz.fadeDuration * 2 ;

  document.viz.fade( { 

    opacity: 0, 
    duration: testEndFade, 

    end: function() { 

        function sorted_median( array ) {

          var median ;
          var mid = array.length * 0.5 ;

          if( array.length % 2 === 0 ) { // is even
            median = 0.5 * ( array[ mid - 1 ] + array[ mid ] ) ; // median is the average of two central elements of sorted even-length array
          } else { // is odd
            median = array[ Math.floor( mid ) - 1 ] ; // median is the central element of sorted odd-length array
          }

          return median ;

        }

        document.circleList.forEach( function ( circle ) { circle.remove() ; } ) ; // clear the circles 
        document.fpsItem.remove() ;
        document.topBar.remove() ;

        document.viz.fade( {
          
          end: function() {
            
            var Ntest = document.results.list.length ;

            document.results.median = Array( Ntest ) ;
            document.results.min    = Array( Ntest ) ;
            document.results.max    = Array( Ntest ) ;

            for( var ktest = 0 ; ktest < Ntest ; ktest++ ) {

              document.results.list[ ktest ].sort( function compare( a, b ) { return a - b ; } ) ;

              document.results.min    [ ktest ] = document.results.list[ ktest ][0] ;
              document.results.max    [ ktest ] = document.results.list[ ktest ][ document.results.list[ ktest ].length - 1 ] ;
              document.results.median [ ktest ] = sorted_median( document.results.list[ ktest ] ) ;

            }

            console.log( document.results ) ;

            document.draw_graph() ; // draw the results graph

          }

        }) ;

    },

  }) ;

} ; 