/* */ 
var root = require('./_root');
var nativeIsFinite = root.isFinite;
function isFinite(value) {
  return typeof value == 'number' && nativeIsFinite(value);
}
module.exports = isFinite;
