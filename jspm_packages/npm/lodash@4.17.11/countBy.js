/* */ 
var baseAssignValue = require('./_baseAssignValue'),
    createAggregator = require('./_createAggregator');
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
var countBy = createAggregator(function(result, value, key) {
  if (hasOwnProperty.call(result, key)) {
    ++result[key];
  } else {
    baseAssignValue(result, key, 1);
  }
});
module.exports = countBy;
