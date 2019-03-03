/* */ 
var baseExtremum = require('./_baseExtremum'),
    baseLt = require('./_baseLt'),
    identity = require('./identity');
function min(array) {
  return (array && array.length) ? baseExtremum(array, identity, baseLt) : undefined;
}
module.exports = min;
