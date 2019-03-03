/* */ 
var baseExtremum = require('./_baseExtremum'),
    baseGt = require('./_baseGt'),
    identity = require('./identity');
function max(array) {
  return (array && array.length) ? baseExtremum(array, identity, baseGt) : undefined;
}
module.exports = max;
