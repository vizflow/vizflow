/* */ 
var nativeCreate = require('./_nativeCreate');
var HASH_UNDEFINED = '__lodash_hash_undefined__';
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}
module.exports = hashGet;
