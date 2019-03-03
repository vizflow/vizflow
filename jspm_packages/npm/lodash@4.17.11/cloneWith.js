/* */ 
var baseClone = require('./_baseClone');
var CLONE_SYMBOLS_FLAG = 4;
function cloneWith(value, customizer) {
  customizer = typeof customizer == 'function' ? customizer : undefined;
  return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
}
module.exports = cloneWith;
