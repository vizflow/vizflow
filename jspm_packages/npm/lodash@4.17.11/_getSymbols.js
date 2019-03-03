/* */ 
var arrayFilter = require('./_arrayFilter'),
    stubArray = require('./stubArray');
var objectProto = Object.prototype;
var propertyIsEnumerable = objectProto.propertyIsEnumerable;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
module.exports = getSymbols;
