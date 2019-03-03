/* */ 
var baseSortedIndex = require('./_baseSortedIndex'),
    eq = require('./eq');
function sortedIndexOf(array, value) {
  var length = array == null ? 0 : array.length;
  if (length) {
    var index = baseSortedIndex(array, value);
    if (index < length && eq(array[index], value)) {
      return index;
    }
  }
  return -1;
}
module.exports = sortedIndexOf;
