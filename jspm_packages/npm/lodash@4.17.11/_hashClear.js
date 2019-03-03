/* */ 
var nativeCreate = require('./_nativeCreate');
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}
module.exports = hashClear;
