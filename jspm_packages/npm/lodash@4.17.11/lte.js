/* */ 
var createRelationalOperation = require('./_createRelationalOperation');
var lte = createRelationalOperation(function(value, other) {
  return value <= other;
});
module.exports = lte;
