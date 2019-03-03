/* */ 
var baseSortedIndex = require('./_baseSortedIndex');
function sortedLastIndex(array, value) {
  return baseSortedIndex(array, value, true);
}
module.exports = sortedLastIndex;
