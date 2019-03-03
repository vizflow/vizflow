/* */ 
var basePullAll = require('./_basePullAll');
function pullAllWith(array, values, comparator) {
  return (array && array.length && values && values.length) ? basePullAll(array, values, undefined, comparator) : array;
}
module.exports = pullAllWith;
