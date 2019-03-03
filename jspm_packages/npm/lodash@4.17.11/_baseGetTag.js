/* */ 
var Symbol = require('./_Symbol'),
    getRawTag = require('./_getRawTag'),
    objectToString = require('./_objectToString');
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value)) ? getRawTag(value) : objectToString(value);
}
module.exports = baseGetTag;
