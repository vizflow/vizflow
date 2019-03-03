/* */ 
var baseAssignValue = require('./_baseAssignValue'),
    createAggregator = require('./_createAggregator');
var keyBy = createAggregator(function(result, value, key) {
  baseAssignValue(result, key, value);
});
module.exports = keyBy;
