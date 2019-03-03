/* */ 
var baseIsNative = require('./_baseIsNative'),
    isMaskable = require('./_isMaskable');
var CORE_ERROR_TEXT = 'Unsupported core-js use. Try https://npms.io/search?q=ponyfill.';
function isNative(value) {
  if (isMaskable(value)) {
    throw new Error(CORE_ERROR_TEXT);
  }
  return baseIsNative(value);
}
module.exports = isNative;
