/* */ 
var baseFlatten = require('./_baseFlatten');
var INFINITY = 1 / 0;
function flattenDeep(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, INFINITY) : [];
}
module.exports = flattenDeep;
