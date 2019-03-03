/* */ 
var isSymbol = require('./isSymbol');
var INFINITY = 1 / 0;
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}
module.exports = toKey;
