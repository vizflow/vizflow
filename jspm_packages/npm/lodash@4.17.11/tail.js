/* */ 
var baseSlice = require('./_baseSlice');
function tail(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseSlice(array, 1, length) : [];
}
module.exports = tail;
