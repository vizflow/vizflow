/* */ 
var baseDifference = require('./_baseDifference'),
    baseFlatten = require('./_baseFlatten'),
    baseUniq = require('./_baseUniq');
function baseXor(arrays, iteratee, comparator) {
  var length = arrays.length;
  if (length < 2) {
    return length ? baseUniq(arrays[0]) : [];
  }
  var index = -1,
      result = Array(length);
  while (++index < length) {
    var array = arrays[index],
        othIndex = -1;
    while (++othIndex < length) {
      if (othIndex != index) {
        result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator);
      }
    }
  }
  return baseUniq(baseFlatten(result, 1), iteratee, comparator);
}
module.exports = baseXor;
