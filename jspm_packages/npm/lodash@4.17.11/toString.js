/* */ 
var baseToString = require('./_baseToString');
function toString(value) {
  return value == null ? '' : baseToString(value);
}
module.exports = toString;
