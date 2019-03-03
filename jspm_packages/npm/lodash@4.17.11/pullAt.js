/* */ 
var arrayMap = require('./_arrayMap'),
    baseAt = require('./_baseAt'),
    basePullAt = require('./_basePullAt'),
    compareAscending = require('./_compareAscending'),
    flatRest = require('./_flatRest'),
    isIndex = require('./_isIndex');
var pullAt = flatRest(function(array, indexes) {
  var length = array == null ? 0 : array.length,
      result = baseAt(array, indexes);
  basePullAt(array, arrayMap(indexes, function(index) {
    return isIndex(index, length) ? +index : index;
  }).sort(compareAscending));
  return result;
});
module.exports = pullAt;
