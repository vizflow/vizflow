/* */ 
var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike'),
    isPlainObject = require('./isPlainObject');
var domExcTag = '[object DOMException]',
    errorTag = '[object Error]';
function isError(value) {
  if (!isObjectLike(value)) {
    return false;
  }
  var tag = baseGetTag(value);
  return tag == errorTag || tag == domExcTag || (typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject(value));
}
module.exports = isError;
