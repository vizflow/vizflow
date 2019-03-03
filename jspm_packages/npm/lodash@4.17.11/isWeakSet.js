/* */ 
var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');
var weakSetTag = '[object WeakSet]';
function isWeakSet(value) {
  return isObjectLike(value) && baseGetTag(value) == weakSetTag;
}
module.exports = isWeakSet;
