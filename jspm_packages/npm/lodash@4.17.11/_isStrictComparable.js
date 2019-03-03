/* */ 
var isObject = require('./isObject');
function isStrictComparable(value) {
  return value === value && !isObject(value);
}
module.exports = isStrictComparable;
