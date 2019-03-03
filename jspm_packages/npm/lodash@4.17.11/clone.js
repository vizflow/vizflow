/* */ 
var baseClone = require('./_baseClone');
var CLONE_SYMBOLS_FLAG = 4;
function clone(value) {
  return baseClone(value, CLONE_SYMBOLS_FLAG);
}
module.exports = clone;
