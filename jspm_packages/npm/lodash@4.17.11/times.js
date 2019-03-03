/* */ 
var baseTimes = require('./_baseTimes'),
    castFunction = require('./_castFunction'),
    toInteger = require('./toInteger');
var MAX_SAFE_INTEGER = 9007199254740991;
var MAX_ARRAY_LENGTH = 4294967295;
var nativeMin = Math.min;
function times(n, iteratee) {
  n = toInteger(n);
  if (n < 1 || n > MAX_SAFE_INTEGER) {
    return [];
  }
  var index = MAX_ARRAY_LENGTH,
      length = nativeMin(n, MAX_ARRAY_LENGTH);
  iteratee = castFunction(iteratee);
  n -= MAX_ARRAY_LENGTH;
  var result = baseTimes(length, iteratee);
  while (++index < n) {
    iteratee(index);
  }
  return result;
}
module.exports = times;
