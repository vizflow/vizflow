/* */ 
var baseIteratee = require('./_baseIteratee'),
    baseWhile = require('./_baseWhile');
function takeWhile(array, predicate) {
  return (array && array.length) ? baseWhile(array, baseIteratee(predicate, 3)) : [];
}
module.exports = takeWhile;
