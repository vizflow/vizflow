/* */ 
var baseFunctions = require('./_baseFunctions'),
    keysIn = require('./keysIn');
function functionsIn(object) {
  return object == null ? [] : baseFunctions(object, keysIn(object));
}
module.exports = functionsIn;
