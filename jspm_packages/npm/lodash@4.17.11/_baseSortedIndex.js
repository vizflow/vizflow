/* */ 
var baseSortedIndexBy = require('./_baseSortedIndexBy'),
    identity = require('./identity'),
    isSymbol = require('./isSymbol');
var MAX_ARRAY_LENGTH = 4294967295,
    HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
function baseSortedIndex(array, value, retHighest) {
  var low = 0,
      high = array == null ? low : array.length;
  if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
    while (low < high) {
      var mid = (low + high) >>> 1,
          computed = array[mid];
      if (computed !== null && !isSymbol(computed) && (retHighest ? (computed <= value) : (computed < value))) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return high;
  }
  return baseSortedIndexBy(array, value, identity, retHighest);
}
module.exports = baseSortedIndex;
