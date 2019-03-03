/* */ 
var baseGet = require('./_baseGet');
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}
module.exports = basePropertyDeep;
