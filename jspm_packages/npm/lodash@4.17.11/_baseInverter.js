/* */ 
var baseForOwn = require('./_baseForOwn');
function baseInverter(object, setter, iteratee, accumulator) {
  baseForOwn(object, function(value, key, object) {
    setter(accumulator, iteratee(value), key, object);
  });
  return accumulator;
}
module.exports = baseInverter;
