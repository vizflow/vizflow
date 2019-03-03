/* */ 
var baseLodash = require('./_baseLodash'),
    wrapperClone = require('./_wrapperClone');
function wrapperPlant(value) {
  var result,
      parent = this;
  while (parent instanceof baseLodash) {
    var clone = wrapperClone(parent);
    clone.__index__ = 0;
    clone.__values__ = undefined;
    if (result) {
      previous.__wrapped__ = clone;
    } else {
      result = clone;
    }
    var previous = clone;
    parent = parent.__wrapped__;
  }
  previous.__wrapped__ = value;
  return result;
}
module.exports = wrapperPlant;
