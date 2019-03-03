/* */ 
var baseValues = require('./_baseValues'),
    keysIn = require('./keysIn');
function valuesIn(object) {
  return object == null ? [] : baseValues(object, keysIn(object));
}
module.exports = valuesIn;
