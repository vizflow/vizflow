/* */ 
var baseInverter = require('./_baseInverter');
function createInverter(setter, toIteratee) {
  return function(object, iteratee) {
    return baseInverter(object, setter, toIteratee(iteratee), {});
  };
}
module.exports = createInverter;
