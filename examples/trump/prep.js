function prep() {
	console.log('prep: context', context, 'prep: canvas', canvas) ;
  context.clearRect(0, 0, canvas.width, canvas.height) ;
  return true ;
}