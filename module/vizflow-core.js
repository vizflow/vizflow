// vizflow modules: some functions for working with vizflow
// by Daniel Korenblum 5/26/2016
// https://github.com/vizflow/vizflow

// import the helper functions and wrappers attached to the $Z object:

import action     from './core/action'     ;
import audio      from './core/audio'      ;
import collision  from './core/collision'  ;
import draw       from './core/draw'       ;
import effect     from './core/effect'     ;
import image      from './core/image'      ;
import input      from './core/input'      ;
import item       from './core/item'       ;
import loader     from './core/loader'     ;
import sprite     from './core/sprite'     ;
import transition from './core/transition' ;
import ui         from './core/ui'         ;
import viz        from './core/viz'        ;

// define the vizflow core property ($Z.core): 

let core = { // define the "bling Z core" property to store the core modules that can be used when working with vizflow
  
  action,
  audio,
  collision,
  draw,
  effect,
  image,
  input,
  item,
  loader,
  sprite,
  transition,
  ui,
  viz,

} ;

if ( window.$Z !== undefined ) {
  window.$Z.core = core ;
}

export { core as default }