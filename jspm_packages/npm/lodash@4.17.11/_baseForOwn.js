/* */ 
var baseFor = require('./_baseFor'),
    keys = require('./keys');
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}
module.exports = baseForOwn;
