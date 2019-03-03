/* */ 
var baseFindKey = require('./_baseFindKey'),
    baseForOwnRight = require('./_baseForOwnRight'),
    baseIteratee = require('./_baseIteratee');
function findLastKey(object, predicate) {
  return baseFindKey(object, baseIteratee(predicate, 3), baseForOwnRight);
}
module.exports = findLastKey;
