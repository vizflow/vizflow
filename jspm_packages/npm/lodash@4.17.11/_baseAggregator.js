/* */ 
var baseEach = require('./_baseEach');
function baseAggregator(collection, setter, iteratee, accumulator) {
  baseEach(collection, function(value, key, collection) {
    setter(accumulator, value, iteratee(value), collection);
  });
  return accumulator;
}
module.exports = baseAggregator;
