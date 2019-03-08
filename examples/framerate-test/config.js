document.imageList = ['./image/frameratetest.png'] ; // configure static assets for the preloader (need at least one image for preloader to work)
document.audioList = [] ; // optional static audio assets

document.testConfig = {

  nCircle:  [50, 100, 250, 500, 1000], // 2500, 5000, 10000, 25000],
  duration: 5,
  bgColor:  '#FFF',
  vizSize:  1200,
  maxSpeed: 10,
  minSpeed: 5,
  maxSize:  50,
  minSize:  5,
  
} ;

document.results = {
  min: [],
  max: [],
} ;