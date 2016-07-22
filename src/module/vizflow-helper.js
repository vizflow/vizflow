// vizflow modules: some functions for working with vizflow
// by Daniel Korenblum 5/26/2016
// https://github.com/vizflow/vizflow

import {} from './Object.assign' ; // Object.assign polyfill & wrapper

// import the helper functions and wrappers attached to the $Z object:

import action     from './helper/action'     ;
import asynch     from './helper/async'      ;
import audio      from './helper/audio'      ;
import collision  from './helper/collision'  ;
import draw       from './helper/draw'       ;
import effect     from './helper/effect'     ;
import image      from './helper/image'      ;
import input      from './helper/input'      ;
import item       from './helper/item'       ;
import loader     from './helper/loader'     ;
import sprite     from './helper/sprite'     ;
import transition from './helper/transition' ;
import ui         from './helper/ui'         ;
import viz        from './helper/viz'        ;

// define the vizflow helper property ($Z.helper): 

let helper = { // define the "bling Z helper" property to store the helper modules that can be used when working with vizflow
  
  action,
  async: asynch,
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
  window.$Z.helper = helper ;
}

export { helper as default }