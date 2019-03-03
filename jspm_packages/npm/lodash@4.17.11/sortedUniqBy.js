/* */ 
var baseIteratee = require('./_baseIteratee'),
    baseSortedUniq = require('./_baseSortedUniq');
function sortedUniqBy(array, iteratee) {
  return (array && array.length) ? baseSortedUniq(array, baseIteratee(iteratee, 2)) : [];
}
module.exports = sortedUniqBy;
