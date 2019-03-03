/* */ 
var baseFindKey = require('./_baseFindKey'),
    baseForOwn = require('./_baseForOwn'),
    baseIteratee = require('./_baseIteratee');
function findKey(object, predicate) {
  return baseFindKey(object, baseIteratee(predicate, 3), baseForOwn);
}
module.exports = findKey;
