/* */ 
var baseExtremum = require('./_baseExtremum'),
    baseIteratee = require('./_baseIteratee'),
    baseLt = require('./_baseLt');
function minBy(array, iteratee) {
  return (array && array.length) ? baseExtremum(array, baseIteratee(iteratee, 2), baseLt) : undefined;
}
module.exports = minBy;
