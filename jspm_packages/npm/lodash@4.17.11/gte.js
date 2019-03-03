/* */ 
var createRelationalOperation = require('./_createRelationalOperation');
var gte = createRelationalOperation(function(value, other) {
  return value >= other;
});
module.exports = gte;
