function load_viz(vizConfig) {
	var viz ;
  viz           = setup_viz     (vizConfig)   ; // frameDuration is computed from frameDurationFactor using units of base vizflow framespeed (17 ms) 
  viz.ui        = setup_ui      (viz)         ;
  viz.ui.button = setup_buttons (viz, viz.ui) ;
  return viz ;
}