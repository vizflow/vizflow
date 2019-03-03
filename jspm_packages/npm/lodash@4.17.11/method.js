/* */ 
var baseInvoke = require('./_baseInvoke'),
    baseRest = require('./_baseRest');
var method = baseRest(function(path, args) {
  return function(object) {
    return baseInvoke(object, path, args);
  };
});
module.exports = method;
