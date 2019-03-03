/* */ 
var baseAssignValue = require('./_baseAssignValue'),
    createAggregator = require('./_createAggregator');
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
var groupBy = createAggregator(function(result, value, key) {
  if (hasOwnProperty.call(result, key)) {
    result[key].push(value);
  } else {
    baseAssignValue(result, key, [value]);
  }
});
module.exports = groupBy;
