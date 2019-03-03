/* */ 
var baseForRight = require('./_baseForRight'),
    castFunction = require('./_castFunction'),
    keysIn = require('./keysIn');
function forInRight(object, iteratee) {
  return object == null ? object : baseForRight(object, castFunction(iteratee), keysIn);
}
module.exports = forInRight;
