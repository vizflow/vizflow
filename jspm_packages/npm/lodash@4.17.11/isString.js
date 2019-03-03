/* */ 
var baseGetTag = require('./_baseGetTag'),
    isArray = require('./isArray'),
    isObjectLike = require('./isObjectLike');
var stringTag = '[object String]';
function isString(value) {
  return typeof value == 'string' || (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
}
module.exports = isString;
