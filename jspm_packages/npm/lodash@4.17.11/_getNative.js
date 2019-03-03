/* */ 
var baseIsNative = require('./_baseIsNative'),
    getValue = require('./_getValue');
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}
module.exports = getNative;
