$Z.helper.svg = {

  setup: function svg_helper_setup( svgConfig ) {

    if( svgConfig === undefined ) {
      svgConfig = document.svgConfig ;
    }

    if ( document.svg !== undefined ) {
      document.svg.remove() ;
    }

    var parent = document.svgConfig.parentNode || document.querySelector( '.svg' ) ;

    document.svg = document.createElementNS( document.svgNS, 'svg' ) ; //document.svg = document.getElementsByTagName( "svg" )[0]; //Get svg element

    document.svg.setAttribute( 'height', document.svgConfig.height ) ;
    document.svg.setAttribute( 'width',  document.svgConfig.width  ) ;

    parent.appendChild( document.svg ) ;

  },

  path_seg: function( path ) {
    
    var a ;

    a = path.pathSegTypeAsLetter ;

    switch ( a ) {

      case 'M':
      case 'm':
        return [a, path.x, path.y].join( " " ) ;

      case 'L':
      case 'l':
        return [a, path.x, path.y].join( " " ) ;

      case 'A':
      case 'a':
        return [a, path.r, path.r, path.rot, path.c, path.d, path.x, path.y].join( " " ) ;

      case 'C':
      case 'c':
        return [a, path.x1, path.y1, path.x2, path.y2, path.x, path.y].join( " " ) ;

      case 'S':
      case 's':
        return [a, path.x2, path.y2, path.x, path.y].join( " " ) ;

      case 'Q':
      case 'q':
        return [a, path.x1, path.y1, path.x, path.y].join( " " ) ;

      case 'T':
      case 't':
        return [a, path.x, path.y].join( " " ) ;

      case 'Z':
      case 'z':
        return a ;

    }

  },

  d: function( path ) { // binds an anonymous function to "this" and calls it on p

    var p ;

    return ( ( function() {
      
      var i, len, results ;
      
      results = [] ;
      
      for ( i = 0, len = path.length ; i < len ; i++ ) {

        p = path[ i ] ;

        results.push( this.path_seg( p ) ) ;

      }

      return results ;

    } ).call( this ) ).join( " " ) ;

  },

} ;