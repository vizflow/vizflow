/* */ 
var eq = require('./eq');
function baseSortedUniq(array, iteratee) {
  var index = -1,
      length = array.length,
      resIndex = 0,
      result = [];
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;
    if (!index || !eq(computed, seen)) {
      var seen = computed;
      result[resIndex++] = value === 0 ? 0 : value;
    }
  }
  return result;
}
module.exports = baseSortedUniq;
