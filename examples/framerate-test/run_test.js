document.run_test = function run_test() {

  var vizFade = document.testIndex > 0 ? document.viz.fadeDuration : 0 ;

  // console.log( 'testIndex', document.testIndex ) ;

  document.viz.fade({

    opacity: 0,
    duration: vizFade,

    end: function() {
      
      document.circleList.forEach( function ( circle ) { circle.remove() ; } ) ; // clear the circles from the previous test
      
      document.numItem.opacity = 0 ;
      document.fpsItem.opacity = 0 ;

      document.testIndex++ ;

      if( document.testIndex === document.testConfig.nCircle.length ) {
        document.showplot() ;
        return
      }      

      document.viz.fade( {

        opacity: 1,

        end: function() {

          document.viz.call( document.run_test, document.testConfig.duration * 1000 ) ; // calls itself recursively until testIndex === number of tests
                 
          var numText='N = ' + document.testConfig.nCircle[ document.testIndex ] ;

          var numTextConfig = {

            binarySwitch: false,
            px: document.styleConfig.font,
            font: 'C64 User',
            text: numText,
            color: document.styleConfig.fontColor,

          } ;

          var numImage = $Z.helper.image.word( numTextConfig ) ;

          document.numItem.image = numImage ;

          document.numItem.fade( { 

            duration: document.viz.fadeDuration,
            end: function() { // run the next step  
              document.circles( document.testIndex ) ;
            }, 

        } ) ;          

        },

      } ) ;

    }, // end: viz.fade.end

  }) ;

} ;