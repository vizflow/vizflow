/* */ 
var baseIteratee = require('./_baseIteratee'),
    negate = require('./negate'),
    pickBy = require('./pickBy');
function omitBy(object, predicate) {
  return pickBy(object, negate(baseIteratee(predicate)));
}
module.exports = omitBy;
