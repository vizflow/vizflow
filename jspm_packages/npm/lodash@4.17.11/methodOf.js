/* */ 
var baseInvoke = require('./_baseInvoke'),
    baseRest = require('./_baseRest');
var methodOf = baseRest(function(object, args) {
  return function(path) {
    return baseInvoke(object, path, args);
  };
});
module.exports = methodOf;
