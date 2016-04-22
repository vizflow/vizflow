function primefruit() {

  /*
   * when using vizflow it's easier to create the viz object and then add the items to it afterwards:
   */

  var width  = 320 ;
  var height = 320 ;

  var vizConfig = {
    width: width,
    height: height,
  } ;
  
  var viz = vizHelper.setup(vizConfig) ; // first create generic vizflow configuration object, then add application-specific details

  var N     = 25 ; // how many numbers to represent with fruit baskets
  var Ncol  = 5 ; // how many columns to arrange the baskets in 
  var xGrid = 10 ;
  var yGrid = 10 ;

/***
  
    primes <= 25: 2 3 5 7 11 13 17 19 23
    
    factorizations for i <= 25:

     2
     3
     2     2
     5
     2     3
     7
     2     2     2
     3     3
     2     5
    11
     2     2     3
    13
     2     7
     3     5
     2     2     2     2
    17
     2     3     3
    19
     2     2     5
     3     7
     2    11
    23
     2     2     2     3
     5     5

***/  

  var item = new Array(N) ;

  for ( var k = 0 ; k < N ; k++ ) {
    
    var itemConfig = {

      x: (k + 1) * xGrid,
      y: (k + 1) * yGrid,
      image: sprite[k] ;

    } ;

    item[k] = itemHelper.setup(itemConfig) ;

  }

  console.log('prime fruit: start') ;

  console.log('viz', viz) ;

}