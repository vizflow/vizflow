/* */ 
var baseForOwnRight = require('./_baseForOwnRight'),
    castFunction = require('./_castFunction');
function forOwnRight(object, iteratee) {
  return object && baseForOwnRight(object, castFunction(iteratee));
}
module.exports = forOwnRight;
