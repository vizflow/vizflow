/* */ 
var baseConformsTo = require('./_baseConformsTo'),
    keys = require('./keys');
function baseConforms(source) {
  var props = keys(source);
  return function(object) {
    return baseConformsTo(object, source, props);
  };
}
module.exports = baseConforms;
