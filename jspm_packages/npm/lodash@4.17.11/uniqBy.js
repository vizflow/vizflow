/* */ 
var baseIteratee = require('./_baseIteratee'),
    baseUniq = require('./_baseUniq');
function uniqBy(array, iteratee) {
  return (array && array.length) ? baseUniq(array, baseIteratee(iteratee, 2)) : [];
}
module.exports = uniqBy;
