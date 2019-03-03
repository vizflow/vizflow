/* */ 
var copyObject = require('./_copyObject'),
    keysIn = require('./keysIn');
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}
module.exports = baseAssignIn;
