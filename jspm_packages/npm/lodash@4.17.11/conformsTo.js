/* */ 
var baseConformsTo = require('./_baseConformsTo'),
    keys = require('./keys');
function conformsTo(object, source) {
  return source == null || baseConformsTo(object, source, keys(source));
}
module.exports = conformsTo;
