/* */ 
var baseSet = require('./_baseSet');
function set(object, path, value) {
  return object == null ? object : baseSet(object, path, value);
}
module.exports = set;
