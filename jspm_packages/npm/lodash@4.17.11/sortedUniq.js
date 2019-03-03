/* */ 
var baseSortedUniq = require('./_baseSortedUniq');
function sortedUniq(array) {
  return (array && array.length) ? baseSortedUniq(array) : [];
}
module.exports = sortedUniq;
