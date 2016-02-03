function load_audio(viz) {

	viz.audio = {} ;

  viz.audio.hit1    = copy_object(audioHelper) ;
  viz.audio.hit2    = copy_object(audioHelper) ;
  viz.audio.bullet1 = copy_object(audioHelper) ;
  viz.audio.laugh1  = copy_object(audioHelper) ;

  viz
  	.audio
  	.hit1    
  	.load ( './audio/hit1.wav'    ) ;	

  viz
  	.audio
  	.hit2    
  	.load ( './audio/hit2.wav'    ) ;	

  viz
  	.audio
  	.bullet1 
  	.load ( './audio/bullet1.wav' ) ;	

  viz
    .audio
    .laugh1 
    .load ( './audio/laugh1.wav' ) ; 

}