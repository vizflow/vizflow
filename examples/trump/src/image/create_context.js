function create_context(canvas) {
	var context                         = canvas.context() ;  
	context.mozImageSmoothingEnabled    = false ;
	context.imageSmoothingEnabled       = false ;
	context.font                        = "48px Arial" ; 
	context.globalAlpha                 = 1.0 ;
	return context ;
}