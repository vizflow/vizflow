/* */ 
var createWrap = require('./_createWrap');
var WRAP_FLIP_FLAG = 512;
function flip(func) {
  return createWrap(func, WRAP_FLIP_FLAG);
}
module.exports = flip;
