function setup_element (viz, elementConfig) {

  var element = {} ;

  if(elementConfig.orientation === undefined) {
    elementConfig.orientation = 'r' ;
  }

  if(elementConfig.orientation === 'l') {

    var spriteL0             = elementConfig.sprite_loader () ;
    element.spriteL          = spriteset_foreach(spriteL0, adjust_image_ratio) ;  
    // element.spriteL          = spriteL0 ;
    element.spriteL.original = spriteL0 ;

    var spriteR0             = horizontal_flip(spriteL0) ;
    element.spriteR          = spriteset_foreach(spriteR0, adjust_image_ratio) ;
    // element.spriteR          = spriteR0 ;
    element.spriteR.original = spriteR0 ;

  } else {

    var spriteR0             = elementConfig.sprite_loader () ;
    element.spriteR          = spriteset_foreach(spriteR0, adjust_image_ratio) ;
    // element.spriteR          = spriteR0 ;
    element.spriteR.original = spriteR0 ;
    
    var spriteL0             = horizontal_flip(spriteR0) ;
    element.spriteL          = spriteset_foreach(spriteL0, adjust_image_ratio) ;
    // element.spriteL          = spriteL0 ;
    element.spriteL.original = spriteL0 ;

  }

  if(elementConfig.x === undefined) {
    elementConfig.x = Math.round(viz.width / 12) - 1 ;
  }

  if(elementConfig.y === undefined) {
    elementConfig.y = Math.round(viz.height / 2) - 1 ;
  }

  element.sprite = element.spriteR ;

  if (elementConfig.frameDuration === undefined) {
    elementConfig.frameDuration = viz.frameDuration ;
  }

  if (elementConfig.floatDuration === undefined) {
    elementConfig.floatDuration = viz.frameDuration ;
  }  

  if (elementConfig.jumpDuration === undefined) {
    elementConfig.jumpDuration = viz.frameDuration ;
  }  
  
  if (elementConfig.fullLoopSwitch === undefined) {
    elementConfig.fullLoopSwitch = false ;
  }

  if (elementConfig.loop === undefined) {
    var tempLoop = {
      frameDur: elementConfig.frameDuration,
      position: 0,
      Nstep: 1,
    } ; 
    var walkLoop   = copy_object(tempLoop) ;
    var attackLoop = copy_object(tempLoop) ;
    var jumpLoop   = copy_object(tempLoop) ;
    if (elementConfig.fullLoopSwitch) {
      attackLoop.Nstep = element.sprite.attack.length ;
    }

    if (element.sprite.jump !== undefined) {
      jumpLoop.Nstep = element.sprite.jump.length ;  // jump always one shot 
    }
    elementConfig.loop = {
      walk: walkLoop,
      attack: attackLoop,
      jump: jumpLoop,
    } ;
  }

  element.loop = elementConfig.loop ;

  element.item = {
    viz: viz, 
    element: element, 
    image: element.sprite.rest[0],
    collision_image: actionHelper.collision_image,
    actionSet: {},
    render: drawHelper.image,
    x: elementConfig.x,
    y: elementConfig.y - element.sprite.height, 
    type: elementConfig.type,
  } ;
  
  //element.orientation = 'r' ; // r for facing right

  element.callback = elementConfig.callback ;

  var imageTransitionFunc ;

  if(elementConfig.frameDuration === viz.frameDuration) {
    imageTransitionFunc = viz.image_transition ;
  } else {
    imageTransitionFunc = step_transition_func('image', elementConfig.frameDuration) ;
  }

  if(elementConfig.floatDuration === viz.floatDuration) {
    floatTransitionFunc = $Z.transition.rounded_linear_transition_func ( 'y', elementConfig.frameDuration ) ;
  } else {
    // console.log('elementConfig', elementConfig) ;
    floatTransitionFunc = $Z.transition.rounded_linear_transition_func ( 'y', elementConfig.floatDuration ) ;
  }

  if(elementConfig.jumpDuration === viz.jumpDuration) {
    jumpTransitionFunc = step_transition_func ( 'image', elementConfig.frameDuration ) ;
  } else {
    // console.log('elementConfig', elementConfig) ;
    jumpTransitionFunc = step_transition_func ( 'image', elementConfig.jumpDuration ) ;
  }

  if(elementConfig.attackDuration === viz.attackDuration) {
    attackTransitionFunc = step_transition_func ( 'image', elementConfig.frameDuration ) ;
  } else {
    // console.log('elementConfig', elementConfig) ;
    attackTransitionFunc = step_transition_func ( 'image', elementConfig.attackDuration ) ;
  }

  element.transitionSet = {
    image:  imageTransitionFunc,
    float:  floatTransitionFunc,
    jump:   jumpTransitionFunc,
    attack: attackTransitionFunc,
  } ;

  if(elementConfig.transitionSet !== undefined) {
    var keys = Object.keys(elementConfig.transitionSet) ;
    for(var kKey = 0 ; kKey < keys.length ; kKey++) {
      element.transitionSet[keys[kKey]] = elementConfig.transitionSet[keys[kKey]] ;
    }
  }

  if( elementConfig.restoreRest === undefined) {
    elementConfig.restoreRest = true ;
  }

  element.restoreRest = elementConfig.restoreRest ;

  if(elementConfig.xMove === undefined) {
    elementConfig.xMove = 0 ;
  }

  element.xMove = elementConfig.xMove ;

  if(elementConfig.yMove === undefined) {
    elementConfig.yMove = 0 ;
  }

  element.yMove = elementConfig.yMove ;

  if(elementConfig.transition === undefined) {
    elementConfig.transition = [] ;
  }

  element.transition = elementConfig.transition ;
  
  if(elementConfig.inert === undefined) {
    elementConfig.inert = false ;
  }

  element.item.inert = elementConfig.inert ;  

  element.config = elementConfig ;  // copy config object to output object for future ref

  return element ;

}