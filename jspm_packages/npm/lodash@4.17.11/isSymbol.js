/* */ 
var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');
var symbolTag = '[object Symbol]';
function isSymbol(value) {
  return typeof value == 'symbol' || (isObjectLike(value) && baseGetTag(value) == symbolTag);
}
module.exports = isSymbol;
