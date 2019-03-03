/* */ 
var constant = require('./constant'),
    createInverter = require('./_createInverter'),
    identity = require('./identity');
var objectProto = Object.prototype;
var nativeObjectToString = objectProto.toString;
var invert = createInverter(function(result, value, key) {
  if (value != null && typeof value.toString != 'function') {
    value = nativeObjectToString.call(value);
  }
  result[value] = key;
}, constant(identity));
module.exports = invert;
