/* */ 
var baseExtremum = require('./_baseExtremum'),
    baseGt = require('./_baseGt'),
    baseIteratee = require('./_baseIteratee');
function maxBy(array, iteratee) {
  return (array && array.length) ? baseExtremum(array, baseIteratee(iteratee, 2), baseGt) : undefined;
}
module.exports = maxBy;
