/* */ 
var baseAssign = require('./_baseAssign'),
    baseCreate = require('./_baseCreate');
function create(prototype, properties) {
  var result = baseCreate(prototype);
  return properties == null ? result : baseAssign(result, properties);
}
module.exports = create;
