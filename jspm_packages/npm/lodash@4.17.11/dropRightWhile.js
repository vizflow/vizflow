/* */ 
var baseIteratee = require('./_baseIteratee'),
    baseWhile = require('./_baseWhile');
function dropRightWhile(array, predicate) {
  return (array && array.length) ? baseWhile(array, baseIteratee(predicate, 3), true, true) : [];
}
module.exports = dropRightWhile;
