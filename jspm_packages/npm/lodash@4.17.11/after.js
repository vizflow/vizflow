/* */ 
var toInteger = require('./toInteger');
var FUNC_ERROR_TEXT = 'Expected a function';
function after(n, func) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  n = toInteger(n);
  return function() {
    if (--n < 1) {
      return func.apply(this, arguments);
    }
  };
}
module.exports = after;
