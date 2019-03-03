/* */ 
var baseUnset = require('./_baseUnset');
function unset(object, path) {
  return object == null ? true : baseUnset(object, path);
}
module.exports = unset;
