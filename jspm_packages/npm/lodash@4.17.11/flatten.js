/* */ 
var baseFlatten = require('./_baseFlatten');
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}
module.exports = flatten;
