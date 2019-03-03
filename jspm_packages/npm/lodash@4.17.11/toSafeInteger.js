/* */ 
var baseClamp = require('./_baseClamp'),
    toInteger = require('./toInteger');
var MAX_SAFE_INTEGER = 9007199254740991;
function toSafeInteger(value) {
  return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : (value === 0 ? value : 0);
}
module.exports = toSafeInteger;
