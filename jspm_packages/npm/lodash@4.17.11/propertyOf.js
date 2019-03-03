/* */ 
var baseGet = require('./_baseGet');
function propertyOf(object) {
  return function(path) {
    return object == null ? undefined : baseGet(object, path);
  };
}
module.exports = propertyOf;
