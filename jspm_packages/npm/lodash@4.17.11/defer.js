/* */ 
var baseDelay = require('./_baseDelay'),
    baseRest = require('./_baseRest');
var defer = baseRest(function(func, args) {
  return baseDelay(func, 1, args);
});
module.exports = defer;
