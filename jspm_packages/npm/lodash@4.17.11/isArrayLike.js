/* */ 
var isFunction = require('./isFunction'),
    isLength = require('./isLength');
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}
module.exports = isArrayLike;
