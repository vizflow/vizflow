/* */ 
var isObjectLike = require('./isObjectLike'),
    isPlainObject = require('./isPlainObject');
function isElement(value) {
  return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
}
module.exports = isElement;
