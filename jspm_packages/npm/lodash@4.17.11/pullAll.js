/* */ 
var basePullAll = require('./_basePullAll');
function pullAll(array, values) {
  return (array && array.length && values && values.length) ? basePullAll(array, values) : array;
}
module.exports = pullAll;
