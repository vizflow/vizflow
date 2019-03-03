/* */ 
var baseDelay = require('./_baseDelay'),
    baseRest = require('./_baseRest'),
    toNumber = require('./toNumber');
var delay = baseRest(function(func, wait, args) {
  return baseDelay(func, toNumber(wait) || 0, args);
});
module.exports = delay;
