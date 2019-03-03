/* */ 
var baseUniq = require('./_baseUniq');
function uniqWith(array, comparator) {
  comparator = typeof comparator == 'function' ? comparator : undefined;
  return (array && array.length) ? baseUniq(array, undefined, comparator) : [];
}
module.exports = uniqWith;
