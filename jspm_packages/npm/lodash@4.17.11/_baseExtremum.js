/* */ 
var isSymbol = require('./isSymbol');
function baseExtremum(array, iteratee, comparator) {
  var index = -1,
      length = array.length;
  while (++index < length) {
    var value = array[index],
        current = iteratee(value);
    if (current != null && (computed === undefined ? (current === current && !isSymbol(current)) : comparator(current, computed))) {
      var computed = current,
          result = value;
    }
  }
  return result;
}
module.exports = baseExtremum;
