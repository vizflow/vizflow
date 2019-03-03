/* */ 
var assocIndexOf = require('./_assocIndexOf');
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
module.exports = listCacheHas;
