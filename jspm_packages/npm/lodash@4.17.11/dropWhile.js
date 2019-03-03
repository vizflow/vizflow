/* */ 
var baseIteratee = require('./_baseIteratee'),
    baseWhile = require('./_baseWhile');
function dropWhile(array, predicate) {
  return (array && array.length) ? baseWhile(array, baseIteratee(predicate, 3), true) : [];
}
module.exports = dropWhile;
