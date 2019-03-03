/* */ 
var baseAssignValue = require('./_baseAssignValue'),
    eq = require('./eq');
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}
module.exports = assignValue;
