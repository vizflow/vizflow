/* */ 
var baseNth = require('./_baseNth'),
    baseRest = require('./_baseRest'),
    toInteger = require('./toInteger');
function nthArg(n) {
  n = toInteger(n);
  return baseRest(function(args) {
    return baseNth(args, n);
  });
}
module.exports = nthArg;
