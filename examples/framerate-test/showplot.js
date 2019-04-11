document.showplot = function showplot() {

  // console.log('showplot start') ;  

  var testEndFade = document.viz.fadeDuration * 2 ;

  document.viz.fade( { 

    opacity: 0, 
    duration: testEndFade, 

    end: function() { 

        document.circleList.forEach( function (circle) { circle.remove() ; } ) ; // clear the circles 
        document.fpsItem.remove() ; 
        document.topBar.remove() ;

        document.viz.fade() ;

    },

  }) ;

} ; 