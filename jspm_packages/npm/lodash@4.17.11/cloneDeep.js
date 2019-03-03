/* */ 
var baseClone = require('./_baseClone');
var CLONE_DEEP_FLAG = 1,
    CLONE_SYMBOLS_FLAG = 4;
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}
module.exports = cloneDeep;
