/* */ 
var baseIteratee = require('./_baseIteratee'),
    basePullAll = require('./_basePullAll');
function pullAllBy(array, values, iteratee) {
  return (array && array.length && values && values.length) ? basePullAll(array, values, baseIteratee(iteratee, 2)) : array;
}
module.exports = pullAllBy;
