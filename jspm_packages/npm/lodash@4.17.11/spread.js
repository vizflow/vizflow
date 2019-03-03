/* */ 
var apply = require('./_apply'),
    arrayPush = require('./_arrayPush'),
    baseRest = require('./_baseRest'),
    castSlice = require('./_castSlice'),
    toInteger = require('./toInteger');
var FUNC_ERROR_TEXT = 'Expected a function';
var nativeMax = Math.max;
function spread(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  start = start == null ? 0 : nativeMax(toInteger(start), 0);
  return baseRest(function(args) {
    var array = args[start],
        otherArgs = castSlice(args, 0, start);
    if (array) {
      arrayPush(otherArgs, array);
    }
    return apply(func, this, otherArgs);
  });
}
module.exports = spread;
