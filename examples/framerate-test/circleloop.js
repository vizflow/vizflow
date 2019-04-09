document.circleloop = function circleloop() {

  var testConfig   = document.testConfig ;
  var testList     = Array( testConfig.nCircle.length + 1 ) ;
  var testDuration = testConfig.duration * 1000  ;

  for( var i = 0 ; i < testConfig.nCircle.length ; i++ ) {

    testList[i] = { // use blank transitions for the sake of chaining each step of the framerate test

      varName: undefined,
      interpFunc: function () {},
      endValue: undefined,

      end: {
        run: document.nextStep,
        i: i
      },

      duration: (i > 0 ? testDuration : 0),

    } ;

  }

  document.viz.add_transition($Z.helper.transition.sequence(testList)) ;    

  document.viz.call( 
    function() {
      document.viz.fade( { opacity: 0, duration: 2000, end: function() { 
        document.clearCirc() ; document.fpsItem.remove() ; }, 
      } ) ;
    }, 
    testDuration * testConfig.nCircle.length
  ) ;

} ;

document.clearCirc = function clearCirc() {

  document.circleList.forEach(
    function (circle) {
      circle.remove() ;
    }
  ) ;

} ;

document.nextStep = function nextStep() {

  var testIndex = this.i ;

  var vizFade = testIndex > 0 ? document.viz.fadeDuration : 0 ;

  document.viz.fade({
    opacity: 0,
    duration: vizFade,
    end: function() {
      
      document.clearCirc() ;
      
      document.numItem.opacity = 0 ;
      document.fpsItem.opacity = 0 ;

      document.viz.fade({
        opacity: 1,
        end: function() {
                 
          var numText='N = ' + document.testConfig.nCircle[ testIndex ] ;

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
            end: function() { document.circles( testIndex ) }, // run the next step  
        } ) ;          

        },

      }) ;
    },
  }) ;

} ;