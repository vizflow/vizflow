/* */ 
var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');
var numberTag = '[object Number]';
function isNumber(value) {
  return typeof value == 'number' || (isObjectLike(value) && baseGetTag(value) == numberTag);
}
module.exports = isNumber;
