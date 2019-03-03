/* */ 
var baseClamp = require('./_baseClamp'),
    toInteger = require('./toInteger');
var MAX_ARRAY_LENGTH = 4294967295;
function toLength(value) {
  return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
}
module.exports = toLength;
