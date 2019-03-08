document.circleloop = function circleloop() {
  var testConfig = document.testConfig ;
  var testList   = Array( testConfig.nCircle.length ) ;

  for( var i = 0 ; i < testList.length ; i++ ) {

    testList[i] = { // use blank transitions for the sake of chaining each step of the framerate test

      varName: undefined,
      interpFunc: function () {},
      endValue: undefined,
      end: {
        run: document.nextStep,
        i: i
      },
      duration: testConfig.duration * (i > 0 ? 1000 : 0),

    } ;

  }

  document.viz.add_transition($Z.helper.transition.sequence(testList)) ;

} ;