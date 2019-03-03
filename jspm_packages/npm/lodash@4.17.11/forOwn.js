/* */ 
var baseForOwn = require('./_baseForOwn'),
    castFunction = require('./_castFunction');
function forOwn(object, iteratee) {
  return object && baseForOwn(object, castFunction(iteratee));
}
module.exports = forOwn;
