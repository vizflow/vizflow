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
  var xGrid = 64 ;
  var yGrid = 64 ;

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

  var sprite = spriteHelper.get
  ( 
    imageHelper.image2canvas('./image/fruit.gif'), 
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'], 
    [47, 47, 47, 47, 47, 47, 47, 47, 47], 
    [52, 52, 52, 52, 52, 52, 52, 52, 52] 
  ) ;

  // console.log('prime fruit', 'sprite', sprite);

  var code = [
    'a',
    'b',
    'aa',
    'c',
    'ab',
    'd',
    'aaa',
    'bb',
    'ac',
    'e',
    'aab',
    'f',
    'ad',
    'bc',
    'aaaa',
    'g',
    'abb',
    'h',
    'aac',
    'bd',
    'ae',
    'i',
    'aaab',
    'cc',
  ] ;

  var jarImage = imageHelper.adjust_ratio(imageHelper.image2canvas('./image/jar2.png')) ;

  var yOffset = 20 ;
  var xOffset = 15 ;

  var fruit = new Array(N - 1) ; // initialize array of fruit 
  var jar   = new Array(N - 1) ; // initialize array of jars 
  var text  = imageHelper.text_sprite() ;

  for ( var k = 0 ; k < N - 1 ; k++ ) {

    var x = xGrid * ((k + 1) % Ncol) ;
    var y = Math.floor((k + 1) / Ncol) * yGrid  ;
    
    var fruitConfig = {

      viz: viz,
      x: x + xOffset,
      y: y + yOffset,
      xScale: 0.7,
      yScale: 0.7,
      opacity: 0,
      image: imageHelper.text2image({
        text: code[k],
        sprite: sprite,
        xShift: -40 * document.ratio,
      }),

    } ;

    // console.log('pf: ', 'k', k, 'fruitConfig', fruitConfig) ;

    fruit[k] = itemHelper.setup(fruitConfig) ; // each tile contains some fruit

    var jarConfig = {

      viz: viz,
      image: imageHelper.copy(jarImage),
      x: x,
      y: y,

    } ;

    jar[k]   = itemHelper.setup(jarConfig) ;

    var xJar = 40 ;
    var yJar = 50 ;

    var digit = imageHelper.text2image({
      text: k + 2,
      sprite: text,
    }) ;

    jar[k].image.context().drawImage(digit, xJar / ( Math.ceil((k + 1) / 10) ), yJar) ;


    // tile[k].default_child() ;

    // tile[k].child.push(tile[k].jar) ;

  }

  console.log('prime fruit: start') ;

  viz.item = fruit.concat(jar) ;

  viz.run() ;

  console.log('viz', viz) ;

}