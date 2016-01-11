function setup_player () {

  var player = {} ;

  player.spriteR    = samus_sprite () ;
  player.spriteL    = horizontal_flip(player.spriteR) ;
  player.sprite = player.spriteR ;

  var clearedFrame = create_canvas(player.sprite.rest[0].width, player.sprite.rest[0].height) ; 
  // var positionObject = {x: 0, y: 241 - player.sprite.height} ;

  player.loop = {
    totalDur : 2 * viz.dur,
    frameDur : viz.dur,
    position : 0
  } ; // position is from 0 to 1
  
  player.item = {
    viz: viz, 
    image: player.sprite.rest[0],
    collisionImage: clearedFrame,
    render: draw.image,
    x: 20,
    y: 225 - player.sprite.height 
  } ;
  
  player.orientation = 'r' ; // r for facing right

  return player ;

}